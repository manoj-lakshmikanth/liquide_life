
import HeroSection from "@/components/UI/HeroSection/HeroSection";
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <HeroSection />
    </div>
  );
}
