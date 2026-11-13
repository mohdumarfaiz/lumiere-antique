import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteIntro from '@/components/SiteIntro';
import { withBasePath } from '@/lib/site-path';
export const metadata: Metadata = { title: {default:'Lumiere Antique | Timeless Charm. Modern Elegance.',template:'%s | Lumiere Antique'}, description:'Discover distinctive antique-inspired décor, collectibles, lighting and metal artefacts. Enquire with Lumiere Antique for trade, wholesale and project partnerships.', metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), icons: { icon: withBasePath('/favicon.svg') } };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteIntro/><Header/><main>{children}</main><Footer/></body></html>}
