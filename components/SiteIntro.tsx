'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { withBasePath } from '@/lib/site-path';

export default function SiteIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => setVisible(false), 1750);
    const unlockTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
    }, 2000);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(unlockTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return <AnimatePresence>
    {visible && <motion.div className="site-intro" aria-hidden="true" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] } }}>
      <div className="site-intro-image"><Image src={withBasePath('/images/homepage-hero.png')} alt="" fill priority sizes="100vw"/></div>
      <div className="site-intro-shade"/>
      <motion.div className="site-intro-lockup" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1], delay: 0.12 }}>
        <span className="site-intro-monogram">LA</span>
        <span className="site-intro-name">LUMIÈRE ANTIQUE</span>
        <span className="site-intro-caption">TIMELESS CHARM · MODERN ELEGANCE</span>
      </motion.div>
      <div className="site-intro-progress"><i/></div>
    </motion.div>}
  </AnimatePresence>;
}
