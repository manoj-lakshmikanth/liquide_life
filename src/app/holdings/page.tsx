"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styles from "./page.module.css";
import { motion, easeOut } from "framer-motion";
import BottomNavigation from "@/components/UI/Common/BottomNavigation/BottomNavigation";
import withAuth from "@/components/withAuth";

function HoldingsPage() {
  const holdings = useSelector((state: RootState) => state.holdings.holdings);

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
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
  };

  return (
    <motion.div
      className={styles.holdingsContainer}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className={styles.top_content}>
        <h2 className={styles.pageTitle}>Your Holdings</h2>

        <div className={styles.cardList}>
          {holdings.length === 0 ? (
            <p className={styles.emptyText}>You do not hold any stocks yet.</p>
          ) : (
            holdings.map((h) => (
              <motion.div
                key={h.symbol}
                className={styles.holdingCard}
                variants={cardVariants}
              >
                <div className={styles.holdingHeader}>
                  <span className={styles.symbol}>{h.symbol}</span>
                  <span className={styles.qty}>{h.quantity} shares</span>
                </div>
                <div className={styles.holdingDetails}>
                  <p>
                    <strong>Name:</strong> {h.name}
                  </p>
                  <p>
                    <strong>Avg. Buy Price:</strong> ₹ {h.avgPrice.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <BottomNavigation />
    </motion.div>
  );
}


export default withAuth(HoldingsPage);