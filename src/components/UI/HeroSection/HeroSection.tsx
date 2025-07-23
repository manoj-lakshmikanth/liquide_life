"use client";

import React from "react";
import styles from "./hero.module.css";
import ButtonComponent from "../Common/Button/ButtonComponent";
import { motion } from "framer-motion";
import {
  titleMotion,
  subtitleMotion,
  buttonsMotion,
  logoItemVariants,
} from "./heroMotion";
import { useRouter } from "next/navigation";

const brokerages = [
  { name: "Zerodha", logo: "/logos/zerodha.svg" },
  { name: "Groww", logo: "/logos/groww.svg" },
  { name: "Upstox", logo: "/logos/upstox.svg" },
  { name: "Angel One", logo: "/logos/angelone.svg" },
  { name: "HDFC", logo: "/logos/hdfc.svg" },
];

const HeroSection = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/login")
  }

  return (
    <section className={styles.hero_section}>
      <div className={styles.hero_content}>
        <motion.h1 className={styles.hero_title} {...titleMotion}>
          Smart Investing Made Simple
        </motion.h1>

        <motion.p className={styles.hero_subtitle} {...subtitleMotion}>
          Personalized financial advice that grows with you. Track, plan, and
          invest — all in one place.
        </motion.p>

        <motion.div className={styles.hero_buttons} {...buttonsMotion}>
          <ButtonComponent onClick={handleRedirect}>
            Get Started
          </ButtonComponent>
          <button className={styles.secondary_btn}>Schedule a Free Call</button>
        </motion.div>

        <motion.p className={styles.trusted_by} {...subtitleMotion}>
          Trusted by investors using platforms like:
        </motion.p>

        <div className={styles.brokerage_logos}>
          {brokerages.map((broker, index) => (
            <motion.img
              key={broker.name}
              src={broker.logo}
              alt={broker.name}
              width={100}
              height={40}
              className={styles.broker_logo}
              variants={logoItemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              onClick={handleRedirect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
