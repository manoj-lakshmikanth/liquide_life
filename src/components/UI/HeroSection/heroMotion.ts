import {  easeOut  } from "framer-motion";


export const titleMotion = {
  initial: { y: -40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: easeOut },
};

export const subtitleMotion = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: easeOut, delay: 0.2 },
};

export const buttonsMotion = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: easeOut, delay: 0.4 },
};

export const logoItemVariants = {
  hidden: { y: 30, scale: 0.8, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.15, // Delay increases per index
      duration: 0.4,
      ease: easeOut,
    },
  }),
};