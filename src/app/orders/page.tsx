'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './page.module.css';
import BottomNavigation from '@/components/UI/Common/BottomNavigation/BottomNavigation';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants } from './orderMotion';
import withAuth from '@/components/withAuth';


function OrderbookPage() {
  const orders = useSelector((state: RootState) => state.orders.orders);

  const sortedOrders = [...orders].sort(
  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
);


  return (
    <motion.div
      className={styles.orderbookContainer}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className={styles.top_content}>
        <h2>Orderbook</h2>

        <div className={styles.cardList}>
          {sortedOrders.map((order) => (
            <motion.div
              key={order.id}
              className={`${styles.orderCard} ${styles[order.type]}`}
              variants={cardVariants}
            >
              <div className={styles.orderHeader}>
                <span className={styles.orderSymbol}>{order.symbol}</span>
                <span className={styles.orderType}>
                  {order.type.toUpperCase()}
                </span>
              </div>
              <div className={styles.orderDetails}>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Price:</strong> ₹ {order.price}</p>
                <p><strong>Time:</strong> {new Date(order.timestamp).toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </motion.div>
  );
}


export default withAuth(OrderbookPage);