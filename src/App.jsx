import { useState, useEffect, useRef, useCallback } from "react";

const PHOTO = "/lintang.jpeg";
const CV    = "/cv.pdf";

const SKILLS = [
  { category: "Backend",     icon: "⚙️", color: "#1a6b4a", bg: "#f0faf5", items: ["Laravel","CodeIgniter","REST API","Livewire"] },
  { category: "Frontend",    icon: "🎨", color: "#1e4fa0", bg: "#f0f5ff", items: ["HTML","CSS","JavaScript"] },
  { category: "Database",    icon: "🗄️", color: "#8b2c2c", bg: "#fff5f5", items: ["PostgreSQL","MySQL","Oracle"] },
  { category: "Web GIS",     icon: "🗺️", color: "#6b4c0e", bg: "#fffbf0", items: ["Google Maps API","Leaflet","Spatial Data","Spatial Query"] },
  { category: "DevOps",      icon: "🛠️", color: "#3b2080", bg: "#f5f0ff", items: ["Git","GitHub","Linux","Docker","SSH","CloudFlare"] },
  { category: "Networking",  icon: "🌐", color: "#0a5a6e", bg: "#f0fafe", items: ["TCP/IP","LAN/WAN","VPN Config","Firewall"] },
  { category: "Integration", icon: "🔗", color: "#7a2060", bg: "#fef5fb", items: ["WhatsApp API","Payment Gateway"] },
];

const PROJECTS = [
  { id:1, tag:"GOV-SYS",  emoji:"🏛️", color:"#1a6b4a", light:"#f0faf5",
    title:"Sistem Pelayanan Pajak Daerah",
    short:"Platform terpadu pendaftaran, verifikasi & administrasi wajib pajak secara digital.",
    desc:"Platform pelayanan komprehensif untuk pengelolaan data wajib pajak dan objek pajak. Mencakup alur pendaftaran, verifikasi dokumen, validasi data, dan seluruh layanan administrasi pajak daerah secara digital dan terintegrasi.",
    tech:["Laravel","PostgreSQL","REST API","Livewire"] },
  { id:2, tag:"WEB-GIS",  emoji:"🗺️", color:"#1e4fa0", light:"#f0f5ff",
    title:"Sistem Peta Pajak Daerah",
    short:"Visualisasi geospasial objek & zona pajak berbasis Google Maps secara real-time.",
    desc:"Aplikasi Web GIS interaktif untuk visualisasi dan pemetaan seluruh objek pajak. Menampilkan data spasial properti, batas wilayah administratif, zona nilai tanah, dan informasi geografis perpajakan secara real-time.",
    tech:["Laravel","Google Maps API","PostgreSQL","Spatial Data"] },
  { id:3, tag:"FINTECH",  emoji:"💳", color:"#6b4c0e", light:"#fffbf0",
    title:"Sistem Pembayaran Pajak Daerah",
    short:"Pembayaran online real-time dengan integrasi payment gateway multi-channel.",
    desc:"Platform pembayaran pajak online yang aman dan efisien. Dilengkapi monitoring status pembayaran real-time, laporan transaksi otomatis, rekonsiliasi data, dan integrasi payment gateway untuk berbagai metode pembayaran.",
    tech:["Laravel","REST API","MySQL","Payment Gateway"] },
  { id:4, tag:"ANALYTICS",emoji:"📊", color:"#7a2060", light:"#fef5fb",
    title:"Dashboard Analitik Pajak Daerah",
    short:"Monitoring tagihan, analisis & statistik pajak dengan grafik interaktif real-time.",
    desc:"Dashboard monitoring komprehensif untuk tracking status tagihan, analisis data pembayaran, dan visualisasi statistik pajak. Dilengkapi grafik interaktif, real-time analytics, dan laporan eksekutif untuk mendukung pengambilan keputusan strategis.",
    tech:["Livewire","Chart.js","Oracle","Data Analytics"] },
  { id:5, tag:"OPS-SYS",  emoji:"📋", color:"#3b2080", light:"#f5f0ff",
    title:"Aplikasi Penagihan Pajak Daerah",
    short:"Tracking tunggakan, notifikasi otomatis WhatsApp & laporan realisasi penagihan.",
    desc:"Sistem penagihan pajak terintegrasi dengan fitur tracking tunggakan, notifikasi otomatis via WhatsApp, penjadwalan penagihan, dan laporan realisasi. Meningkatkan efektivitas pengumpulan pajak secara signifikan.",
    tech:["Laravel","PostgreSQL","Livewire","WhatsApp API"] },
  { id:6, tag:"SURVEY",   emoji:"📡", color:"#0a5a6e", light:"#f0fafe",
    title:"Aplikasi Survey Data Pajak",
    short:"Pengumpulan & sinkronisasi data lapangan objek pajak secara digital offline-online.",
    desc:"Aplikasi mobile-friendly untuk petugas lapangan dalam melakukan survey dan pendataan objek pajak. Mendukung pengambilan foto, input data spasial, sinkronisasi offline-online, dan validasi otomatis data hasil survei ke database pusat.",
    tech:["Laravel","REST API","PostgreSQL","Leaflet"] },
  { id:7, tag:"GIS-MAP",  emoji:"🌾", color:"#8b2c2c", light:"#fff5f5",
    title:"Peta Komoditas Pangan Daerah",
    short:"GIS pemetaan komoditas pertanian, potensi & distribusi wilayah secara interaktif.",
    desc:"Aplikasi Web GIS untuk pemetaan dan monitoring komoditas pangan daerah. Menampilkan distribusi geografis komoditas pertanian, potensi wilayah, data produksi, dan visualisasi data spasial untuk mendukung perencanaan pembangunan daerah.",
    tech:["Laravel","Google Maps API","MySQL","GIS Mapping"] },
];

const EXPERIENCES = [
  { date:"Jan 2024 — Sekarang", title:"Full Stack Developer", company:"CV Agsatu", location:"Kediri, Jawa Timur", color:"#1a6b4a", bg:"#f0faf5", status:"AKTIF",
    bullets:["Mengembangkan & memelihara ekosistem aplikasi Pajak Daerah untuk 5 daerah","Membangun 7 sistem: pelayanan, peta GIS, pembayaran, dashboard, penagihan, survey & komoditas","Implementasi Web GIS & Google Maps API untuk visualisasi data spasial","Backend Laravel + RESTful API + manage PostgreSQL, MySQL, dan Oracle","Deploy & maintenance sistem di Linux server dengan Docker & CloudFlare"] },
  { date:"Aug 2023 — Okt 2023", title:"Full Stack Developer", company:"Viscode.id", location:"Kediri, Jawa Timur", color:"#1e4fa0", bg:"#f0f5ff", status:"CONTRACT",
    bullets:["Pengembangan aplikasi web menggunakan framework CodeIgniter","Backend & frontend fitur berdasarkan kebutuhan klien enterprise","Desain & manage database MySQL: relasi tabel & query optimasi","Bug fixing, refactoring kode & kolaborasi tim via Git workflow"] },
];

const EDUCATION = [
  { degree:"D3 Manajemen Informatika", school:"Politeknik Negeri Malang", period:"Agu 2021 — Agu 2024", gpa:"3.92", color:"#1a6b4a", bg:"#f0faf5",
    achievements:["🏆 Lulusan Terbaik Peringkat 3 Jurusan","👥 Kepala Divisi PSDM — BEM","📚 Aktif penelitian dosen","🎯 Koordinator PKM Center"] },
  { degree:"SMK Teknik Komputer & Jaringan", school:"SMKN 1 Nganjuk", period:"Jul 2016 — Jul 2019", gpa:null, color:"#1e4fa0", bg:"#f0f5ff",
    achievements:["💻 Dasar-dasar jaringan komputer","⚡ Fondasi programming & software development"] },
];

const NAV_ITEMS = [
  { id:"hero",       label:"Beranda" },
  { id:"experience", label:"Pengalaman" },
  { id:"skills",     label:"Keahlian" },
  { id:"projects",   label:"Proyek" },
  { id:"education",  label:"Pendidikan" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: #fafaf8;
  color: #1c1c1c;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  line-height: 1.65;
  overflow-x: hidden;
}
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #f0efeb; }
::-webkit-scrollbar-thumb { background: #c8c4b8; border-radius: 3px; }
::selection { background: #d4e8d0; }

@keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes slideRight { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
@keyframes scaleIn { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
@keyframes rotateSlow { to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@keyframes shimmerBg { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

.serif { font-family: 'DM Serif Display', serif; }
.mono { font-family: 'DM Mono', monospace; font-size: 0.8em; }

.nav-link {
  font-size: 13px;
  font-weight: 500;
  color: #6b6b6b;
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 20px;
  transition: all 0.22s;
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  letter-spacing: 0.01em;
}
.nav-link:hover { color: #1c1c1c; background: rgba(0,0,0,0.05); }
.nav-link.active { color: #1c1c1c; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06); }

.stat-card {
  padding: 20px 24px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e8e5de;
  text-align: center;
  transition: transform 0.22s, box-shadow 0.22s;
}
.stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,0.08); }

.skill-card {
  padding: 20px;
  border-radius: 14px;
  border: 1px solid transparent;
  transition: all 0.25s;
}
.skill-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }

.proj-card {
  border-radius: 16px;
  border: 1px solid #e8e5de;
  overflow: hidden;
  transition: all 0.3s;
  background: #fff;
}
.proj-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.1); transform: translateY(-4px); }

.exp-card {
  padding: clamp(22px,3vw,32px);
  border-radius: 16px;
  background: #fff;
  border: 1px solid #e8e5de;
  transition: box-shadow 0.25s;
}
.exp-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,0.08); }

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  text-decoration: none;
  transition: all 0.25s;
  cursor: pointer;
  border: 1px solid transparent;
}
.cta-primary {
  background: #1c1c1c;
  color: #fff;
  border-color: #1c1c1c;
}
.cta-primary:hover { background: #333; box-shadow: 0 6px 20px rgba(0,0,0,0.2); transform: translateY(-2px); }
.cta-outline {
  background: #fff;
  color: #1c1c1c;
  border-color: #d8d5ce;
}
.cta-outline:hover { border-color: #b0aca2; background: #faf9f6; transform: translateY(-2px); }

.section-divider { width: 100%; height: 1px; background: #e8e5de; margin: 0; }

.proj-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
@media(max-width:1024px) { .proj-grid { grid-template-columns: repeat(2,1fr); } }
@media(max-width:600px) { .proj-grid { grid-template-columns: 1fr; } }

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 14px;
}

.hero-inner {
  display: flex;
  align-items: center;
  gap: clamp(40px,6vw,90px);
  flex-wrap: wrap;
}
.hero-text { flex: 1; min-width: 280px; }
.hero-photo-wrap { flex-shrink: 0; }
@media(max-width:700px) {
  .hero-inner { flex-direction: column-reverse; text-align: center; }
  .hero-photo-wrap { margin-bottom: 8px; }
}

.edu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.tag-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  font-family: 'DM Mono', monospace;
}

.ham-btn { display: none !important; }
.mob-menu-wrap { display: none !important; }
@media(max-width:700px) {
  .desktop-nav { display: none !important; }
  .ham-btn { display: flex !important; }
  .mob-menu-wrap { display: block !important; }
}

.photo-border-spin {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(#c8e6c9, #a5d6a7, #1a6b4a, #4caf50, #c8e6c9);
  animation: rotateSlow 8s linear infinite;
}
.photo-border-inner {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: #fafaf8;
}
`;

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const s = document.documentElement.scrollHeight - window.innerHeight; setP(s > 0 ? (window.scrollY / s) * 100 : 0); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.2 }
    );
    NAV_ITEMS.forEach(n => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useInView(ref, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,height:"3px",zIndex:9999,background:"#eee"}}>
      <div style={{height:"100%",width:p+"%",background:"linear-gradient(90deg,#1a6b4a,#4caf50)",transition:"width 0.1s"}}/>
    </div>
  );
}

function FloatingNav() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav className="desktop-nav" style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",zIndex:1000,display:"flex",alignItems:"center",gap:4,padding:"6px 8px 6px 18px",background:scrolled?"rgba(255,255,252,0.95)":"rgba(255,255,252,0.7)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:40,border:`1px solid ${scrolled?"#ddd":"rgba(0,0,0,0.06)"}`,boxShadow:scrolled?"0 4px 24px rgba(0,0,0,0.1)":"none",transition:"all 0.3s",whiteSpace:"nowrap"}}>
        <span className="serif" style={{fontSize:15,color:"#1c1c1c",paddingRight:14,borderRight:"1px solid #e0ddd6",marginRight:4,fontStyle:"italic",letterSpacing:"-0.02em"}}>LWP</span>
        {NAV_ITEMS.map(n => (
          <button key={n.id} onClick={() => go(n.id)} className={"nav-link" + (active === n.id ? " active" : "")}>{n.label}</button>
        ))}
      </nav>

      <button className="ham-btn" onClick={() => setMenuOpen(o => !o)} style={{position:"fixed",top:16,right:16,zIndex:1002,width:42,height:42,borderRadius:10,background:"rgba(255,255,252,0.95)",backdropFilter:"blur(16px)",border:"1px solid #ddd",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
        {[0,1,2].map(i => (
          <span key={i} style={{width:16,height:1.5,background:"#1c1c1c",borderRadius:2,display:"block",transition:"all 0.3s",transform:menuOpen && i===0?"rotate(45deg) translate(4px,4px)":menuOpen && i===2?"rotate(-45deg) translate(4px,-4px)":"none",opacity:menuOpen && i===1?0:1}}/>
        ))}
      </button>

      <div className="mob-menu-wrap" style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1001,pointerEvents:menuOpen?"auto":"none"}}>
        <div onClick={() => setMenuOpen(false)} style={{position:"absolute",inset:0,background:"rgba(250,250,248,0.7)",backdropFilter:"blur(6px)",opacity:menuOpen?1:0,transition:"opacity 0.3s"}}/>
        <div style={{position:"absolute",top:68,right:12,width:210,background:"rgba(255,255,252,0.98)",backdropFilter:"blur(20px)",border:"1px solid #e0ddd6",borderRadius:16,overflow:"hidden",transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",opacity:menuOpen?1:0,transform:menuOpen?"translateY(0) scale(1)":"translateY(-10px) scale(0.97)",boxShadow:"0 20px 50px rgba(0,0,0,0.12)"}}>
          {NAV_ITEMS.map((n,i) => (
            <button key={n.id} onClick={() => go(n.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 18px",background:active===n.id?"#f5f3ef":"transparent",border:"none",borderBottom:i<NAV_ITEMS.length-1?"1px solid #f0ede8":"none",color:active===n.id?"#1c1c1c":"#6b6b6b",fontSize:13,fontWeight:500,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",transition:"background 0.18s",textAlign:"left"}}>
              {n.label}
              {active===n.id && <span style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:"#1a6b4a"}}/>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function Reveal({ children, delay = 0, animation = "fadeUp" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const animations = {
    fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
    fadeIn: "fadeIn 0.6s ease both",
    slideRight: "slideRight 0.65s cubic-bezier(0.22,1,0.36,1) both",
    scaleIn: "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both",
  };
  return (
    <div ref={ref} style={{animation:inView?`${animations[animation]} ${delay}ms`:"none",opacity:inView?undefined:0}}>
      {children}
    </div>
  );
}

function SectionLabel({ num, children }) {
  return (
    <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:44}}>
      <span className="mono" style={{color:"#b0aca2",fontSize:"11px",fontWeight:500,letterSpacing:"0.08em",flexShrink:0}}>0{num}</span>
      <h2 className="serif" style={{fontSize:"clamp(28px,4vw,44px)",color:"#1c1c1c",letterSpacing:"-0.03em",lineHeight:1,fontStyle:"italic"}}>{children}</h2>
      <div style={{flex:1,height:"1px",background:"#e8e5de",marginLeft:12,alignSelf:"center"}}/>
    </div>
  );
}

function Hero() {
  const [imgError, setImgError] = useState(false);
  return (
    <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 0 80px",position:"relative"}}>
      <div className="hero-inner">
        <div className="hero-text">
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",borderRadius:20,background:"#f0faf5",border:"1px solid #c8e6d0",marginBottom:32,animation:"fadeIn 0.8s ease both"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#1a6b4a",animation:"pulse 2.4s ease-in-out infinite",display:"inline-block"}}/>
            <span className="mono" style={{fontSize:"11px",color:"#1a6b4a",fontWeight:500,letterSpacing:"0.06em"}}>TERSEDIA UNTUK PELUANG BARU</span>
          </div>

          <div style={{animation:"fadeUp 0.9s 0.1s cubic-bezier(0.22,1,0.36,1) both"}}>
            <h1 className="serif" style={{fontSize:"clamp(52px,9vw,108px)",lineHeight:0.88,letterSpacing:"-0.04em",color:"#1c1c1c"}}>
              Lintang<br/>
              <span style={{fontStyle:"italic",color:"#1a6b4a"}}>Windy</span>
              <span style={{color:"#d8d5ce",display:"block",fontSize:"0.85em"}}>Pratama</span>
            </h1>
          </div>

          <div style={{animation:"fadeUp 0.9s 0.22s cubic-bezier(0.22,1,0.36,1) both",display:"flex",alignItems:"center",gap:14,margin:"28px 0 32px",flexWrap:"wrap"}}>
            <div style={{width:32,height:1,background:"#c0bcb4"}}/>
            <span style={{fontSize:"clamp(13px,1.6vw,15px)",color:"#6b6b6b",fontWeight:400}}>Full Stack Web Developer</span>
            <span className="tag-badge" style={{background:"#f0faf5",color:"#1a6b4a",border:"1px solid #c8e6d0"}}>Laravel · GIS · REST API</span>
          </div>

          <div style={{animation:"fadeUp 0.9s 0.3s cubic-bezier(0.22,1,0.36,1) both",display:"flex",gap:"clamp(16px,3vw,36px)",marginBottom:36,flexWrap:"wrap"}}>
            {[{val:"2+",lab:"Tahun Pengalaman"},{val:"5",lab:"Daerah"},{val:"7",lab:"Sistem"},{val:"3.92",lab:"IPK"}].map((s,i) => (
              <div key={i} className="stat-card">
                <div className="serif" style={{fontSize:"clamp(22px,3vw,30px)",color:"#1c1c1c",lineHeight:1,fontStyle:"italic"}}>{s.val}</div>
                <div style={{fontSize:11,color:"#a0a09a",letterSpacing:"0.04em",marginTop:5,fontWeight:500}}>{s.lab}</div>
              </div>
            ))}
          </div>

          <div style={{animation:"fadeUp 0.9s 0.38s cubic-bezier(0.22,1,0.36,1) both",display:"flex",gap:8,flexWrap:"wrap"}}>
            {[
              {label:"WhatsApp",      href:"https://wa.me/6285158311928",          primary:true,  icon:"💬"},
              {label:"Email",         href:"mailto:lintangpratama526@gmail.com",    primary:false, icon:"✉️"},
              {label:"LinkedIn",      href:"https://www.linkedin.com/in/lintangpratamaa", primary:false, icon:"🔗"},
              {label:"Download CV",   href:CV, download:true,                        primary:false, icon:"⬇️"},
            ].map((c,i) => (
              <a key={i} href={c.href} {...(c.download ? {download:"CV-Lintang-Windy-Pratama.pdf"} : {target:"_blank",rel:"noreferrer"})}
                className={"cta-btn " + (c.primary ? "cta-primary" : "cta-outline")}
              ><span style={{fontSize:14}}>{c.icon}</span>{c.label}</a>
            ))}
          </div>

          <p style={{maxWidth:500,marginTop:32,fontSize:13,lineHeight:1.9,color:"#9090a0",borderLeft:"2px solid #e8e5de",paddingLeft:16,animation:"fadeIn 0.9s 0.5s ease both"}}>
            Lulusan D3 Manajemen Informatika dengan pengalaman membangun ekosistem sistem pajak daerah — dari pelayanan, pemetaan GIS, pembayaran, penagihan, survey, hingga dashboard analitik — untuk 5 daerah.
          </p>
        </div>

        <div className="hero-photo-wrap" style={{animation:"scaleIn 1s 0.2s cubic-bezier(0.22,1,0.36,1) both",position:"relative",width:"clamp(180px,24vw,270px)",height:"clamp(180px,24vw,270px)",flexShrink:0}}>
          <div className="photo-border-spin"/>
          <div className="photo-border-inner"/>
          <div style={{position:"absolute",inset:6,borderRadius:"50%",overflow:"hidden",background:"#e8e5de",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {imgError ? (
              <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#f5f3ef"}}>
                <span style={{fontSize:52}}>👨‍💻</span>
                <span className="serif" style={{fontSize:11,color:"#b0aca2",marginTop:6,fontStyle:"italic"}}>LWP</span>
              </div>
            ) : (
              <img src={PHOTO} alt="Lintang Windy Pratama" onError={() => setImgError(true)} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            )}
          </div>
        </div>
      </div>

      <div style={{position:"absolute",bottom:32,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeIn 1s 1s ease both"}}>
        <span className="mono" style={{fontSize:"9px",letterSpacing:"0.2em",color:"#c0bcb4",writingMode:"vertical-rl"}}>SCROLL</span>
        <div style={{width:1,height:44,background:"linear-gradient(180deg,#b0aca2,transparent)"}}/>
      </div>
    </section>
  );
}

function ExpCard({ item }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className="exp-card" style={{opacity:inView?1:0,animation:inView?"slideRight 0.7s cubic-bezier(0.22,1,0.36,1) both":"none",borderLeft:`3px solid ${item.color}`,position:"relative"}}>
      <div style={{position:"absolute",top:16,right:16,padding:"3px 10px",background:item.bg,borderRadius:6}}>
        <span className="tag-badge" style={{color:item.color,fontSize:"10px"}}>{item.status}</span>
      </div>
      <h3 style={{fontSize:"clamp(16px,2vw,20px)",fontWeight:600,color:"#1c1c1c",marginBottom:4}}>{item.title}</h3>
      <div style={{fontSize:14,color:item.color,fontWeight:600,marginBottom:3}}>{item.company}</div>
      <div className="mono" style={{color:"#b0aca2",letterSpacing:"0.04em",marginBottom:20,fontSize:"11px"}}>{item.date} · {item.location}</div>
      <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
        {item.bullets.map((b,i) => (
          <li key={i} style={{display:"flex",gap:12,fontSize:13,color:"#6b6b6b",lineHeight:1.7}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:item.color,flexShrink:0,marginTop:"8px"}}/>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillCard({ skill, idx }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className="skill-card" style={{opacity:inView?1:0,animation:inView?`scaleIn 0.6s ${idx*45}ms cubic-bezier(0.22,1,0.36,1) both`:"none",background:skill.bg,border:`1px solid ${skill.color}22`}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <span style={{fontSize:18}}>{skill.icon}</span>
        <span className="tag-badge" style={{color:skill.color,fontSize:"10px",letterSpacing:"0.06em"}}>{skill.category}</span>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {skill.items.map((tag,j) => (
          <span key={j} style={{padding:"5px 11px",borderRadius:7,fontSize:11,background:"rgba(255,255,255,0.8)",color:skill.color,border:`1px solid ${skill.color}30`,fontWeight:500,cursor:"default",transition:"all 0.18s"}}
            onMouseEnter={e => { e.currentTarget.style.background=skill.color; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.8)"; e.currentTarget.style.color=skill.color; }}
          >{tag}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, idx }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{opacity:inView?1:0,animation:inView?`fadeUp 0.7s ${idx*60}ms cubic-bezier(0.22,1,0.36,1) both`:"none"}}>
      <div style={{height:320,perspective:1400}}>
        <div style={{width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",transition:"transform 0.7s cubic-bezier(0.4,0,0.2,1)",transform:flipped?"rotateY(180deg)":"rotateY(0)"}}>

          <div className="proj-card" style={{position:"absolute",inset:0,backfaceVisibility:"hidden",padding:"22px 22px 18px",display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <span className="tag-badge" style={{background:project.light,color:project.color,border:`1px solid ${project.color}28`}}>{project.tag}</span>
                <div style={{width:28,height:2,background:project.color,borderRadius:2,marginTop:8,opacity:0.5}}/>
              </div>
              <span style={{fontSize:32,lineHeight:1,flexShrink:0}}>{project.emoji}</span>
            </div>
            <h3 style={{fontSize:"clamp(13px,1.4vw,15px)",fontWeight:600,color:"#1c1c1c",lineHeight:1.4,marginBottom:8}}>{project.title}</h3>
            <p style={{fontSize:12,color:"#9090a0",lineHeight:1.7,flex:1,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{project.short}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,margin:"12px 0 14px"}}>
              {project.tech.map((t,i) => (
                <span key={i} className="mono" style={{fontSize:"10px",color:"#a0a09a",background:"#f5f3ef",padding:"3px 8px",borderRadius:5,fontWeight:500}}>{t}</span>
              ))}
            </div>
            <button onClick={() => setFlipped(true)} style={{alignSelf:"flex-end",padding:"7px 18px",borderRadius:8,background:project.light,border:`1px solid ${project.color}30`,color:project.color,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.22s",letterSpacing:"0.04em"}}
              onMouseEnter={e => { e.currentTarget.style.background=project.color; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background=project.light; e.currentTarget.style.color=project.color; }}
            >Detail →</button>
          </div>

          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",borderRadius:16,background:project.light,border:`1px solid ${project.color}28`,padding:"22px 22px 18px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <div style={{width:38,height:38,borderRadius:10,background:`${project.color}15`,border:`1px solid ${project.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{project.emoji}</div>
                <div>
                  <div className="tag-badge" style={{color:project.color,fontSize:"9px"}}>{project.tag}</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#1c1c1c",lineHeight:1.3}}>{project.title}</div>
                </div>
              </div>
              <div style={{height:1,background:`${project.color}20`,marginBottom:12}}/>
              <p style={{fontSize:12,color:"#6b6b6b",lineHeight:1.8}}>{project.desc}</p>
            </div>
            <div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                {project.tech.map((t,i) => (
                  <span key={i} style={{fontSize:11,padding:"5px 11px",borderRadius:7,background:"rgba(255,255,255,0.7)",color:project.color,border:`1px solid ${project.color}30`,fontWeight:500}}>{t}</span>
                ))}
              </div>
              <button onClick={() => setFlipped(false)} style={{padding:"7px 16px",borderRadius:8,background:"rgba(255,255,255,0.6)",border:"1px solid rgba(0,0,0,0.12)",color:"#6b6b6b",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.22s"}}
                onMouseEnter={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#1c1c1c"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.6)"; e.currentTarget.style.color="#6b6b6b"; }}
              >← Kembali</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EduCard({ edu, idx }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{opacity:inView?1:0,animation:inView?`fadeUp 0.7s ${idx*120}ms cubic-bezier(0.22,1,0.36,1) both`:"none",padding:"clamp(22px,3vw,32px)",background:"#fff",border:"1px solid #e8e5de",borderRadius:16,position:"relative",overflow:"hidden",transition:"box-shadow 0.25s"}}
      onMouseEnter={e => e.currentTarget.style.boxShadow="0 12px 36px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow="none"}
    >
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${edu.color},${edu.color}30)`}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14,marginBottom:8}}>
        <div>
          <h3 style={{fontSize:"clamp(15px,2vw,18px)",fontWeight:600,color:"#1c1c1c",marginBottom:5}}>{edu.degree}</h3>
          <div style={{fontSize:13,color:edu.color,fontWeight:600}}>{edu.school}</div>
        </div>
        {edu.gpa && (
          <div style={{padding:"12px 18px",background:edu.bg,border:`1px solid ${edu.color}30`,borderRadius:12,textAlign:"center",flexShrink:0}}>
            <div className="serif" style={{fontSize:22,color:edu.color,lineHeight:1,fontStyle:"italic"}}>{edu.gpa}</div>
            <div className="mono" style={{fontSize:"9px",color:"#b0aca2",letterSpacing:"0.06em",marginTop:3}}>IPK</div>
          </div>
        )}
      </div>
      <div className="mono" style={{color:"#c0bcb4",letterSpacing:"0.04em",marginBottom:18,fontSize:"10px"}}>{edu.period}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {edu.achievements.map((a,i) => (
          <span key={i} style={{fontSize:12,color:"#5a5a5a",padding:"6px 13px",background:"#f8f6f2",border:"1px solid #eeebe5",borderRadius:8}}>{a}</span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <ScrollBar/>
      <FloatingNav/>

      <main style={{maxWidth:1100,margin:"0 auto",padding:"0 clamp(18px,5vw,56px)",position:"relative",zIndex:1}}>
        <Hero/>
        <div className="section-divider"/>

        <section id="experience" style={{paddingTop:88,paddingBottom:88}}>
          <Reveal><SectionLabel num={1}>Pengalaman Kerja</SectionLabel></Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            {EXPERIENCES.map((item,i) => <ExpCard key={i} item={item}/>)}
          </div>
        </section>
        <div className="section-divider"/>

        <section id="skills" style={{paddingTop:88,paddingBottom:88}}>
          <Reveal><SectionLabel num={2}>Keahlian & Teknologi</SectionLabel></Reveal>
          <div className="skill-grid">
            {SKILLS.map((s,i) => <SkillCard key={i} skill={s} idx={i}/>)}
          </div>
        </section>
        <div className="section-divider"/>

        <section id="projects" style={{paddingTop:88,paddingBottom:88}}>
          <Reveal><SectionLabel num={3}>Proyek</SectionLabel></Reveal>
          <Reveal delay={60}>
            <div style={{display:"flex",alignItems:"flex-start",gap:18,marginBottom:32,padding:"18px 24px",background:"#f5f3ef",borderRadius:14,border:"1px solid #e8e5de",flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
                <div style={{width:36,height:36,borderRadius:10,background:"#fff",border:"1px solid #e0ddd6",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏢</div>
                <div>
                  <div className="mono" style={{fontSize:"9px",color:"#b0aca2",letterSpacing:"0.06em",marginBottom:2}}>CAKUPAN</div>
                  <div style={{fontSize:15,fontWeight:600,color:"#1c1c1c"}}>7 Sistem · 5 Daerah</div>
                </div>
              </div>
              <div style={{width:1,background:"#e8e5de",alignSelf:"stretch"}}/>
              <p style={{fontSize:13,color:"#7a7a7a",lineHeight:1.8,flex:1,minWidth:220}}>
                Ketujuh sistem dikembangkan dan di-deploy untuk <span style={{color:"#1a6b4a",fontWeight:600}}>5 daerah (kota/kabupaten)</span>. Setiap daerah menjalankan ekosistem aplikasi pajak yang saling terintegrasi.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="mono" style={{fontSize:"11px",color:"#c0bcb4",letterSpacing:"0.06em",marginBottom:20}}>↺ klik "Detail" untuk melihat informasi lengkap</p>
          </Reveal>
          <div className="proj-grid">
            {PROJECTS.map((p,i) => <ProjectCard key={p.id} project={p} idx={i}/>)}
          </div>
        </section>
        <div className="section-divider"/>

        <section id="education" style={{paddingTop:88,paddingBottom:88}}>
          <Reveal><SectionLabel num={4}>Pendidikan</SectionLabel></Reveal>
          <div className="edu-grid">
            {EDUCATION.map((edu,i) => <EduCard key={i} edu={edu} idx={i}/>)}
          </div>
        </section>
      </main>

      <footer style={{borderTop:"1px solid #e8e5de",padding:"44px clamp(18px,5vw,56px)",background:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:18}}>
          <div>
            <div className="serif" style={{fontSize:17,color:"#1c1c1c",marginBottom:4,fontStyle:"italic"}}>Lintang Windy Pratama</div>
            <div style={{fontSize:12,color:"#b0aca2"}}>© 2024 · Full Stack Web Developer · Kediri, Jawa Timur</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            {[{l:"in",h:"https://www.linkedin.com/in/lintangpratamaa"},{l:"✉",h:"mailto:lintangpratama526@gmail.com"},{l:"📱",h:"https://wa.me/6285158311928"}].map((s,i) => (
              <a key={i} href={s.h} target="_blank" rel="noreferrer" style={{width:38,height:38,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #e0ddd6",color:"#9090a0",textDecoration:"none",fontSize:14,transition:"all 0.22s",background:"#fff"}}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#1a6b4a"; e.currentTarget.style.color="#1a6b4a"; e.currentTarget.style.background="#f0faf5"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#e0ddd6"; e.currentTarget.style.color="#9090a0"; e.currentTarget.style.background="#fff"; e.currentTarget.style.transform="translateY(0)"; }}
              >{s.l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}