/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import styles from "./bottomNavigation.module.css";
import {
  containerVariants,
  itemVariants,
} from "@/app/dashboard/dashboardMotion";
import { useRouter } from "next/navigation";

const BottomNavigation = () => {
  const router = useRouter();

  const pages = [
    {
      id: 1,
      icon: "/icons/dashboard.svg",
      path: "/dashboard",
      page_name: "Dashboard",
    },
    {
      id: 2,
      icon: "/icons/holding.svg",
      path: "/holdings",
      page_name: "Holdings",
    },
    { id: 3, icon: "/icons/box.svg", path: "/orders", page_name: "Orderbook" },
    { id: 4, icon: "/icons/jar.svg", path: "/positions", page_name: "Positions" },
  ];

  const handleRedirect = (path: string) => {
    router.replace(path);
  };

  return (
    <motion.div
      className={styles.navigation_container}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {pages.map((items) => (
        <motion.div
          key={items.id}
          className={styles.individual_path}
          variants={itemVariants}
          onClick={() => handleRedirect(items?.path)}
        >
          <img
            src={items.icon}
            alt={items.page_name}
            width={20}
            height={20}
            className={styles.items_logo}
          />
          <p>{items.page_name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BottomNavigation;
