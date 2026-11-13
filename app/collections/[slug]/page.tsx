import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { categories, products } from '@/lib/products';
import CollectionShowcase from '@/components/CollectionShowcase';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { title: 'Collection not found' };
  return { title: category.name, description: category.description };
}

export default async function CollectionDetail({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const categoryProducts = products.filter((product) => product.category === category.name);
  const categoryNumber = categories.findIndex((item) => item.slug === slug) + 1;

  return <>
    <section className="collection-detail-hero">
      <Image src={category.image} alt="" fill priority sizes="100vw" className="collection-detail-image" />
      <div className="collection-detail-shade" />
      <div className="collection-detail-content">
        <Link href="/collections" className="collection-detail-back"><ArrowLeft size={14}/> All collections</Link>
        <span className="eyebrow light">COLLECTION 0{categoryNumber} · LUMIÈRE ANTIQUE</span>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
        <span className="collection-detail-count">{categoryProducts.length} {categoryProducts.length === 1 ? 'PIECE' : 'PIECES'} IN THIS COLLECTION</span>
      </div>
    </section>

    <CollectionShowcase items={categoryProducts} collectionName={category.name} />

    <section className="catalogue-note">
      <span className="eyebrow">A PIECE IN MIND?</span>
      <h2>Let’s find the <em>right one.</em></h2>
      <p>Tell us about your project or the pieces you are looking for.</p>
      <Link href={`/trade-enquiries?interest=${encodeURIComponent(category.name)}`} className="button button-dark">Enquire about this collection <ArrowUpRight size={16}/></Link>
    </section>
  </>;
}
