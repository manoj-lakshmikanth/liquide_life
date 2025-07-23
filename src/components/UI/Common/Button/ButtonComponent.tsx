import React from "react";
import styles from "./button.module.css";

interface ButtonComponentProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
}

const ButtonComponent = ({ onClick, children }: ButtonComponentProps) => {
  return (
    <button className={styles.button_container} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
