import { useState, useEffect, useRef, useCallback } from "react";

const PHOTO = "/lintang.jpeg";
const CV    = "/cv.pdf";

const SKILLS = [
  { category: "Backend",     icon: "⚙", color: "#1a1a2e", accent: "#4f46e5", items: ["Laravel","CodeIgniter","REST API","Livewire"] },
  { category: "Frontend",    icon: "◈", color: "#1a1a2e", accent: "#0ea5e9", items: ["HTML","CSS","JavaScript"] },
  { category: "Database",    icon: "▦", color: "#1a1a2e", accent: "#10b981", items: ["PostgreSQL","MySQL","Oracle"] },
  { category: "Web GIS",     icon: "◉", color: "#1a1a2e", accent: "#f59e0b", items: ["Google Maps API","Leaflet","Spatial Data","Spatial Query"] },
  { category: "DevOps",      icon: "◫", color: "#1a1a2e", accent: "#8b5cf6", items: ["Git","GitHub","Linux","Docker","SSH","CloudFlare"] },
  { category: "Networking",  icon: "◎", color: "#1a1a2e", accent: "#06b6d4", items: ["TCP/IP","LAN/WAN","VPN Config","Firewall"] },
  { category: "Integration", icon: "⬡", color: "#1a1a2e", accent: "#ec4899", items: ["WhatsApp API","Payment Gateway"] },
];

const PROJECTS = [
  { id:1, tag:"GOV·SYS",  emoji:"🏛", color:"#4f46e5",
    title:"Sistem Pelayanan Pajak Daerah",
    short:"Platform terpadu pendaftaran, verifikasi & administrasi wajib pajak secara digital.",
    desc:"Platform pelayanan komprehensif untuk pengelolaan data wajib pajak dan objek pajak. Mencakup alur pendaftaran, verifikasi dokumen, validasi data, dan seluruh layanan administrasi pajak daerah secara digital dan terintegrasi.",
    tech:["Laravel","PostgreSQL","REST API","Livewire"] },
  { id:2, tag:"WEB·GIS",  emoji:"🗺", color:"#0ea5e9",
    title:"Sistem Peta Pajak Daerah",
    short:"Visualisasi geospasial objek & zona pajak berbasis Google Maps secara real-time.",
    desc:"Aplikasi Web GIS interaktif untuk visualisasi dan pemetaan seluruh objek pajak. Menampilkan data spasial properti, batas wilayah administratif, zona nilai tanah, dan informasi geografis perpajakan secara real-time.",
    tech:["Laravel","Google Maps API","PostgreSQL","Spatial Data"] },
  { id:3, tag:"FINTECH",  emoji:"💳", color:"#10b981",
    title:"Sistem Pembayaran Pajak Daerah",
    short:"Pembayaran online real-time dengan integrasi payment gateway multi-channel.",
    desc:"Platform pembayaran pajak online yang aman dan efisien. Dilengkapi monitoring status pembayaran real-time, laporan transaksi otomatis, rekonsiliasi data, dan integrasi payment gateway untuk berbagai metode pembayaran.",
    tech:["Laravel","REST API","MySQL","Payment Gateway"] },
  { id:4, tag:"ANALYTICS",emoji:"📊", color:"#f59e0b",
    title:"Dashboard Analitik Pajak Daerah",
    short:"Monitoring tagihan, analisis & statistik pajak dengan grafik interaktif real-time.",
    desc:"Dashboard monitoring komprehensif untuk tracking status tagihan, analisis data pembayaran, dan visualisasi statistik pajak. Dilengkapi grafik interaktif, real-time analytics, dan laporan eksekutif untuk mendukung pengambilan keputusan strategis.",
    tech:["Livewire","Chart.js","Oracle","Data Analytics"] },
  { id:5, tag:"OPS·SYS",  emoji:"📋", color:"#8b5cf6",
    title:"Aplikasi Penagihan Pajak Daerah",
    short:"Tracking tunggakan, notifikasi otomatis WhatsApp & laporan realisasi penagihan.",
    desc:"Sistem penagihan pajak terintegrasi dengan fitur tracking tunggakan, notifikasi otomatis via WhatsApp, penjadwalan penagihan, dan laporan realisasi. Meningkatkan efektivitas pengumpulan pajak secara signifikan.",
    tech:["Laravel","PostgreSQL","Livewire","WhatsApp API"] },
  { id:6, tag:"SURVEY",   emoji:"📡", color:"#06b6d4",
    title:"Aplikasi Survey Data Pajak",
    short:"Pengumpulan & sinkronisasi data lapangan objek pajak secara digital offline-online.",
    desc:"Aplikasi mobile-friendly untuk petugas lapangan dalam melakukan survey dan pendataan objek pajak. Mendukung pengambilan foto, input data spasial, sinkronisasi offline-online, dan validasi otomatis data hasil survei ke database pusat.",
    tech:["Laravel","REST API","PostgreSQL","Leaflet"] },
  { id:7, tag:"GIS·MAP",  emoji:"🌾", color:"#ec4899",
    title:"Peta Komoditas Pangan Daerah",
    short:"GIS pemetaan komoditas pertanian, potensi & distribusi wilayah secara interaktif.",
    desc:"Aplikasi Web GIS untuk pemetaan dan monitoring komoditas pangan daerah. Menampilkan distribusi geografis komoditas pertanian, potensi wilayah, data produksi, dan visualisasi data spasial untuk mendukung perencanaan pembangunan daerah.",
    tech:["Laravel","Google Maps API","MySQL","GIS Mapping"] },
];

const EXPERIENCES = [
  { date:"Jan 2024 — Present", title:"Full Stack Developer", company:"CV Agsatu", location:"Kediri, Jawa Timur", color:"#4f46e5", status:"ACTIVE",
    bullets:["Mengembangkan & memelihara ekosistem aplikasi Pajak Daerah untuk 5 daerah","Membangun 7 sistem: pelayanan, peta GIS, pembayaran, dashboard, penagihan, survey & komoditas","Implementasi Web GIS & Google Maps API untuk visualisasi data spasial","Backend Laravel + RESTful API + manage PostgreSQL, MySQL, dan Oracle","Deploy & maintenance sistem di Linux server dengan Docker & CloudFlare"] },
  { date:"Aug 2023 — Oct 2023", title:"Full Stack Developer", company:"Viscode.id", location:"Kediri, Jawa Timur", color:"#0ea5e9", status:"CONTRACT",
    bullets:["Pengembangan aplikasi web menggunakan framework CodeIgniter","Backend & frontend fitur berdasarkan kebutuhan klien enterprise","Desain & manage database MySQL: relasi tabel & query optimasi","Bug fixing, refactoring kode & kolaborasi tim via Git workflow"] },
];

const EDUCATION = [
  { degree:"D3 Manajemen Informatika", school:"Politeknik Negeri Malang", period:"Aug 2021 — Aug 2024", gpa:"3.92", color:"#4f46e5",
    achievements:["🏆 Lulusan Terbaik Peringkat 3 Jurusan","👥 Kepala Divisi PSDM — BEM","📚 Aktif penelitian dosen","🎯 Koordinator PKM Center"] },
  { degree:"SMK Teknik Komputer & Jaringan", school:"SMKN 1 Nganjuk", period:"Jul 2016 — Jul 2019", gpa:null, color:"#0ea5e9",
    achievements:["💻 Dasar-dasar jaringan komputer","⚡ Fondasi programming & software development"] },
];

const NAV_ITEMS = [
  { id:"hero",       label:"Home" },
  { id:"experience", label:"Experience" },
  { id:"skills",     label:"Skills" },
  { id:"projects",   label:"Projects" },
  { id:"education",  label:"Education" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  background:#f8f6f2;
  color:#1a1a2e;
  font-family:'DM Sans',sans-serif;
  overflow-x:hidden;
  cursor:none;
}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#f0ede8}
::-webkit-scrollbar-thumb{background:#c4bdb5;border-radius:2px}
::selection{background:rgba(79,70,229,0.12);color:#4f46e5}
.serif{font-family:'Cormorant Garamond',serif}
.mono{font-family:'DM Mono',monospace}

@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{width:0}to{width:100%}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes rotateSlow{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes shimmerLine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes dotBlink{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes orbFloat1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.05)}66%{transform:translate(-20px,20px) scale(0.97)}}
@keyframes orbFloat2{0%,100%{transform:translate(0,0)}40%{transform:translate(-50px,40px)}70%{transform:translate(30px,-20px)}}
@keyframes lineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes countUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes cardHover{to{transform:translateY(-6px)}}
@keyframes photoRing{to{transform:rotate(360deg)}}
@keyframes noiseMove{0%{transform:translate(0,0)}25%{transform:translate(-1%,-1%)}50%{transform:translate(1%,1%)}75%{transform:translate(-1%,1%)}100%{transform:translate(0,0)}}

/* Noise texture overlay */
.noise{
  position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.03;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px 200px;
}

/* Decorative grid */
.grid-bg{
  position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:
    linear-gradient(rgba(79,70,229,0.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(79,70,229,0.04) 1px,transparent 1px);
  background-size:80px 80px;
  mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%);
}

/* Orb decorations */
.orb-1{
  position:fixed;width:600px;height:600px;
  top:-200px;right:-150px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(79,70,229,0.07) 0%,transparent 70%);
  animation:orbFloat1 25s ease-in-out infinite;
  pointer-events:none;z-index:0;
}
.orb-2{
  position:fixed;width:500px;height:500px;
  bottom:-150px;left:-100px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(14,165,233,0.06) 0%,transparent 70%);
  animation:orbFloat2 30s ease-in-out infinite;
  pointer-events:none;z-index:0;
}

/* NAV */
.desktop-nav{display:flex!important}
.ham-btn{display:none!important}
.mob-menu-wrap{display:none!important}
@media(max-width:700px){
  .desktop-nav{display:none!important}
  .ham-btn{display:flex!important}
  .mob-menu-wrap{display:block!important}
}

/* LAYOUT */
.hero-inner{display:flex;align-items:center;gap:clamp(40px,6vw,100px);flex-wrap:wrap}
.hero-text{flex:1;min-width:280px}
.hero-photo-wrap{flex-shrink:0}
@media(max-width:700px){
  .hero-inner{flex-direction:column-reverse;text-align:center}
  .hero-photo-wrap{margin-bottom:12px}
  .cta-row{justify-content:center!important}
  .stat-row{justify-content:center!important}
}

.proj-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
}
@media(max-width:1024px){.proj-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.proj-grid{grid-template-columns:1fr}}

.skill-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
  gap:16px;
}

.edu-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:20px;
}

/* MARQUEE */
.marquee-wrap{overflow:hidden;width:100%}
.marquee-inner{display:flex;width:max-content;animation:marquee 18s linear infinite}
.marquee-wrap:hover .marquee-inner{animation-play-state:paused}

/* DIVIDER LINE */
.divider-line{
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(79,70,229,0.2),rgba(14,165,233,0.2),transparent);
}

/* SECTION NUMBER */
.section-num{
  display:inline-flex;align-items:center;justify-content:center;
  width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(79,70,229,0.2);
  font-family:'DM Mono',monospace;font-size:11px;color:#4f46e5;font-weight:500;
  flex-shrink:0;
}

/* CARD BASE */
.card{
  background:rgba(255,255,255,0.8);
  backdrop-filter:blur(20px);
  border:1px solid rgba(255,255,255,0.9);
  border-radius:20px;
  box-shadow:0 2px 20px rgba(26,26,46,0.06),0 0 0 1px rgba(26,26,46,0.04);
  transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
}
.card:hover{
  box-shadow:0 20px 60px rgba(26,26,46,0.12),0 0 0 1px rgba(79,70,229,0.1);
  border-color:rgba(79,70,229,0.15);
}

/* PILL */
.pill{
  display:inline-flex;align-items:center;gap:6px;
  padding:4px 12px;border-radius:20px;
  font-size:11px;font-weight:500;letter-spacing:0.5px;
  font-family:'DM Mono',monospace;
}

/* BADGE */
.badge{
  font-family:'DM Mono',monospace;font-size:9px;letter-spacing:2px;
  padding:3px 10px;border-radius:4px;font-weight:500;text-transform:uppercase;
}
`;

function useInView(ref, threshold=0.12) {
  const [v,setV] = useState(false);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold});
    o.observe(el); return ()=>o.disconnect();
  },[ref,threshold]);
  return v;
}

function useActiveSection() {
  const [active,setActive]=useState("hero");
  useEffect(()=>{
    const o=new IntersectionObserver(
      (entries)=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),
      {threshold:0.3}
    );
    NAV_ITEMS.forEach(n=>{const el=document.getElementById(n.id);if(el)o.observe(el);});
    return ()=>o.disconnect();
  },[]);
  return active;
}

/* BACKGROUND */
function Background() {
  return (
    <>
      <div className="noise"/>
      <div className="grid-bg"/>
      <div className="orb-1"/>
      <div className="orb-2"/>
      {/* corner accents */}
      {[
        {top:0,left:0,bt:true,bl:true},
        {top:0,right:0,bt:true,br:true},
        {bottom:0,left:0,bb:true,bl:true},
        {bottom:0,right:0,bb:true,br:true},
      ].map((c,i)=>(
        <div key={i} style={{
          position:"fixed",width:24,height:24,
          top:c.top!==undefined?14:undefined,
          bottom:c.bottom!==undefined?14:undefined,
          left:c.left!==undefined?14:undefined,
          right:c.right!==undefined?14:undefined,
          borderTop:c.bt?"1px solid rgba(79,70,229,0.15)":undefined,
          borderBottom:c.bb?"1px solid rgba(79,70,229,0.15)":undefined,
          borderLeft:c.bl?"1px solid rgba(79,70,229,0.15)":undefined,
          borderRight:c.br?"1px solid rgba(79,70,229,0.15)":undefined,
          pointerEvents:"none",zIndex:0,
        }}/>
      ))}
    </>
  );
}

/* CURSOR */
function Cursor() {
  const ring=useRef(null);const dot=useRef(null);
  useEffect(()=>{
    let mx=0,my=0,fx=0,fy=0,raf;
    const mv=e=>{mx=e.clientX;my=e.clientY;};
    document.addEventListener("mousemove",mv);
    const loop=()=>{
      fx+=(mx-fx)*0.1;fy+=(my-fy)*0.1;
      if(ring.current){ring.current.style.left=fx+"px";ring.current.style.top=fy+"px";}
      if(dot.current){dot.current.style.left=mx+"px";dot.current.style.top=my+"px";}
      raf=requestAnimationFrame(loop);
    };
    loop();
    return ()=>{document.removeEventListener("mousemove",mv);cancelAnimationFrame(raf);};
  },[]);
  return (
    <>
      <div ref={ring} style={{position:"fixed",width:32,height:32,border:"1.5px solid rgba(79,70,229,0.35)",borderRadius:"50%",pointerEvents:"none",zIndex:99999,transform:"translate(-50%,-50%)",transition:"border-color 0.2s"}}/>
      <div ref={dot} style={{position:"fixed",width:5,height:5,background:"#4f46e5",borderRadius:"50%",pointerEvents:"none",zIndex:99999,transform:"translate(-50%,-50%)"}}/>
    </>
  );
}

/* SCROLL PROGRESS */
function ScrollBar() {
  const [p,setP]=useState(0);
  useEffect(()=>{
    const fn=()=>{const s=document.documentElement.scrollHeight-window.innerHeight;setP(s>0?(window.scrollY/s)*100:0);};
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,height:2,zIndex:9999,background:"rgba(26,26,46,0.06)"}}>
      <div style={{height:"100%",width:p+"%",background:"linear-gradient(90deg,#4f46e5,#0ea5e9)",transition:"width 0.1s"}}/>
    </div>
  );
}

/* FLOATING NAV */
function FloatingNav() {
  const active=useActiveSection();
  const [menuOpen,setMenuOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  const go=useCallback((id)=>{
    document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
    setMenuOpen(false);
  },[]);

  return (
    <>
      <nav className="desktop-nav" style={{
        position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:1000,
        display:"flex",alignItems:"center",gap:2,padding:"6px 6px 6px 20px",
        background:scrolled?"rgba(248,246,242,0.95)":"rgba(248,246,242,0.7)",
        backdropFilter:"blur(24px)",
        border:`1px solid ${scrolled?"rgba(79,70,229,0.15)":"rgba(79,70,229,0.08)"}`,
        borderRadius:60,
        boxShadow:scrolled?"0 4px 32px rgba(26,26,46,0.08),0 0 0 1px rgba(79,70,229,0.04)":"none",
        transition:"all 0.4s ease",whiteSpace:"nowrap",
      }}>
        <span className="mono" style={{fontSize:10,letterSpacing:4,color:"#4f46e5",paddingRight:16,borderRight:"1px solid rgba(79,70,229,0.12)",marginRight:4,fontWeight:500}}>LWP</span>
        {NAV_ITEMS.map(n=>(
          <button key={n.id} onClick={()=>go(n.id)} style={{
            padding:"8px 16px",borderRadius:50,border:"none",cursor:"pointer",
            fontSize:12,fontWeight:500,fontFamily:"'DM Sans',sans-serif",
            transition:"all 0.25s",
            background:active===n.id?"rgba(79,70,229,0.1)":"transparent",
            color:active===n.id?"#4f46e5":"rgba(26,26,46,0.45)",
            boxShadow:active===n.id?"inset 0 0 0 1px rgba(79,70,229,0.2)":"none",
          }}
            onMouseEnter={e=>{if(active!==n.id)e.currentTarget.style.color="rgba(26,26,46,0.8)";}}
            onMouseLeave={e=>{if(active!==n.id)e.currentTarget.style.color="rgba(26,26,46,0.45)";}}
          >{n.label}</button>
        ))}
      </nav>

      <button className="ham-btn" onClick={()=>setMenuOpen(o=>!o)} style={{
        position:"fixed",top:16,right:16,zIndex:1002,width:44,height:44,borderRadius:12,
        background:"rgba(248,246,242,0.95)",backdropFilter:"blur(20px)",
        border:`1px solid ${menuOpen?"rgba(79,70,229,0.3)":"rgba(79,70,229,0.12)"}`,
        flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,
        cursor:"pointer",transition:"all 0.3s",
      }}>
        {[0,1,2].map(i=>(
          <span key={i} style={{width:16,height:1.5,background:"#4f46e5",borderRadius:2,display:"block",transition:"all 0.3s",
            transform:menuOpen&&i===0?"rotate(45deg) translate(4px,4px)":menuOpen&&i===2?"rotate(-45deg) translate(4px,-4px)":"none",
            opacity:menuOpen&&i===1?0:1}}/>
        ))}
      </button>

      <div className="mob-menu-wrap" style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1001,pointerEvents:menuOpen?"auto":"none"}}>
        <div onClick={()=>setMenuOpen(false)} style={{position:"absolute",inset:0,background:"rgba(248,246,242,0.5)",backdropFilter:"blur(8px)",opacity:menuOpen?1:0,transition:"opacity 0.3s"}}/>
        <div style={{
          position:"absolute",top:70,right:12,width:220,
          background:"rgba(255,255,255,0.97)",backdropFilter:"blur(20px)",
          border:"1px solid rgba(79,70,229,0.12)",borderRadius:18,overflow:"hidden",
          transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",
          opacity:menuOpen?1:0,transform:menuOpen?"translateY(0) scale(1)":"translateY(-10px) scale(0.97)",
          boxShadow:"0 20px 60px rgba(26,26,46,0.12)",
        }}>
          {NAV_ITEMS.map((n,i)=>(
            <button key={n.id} onClick={()=>go(n.id)} style={{
              display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"13px 18px",
              background:active===n.id?"rgba(79,70,229,0.06)":"transparent",
              border:"none",borderBottom:i<NAV_ITEMS.length-1?"1px solid rgba(26,26,46,0.05)":"none",
              color:active===n.id?"#4f46e5":"rgba(26,26,46,0.6)",
              fontSize:13,fontWeight:500,fontFamily:"'DM Sans',sans-serif",
              cursor:"pointer",transition:"all 0.2s",textAlign:"left",
            }}>
              {n.label}
              {active===n.id&&<span style={{width:6,height:6,borderRadius:"50%",background:"#4f46e5",flexShrink:0}}/>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* REVEAL */
function Reveal({children,delay=0,direction="up"}) {
  const ref=useRef(null);
  const inView=useInView(ref);
  const dirs={up:"translateY(28px)",down:"translateY(-28px)",left:"translateX(-28px)",right:"translateX(28px)"};
  return (
    <div ref={ref} style={{
      opacity:inView?1:0,
      transform:inView?"none":dirs[direction]||dirs.up,
      transition:`opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* SECTION LABEL */
function SectionLabel({num,children}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:48}}>
      <span className="section-num">{num}</span>
      <h2 className="serif" style={{fontSize:"clamp(28px,4vw,48px)",fontWeight:600,color:"#1a1a2e",letterSpacing:-1,lineHeight:1}}>{children}</h2>
      <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(79,70,229,0.2),transparent)",minWidth:20}}/>
    </div>
  );
}

/* HERO */
function Hero() {
  const [imgError,setImgError]=useState(false);
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{setTimeout(()=>setLoaded(true),100);},[]);

  const animate=(delay)=>({
    opacity:loaded?1:0,
    transform:loaded?"none":"translateY(30px)",
    transition:`opacity 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  return (
    <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 0 80px",position:"relative"}}>

      {/* Marquee strip */}
      <div style={{...animate(0),marginBottom:48}}>
        <div className="marquee-wrap" style={{padding:"12px 0",borderTop:"1px solid rgba(79,70,229,0.08)",borderBottom:"1px solid rgba(79,70,229,0.08)"}}>
          <div className="marquee-inner">
            {[...Array(3)].map((_,k)=>(
              <div key={k} style={{display:"flex",alignItems:"center",gap:24,paddingRight:24}}>
                {["Full Stack Developer","Web GIS Specialist","Laravel Expert","REST API","PostgreSQL","Docker","Linux Server"].map((t,i)=>(
                  <span key={i} style={{display:"flex",alignItems:"center",gap:16,fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(26,26,46,0.35)",letterSpacing:2,whiteSpace:"nowrap"}}>
                    <span style={{width:4,height:4,borderRadius:"50%",background:"rgba(79,70,229,0.3)",display:"inline-block",flexShrink:0}}/>
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-inner">
        {/* Text */}
        <div className="hero-text">
          <div style={{...animate(150),display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"#10b981",display:"inline-block",animation:"dotBlink 2s infinite"}}/>
            <span className="mono" style={{fontSize:10,letterSpacing:4,color:"#10b981",fontWeight:500}}>AVAILABLE FOR WORK</span>
          </div>

          <div style={animate(250)}>
            <h1 className="serif" style={{fontSize:"clamp(52px,9vw,110px)",fontWeight:700,lineHeight:0.88,letterSpacing:-3,color:"#1a1a2e",marginBottom:4}}>Lintang</h1>
            <h1 className="serif" style={{fontSize:"clamp(52px,9vw,110px)",fontWeight:700,lineHeight:0.88,letterSpacing:-3,
              background:"linear-gradient(135deg,#4f46e5 0%,#0ea5e9 50%,#10b981 100%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
              marginBottom:4}}>Windy</h1>
            <h1 className="serif" style={{fontSize:"clamp(52px,9vw,110px)",fontWeight:700,lineHeight:0.88,letterSpacing:-3,color:"rgba(26,26,46,0.12)",marginBottom:32}}>Pratama</h1>
          </div>

          <div style={{...animate(350),display:"flex",alignItems:"center",gap:12,marginBottom:24,flexWrap:"wrap"}}>
            <div style={{width:32,height:1,background:"rgba(79,70,229,0.4)"}}/>
            <span style={{fontSize:14,color:"rgba(26,26,46,0.5)",fontWeight:400}}>Full Stack Web Developer</span>
            <span className="badge" style={{background:"rgba(79,70,229,0.08)",color:"#4f46e5",border:"1px solid rgba(79,70,229,0.15)"}}>Laravel · GIS · API</span>
          </div>

          {/* Stats */}
          <div className="stat-row" style={{...animate(420),display:"flex",gap:32,marginBottom:36,flexWrap:"wrap"}}>
            {[{val:"2+",lab:"Years Exp"},{val:"5",lab:"Daerah"},{val:"7",lab:"Systems"},{val:"3.92",lab:"GPA"}].map((s,i)=>(
              <div key={i}>
                <div className="serif" style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,color:"#1a1a2e",lineHeight:1}}>{s.val}</div>
                <div className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.35)",letterSpacing:3,marginTop:4,textTransform:"uppercase"}}>{s.lab}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="cta-row" style={{...animate(500),display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {label:"WhatsApp",href:"https://wa.me/6285158311928",primary:true},
              {label:"Email",href:"mailto:lintangpratama526@gmail.com"},
              {label:"LinkedIn",href:"https://www.linkedin.com/in/lintangpratamaa"},
              {label:"Download CV",href:CV,download:true},
            ].map((c,i)=>(
              <a key={i} href={c.href}
                {...(c.download?{download:"CV-Lintang-Windy-Pratama.pdf"}:{target:"_blank",rel:"noreferrer"})}
                style={{
                  display:"flex",alignItems:"center",gap:7,
                  padding:c.primary?"10px 22px":"10px 18px",
                  borderRadius:10,textDecoration:"none",fontSize:13,fontWeight:500,
                  transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  background:c.primary?"#1a1a2e":"rgba(255,255,255,0.7)",
                  border:c.primary?"1px solid #1a1a2e":"1px solid rgba(26,26,46,0.12)",
                  color:c.primary?"#f8f6f2":"rgba(26,26,46,0.65)",
                  boxShadow:c.primary?"0 4px 16px rgba(26,26,46,0.15)":"0 2px 8px rgba(26,26,46,0.04)",
                }}
                onMouseEnter={e=>{
                  if(c.primary)Object.assign(e.currentTarget.style,{background:"#4f46e5",borderColor:"#4f46e5",boxShadow:"0 8px 24px rgba(79,70,229,0.3)",transform:"translateY(-2px)"});
                  else Object.assign(e.currentTarget.style,{background:"rgba(255,255,255,0.95)",borderColor:"rgba(79,70,229,0.2)",color:"#4f46e5",transform:"translateY(-2px)",boxShadow:"0 8px 24px rgba(26,26,46,0.08)"});
                }}
                onMouseLeave={e=>{
                  Object.assign(e.currentTarget.style,{
                    background:c.primary?"#1a1a2e":"rgba(255,255,255,0.7)",
                    borderColor:c.primary?"#1a1a2e":"rgba(26,26,46,0.12)",
                    color:c.primary?"#f8f6f2":"rgba(26,26,46,0.65)",
                    transform:"translateY(0)",
                    boxShadow:c.primary?"0 4px 16px rgba(26,26,46,0.15)":"0 2px 8px rgba(26,26,46,0.04)",
                  });
                }}
              >{c.label}</a>
            ))}
          </div>

          <p style={{...animate(580),maxWidth:480,marginTop:32,fontSize:13,lineHeight:1.9,color:"rgba(26,26,46,0.4)",borderLeft:"2px solid rgba(79,70,229,0.15)",paddingLeft:16}}>
            Lulusan D3 Manajemen Informatika, berpengalaman membangun ekosistem sistem pajak daerah — pelayanan, pemetaan GIS, pembayaran, penagihan, survey, hingga dashboard analitik — untuk 5 daerah.
          </p>
        </div>

        {/* Photo */}
        <div className="hero-photo-wrap" style={{...animate(300),position:"relative",flexShrink:0}}>
          <div style={{width:"clamp(200px,24vw,280px)",height:"clamp(200px,24vw,280px)",position:"relative"}}>
            {/* Spinning dashed ring */}
            <div style={{
              position:"absolute",inset:-16,borderRadius:"50%",
              border:"1.5px dashed rgba(79,70,229,0.2)",
              animation:"rotateSlow 20s linear infinite",
            }}/>
            {/* Dots on ring */}
            {[0,90,180,270].map((deg,i)=>(
              <div key={i} style={{
                position:"absolute",inset:-16,borderRadius:"50%",
                transform:`rotate(${deg}deg)`,
                display:"flex",alignItems:"flex-start",justifyContent:"center",
              }}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#4f46e5",marginTop:-3,opacity:0.5}}/>
              </div>
            ))}
            {/* Color accent ring */}
            <div style={{
              position:"absolute",inset:-6,borderRadius:"50%",
              background:"conic-gradient(from 0deg,#4f46e5,#0ea5e9,#10b981,#4f46e5)",
              animation:"rotateSlow 8s linear infinite",
              opacity:0.6,
            }}/>
            <div style={{position:"absolute",inset:-3,borderRadius:"50%",background:"#f8f6f2"}}/>
            {/* Photo */}
            <div style={{position:"absolute",inset:0,borderRadius:"50%",overflow:"hidden",background:"#e8e4de"}}>
              {imgError?(
                <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,rgba(79,70,229,0.08),rgba(14,165,233,0.04))"}}>
                  <span style={{fontSize:56,marginBottom:8}}>👨‍💻</span>
                  <span className="mono" style={{fontSize:9,color:"rgba(79,70,229,0.5)",letterSpacing:3}}>LWP</span>
                </div>
              ):(
                <img src={PHOTO} alt="Lintang Windy Pratama" onError={()=>setImgError(true)}
                  style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
              )}
            </div>
            {/* Glow beneath */}
            <div style={{position:"absolute",bottom:-24,left:"50%",transform:"translateX(-50%)",width:"80%",height:40,background:"radial-gradient(ellipse,rgba(79,70,229,0.2),transparent)",filter:"blur(12px)"}}/>
          </div>

          {/* Floating badge */}
          <div style={{
            position:"absolute",top:-8,right:-8,
            background:"rgba(255,255,255,0.9)",backdropFilter:"blur(12px)",
            border:"1px solid rgba(79,70,229,0.12)",
            borderRadius:12,padding:"8px 14px",
            boxShadow:"0 4px 16px rgba(26,26,46,0.08)",
            animation:"floatY 4s ease-in-out infinite",
          }}>
            <div className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.35)",letterSpacing:2,marginBottom:2}}>GPA</div>
            <div className="serif" style={{fontSize:20,fontWeight:700,color:"#4f46e5",lineHeight:1}}>3.92</div>
          </div>

          {/* Second floating badge */}
          <div style={{
            position:"absolute",bottom:8,left:-12,
            background:"rgba(255,255,255,0.9)",backdropFilter:"blur(12px)",
            border:"1px solid rgba(16,185,129,0.15)",
            borderRadius:12,padding:"8px 14px",
            boxShadow:"0 4px 16px rgba(26,26,46,0.06)",
            animation:"floatY 5s ease-in-out infinite 1s",
          }}>
            <div className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.35)",letterSpacing:2,marginBottom:2}}>SYSTEMS</div>
            <div className="serif" style={{fontSize:20,fontWeight:700,color:"#10b981",lineHeight:1}}>7 Built</div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{position:"absolute",bottom:32,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span className="mono" style={{fontSize:8,letterSpacing:5,color:"rgba(26,26,46,0.2)",writingMode:"vertical-rl"}}>SCROLL</span>
        <div style={{width:1,height:40,background:"linear-gradient(180deg,rgba(79,70,229,0.3),transparent)"}}/>
      </div>
    </section>
  );
}

/* EXPERIENCE CARD */
function ExpCard({item}) {
  const ref=useRef(null);const inView=useInView(ref);
  return (
    <div ref={ref} style={{
      opacity:inView?1:0,transform:inView?"none":"translateX(-24px)",
      transition:"opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <div className="card" style={{padding:"clamp(20px,3vw,32px)",position:"relative",overflow:"hidden"}}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";}}
        onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
      >
        {/* Top accent line */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${item.color},transparent)`}}/>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:12}}>
          <div>
            <h3 style={{fontSize:"clamp(16px,2vw,20px)",fontWeight:600,color:"#1a1a2e",marginBottom:4}}>{item.title}</h3>
            <div style={{fontSize:13,color:item.color,fontWeight:500}}>{item.company}</div>
            <div className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.3)",letterSpacing:2,marginTop:4}}>{item.date} · {item.location}</div>
          </div>
          <span className="badge" style={{background:`${item.color}12`,color:item.color,border:`1px solid ${item.color}22`,flexShrink:0}}>{item.status}</span>
        </div>

        <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
          {item.bullets.map((b,i)=>(
            <li key={i} style={{display:"flex",gap:10,fontSize:13,color:"rgba(26,26,46,0.55)",lineHeight:1.7}}>
              <span style={{width:4,height:4,borderRadius:"50%",background:item.color,flexShrink:0,marginTop:8}}/>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* SKILL CARD */
function SkillCard({skill,idx}) {
  const ref=useRef(null);const inView=useInView(ref);
  return (
    <div ref={ref} style={{
      opacity:inView?1:0,transform:inView?"none":"translateY(20px) scale(0.97)",
      transition:`opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${idx*50}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${idx*50}ms`,
    }}>
      <div className="card" style={{padding:"20px",cursor:"default"}}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.borderColor=`${skill.accent}30`;}}
        onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="rgba(255,255,255,0.9)";}}
      >
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:32,height:32,borderRadius:8,background:`${skill.accent}10`,border:`1px solid ${skill.accent}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,fontFamily:"'DM Mono',monospace",color:skill.accent}}>{skill.icon}</div>
          <span className="mono" style={{fontSize:9,color:skill.accent,letterSpacing:3,textTransform:"uppercase",fontWeight:500}}>{skill.category}</span>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {skill.items.map((tag,j)=>(
            <span key={j} style={{
              padding:"4px 10px",borderRadius:6,fontSize:11,
              background:`${skill.accent}08`,color:"rgba(26,26,46,0.6)",
              border:`1px solid ${skill.accent}14`,
              transition:"all 0.18s",cursor:"default",fontWeight:500,
            }}
              onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:skill.accent,color:"white",borderColor:skill.accent})}
              onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:`${skill.accent}08`,color:"rgba(26,26,46,0.6)",borderColor:`${skill.accent}14`})}
            >{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* PROJECT CARD */
function ProjectCard({project,idx}) {
  const [flipped,setFlipped]=useState(false);
  const ref=useRef(null);const inView=useInView(ref);
  return (
    <div ref={ref} style={{
      opacity:inView?1:0,transform:inView?"none":"translateY(32px)",
      transition:`opacity 0.75s cubic-bezier(0.4,0,0.2,1) ${idx*60}ms, transform 0.75s cubic-bezier(0.4,0,0.2,1) ${idx*60}ms`,
    }}>
      <div style={{height:300,perspective:1400}}>
        <div style={{
          width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",
          transition:"transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          transform:flipped?"rotateY(180deg)":"rotateY(0)",
        }}>
          {/* FRONT */}
          <div style={{
            position:"absolute",inset:0,backfaceVisibility:"hidden",borderRadius:20,
            background:"rgba(255,255,255,0.85)",backdropFilter:"blur(20px)",
            border:"1px solid rgba(255,255,255,0.9)",
            boxShadow:"0 2px 20px rgba(26,26,46,0.06)",
            padding:"22px 22px 18px",
            display:"flex",flexDirection:"column",
            transition:"box-shadow 0.3s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 40px rgba(26,26,46,0.1),0 0 0 1px ${project.color}20`;}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 20px rgba(26,26,46,0.06)";}}
          >
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <span className="badge" style={{background:`${project.color}10`,color:project.color,border:`1px solid ${project.color}20`}}>{project.tag}</span>
                <div style={{width:28,height:2,background:`linear-gradient(90deg,${project.color},transparent)`,marginTop:8,borderRadius:2}}/>
              </div>
              <span style={{fontSize:32,animation:"floatY 4s ease-in-out infinite",flexShrink:0}}>{project.emoji}</span>
            </div>
            <h3 style={{fontSize:14,fontWeight:600,color:"#1a1a2e",lineHeight:1.45,marginBottom:8}}>{project.title}</h3>
            <p style={{fontSize:11,color:"rgba(26,26,46,0.42)",lineHeight:1.7,flex:1,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{project.short}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,margin:"10px 0 12px"}}>
              {project.tech.map((t,i)=>(
                <span key={i} className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.3)",background:"rgba(26,26,46,0.04)",padding:"2px 7px",borderRadius:4,fontWeight:500}}>{t}</span>
              ))}
            </div>
            <button onClick={()=>setFlipped(true)} style={{
              alignSelf:"flex-end",padding:"7px 16px",borderRadius:8,
              background:`${project.color}10`,border:`1px solid ${project.color}25`,
              color:project.color,fontSize:10,fontWeight:600,cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",transition:"all 0.22s",letterSpacing:0.5,
            }}
              onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:project.color,color:"white",boxShadow:`0 6px 18px ${project.color}35`})}
              onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:`${project.color}10`,color:project.color,boxShadow:"none"})}
            >Detail →</button>
          </div>

          {/* BACK */}
          <div style={{
            position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",
            borderRadius:20,background:"rgba(255,255,255,0.97)",
            border:"1px solid rgba(255,255,255,0.9)",
            boxShadow:"0 2px 20px rgba(26,26,46,0.06)",
            padding:"22px 22px 18px",display:"flex",flexDirection:"column",justifyContent:"space-between",
          }}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:34,height:34,borderRadius:10,background:`${project.color}10`,border:`1px solid ${project.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{project.emoji}</div>
                <div>
                  <div className="badge" style={{background:`${project.color}10`,color:project.color,border:`1px solid ${project.color}15`,display:"inline-block",marginBottom:4}}>{project.tag}</div>
                  <div style={{fontSize:12,fontWeight:600,color:"#1a1a2e",lineHeight:1.3}}>{project.title}</div>
                </div>
              </div>
              <div style={{height:1,background:`linear-gradient(90deg,${project.color}25,transparent)`,marginBottom:12}}/>
              <p style={{fontSize:11,color:"rgba(26,26,46,0.5)",lineHeight:1.8}}>{project.desc}</p>
            </div>
            <div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {project.tech.map((t,i)=>(
                  <span key={i} style={{fontSize:10,padding:"4px 10px",borderRadius:6,background:`${project.color}10`,color:project.color,border:`1px solid ${project.color}22`,fontWeight:600}}>{t}</span>
                ))}
              </div>
              <button onClick={()=>setFlipped(false)} style={{
                padding:"6px 14px",borderRadius:8,
                background:"transparent",border:"1px solid rgba(26,26,46,0.1)",
                color:"rgba(26,26,46,0.4)",fontSize:10,fontWeight:600,cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
              }}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(26,26,46,0.2)",color:"#1a1a2e"})}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(26,26,46,0.1)",color:"rgba(26,26,46,0.4)"})}
              >← Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* EDU CARD */
function EduCard({edu,idx}) {
  const ref=useRef(null);const inView=useInView(ref);
  return (
    <div ref={ref} style={{
      opacity:inView?1:0,transform:inView?"none":"translateY(24px)",
      transition:`opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${idx*120}ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${idx*120}ms`,
    }}>
      <div className="card" style={{padding:"clamp(22px,3vw,32px)",position:"relative",overflow:"hidden"}}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";}}
        onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
      >
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${edu.color},transparent)`}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16,marginBottom:6}}>
          <div>
            <h3 style={{fontSize:"clamp(15px,2vw,18px)",fontWeight:600,color:"#1a1a2e",marginBottom:4}}>{edu.degree}</h3>
            <div style={{fontSize:13,color:edu.color,fontWeight:500}}>{edu.school}</div>
          </div>
          {edu.gpa&&(
            <div style={{padding:"10px 16px",background:`${edu.color}08`,border:`1px solid ${edu.color}18`,borderRadius:12,textAlign:"center",flexShrink:0}}>
              <div className="serif" style={{fontSize:22,fontWeight:700,color:edu.color,lineHeight:1}}>{edu.gpa}</div>
              <div className="mono" style={{fontSize:8,color:"rgba(26,26,46,0.3)",letterSpacing:3,marginTop:3}}>GPA</div>
            </div>
          )}
        </div>
        <div className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.25)",letterSpacing:3,marginBottom:16}}>{edu.period}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {edu.achievements.map((a,i)=>(
            <span key={i} style={{fontSize:12,color:"rgba(26,26,46,0.5)",padding:"5px 12px",background:"rgba(26,26,46,0.03)",border:"1px solid rgba(26,26,46,0.07)",borderRadius:8}}>{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* APP */
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <Background/>
      <Cursor/>
      <ScrollBar/>
      <FloatingNav/>

      <main style={{maxWidth:1080,margin:"0 auto",padding:"0 clamp(20px,5vw,56px)",position:"relative",zIndex:1}}>
        <Hero/>

        {/* Divider */}
        <div className="divider-line" style={{marginBottom:0}}/>

        {/* Experience */}
        <section id="experience" style={{paddingTop:80,paddingBottom:80}}>
          <Reveal><SectionLabel num="01">Experience</SectionLabel></Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {EXPERIENCES.map((item,i)=><ExpCard key={i} item={item}/>)}
          </div>
        </section>

        <div className="divider-line"/>

        {/* Skills */}
        <section id="skills" style={{paddingTop:80,paddingBottom:80}}>
          <Reveal><SectionLabel num="02">Skills & Expertise</SectionLabel></Reveal>
          <div className="skill-grid">
            {SKILLS.map((s,i)=><SkillCard key={i} skill={s} idx={i}/>)}
          </div>
        </section>

        <div className="divider-line"/>

        {/* Projects */}
        <section id="projects" style={{paddingTop:80,paddingBottom:80}}>
          <Reveal><SectionLabel num="03">Projects</SectionLabel></Reveal>

          <Reveal delay={80}>
            <div className="card" style={{display:"flex",alignItems:"center",gap:20,marginBottom:32,padding:"16px 22px",flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                <div style={{width:36,height:36,borderRadius:10,background:"rgba(79,70,229,0.08)",border:"1px solid rgba(79,70,229,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏢</div>
                <div>
                  <div className="mono" style={{fontSize:9,color:"#4f46e5",letterSpacing:3,marginBottom:2}}>SCOPE</div>
                  <div style={{fontSize:15,fontWeight:600,color:"#1a1a2e",lineHeight:1}}>7 Sistem · 5 Daerah</div>
                </div>
              </div>
              <div style={{width:1,height:36,background:"rgba(79,70,229,0.1)",flexShrink:0}}/>
              <p style={{fontSize:13,color:"rgba(26,26,46,0.45)",lineHeight:1.75,flex:1,minWidth:200}}>
                Ketujuh sistem dikembangkan dan di-deploy untuk <span style={{color:"#4f46e5",fontWeight:600}}>5 daerah (kota/kabupaten)</span> — dari pelayanan, pemetaan GIS, pembayaran, penagihan, survey lapangan, hingga dashboard analitik.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
              <span className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.25)",letterSpacing:3}}>↺ KLIK "DETAIL" UNTUK FLIP CARD</span>
            </div>
          </Reveal>

          <div className="proj-grid">
            {PROJECTS.map((p,i)=><ProjectCard key={p.id} project={p} idx={i}/>)}
          </div>
        </section>

        <div className="divider-line"/>

        {/* Education */}
        <section id="education" style={{paddingTop:80,paddingBottom:80}}>
          <Reveal><SectionLabel num="04">Education</SectionLabel></Reveal>
          <div className="edu-grid">
            {EDUCATION.map((edu,i)=><EduCard key={i} edu={edu} idx={i}/>)}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{borderTop:"1px solid rgba(26,26,46,0.06)",padding:"40px clamp(20px,5vw,56px)",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1080,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
          <div>
            <div className="serif" style={{fontSize:22,fontWeight:700,color:"#1a1a2e",marginBottom:4,letterSpacing:-0.5}}>Lintang Windy Pratama</div>
            <div className="mono" style={{fontSize:10,color:"rgba(26,26,46,0.28)",letterSpacing:2}}>Full Stack Developer · 2024</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            {[{l:"in",h:"https://www.linkedin.com/in/lintangpratamaa"},{l:"✉",h:"mailto:lintangpratama526@gmail.com"},{l:"📱",h:"https://wa.me/6285158311928"}].map((s,i)=>(
              <a key={i} href={s.h} target="_blank" rel="noreferrer" style={{
                width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",
                border:"1px solid rgba(26,26,46,0.08)",color:"rgba(26,26,46,0.4)",
                textDecoration:"none",fontSize:14,transition:"all 0.3s",
                background:"rgba(255,255,255,0.7)",
              }}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(79,70,229,0.25)",color:"#4f46e5",background:"rgba(79,70,229,0.06)",transform:"translateY(-3px)"})}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(26,26,46,0.08)",color:"rgba(26,26,46,0.4)",background:"rgba(255,255,255,0.7)",transform:"translateY(0)"})}
              >{s.l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}