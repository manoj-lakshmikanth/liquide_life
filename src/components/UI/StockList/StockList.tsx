"use client";

import React, { useEffect, useState } from "react";
import styles from "./stockList.module.css";
import { motion, easeOut } from "framer-motion";


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

const StockList = ({setStockDetails, setShow} : StockListProps) => {
  const [stockData, setStockData] = useState<stockDataProps[] | []>([])

  const handleOpenOrderpad = (stock: stockDataProps) => {
    setStockDetails(stock);
    setShow(true);
  };

  useEffect(() => {
    fetch("/mock/stockData.json")
      .then((res) => res.json())
      .then((res) => {setStockData(res.stock_data)});
  }, []);


  return (
    <motion.div
      className={styles.dashboard}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {stockData.map((stock) => (
        <motion.div
          key={stock.symbol}
          className={styles.card}
          variants={cardVariants}
          onClick={() => handleOpenOrderpad(stock)}
        >
          <h3 className={styles.stockName}>{stock.name}</h3>
          <p className={styles.stockPrice}>₹ {stock.price.toFixed(2)}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StockList;
