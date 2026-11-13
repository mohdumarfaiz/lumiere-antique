'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import type { Product } from '@/lib/products';
import { withBasePath } from '@/lib/site-path';

type Props = { items: Product[]; collectionName: string };

export default function CollectionShowcase({ items, collectionName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = useRef<HTMLVideoElement>(null);
  const activeItem = items[activeIndex];

  useEffect(() => {
    if (activeVideo.current) void activeVideo.current.play().catch(() => undefined);
  }, [activeIndex, activeItem?.videoUrl]);

  const select = (index: number) => setActiveIndex(index);
  const move = (step: number) => select((activeIndex + step + items.length) % items.length);

  if (!activeItem) return <section className="reel-showcase reel-showcase-empty"><p>This collection is being prepared.</p></section>;

  return <section className="reel-showcase" aria-label={`${collectionName} collection showcase`}>
    <div className="reel-heading">
      <div><span className="eyebrow">THE COLLECTION · {String(items.length).padStart(2, '0')} PIECES</span><h2>Objects with a <em>story.</em></h2></div>
      <p>Select an alcove to discover each piece.</p>
    </div>

    <div className="reel-alcoves" role="tablist" aria-label={`Explore ${collectionName}`}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return <button type="button" role="tab" aria-selected={isActive} aria-label={`View ${item.name}`} className={`reel-alcove${isActive ? ' is-active' : ''}`} key={item.slug} onClick={() => select(index)}>
          <span className="reel-alcove-light" />
          <span className="reel-alcove-media">
            {isActive && item.videoUrl ? <video key={`${item.slug}-${item.videoUrl}`} ref={activeVideo} src={withBasePath(item.videoUrl)} poster={withBasePath(item.image)} autoPlay muted loop playsInline preload="metadata" aria-label={`${item.name} cinematic preview`} />
              : <Image src={withBasePath(item.image)} alt={item.name} fill sizes="(max-width: 700px) 78vw, 25vw" priority={index === 0} style={{ objectPosition: item.imagePosition ?? 'center' }} />}
          </span>
          <span className="reel-alcove-shade" />
          <span className="reel-alcove-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="reel-alcove-caption"><small>{item.code}</small><strong>{item.name}</strong></span>
          {isActive && item.videoUrl && <span className="reel-video-indicator"><Play size={9} fill="currentColor"/> FILM</span>}
        </button>;
      })}
    </div>

    <div className="reel-product-story" aria-live="polite" key={activeItem.slug}>
      <div className="reel-story-intro"><span className="eyebrow">{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {activeItem.category}</span><h3>{activeItem.name}</h3><p>{activeItem.description}</p></div>
      <dl className="reel-story-specs"><div><dt>REFERENCE</dt><dd>{activeItem.code}</dd></div><div><dt>MATERIAL</dt><dd>{activeItem.material}</dd></div><div><dt>FINISH</dt><dd>{activeItem.finish}</dd></div></dl>
      <div className="reel-story-actions">{activeItem.externalUrl ? <a href={activeItem.externalUrl} target="_blank" rel="noreferrer" className="button button-light">View on Etsy <ArrowUpRight size={15}/></a> : <Link href={`/products/${activeItem.slug}`} className="button button-light">Explore this piece <ArrowUpRight size={15}/></Link>}<Link href={`/trade-enquiries?product=${encodeURIComponent(activeItem.name)}`} className="reel-enquire">Enquire</Link><div className="reel-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous piece"><ArrowLeft size={15}/></button><button type="button" onClick={() => move(1)} aria-label="Next piece"><ArrowRight size={15}/></button></div></div>
    </div>
    <div className="reel-mobile-hint" aria-hidden="true">SWIPE TO EXPLORE <span>⟶</span></div>
  </section>;
}
