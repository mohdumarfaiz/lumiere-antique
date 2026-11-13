'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
const links = [{href:'/collections',label:'Collections'},{href:'/our-story',label:'Our Story'},{href:'/manufacturing',label:'Capabilities'}];
export default function Header(){ const [open,setOpen]=useState(false); return <header className="site-header"><div className="nav-wrap"><Link href="/" className="brand" onClick={()=>setOpen(false)} aria-label="Lumière Antique home"><span className="brand-mark">LA</span><span className="brand-name">LUMIÈRE <i>ANTIQUE</i></span></Link><nav className="desktop-nav">{links.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav><Link className="nav-cta" href="/contact">Get in touch <ArrowUpRight size={14}/></Link><button className="mobile-toggle" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>{open&&<nav className="mobile-nav">{links.map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}</Link>)}<Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link></nav>}</header> }
