'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { categories } from '@/lib/products';
import { withBasePath } from '@/lib/site-path';

export default function CollectionExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    let next = activeRef.current;
    const hysteresis = 0.008;
    while (next < categories.length - 1 && value > (next + 1) / categories.length + hysteresis) next += 1;
    while (next > 0 && value < next / categories.length - hysteresis) next -= 1;
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  });

  return (
    <section className="collections-section collection-experience" aria-label="Explore our collections">
      <div ref={trackRef} className="collection-scroll-track" style={{ height: `${categories.length * 65}svh` }}>
        <div className="collection-stage">
          <div className="collection-stage-main">
            <div className="collection-card-stack">
              {categories.map((category, index) => (
                <CollectionSlide key={category.slug} category={category} index={index} active={index === active} currentIndex={active} />
              ))}
            </div>
          </div>
          <div className="collection-stage-footer"><span>SCROLL TO EXPLORE</span><span className="collection-progress-track"><i style={{ transform: `scaleX(${(active + 1) / categories.length})` }} /></span><span>0{active + 1} / 0{categories.length}</span></div>
        </div>
      </div>
    </section>
  );
}

function CollectionSlide({ category, index, active, currentIndex }: { category: (typeof categories)[number]; index: number; active: boolean; currentIndex: number }) {
  const count = categories.length;
  const direction = index < currentIndex ? -1 : 1;

  return (
    <motion.article
      className="collection-slide"
      initial={false}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: direction * 26, scale: 0.985 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: active ? 2 : index < currentIndex ? 1 : 0 }}
      aria-hidden={!active}
    >
      <div className="collection-slide-scene">
        <div className="collection-slide-content">
          <span className="collection-slide-kicker">0{index + 1} / 0{count} · CURATED OBJECTS</span>
          <h3 className={`collection-slide-title collection-slide-title-${index + 1}`}>{category.name}</h3>
          <p>{category.description}</p>
          <Link href={`/collections/${category.slug}`} className="collection-slide-cta">EXPLORE {category.name.toUpperCase()} <ArrowUpRight size={16} /></Link>
        </div>
        <Link href={`/collections/${category.slug}`} className={`collection-slide-image${category.slug === 'lighting' ? ' collection-slide-image-lighting' : ''}${category.slug === 'home-decor' ? ' collection-slide-image-home-decor' : ''}${category.slug === 'brass-metal-artefacts' ? ' collection-slide-image-brass-metal' : ''}`} aria-label={`Explore ${category.name}`}>
          <Image src={withBasePath(category.image)} alt={category.name} fill sizes="(max-width: 700px) 80vw, 50vw" priority={index === 0} />
        </Link>
      </div>
    </motion.article>
  );
}
