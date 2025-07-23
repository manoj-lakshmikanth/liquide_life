import {  easeOut  } from "framer-motion";


export const containerMotion = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: easeOut  },
};

export const logoMotion = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { duration: 0.6, delay: 0.2 },
};

export const buttonMotion = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, delay: 0.4 },
};