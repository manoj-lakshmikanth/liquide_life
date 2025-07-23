"use client";

import { useRef, useState } from "react";
import withAuth from "../../components/withAuth";
import { getSession } from "../../lib/auth";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { topItemVariants, topSectionVariants } from "./dashboardMotion";
import StockList from "@/components/UI/StockList/StockList";
import BottomNavigation from "@/components/UI/Common/BottomNavigation/BottomNavigation";
import FloatingActionButton from "@/components/UI/Common/FloatingActionButton/FloatingActionButton";
import OrderPad from "@/components/UI/Common/OrderPad/OrderPad";

function DashboardPage() {
  const [show, setShow] = useState(false);
  const [stockDetails, setStockDetails] = useState<stockDataProps | null>(null);

  const session = getSession();

  const containerRef = useRef(null);

  return (
    <div className={styles.dashboardContainer} ref={containerRef}>
      <motion.div
        className={styles.top_section}
        variants={topSectionVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h2 className={styles.welcomeTitle} variants={topItemVariants}>
          Welcome, {session?.username.toUpperCase()}
        </motion.h2>

        <StockList setStockDetails={setStockDetails} setShow={setShow} />
      </motion.div>

      <BottomNavigation />

      <FloatingActionButton
        setStockDetails={setStockDetails}
        setShow={setShow}
        dragBoundaryRef={containerRef}
      />
      <OrderPad show={show} setShow={setShow} stockDetails={stockDetails} />
    </div>
  );
}

export default withAuth(DashboardPage);
