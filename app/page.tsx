"use client";
import { useEffect, useMemo, useState } from "react";
import { Bookmark, Search, UserRound, Menu, X, ArrowUpRight, MapPin } from "lucide-react";

type Story={id:number;category:string;title:string;dek:string;read:string;featured?:boolean;gradient:string};
const stories:Story[]=[
{id:1,category:"THE BIG STORY",title:"The forces reshaping America right now",dek:"A clear, source-first briefing on the stories moving policy, business and everyday life.",read:"8 min read",featured:true,gradient:"g1"},
{id:2,category:"ECONOMY",title:"Why the next jobs report matters",dek:"The signals to watch beyond the headline number.",read:"4 min read",gradient:"g2"},
{id:3,category:"TECHNOLOGY",title:"The new geography of American innovation",dek:"Investment is spreading beyond the familiar coastal hubs.",read:"6 min read",gradient:"g3"},
{id:4,category:"POLITICS",title:"A practical guide to federal power",dek:"Who decides what, and where states enter the picture.",read:"7 min read",gradient:"g4"},
{id:5,category:"CULTURE",title:"The ideas defining a changing country",dek:"Five shifts showing up in work, media and community life.",read:"5 min read",gradient:"g5"}
];
const facts=[['50','states'],['335M+','people'],['3.8M','sq. miles'],['6','time zones']];
export default function Home(){
 const [menu,setMenu]=useState(false),[profile,setProfile]=useState(false),[query,setQuery]=useState(''),[filter,setFilter]=useState('ALL'),[saved,setSaved]=useState<number[]>([]);
 useEffect(()=>{try{setSaved(JSON.parse(localStorage.getItem('aa-saved')||'[]'))}catch{}},[]);
 const toggle=(id:number)=>setSaved(s=>{const n=s.includes(id)?s.filter(x=>x!==id):[...s,id];localStorage.setItem('aa-saved',JSON.stringify(n));return n});
 const shown=useMemo(()=>stories.filter(s=>(filter==='ALL'||s.category===filter)&&(s.title+' '+s.dek).toLowerCase().includes(query.toLowerCase())),[filter,query]);
 return <main>
  <header><a className="brand" href="#"><span>ABOUT</span> AMERICA<i>•</i></a><nav className={menu?'open':''}><a href="#news">News</a><a href="#facts">Facts & Figures</a><a href="#states">States</a><a href="#about">About</a></nav><div className="actions"><button aria-label="Search" onClick={()=>document.getElementById('search')?.focus()}><Search/></button><button aria-label="My profile" onClick={()=>setProfile(true)}><UserRound/></button><button className="menub" aria-label="Menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
  <section className="ticker"><b>LIVE BRIEFING</b><span>America, explained without the noise.</span><span>•</span><span>AI-assisted, editor-reviewed publishing workflow</span></section>
  <section className="hero"><div><p className="eyebrow">INDEPENDENT • CLEAR • USEFUL</p><h1>Understand America.<br/><em>Not just the headlines.</em></h1><p className="intro">Sharp news briefings, visual facts and state-by-state context, built for curious readers everywhere.</p><a className="cta" href="#news">Explore today’s briefing <ArrowUpRight/></a></div><div className="hero-art"><div className="orb"></div><div className="outline">US</div><p>THE UNITED STATES<br/>IN CONTEXT</p></div></section>
  <section className="controls" id="news"><div><p className="eyebrow">TODAY’S EDITION</p><h2>Essential reading</h2></div><div className="search"><Search/><input id="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search stories" /></div></section>
  <div className="chips">{['ALL','ECONOMY','TECHNOLOGY','POLITICS','CULTURE'].map(x=><button onClick={()=>setFilter(x)} className={filter===x?'active':''} key={x}>{x}</button>)}</div>
  <section className="grid">{shown.map((s,i)=><article className={(s.featured&&filter==='ALL'&&!query)?'story feature':'story'} key={s.id}><div className={'visual '+s.gradient}><span>0{i+1}</span></div><div className="copy"><p className="category">{s.category}</p><h3>{s.title}</h3><p>{s.dek}</p><div className="meta"><span>{s.read}</span><button onClick={()=>toggle(s.id)} aria-label="Save article" className={saved.includes(s.id)?'saved':''}><Bookmark fill={saved.includes(s.id)?'currentColor':'none'}/></button></div></div></article>)}</section>
  <section className="facts" id="facts"><div className="facthead"><p className="eyebrow">FACTS & FIGURES</p><h2>The country<br/>at a glance.</h2><p>Fast context, with sources and dates attached to every figure.</p></div><div className="factgrid">{facts.map(([n,l])=><div className="fact" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>
  <section className="states" id="states"><MapPin/><div><p className="eyebrow">50 STATE PROFILES</p><h2>One country. Fifty distinct stories.</h2><p>Build searchable state pages for demographics, economy, history and current reporting.</p></div><button>Explore states <ArrowUpRight/></button></section>
  <footer id="about"><div className="brand"><span>ABOUT</span> AMERICA<i>•</i></div><p>News and context for an international audience.</p><small>© 2026 About-America.com · AI-assisted content should always be reviewed and sourced before publication.</small></footer>
  {profile&&<div className="modal" role="dialog" aria-modal="true"><div className="dialog"><button className="close" onClick={()=>setProfile(false)}><X/></button><p className="eyebrow">MY PROFILE</p><h2>Your reading list</h2><p>{saved.length?`You have saved ${saved.length} article${saved.length===1?'':'s'} on this device.`:'Save stories to find them here later.'}</p><button className="login">Sign in / Create account</button><small>Connect Supabase Auth to activate cross-device accounts.</small></div></div>}
 </main>
}