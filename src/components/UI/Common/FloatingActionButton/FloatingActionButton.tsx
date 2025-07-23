"use client";

import { useState, RefObject, useEffect } from "react";
import styles from "./floatingActionButton.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface FABProps {
  setStockDetails: React.Dispatch<React.SetStateAction<stockDataProps | null>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  dragBoundaryRef?: RefObject<HTMLElement> | RefObject<null>;
}

export default function FloatingActionButton({
  setStockDetails,
  setShow,
  dragBoundaryRef,
}: FABProps) {
  const [open, setOpen] = useState(false);

  const onBuySell = () => {
    setShow(true);
  };

  useEffect(() => {
    fetch("/mock/stockData.json")
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setStockDetails(res.stock_data[0]);
        }
      });
  }, []);

  return (
    <motion.div
      className={styles.fabContainer}
      drag
      dragConstraints={dragBoundaryRef}
      dragElastic={0.2}
      dragMomentum={false}
    >
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              className={`${styles.actionButton} ${styles.buy}`}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -60 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onBuySell}
            >
              Buy
            </motion.button>

            <motion.button
              className={`${styles.actionButton} ${styles.sell}`}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -120 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onBuySell}
            >
              Sell
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        className={styles.fabMain}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "×" : "+"}
      </motion.button>
    </motion.div>
  );
}
