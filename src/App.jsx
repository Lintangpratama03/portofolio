import { useState, useEffect, useRef, useCallback } from "react";

/* ─── GANTI INI ────────────────────────────────────────────────────
   Taruh file di folder  public/
   - foto  →  public/lintang.jpeg
   - cv    →  public/cv-lintang.pdf
──────────────────────────────────────────────────────────────────── */
const PHOTO = "/lintang.jpeg";
const CV    = "/cv-lintang.pdf";

/* ─── DATA ─────────────────────────────────────────────────────── */
const SKILLS = [
  { category: "Backend",     icon: "⚙️", color: "#00ffb3", items: ["Laravel","CodeIgniter","REST API","Livewire"] },
  { category: "Frontend",    icon: "🎨", color: "#00d4ff", items: ["HTML","CSS","JavaScript"] },
  { category: "Database",    icon: "🗄️", color: "#ff6b6b", items: ["PostgreSQL","MySQL","Oracle"] },
  { category: "Web GIS",     icon: "🗺️", color: "#ffd93d", items: ["Google Maps API","Leaflet","Spatial Data","Spatial Query"] },
  { category: "DevOps",      icon: "🛠️", color: "#c77dff", items: ["Git","GitHub","Linux","Docker","SSH","CloudFlare"] },
  { category: "Networking",  icon: "🌐", color: "#4cc9f0", items: ["TCP/IP","LAN/WAN","VPN Config","Firewall"] },
  { category: "Integration", icon: "🔗", color: "#f72585", items: ["WhatsApp API","Payment Gateway"] },
];

const PROJECTS = [
  { id:1, tag:"GOV-SYS",  emoji:"🏛️", color:"#00ffb3",
    title:"Sistem Pelayanan Pajak Daerah",
    short:"Platform terpadu pendaftaran, verifikasi & administrasi wajib pajak secara digital.",
    desc:"Platform pelayanan komprehensif untuk pengelolaan data wajib pajak dan objek pajak. Mencakup alur pendaftaran, verifikasi dokumen, validasi data, dan seluruh layanan administrasi pajak daerah secara digital dan terintegrasi.",
    tech:["Laravel","PostgreSQL","REST API","Livewire"] },
  { id:2, tag:"WEB-GIS",  emoji:"🗺️", color:"#00d4ff",
    title:"Sistem Peta Pajak Daerah",
    short:"Visualisasi geospasial objek & zona pajak berbasis Google Maps secara real-time.",
    desc:"Aplikasi Web GIS interaktif untuk visualisasi dan pemetaan seluruh objek pajak. Menampilkan data spasial properti, batas wilayah administratif, zona nilai tanah, dan informasi geografis perpajakan secara real-time.",
    tech:["Laravel","Google Maps API","PostgreSQL","Spatial Data"] },
  { id:3, tag:"FINTECH",  emoji:"💳", color:"#ffd93d",
    title:"Sistem Pembayaran Pajak Daerah",
    short:"Pembayaran online real-time dengan integrasi payment gateway multi-channel.",
    desc:"Platform pembayaran pajak online yang aman dan efisien. Dilengkapi monitoring status pembayaran real-time, laporan transaksi otomatis, rekonsiliasi data, dan integrasi payment gateway untuk berbagai metode pembayaran.",
    tech:["Laravel","REST API","MySQL","Payment Gateway"] },
  { id:4, tag:"ANALYTICS",emoji:"📊", color:"#f72585",
    title:"Dashboard Analitik Pajak Daerah",
    short:"Monitoring tagihan, analisis & statistik pajak dengan grafik interaktif real-time.",
    desc:"Dashboard monitoring komprehensif untuk tracking status tagihan, analisis data pembayaran, dan visualisasi statistik pajak. Dilengkapi grafik interaktif, real-time analytics, dan laporan eksekutif untuk mendukung pengambilan keputusan strategis.",
    tech:["Livewire","Chart.js","Oracle","Data Analytics"] },
  { id:5, tag:"OPS-SYS",  emoji:"📋", color:"#c77dff",
    title:"Aplikasi Penagihan Pajak Daerah",
    short:"Tracking tunggakan, notifikasi otomatis WhatsApp & laporan realisasi penagihan.",
    desc:"Sistem penagihan pajak terintegrasi dengan fitur tracking tunggakan, notifikasi otomatis via WhatsApp, penjadwalan penagihan, dan laporan realisasi. Meningkatkan efektivitas pengumpulan pajak secara signifikan.",
    tech:["Laravel","PostgreSQL","Livewire","WhatsApp API"] },
  { id:6, tag:"SURVEY",   emoji:"📡", color:"#4cc9f0",
    title:"Aplikasi Survey Data Pajak",
    short:"Pengumpulan & sinkronisasi data lapangan objek pajak secara digital offline-online.",
    desc:"Aplikasi mobile-friendly untuk petugas lapangan dalam melakukan survey dan pendataan objek pajak. Mendukung pengambilan foto, input data spasial, sinkronisasi offline-online, dan validasi otomatis data hasil survei ke database pusat.",
    tech:["Laravel","REST API","PostgreSQL","Leaflet"] },
  { id:7, tag:"GIS-MAP",  emoji:"🌾", color:"#ff6b6b",
    title:"Peta Komoditas Pangan Daerah",
    short:"GIS pemetaan komoditas pertanian, potensi & distribusi wilayah secara interaktif.",
    desc:"Aplikasi Web GIS untuk pemetaan dan monitoring komoditas pangan daerah. Menampilkan distribusi geografis komoditas pertanian, potensi wilayah, data produksi, dan visualisasi data spasial untuk mendukung perencanaan pembangunan daerah.",
    tech:["Laravel","Google Maps API","MySQL","GIS Mapping"] },
];

const EXPERIENCES = [
  { date:"Jan 2024 — Present", title:"Full Stack Developer", company:"CV Agsatu", location:"Kediri, Jawa Timur", color:"#00ffb3", status:"ACTIVE",
    bullets:["Mengembangkan & memelihara ekosistem aplikasi Pajak Daerah untuk 5 daerah","Membangun 7 sistem: pelayanan, peta GIS, pembayaran, dashboard, penagihan, survey & komoditas","Implementasi Web GIS & Google Maps API untuk visualisasi data spasial","Backend Laravel + RESTful API + manage PostgreSQL, MySQL, dan Oracle","Deploy & maintenance sistem di Linux server dengan Docker & CloudFlare"] },
  { date:"Aug 2023 — Oct 2023", title:"Full Stack Developer", company:"Viscode.id", location:"Kediri, Jawa Timur", color:"#00d4ff", status:"CONTRACT",
    bullets:["Pengembangan aplikasi web menggunakan framework CodeIgniter","Backend & frontend fitur berdasarkan kebutuhan klien enterprise","Desain & manage database MySQL: relasi tabel & query optimasi","Bug fixing, refactoring kode & kolaborasi tim via Git workflow"] },
];

const EDUCATION = [
  { degree:"D3 Manajemen Informatika", school:"Politeknik Negeri Malang", period:"Aug 2021 — Aug 2024", gpa:"3.92", color:"#00ffb3",
    achievements:["🏆 Lulusan Terbaik Peringkat 3 Jurusan","👥 Kepala Divisi PSDM — BEM","📚 Aktif penelitian dosen","🎯 Koordinator PKM Center"] },
  { degree:"SMK Teknik Komputer & Jaringan", school:"SMKN 1 Nganjuk", period:"Jul 2016 — Jul 2019", gpa:null, color:"#00d4ff",
    achievements:["💻 Dasar-dasar jaringan komputer","⚡ Fondasi programming & software development"] },
];

const NAV_ITEMS = [
  { id:"hero",       label:"Home",       icon:"⌂" },
  { id:"experience", label:"Experience", icon:"◈" },
  { id:"skills",     label:"Skills",     icon:"◉" },
  { id:"projects",   label:"Projects",   icon:"◫" },
  { id:"education",  label:"Education",  icon:"◎" },
];

/* ─── GLOBAL CSS ────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#020409;color:#e2e8f0;font-family:'Syne',sans-serif;cursor:none;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#020409}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#00ffb3,#00d4ff);border-radius:2px}
::selection{background:rgba(0,255,179,0.2);color:#00ffb3}
.mono{font-family:'Space Mono',monospace}

@keyframes blink{0%,100%{opacity:1}50%{opacity:0.15}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
@keyframes gridPulse{0%,100%{opacity:0.03}50%{opacity:0.065}}
@keyframes scanline{0%{top:-4px}100%{top:100vh}}
@keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(55px,-75px) scale(1.08)}70%{transform:translate(-28px,38px) scale(0.93)}}
@keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-70px,55px) scale(1.12)}70%{transform:translate(45px,-28px) scale(0.9)}}
@keyframes orb3{0%,100%{transform:translate(0,0)}50%{transform:translate(32px,50px)}}
@keyframes floatY{0%,100%{transform:translateY(0px)}50%{transform:translateY(-8px)}}
@keyframes pulseDot{0%,100%{box-shadow:0 0 6px #00ffb3}50%{box-shadow:0 0 18px #00ffb3,0 0 36px rgba(0,255,179,0.35)}}
@keyframes photoRing{to{transform:rotate(360deg)}}
@keyframes fadeSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* ── PHOTO FRAME ── */
.photo-ring{
  position:absolute;inset:-6px;border-radius:50%;
  background:conic-gradient(#00ffb3,#00d4ff,#f72585,#00ffb3);
  animation:photoRing 6s linear infinite;
}
.photo-ring-inner{
  position:absolute;inset:3px;border-radius:50%;background:#020409;
}

/* ── NAV ── */
.ham-btn{display:none!important}
.mob-menu-wrap{display:none!important}
@media(max-width:700px){
  .desktop-nav{display:none!important}
  .ham-btn{display:flex!important}
  .mob-menu-wrap{display:block!important}
}

/* ── PROJECT GRID ── */
.proj-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}
@media(max-width:1024px){
  .proj-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:600px){
  .proj-grid{grid-template-columns:1fr;}
}

/* ── SKILL GRID ── */
.skill-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
  gap:14px;
}

/* ── HERO LAYOUT ── */
.hero-inner{
  display:flex;
  align-items:center;
  gap:clamp(32px,5vw,80px);
  flex-wrap:wrap;
}
.hero-text{flex:1;min-width:280px}
.hero-photo-wrap{flex-shrink:0}
@media(max-width:700px){
  .hero-inner{flex-direction:column-reverse;text-align:center}
  .hero-photo-wrap{margin-bottom:8px}
}

/* ── EXPERIENCE GRID ── */
.exp-grid{display:flex;flex-direction:column;gap:18px}

/* ── EDU GRID ── */
.edu-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:18px;
}
`;

/* ─── HOOKS ────────────────────────────────────────────────────── */
function useAnime() {
  const [anime, setAnime] = useState(null);
  useEffect(() => {
    if (window.anime) { setAnime(() => window.anime); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
    s.onload = () => setAnime(() => window.anime);
    document.head.appendChild(s);
    return () => { if (document.head.contains(s)) document.head.removeChild(s); };
  }, []);
  return anime;
}

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.25 }
    );
    NAV_ITEMS.forEach(n => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ─── BACKGROUND ────────────────────────────────────────────────── */
function Background() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,255,179,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,179,0.04) 1px,transparent 1px)",backgroundSize:"64px 64px",animation:"gridPulse 8s ease-in-out infinite"}}/>
      <div style={{position:"absolute",left:0,right:0,height:3,background:"linear-gradient(transparent,rgba(0,255,179,0.06),transparent)",animation:"scanline 10s linear infinite"}}/>
      <div style={{position:"absolute",width:700,height:700,top:"-15%",left:"-10%",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,179,0.06) 0%,transparent 70%)",animation:"orb1 22s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:500,height:500,bottom:"0",right:"-8%",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)",animation:"orb2 26s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:350,height:350,top:"45%",left:"38%",borderRadius:"50%",background:"radial-gradient(circle,rgba(247,37,133,0.04) 0%,transparent 70%)",animation:"orb3 19s ease-in-out infinite"}}/>
      {[{t:"14px",l:"14px",bt:1,bl:1},{t:"14px",r:"14px",bt:1,br:1},{b:"14px",l:"14px",bb:1,bl:1},{b:"14px",r:"14px",bb:1,br:1}].map((c,i)=>(
        <div key={i} style={{position:"absolute",width:26,height:26,top:c.t,bottom:c.b,left:c.l,right:c.r,borderTop:c.bt?"1.5px solid rgba(0,255,179,0.2)":undefined,borderBottom:c.bb?"1.5px solid rgba(0,255,179,0.2)":undefined,borderLeft:c.bl?"1.5px solid rgba(0,255,179,0.2)":undefined,borderRight:c.br?"1.5px solid rgba(0,255,179,0.2)":undefined}}/>
      ))}
    </div>
  );
}

/* ─── CURSOR ────────────────────────────────────────────────────── */
function Cursor() {
  const ring = useRef(null); const dot = useRef(null);
  useEffect(() => {
    let mx=0,my=0,fx=0,fy=0,raf;
    const mv = e => { mx=e.clientX; my=e.clientY; };
    document.addEventListener("mousemove",mv);
    const loop = () => {
      fx+=(mx-fx)*0.11; fy+=(my-fy)*0.11;
      if(ring.current){ring.current.style.left=fx+"px";ring.current.style.top=fy+"px";}
      if(dot.current){dot.current.style.left=mx+"px";dot.current.style.top=my+"px";}
      raf=requestAnimationFrame(loop);
    };
    loop();
    return () => { document.removeEventListener("mousemove",mv); cancelAnimationFrame(raf); };
  },[]);
  return (
    <>
      <div ref={ring} style={{position:"fixed",width:28,height:28,border:"1.5px solid rgba(0,255,179,0.5)",borderRadius:"50%",pointerEvents:"none",zIndex:99999,transform:"translate(-50%,-50%)",transition:"border-color 0.2s"}}/>
      <div ref={dot} style={{position:"fixed",width:5,height:5,background:"#00ffb3",borderRadius:"50%",pointerEvents:"none",zIndex:99999,transform:"translate(-50%,-50%)",boxShadow:"0 0 10px #00ffb3"}}/>
    </>
  );
}

/* ─── SCROLL PROGRESS ───────────────────────────────────────────── */
function ScrollBar() {
  const [p,setP] = useState(0);
  useEffect(() => {
    const fn = () => { const s=document.documentElement.scrollHeight-window.innerHeight; setP(s>0?(window.scrollY/s)*100:0); };
    window.addEventListener("scroll",fn);
    return () => window.removeEventListener("scroll",fn);
  },[]);
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,height:2,zIndex:9999,background:"rgba(255,255,255,0.03)"}}>
      <div style={{height:"100%",width:p+"%",background:"linear-gradient(90deg,#00ffb3,#00d4ff,#f72585)",transition:"width 0.1s",boxShadow:"0 0 12px rgba(0,255,179,0.5)"}}/>
    </div>
  );
}

/* ─── FLOATING NAV ──────────────────────────────────────────────── */
function FloatingNav() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll",fn);
    return () => window.removeEventListener("scroll",fn);
  },[]);
  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
    setMenuOpen(false);
  },[]);

  return (
    <>
      {/* Desktop pill */}
      <nav className="desktop-nav" style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:1000,display:"flex",alignItems:"center",gap:2,padding:"6px 8px 6px 16px",background:scrolled?"rgba(2,4,9,0.92)":"rgba(2,4,9,0.55)",backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",border:`1px solid ${scrolled?"rgba(0,255,179,0.16)":"rgba(0,255,179,0.08)"}`,borderRadius:60,boxShadow:scrolled?"0 8px 40px rgba(0,0,0,0.5),0 0 0 1px rgba(0,255,179,0.04)":"none",transition:"all 0.4s ease",whiteSpace:"nowrap"}}>
        <span className="mono" style={{fontSize:10,letterSpacing:4,color:"#00ffb3",paddingRight:12,borderRight:"1px solid rgba(0,255,179,0.15)",marginRight:6,fontWeight:700}}>LWP</span>
        {NAV_ITEMS.map(n=>(
          <button key={n.id} onClick={()=>go(n.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:50,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"'Syne',sans-serif",transition:"all 0.28s",background:active===n.id?"rgba(0,255,179,0.13)":"transparent",color:active===n.id?"#00ffb3":"rgba(226,232,240,0.45)",boxShadow:active===n.id?"0 0 18px rgba(0,255,179,0.18),inset 0 0 18px rgba(0,255,179,0.04)":"none"}}
            onMouseEnter={e=>{if(active!==n.id)e.currentTarget.style.color="#e2e8f0";}}
            onMouseLeave={e=>{if(active!==n.id)e.currentTarget.style.color="rgba(226,232,240,0.45)";}}
          ><span style={{fontSize:9,opacity:0.7}}>{n.icon}</span>{n.label}</button>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button className="ham-btn" onClick={()=>setMenuOpen(o=>!o)} style={{position:"fixed",top:16,right:16,zIndex:1002,width:44,height:44,borderRadius:11,background:"rgba(2,4,9,0.9)",backdropFilter:"blur(20px)",border:`1px solid ${menuOpen?"rgba(0,255,179,0.4)":"rgba(0,255,179,0.15)"}`,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer",transition:"all 0.3s",boxShadow:menuOpen?"0 0 24px rgba(0,255,179,0.25)":"none"}}>
        {[0,1,2].map(i=>(
          <span key={i} style={{width:18,height:1.5,background:"#00ffb3",borderRadius:2,display:"block",transition:"all 0.3s",transform:menuOpen&&i===0?"rotate(45deg) translate(4.5px,4.5px)":menuOpen&&i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"none",opacity:menuOpen&&i===1?0:1}}/>
        ))}
      </button>

      {/* Mobile menu */}
      <div className="mob-menu-wrap" style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1001,pointerEvents:menuOpen?"auto":"none"}}>
        <div onClick={()=>setMenuOpen(false)} style={{position:"absolute",inset:0,background:"rgba(2,4,9,0.65)",backdropFilter:"blur(6px)",opacity:menuOpen?1:0,transition:"opacity 0.3s"}}/>
        <div style={{position:"absolute",top:70,right:12,width:230,background:"rgba(3,6,16,0.97)",backdropFilter:"blur(28px)",border:"1px solid rgba(0,255,179,0.14)",borderRadius:18,overflow:"hidden",transition:"all 0.38s cubic-bezier(0.4,0,0.2,1)",opacity:menuOpen?1:0,transform:menuOpen?"translateY(0) scale(1)":"translateY(-12px) scale(0.97)",boxShadow:"0 24px 64px rgba(0,0,0,0.6),0 0 0 1px rgba(0,255,179,0.04)"}}>
          <div style={{padding:"14px 20px 10px",borderBottom:"1px solid rgba(0,255,179,0.07)",display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#00ffb3",boxShadow:"0 0 8px #00ffb3",animation:"blink 2s infinite",display:"inline-block"}}/>
            <span className="mono" style={{fontSize:9,color:"#00ffb3",letterSpacing:4}}>NAVIGATE</span>
          </div>
          {NAV_ITEMS.map((n,i)=>(
            <button key={n.id} onClick={()=>go(n.id)} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"13px 20px",background:active===n.id?"rgba(0,255,179,0.08)":"transparent",border:"none",borderBottom:i<NAV_ITEMS.length-1?"1px solid rgba(255,255,255,0.03)":"none",color:active===n.id?"#00ffb3":"rgba(226,232,240,0.6)",fontSize:13,fontWeight:700,fontFamily:"'Syne',sans-serif",cursor:"pointer",transition:"all 0.2s",textAlign:"left"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,255,179,0.05)";e.currentTarget.style.paddingLeft="26px";}}
              onMouseLeave={e=>{e.currentTarget.style.background=active===n.id?"rgba(0,255,179,0.08)":"transparent";e.currentTarget.style.paddingLeft="20px";}}
            >
              <span style={{width:30,height:30,borderRadius:8,background:active===n.id?"rgba(0,255,179,0.14)":"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,transition:"all 0.2s"}}>{n.icon}</span>
              {n.label}
              {active===n.id&&<span style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:"#00ffb3",boxShadow:"0 0 8px #00ffb3"}}/>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── REVEAL ────────────────────────────────────────────────────── */
function Reveal({children, delay=0, anime}) {
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(()=>{
    if(inView&&anime&&ref.current) anime({targets:ref.current,opacity:[0,1],translateY:[36,0],duration:900,easing:"easeOutExpo",delay});
  },[inView,anime,delay]);
  return <div ref={ref} style={{opacity:0}}>{children}</div>;
}

/* ─── SECTION LABEL ─────────────────────────────────────────────── */
function SectionLabel({num,children}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:40}}>
      <span className="mono" style={{fontSize:10,color:"#00ffb3",letterSpacing:4,opacity:0.45,flexShrink:0}}>[ {num} ]</span>
      <h2 style={{fontSize:"clamp(24px,3.8vw,40px)",fontWeight:900,color:"#e2e8f0",letterSpacing:-1,flexShrink:0,lineHeight:1}}>{children}</h2>
      <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,255,179,0.22),transparent)",minWidth:16}}/>
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────── */
function Hero({anime}) {
  const ref = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(()=>{
    if(!anime) return;
    anime({targets:".hw",opacity:[0,1],translateY:[80,0],delay:anime.stagger(120,{start:200}),easing:"easeOutExpo",duration:1000});
    anime({targets:".hb",opacity:[0,1],translateY:[24,0],delay:anime.stagger(70,{start:900}),easing:"easeOutExpo",duration:700});
    anime({targets:".hscroll",opacity:[0,1],delay:1800,easing:"easeOutExpo",duration:600});
    anime({targets:".photo-frame",opacity:[0,1],scale:[0.85,1],delay:300,easing:"easeOutBack",duration:1000});
  },[anime]);

  return (
    <section id="hero" ref={ref} style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 0 80px",position:"relative"}}>
      <div className="hero-inner">

        {/* ── LEFT TEXT ── */}
        <div className="hero-text">
          {/* Badge */}
          <div className="hw mono" style={{opacity:0,display:"inline-flex",alignItems:"center",gap:8,marginBottom:28,padding:"6px 16px",border:"1px solid rgba(0,255,179,0.2)",borderRadius:50,background:"rgba(0,255,179,0.04)"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#00ffb3",animation:"pulseDot 2s ease-in-out infinite",display:"inline-block"}}/>
            <span style={{fontSize:9,letterSpacing:4,color:"#00ffb3"}}>AVAILABLE FOR WORK</span>
          </div>

          {/* Name */}
          <div style={{overflow:"hidden"}}>
            <h1 className="hw" style={{opacity:0,fontSize:"clamp(48px,8vw,100px)",fontWeight:900,lineHeight:0.9,letterSpacing:-4,color:"#e2e8f0"}}>Lintang</h1>
          </div>
          <div style={{overflow:"hidden"}}>
            <h1 className="hw" style={{opacity:0,fontSize:"clamp(48px,8vw,100px)",fontWeight:900,lineHeight:0.9,letterSpacing:-4,background:"linear-gradient(135deg,#00ffb3 0%,#00d4ff 45%,#f72585 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",backgroundSize:"200% auto",animation:"shimmer 5s linear infinite"}}>Windy</h1>
          </div>
          <div style={{overflow:"hidden",marginBottom:28}}>
            <h1 className="hw" style={{opacity:0,fontSize:"clamp(48px,8vw,100px)",fontWeight:900,lineHeight:0.9,letterSpacing:-4,color:"rgba(226,232,240,0.1)"}}>Pratama</h1>
          </div>

          {/* Role */}
          <div className="hw" style={{opacity:0,display:"flex",alignItems:"center",gap:12,marginBottom:28,flexWrap:"wrap"}}>
            <div style={{height:1,width:28,background:"rgba(0,255,179,0.4)",flexShrink:0}}/>
            <span style={{fontSize:"clamp(12px,1.6vw,15px)",color:"rgba(226,232,240,0.5)",fontWeight:400}}>Full Stack Web Developer</span>
            <span className="mono" style={{fontSize:9,color:"#00ffb3",letterSpacing:3,padding:"3px 10px",border:"1px solid rgba(0,255,179,0.25)",borderRadius:4}}>Laravel · GIS · REST API</span>
          </div>

          {/* Stats */}
          <div style={{display:"flex",gap:"clamp(20px,3.5vw,44px)",marginBottom:32,flexWrap:"wrap"}}>
            {[{val:"2+",lab:"Years Exp"},{val:"5",lab:"Daerah"},{val:"7",lab:"Systems"},{val:"3.92",lab:"GPA"}].map((s,i)=>(
              <div key={i} className="hb" style={{opacity:0}}>
                <div className="mono" style={{fontSize:"clamp(20px,2.8vw,30px)",fontWeight:700,color:"#00ffb3",lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:9,color:"rgba(226,232,240,0.35)",letterSpacing:3,marginTop:5,textTransform:"uppercase"}}>{s.lab}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {icon:"◉",label:"WhatsApp",    href:"https://wa.me/6285158311928",    primary:true},
              {icon:"✉",label:"Email",       href:"mailto:lintangpratama526@gmail.com"},
              {icon:"⬡",label:"LinkedIn",    href:"https://www.linkedin.com/in/lintangpratamaa"},
              {icon:"↓",label:"Download CV", href:CV, download:true},
            ].map((c,i)=>(
              <a key={i} href={c.href} {...(c.download?{download:"CV-Lintang-Windy-Pratama.pdf"}:{target:"_blank",rel:"noreferrer"})}
                className="hb" style={{opacity:0,display:"flex",alignItems:"center",gap:7,padding:"10px 18px",borderRadius:9,background:c.primary?"rgba(0,255,179,0.1)":"rgba(255,255,255,0.03)",border:c.primary?"1px solid rgba(0,255,179,0.35)":"1px solid rgba(255,255,255,0.08)",color:c.primary?"#00ffb3":"rgba(226,232,240,0.55)",textDecoration:"none",fontSize:12,fontWeight:700,transition:"all 0.3s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:"rgba(0,255,179,0.12)",borderColor:"rgba(0,255,179,0.4)",color:"#00ffb3",transform:"translateY(-3px)",boxShadow:"0 10px 28px rgba(0,255,179,0.15)"})}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:c.primary?"rgba(0,255,179,0.1)":"rgba(255,255,255,0.03)",borderColor:c.primary?"rgba(0,255,179,0.35)":"rgba(255,255,255,0.08)",color:c.primary?"#00ffb3":"rgba(226,232,240,0.55)",transform:"translateY(0)",boxShadow:"none"})}
              ><span>{c.icon}</span>{c.label}</a>
            ))}
          </div>

          {/* Blurb */}
          <p style={{maxWidth:520,marginTop:32,fontSize:13,lineHeight:1.9,color:"rgba(226,232,240,0.35)",borderLeft:"2px solid rgba(0,255,179,0.15)",paddingLeft:16}}>
            Lulusan D3 Manajemen Informatika, berpengalaman membangun ekosistem sistem pajak daerah — pelayanan, pemetaan GIS, pembayaran, penagihan, survey, hingga dashboard analitik — untuk 5 daerah.
          </p>
        </div>

        {/* ── RIGHT PHOTO ── */}
        <div className="photo-frame hero-photo-wrap" style={{opacity:0,position:"relative",width:"clamp(180px,22vw,260px)",height:"clamp(180px,22vw,260px)",flexShrink:0}}>
          {/* spinning ring */}
          <div className="photo-ring"/>
          <div className="photo-ring-inner"/>
          {/* photo */}
          <div style={{position:"absolute",inset:6,borderRadius:"50%",overflow:"hidden",background:"#0a0f1e",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {imgError ? (
              <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,rgba(0,255,179,0.1),rgba(0,212,255,0.05))"}}>
                <span style={{fontSize:52,marginBottom:6}}>👨‍💻</span>
                <span className="mono" style={{fontSize:9,color:"rgba(0,255,179,0.5)",letterSpacing:2}}>LWP</span>
              </div>
            ):(
              <img src={PHOTO} alt="Lintang Windy Pratama" onError={()=>setImgError(true)}
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            )}
          </div>
          {/* glow under */}
          <div style={{position:"absolute",bottom:-20,left:"50%",transform:"translateX(-50%)",width:"70%",height:30,background:"radial-gradient(ellipse,rgba(0,255,179,0.25),transparent)",filter:"blur(10px)"}}/>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hscroll" style={{opacity:0,position:"absolute",bottom:32,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span className="mono" style={{fontSize:8,letterSpacing:5,color:"rgba(226,232,240,0.22)",writingMode:"vertical-rl"}}>SCROLL</span>
        <div style={{width:1,height:48,background:"linear-gradient(180deg,rgba(0,255,179,0.45),transparent)"}}/>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE CARD ───────────────────────────────────────────── */
function ExpCard({item,anime}) {
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(()=>{
    if(inView&&anime&&ref.current) anime({targets:ref.current,opacity:[0,1],translateX:[-44,0],duration:800,easing:"easeOutExpo"});
  },[inView,anime]);
  return (
    <div ref={ref} style={{opacity:0,padding:"clamp(20px,3vw,32px)",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderLeft:`2.5px solid ${item.color}`,borderRadius:14,transition:"all 0.32s",position:"relative",overflow:"hidden"}}
      onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.boxShadow=`0 20px 60px rgba(0,0,0,0.22),inset 0 0 60px ${item.color}04`;}}
      onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.02)";e.currentTarget.style.boxShadow="none";}}
    >
      <div style={{position:"absolute",top:0,right:0,padding:"4px 12px",background:`${item.color}12`,borderBottomLeftRadius:9}}>
        <span className="mono" style={{fontSize:9,color:item.color,letterSpacing:3}}>{item.status}</span>
      </div>
      <h3 style={{fontSize:"clamp(17px,2.2vw,21px)",fontWeight:800,color:"#e2e8f0",marginBottom:4}}>{item.title}</h3>
      <div style={{fontSize:13,color:item.color,fontWeight:700,marginBottom:3}}>{item.company}</div>
      <div className="mono" style={{fontSize:9,color:"rgba(226,232,240,0.28)",letterSpacing:2,marginBottom:18}}>{item.date} · {item.location}</div>
      <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:9}}>
        {item.bullets.map((b,i)=>(
          <li key={i} style={{display:"flex",gap:11,fontSize:13,color:"rgba(226,232,240,0.52)",lineHeight:1.7}}>
            <span style={{color:item.color,flexShrink:0,fontSize:8,marginTop:5}}>◆</span>{b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── SKILL CARD ────────────────────────────────────────────────── */
function SkillCard({skill,idx,anime}) {
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(()=>{
    if(inView&&anime&&ref.current) anime({targets:ref.current,opacity:[0,1],scale:[0.87,1],duration:680,easing:"easeOutBack",delay:idx*50});
  },[inView,anime,idx]);
  return (
    <div ref={ref} style={{opacity:0,padding:"20px 18px",background:`${skill.color}05`,border:`1px solid ${skill.color}15`,borderRadius:12,transition:"all 0.3s",cursor:"default"}}
      onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:`${skill.color}10`,borderColor:`${skill.color}30`,transform:"translateY(-6px)",boxShadow:`0 16px 36px rgba(0,0,0,0.25),0 0 24px ${skill.color}10`})}
      onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:`${skill.color}05`,borderColor:`${skill.color}15`,transform:"translateY(0)",boxShadow:"none"})}
    >
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <span style={{fontSize:18}}>{skill.icon}</span>
        <span className="mono" style={{fontSize:9,color:skill.color,letterSpacing:3,textTransform:"uppercase"}}>{skill.category}</span>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {skill.items.map((tag,j)=>(
          <span key={j} style={{padding:"4px 10px",borderRadius:5,fontSize:11,background:`${skill.color}0e`,color:"rgba(226,232,240,0.62)",border:`1px solid ${skill.color}16`,transition:"all 0.18s",cursor:"default",fontWeight:600}}
            onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:skill.color,color:"#020409",borderColor:skill.color})}
            onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:`${skill.color}0e`,color:"rgba(226,232,240,0.62)",borderColor:`${skill.color}16`})}
          >{tag}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── PROJECT CARD ──────────────────────────────────────────────── */
function ProjectCard({project,idx,anime}) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(()=>{
    if(inView&&anime&&ref.current) anime({targets:ref.current,opacity:[0,1],translateY:[50,0],duration:780,easing:"easeOutExpo",delay:idx*65});
  },[inView,anime,idx]);

  return (
    <div ref={ref} style={{opacity:0}}>
      {/* Fixed height container — same for all cards */}
      <div style={{height:320,perspective:1400}}>
        <div style={{width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",transition:"transform 0.72s cubic-bezier(0.4,0,0.2,1)",transform:flipped?"rotateY(180deg)":"rotateY(0)"}}>

          {/* ── FRONT ── */}
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",borderRadius:14,border:`1px solid ${project.color}1e`,background:"rgba(10,14,26,0.8)",padding:"20px 20px 16px",display:"flex",flexDirection:"column",transition:"box-shadow 0.3s"}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 0 0 1px ${project.color}30,0 20px 50px rgba(0,0,0,0.4),inset 0 0 40px ${project.color}05`;}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";}}
          >
            {/* Top row */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <span className="mono" style={{fontSize:9,color:project.color,letterSpacing:3,padding:"3px 9px",border:`1px solid ${project.color}28`,borderRadius:4,width:"fit-content"}}>{project.tag}</span>
                <div style={{width:32,height:2,background:`linear-gradient(90deg,${project.color},transparent)`,borderRadius:2}}/>
              </div>
              <span style={{fontSize:34,lineHeight:1,animation:"floatY 4s ease-in-out infinite",flexShrink:0}}>{project.emoji}</span>
            </div>

            {/* Title */}
            <h3 style={{fontSize:"clamp(13px,1.4vw,15px)",fontWeight:800,color:"#e2e8f0",lineHeight:1.4,marginBottom:8,flex:"0 0 auto"}}>{project.title}</h3>

            {/* Short desc — fixed 2 lines height */}
            <p style={{fontSize:11,color:"rgba(226,232,240,0.38)",lineHeight:1.65,flex:1,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{project.short}</p>

            {/* Tech tags */}
            <div style={{display:"flex",flexWrap:"wrap",gap:5,margin:"12px 0 14px"}}>
              {project.tech.map((t,i)=>(
                <span key={i} style={{fontSize:9,color:"rgba(226,232,240,0.28)",background:"rgba(255,255,255,0.04)",padding:"3px 8px",borderRadius:4,fontWeight:600,fontFamily:"'Space Mono',monospace"}}>{t}</span>
              ))}
            </div>

            {/* Button */}
            <button onClick={()=>setFlipped(true)} style={{alignSelf:"flex-end",padding:"7px 18px",borderRadius:7,background:`${project.color}14`,border:`1px solid ${project.color}32`,color:project.color,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif",transition:"all 0.25s",letterSpacing:1,flexShrink:0}}
              onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:project.color,color:"#020409",boxShadow:`0 6px 20px ${project.color}40`})}
              onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:`${project.color}14`,color:project.color,boxShadow:"none"})}
            >DETAIL →</button>
          </div>

          {/* ── BACK ── */}
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",borderRadius:14,background:"#040810",border:`1px solid ${project.color}28`,padding:"20px 20px 16px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <div>
              {/* Header */}
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <div style={{width:36,height:36,borderRadius:9,background:`${project.color}12`,border:`1px solid ${project.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{project.emoji}</div>
                <div>
                  <div className="mono" style={{fontSize:8,color:project.color,letterSpacing:3}}>{project.tag}</div>
                  <div style={{fontSize:13,fontWeight:800,color:"#e2e8f0",lineHeight:1.25}}>{project.title}</div>
                </div>
              </div>
              {/* Divider */}
              <div style={{height:1,background:`linear-gradient(90deg,${project.color}30,transparent)`,marginBottom:12}}/>
              {/* Desc */}
              <p style={{fontSize:12,color:"rgba(226,232,240,0.48)",lineHeight:1.8}}>{project.desc}</p>
            </div>

            <div>
              {/* Tech badges */}
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                {project.tech.map((t,i)=>(
                  <span key={i} style={{fontSize:10,padding:"5px 10px",borderRadius:6,background:`${project.color}12`,color:project.color,border:`1px solid ${project.color}26`,fontWeight:700}}>{t}</span>
                ))}
              </div>
              {/* Back button */}
              <button onClick={()=>setFlipped(false)} style={{padding:"7px 16px",borderRadius:7,background:"transparent",border:"1px solid rgba(226,232,240,0.1)",color:"rgba(226,232,240,0.38)",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif",transition:"all 0.25s",letterSpacing:1}}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(226,232,240,0.26)",color:"#e2e8f0"})}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(226,232,240,0.1)",color:"rgba(226,232,240,0.38)"})}
              >← BACK</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── PROJECTS SECTION ──────────────────────────────────────────── */
function ProjectsSection({anime}) {
  return (
    <section id="projects" style={{paddingTop:80,paddingBottom:80}}>
      <Reveal anime={anime}><SectionLabel num="03">Projects</SectionLabel></Reveal>

      {/* Context banner */}
      <Reveal anime={anime} delay={80}>
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:32,padding:"16px 22px",background:"rgba(0,255,179,0.03)",border:"1px solid rgba(0,255,179,0.1)",borderRadius:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <div style={{width:34,height:34,borderRadius:8,background:"rgba(0,255,179,0.08)",border:"1px solid rgba(0,255,179,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🏢</div>
            <div>
              <div className="mono" style={{fontSize:9,color:"#00ffb3",letterSpacing:3,marginBottom:2}}>SCOPE</div>
              <div style={{fontSize:15,fontWeight:800,color:"#e2e8f0",lineHeight:1}}>7 Sistem · 5 Daerah</div>
            </div>
          </div>
          <div style={{width:1,height:36,background:"rgba(0,255,179,0.1)",flexShrink:0}}/>
          <p style={{fontSize:13,color:"rgba(226,232,240,0.45)",lineHeight:1.75,flex:1,minWidth:220}}>
            Ketujuh sistem berikut dikembangkan dan di-deploy untuk <span style={{color:"#00ffb3",fontWeight:700}}>5 daerah (kota/kabupaten)</span>. Setiap daerah menjalankan ekosistem aplikasi pajak yang saling terintegrasi — dari pelayanan, pemetaan GIS, pembayaran, penagihan, survey lapangan, hingga dashboard analitik.
          </p>
        </div>
      </Reveal>

      {/* Flip instruction */}
      <Reveal anime={anime} delay={120}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
          <span className="mono" style={{fontSize:9,color:"rgba(226,232,240,0.25)",letterSpacing:3}}>↺ KLIK "DETAIL" UNTUK FLIP CARD</span>
        </div>
      </Reveal>

      {/* Grid 3 columns → 2 → 1 */}
      <div className="proj-grid">
        {PROJECTS.map((p,i)=><ProjectCard key={p.id} project={p} idx={i} anime={anime}/>)}
      </div>
    </section>
  );
}

/* ─── EDUCATION CARD ────────────────────────────────────────────── */
function EduCard({edu,idx,anime}) {
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(()=>{
    if(inView&&anime&&ref.current) anime({targets:ref.current,opacity:[0,1],translateY:[32,0],duration:800,easing:"easeOutExpo",delay:idx*130});
  },[inView,anime,idx]);
  return (
    <div ref={ref} style={{opacity:0,padding:"clamp(22px,3vw,32px)",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:14,transition:"all 0.3s",position:"relative",overflow:"hidden"}}
      onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:"rgba(255,255,255,0.04)",boxShadow:`0 0 0 1px ${edu.color}18,0 20px 50px rgba(0,0,0,0.22)`})}
      onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:"rgba(255,255,255,0.02)",boxShadow:"none"})}
    >
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${edu.color},transparent)`}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14,marginBottom:6}}>
        <div>
          <h3 style={{fontSize:"clamp(16px,2.2vw,19px)",fontWeight:800,color:"#e2e8f0",marginBottom:5}}>{edu.degree}</h3>
          <div style={{fontSize:13,color:edu.color,fontWeight:700}}>{edu.school}</div>
        </div>
        {edu.gpa&&(
          <div style={{padding:"10px 18px",background:`${edu.color}0c`,border:`1px solid ${edu.color}22`,borderRadius:10,textAlign:"center",flexShrink:0}}>
            <div className="mono" style={{fontSize:20,fontWeight:700,color:edu.color,lineHeight:1}}>{edu.gpa}</div>
            <div style={{fontSize:8,color:"rgba(226,232,240,0.32)",letterSpacing:3,marginTop:3}}>GPA</div>
          </div>
        )}
      </div>
      <div className="mono" style={{fontSize:9,color:"rgba(226,232,240,0.25)",letterSpacing:3,marginBottom:18}}>{edu.period}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {edu.achievements.map((a,i)=>(
          <span key={i} style={{fontSize:12,color:"rgba(226,232,240,0.48)",padding:"6px 13px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:7}}>{a}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── APP ───────────────────────────────────────────────────────── */
export default function App() {
  const anime = useAnime();

  return (
    <>
      <style>{CSS}</style>
      <Background/>
      <Cursor/>
      <ScrollBar/>
      <FloatingNav/>

      <main style={{maxWidth:1080,margin:"0 auto",padding:"0 clamp(18px,5vw,52px)",position:"relative",zIndex:1}}>
        <Hero anime={anime}/>

        {/* Experience */}
        <section id="experience" style={{paddingTop:80,paddingBottom:80}}>
          <Reveal anime={anime}><SectionLabel num="01">Work Experience</SectionLabel></Reveal>
          <div className="exp-grid">
            {EXPERIENCES.map((item,i)=><ExpCard key={i} item={item} anime={anime}/>)}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" style={{paddingTop:80,paddingBottom:80}}>
          <Reveal anime={anime}><SectionLabel num="02">Skills & Expertise</SectionLabel></Reveal>
          <div className="skill-grid">
            {SKILLS.map((s,i)=><SkillCard key={i} skill={s} idx={i} anime={anime}/>)}
          </div>
        </section>

        {/* Projects */}
        <ProjectsSection anime={anime}/>

        {/* Education */}
        <section id="education" style={{paddingTop:80,paddingBottom:80}}>
          <Reveal anime={anime}><SectionLabel num="04">Education</SectionLabel></Reveal>
          <div className="edu-grid">
            {EDUCATION.map((edu,i)=><EduCard key={i} edu={edu} idx={i} anime={anime}/>)}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{borderTop:"1px solid rgba(255,255,255,0.04)",padding:"40px clamp(18px,5vw,52px)",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1080,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:18}}>
          <div>
            <div className="mono" style={{fontSize:11,letterSpacing:4,color:"#00ffb3",marginBottom:5}}>LWP</div>
            <div style={{fontSize:12,color:"rgba(226,232,240,0.22)"}}>© 2024 Lintang Windy Pratama. All rights reserved.</div>
          </div>
          <div style={{display:"flex",gap:9}}>
            {[{l:"in",h:"https://www.linkedin.com/in/lintangpratamaa"},{l:"✉",h:"mailto:lintangpratama526@gmail.com"},{l:"📱",h:"https://wa.me/6285158311928"}].map((s,i)=>(
              <a key={i} href={s.h} target="_blank" rel="noreferrer" style={{width:38,height:38,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,0.06)",color:"rgba(226,232,240,0.32)",textDecoration:"none",fontSize:14,transition:"all 0.3s"}}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(0,255,179,0.32)",color:"#00ffb3",background:"rgba(0,255,179,0.07)",transform:"translateY(-3px)",boxShadow:"0 8px 20px rgba(0,255,179,0.12)"})}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(255,255,255,0.06)",color:"rgba(226,232,240,0.32)",background:"transparent",transform:"translateY(0)",boxShadow:"none"})}
              >{s.l}</a>
            ))}
          </div>
          <div className="mono" style={{fontSize:9,color:"rgba(226,232,240,0.16)",letterSpacing:2}}>React + Anime.js</div>
        </div>
      </footer>
    </>
  );
}