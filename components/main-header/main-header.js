'use client';
import Link from 'next/link';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import MainHeaderBackground from '@/components/main-header/main-header-background';
import NavLink from './nav-link';
import burgerMenu from '@/assets/icons/menu-04.svg';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <Link href='/'>
            <img src={logoImg.src} alt=' a plate with food on it' />
          </Link>
          <Link href='/'>
            <h1>NextLevel Food</h1>
          </Link>
        </div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href='/meals'>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href='/community'>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
        <img
          onClick={() => setIsOpen(true)}
          className={classes.burgerMenu}
          src={burgerMenu.src}
          alt='burger-menu'
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={classes.mobileMenu}
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
            >
              <button onClick={() => setIsOpen(false)}>&times;</button>
              <Link
                className={classes.mobileLink}
                href='/meals'
                onClick={() => setIsOpen(false)}
              >
                Browse Meals
              </Link>
              <Link
                className={classes.mobileLink}
                href='/community'
                onClick={() => setIsOpen(false)}
              >
                Foodies Community
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
