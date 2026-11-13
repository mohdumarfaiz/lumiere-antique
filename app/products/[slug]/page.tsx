import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { categories, products } from '@/lib/products';
import { withBasePath } from '@/lib/site-path';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return { title: product?.name ?? 'Product' };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const category = categories.find((item) => item.name === product.category);

  return <section className="product-detail section-pad">
    <Link href={category ? `/collections/${category.slug}` : '/collections'} className="back-link"><ArrowLeft size={15}/> Back to {category?.name ?? 'collections'}</Link>
    <div className="product-layout">
      <div className="product-photo"><Image src={withBasePath(product.image)} alt={product.name} fill sizes="(max-width: 800px) 100vw, 55vw" style={{ objectPosition: product.imagePosition ?? 'center' }}/></div>
      <div className="product-info">
        <span className="eyebrow">{product.category}</span>
        <h1>{product.name}</h1>
        <span className="product-code">REFERENCE · {product.code}</span>
        <p className="lead">{product.description}</p>
        <div className="spec-list">
          <div><span>Material</span><strong>{product.material}</strong></div>
          <div><span>Finish</span><strong>{product.finish}</strong></div>
          <div><span>Availability</span><strong>Enquire for details</strong></div>
        </div>
        {!product.externalUrl && <p className="small-note">Product imagery and specifications are being curated. Please contact us to confirm current details.</p>}
        {product.externalUrl ? <a href={product.externalUrl} target="_blank" rel="noreferrer" className="button button-dark">View on Etsy <ArrowUpRight size={16}/></a> : <Link href={`/trade-enquiries?product=${encodeURIComponent(product.name)}`} className="button button-dark">Enquire about this piece <ArrowUpRight size={16}/></Link>}
      </div>
    </div>
  </section>;
}
