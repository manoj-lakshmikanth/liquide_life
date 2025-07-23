'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './page.module.css';
import BottomNavigation from '@/components/UI/Common/BottomNavigation/BottomNavigation';
import { motion } from 'framer-motion';
import { containerVariants, cardVariants } from './positionMotion';
import withAuth from '@/components/withAuth';

function PositionsPage() {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const today = new Date().toDateString();

  const positionMap = new Map<string, { name: string; netQty: number }>();

  orders.forEach((order) => {
    const orderDate = new Date(order.timestamp).toDateString();
    if (orderDate !== today) return;

    const current = positionMap.get(order.symbol) || { name: order.name, netQty: 0 };
    current.netQty += order.type === 'buy' ? order.quantity : -order.quantity;
    positionMap.set(order.symbol, current);
  });

  const positions = Array.from(positionMap.entries())
    .filter(([item, val]) => val.netQty !== 0)
    .map(([symbol, val]) => ({ symbol, ...val }));

  return (
    <motion.div
      className={styles.positionsContainer}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className={styles.top_content}>
        <h2>Positions</h2>

        <div className={styles.cardList}>
          {positions.length === 0 ? (
            <p className={styles.emptyText}>No open positions for today.</p>
          ) : (
            positions.map((pos) => (
              <motion.div
                key={pos.symbol}
                className={`${styles.positionCard} ${pos.netQty > 0 ? styles.long : styles.short}`}
                variants={cardVariants}
              >
                <div className={styles.positionHeader}>
                  <span className={styles.symbol}>{pos.symbol}</span>
                  <span className={styles.type}>{pos.netQty > 0 ? 'LONG' : 'SHORT'}</span>
                </div>
                <div className={styles.positionDetails}>
                  <p><strong>Name:</strong> {pos.name}</p>
                  <p><strong>Net Qty:</strong> {pos.netQty}</p>
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


export default withAuth(PositionsPage);