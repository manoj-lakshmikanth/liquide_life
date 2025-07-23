"use client";

import React, { useState } from "react";
import styles from "./order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { placeOrder } from "@/redux/slices/orderSlice";
import { buyStock, sellStock } from "@/redux/slices/holdingSlice";
import { v4 as uuidv4 } from "uuid";

interface OrderpadProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  stockDetails: stockDataProps | null;
}

const OrderPad = ({ show, setShow, stockDetails }: OrderpadProps) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const holdings = useSelector((state: RootState) => state.holdings.holdings);

  const handleClose = () => setShow(false);

  const handleOrder = (type: "buy" | "sell") => {
    if (!stockDetails || !stockDetails.price) return;

    const existingHolding = holdings.find(
      (h) => h.symbol === stockDetails.symbol
    );

    if (type === "sell") {
      if (!existingHolding || existingHolding.quantity < quantity) {
        setError("Not enough quantity to sell.");
        return;
      }
      dispatch(sellStock({ symbol: stockDetails.symbol, quantity }));
    }

    if (type === "buy") {
      dispatch(
        buyStock({
          symbol: stockDetails.symbol,
          name: stockDetails.name,
          quantity,
          avgPrice: stockDetails.price,
        })
      );
    }

    dispatch(
      placeOrder({
        id: uuidv4(),
        symbol: stockDetails.symbol,
        name: stockDetails.name,
        type,
        quantity,
        price: stockDetails.price,
        timestamp: new Date().toISOString(),
      })
    );

    alert(`${type.toUpperCase()} Order Placed`);
    setError("");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3>{stockDetails?.name}</h3>
          <p className={styles.symbol_styles}>{stockDetails?.symbol}</p>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <label>
            Quantity: 
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={styles.inputField}
              autoFocus
              // min={1}
            />
          </label>

          <p className={styles.stockPrice}>
            <strong>Current Price:</strong> ₹ {stockDetails?.price}
          </p>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.modalFooter}>
          <button
            className={styles.buyButton}
            onClick={() => handleOrder("buy")}
          >
            Buy
          </button>
          <button
            className={styles.sellButton}
            onClick={() => handleOrder("sell")}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPad;
