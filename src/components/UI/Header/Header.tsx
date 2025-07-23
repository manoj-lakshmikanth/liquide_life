"use client";

import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerMotion, logoMotion, buttonMotion } from "./headerMotion";
import ButtonComponent from "../Common/Button/ButtonComponent";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleRedirect = () => {
    router.replace("/login");
    localStorage.removeItem('session');
    setIsLoggedIn(false);
  };

  useEffect(() => {
      setIsLoggedIn(isAuthenticated());
  }, [pathname]);


  return (
    <motion.div className={styles.header_container} {...containerMotion}>
      <motion.div className={styles.logo_image} {...logoMotion}>
        <Image
          src="/logoliquide.webp"
          alt="Liquide_Life"
          width={108}
          height={30}
        />
      </motion.div>

      <motion.div {...buttonMotion}>
        <ButtonComponent onClick={handleRedirect}>
          {isLoggedIn ? "Logout" : "Login"}
        </ButtonComponent>
      </motion.div>
    </motion.div>
  );
};

export default Header;
