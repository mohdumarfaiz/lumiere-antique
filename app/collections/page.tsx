import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/lib/products';
import { withBasePath } from '@/lib/site-path';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore Lumiere Antique collections across decorative objects, home décor, lighting and brass artefacts.',
};

export default function Collections() {
  return <>
    <section className="page-hero">
      <span className="eyebrow">THE COLLECTIONS</span>
      <h1>Objects of character.<br/><em>Collections with soul.</em></h1>
      <p>A considered edit of decorative forms, expressive materials and timeless details.</p>
    </section>
    <section className="catalogue section-pad">
      {categories.map((category, index) => <section className="catalogue-row" id={category.slug} key={category.slug}>
        <div className="catalogue-image"><Image src={withBasePath(category.image)} alt={category.name} fill sizes="(max-width: 700px) 100vw, 50vw"/></div>
        <div className="catalogue-copy">
          <span className="eyebrow">COLLECTION 0{index + 1}</span>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
          <div className="catalogue-links">
            <Link href={`/collections/${category.slug}`} className="text-link">Explore this collection <ArrowUpRight size={15}/></Link>
          </div>
        </div>
      </section>)}
    </section>
    <section className="catalogue-note">
      <h2>Looking for something <em>specific?</em></h2>
      <p>Share your brief with us. We welcome product, sourcing and project enquiries.</p>
      <Link href="/trade-enquiries" className="button button-dark">Make an enquiry <ArrowUpRight size={16}/></Link>
    </section>
  </>;
}
