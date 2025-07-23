'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../lib/auth';
import styles from './page.module.css';
import ButtonComponent from '@/components/UI/Common/Button/ButtonComponent';
import { motion } from 'framer-motion';
import { containerVariants , inputVariants, buttonVariants} from './loginMotion';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const result = login(username, password);
    if (result.code === 200) {
      router.replace('/dashboard');
    } else if (result.code === 400) {
      setError(result.message || 'Login failed');
    } else {
      setError("Server Error, Please try again later")
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      localStorage.removeItem('session');
    }
  }, []);

  return (
    <motion.div
      className={styles.loginContainer}
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <motion.h2 className={styles.loginTitle} variants={containerVariants}>
        Login and Explore
      </motion.h2>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <motion.input
        className={styles.inputField}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        variants={inputVariants}
      />

      <motion.input
        type="password"
        className={styles.inputField}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        variants={inputVariants}
      />

      <motion.div
        className={styles.login_btn}
        onClick={handleLogin}
        variants={buttonVariants}
      >
        <ButtonComponent>Login</ButtonComponent>
      </motion.div>
    </motion.div>
  );
}
