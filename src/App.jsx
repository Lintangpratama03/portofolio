import { useState, useEffect, useRef, useCallback } from "react";

const PHOTO = "/lintang.jpeg";
const CV    = "/cv.pdf";

const SKILLS = [
  { category: "Backend",    icon: "⚙", accent: "#4f46e5", items: ["Laravel","CodeIgniter","REST API","Livewire"] },
  { category: "Frontend",   icon: "◈", accent: "#0ea5e9", items: ["HTML","CSS","JavaScript"] },
  { category: "Database",   icon: "▦", accent: "#10b981", items: ["PostgreSQL","MySQL","Oracle"] },
  { category: "Web GIS",    icon: "◉", accent: "#f59e0b", items: ["Google Maps API","Leaflet","Spatial Data","Spatial Query"] },
  { category: "DevOps",     icon: "◫", accent: "#8b5cf6", items: ["Git","GitHub","Linux","Docker","SSH","CloudFlare"] },
  { category: "Networking", icon: "◎", accent: "#06b6d4", items: ["TCP/IP","LAN/WAN","VPN Config","Firewall"] },
  { category: "Integration",icon: "⬡", accent: "#ec4899", items: ["WhatsApp API","Payment Gateway"] },
];

const PROJECTS = [
  { id:1, tag:"GOV·SYS",   emoji:"🏛", color:"#4f46e5",
    title:"Sistem Pelayanan Pajak Daerah",
    short:"Platform terpadu pendaftaran, verifikasi & administrasi wajib pajak secara digital.",
    desc:"Platform pelayanan komprehensif untuk pengelolaan data wajib pajak dan objek pajak. Mencakup alur pendaftaran, verifikasi dokumen, validasi data, dan seluruh layanan administrasi pajak daerah secara digital dan terintegrasi.",
    tech:["Laravel","PostgreSQL","REST API","Livewire"] },
  { id:2, tag:"WEB·GIS",   emoji:"🗺", color:"#0ea5e9",
    title:"Sistem Peta Pajak Daerah",
    short:"Visualisasi geospasial objek & zona pajak berbasis Google Maps secara real-time.",
    desc:"Aplikasi Web GIS interaktif untuk visualisasi dan pemetaan seluruh objek pajak. Menampilkan data spasial properti, batas wilayah administratif, zona nilai tanah, dan informasi geografis perpajakan secara real-time.",
    tech:["Laravel","Google Maps API","PostgreSQL","Spatial Data"] },
  { id:3, tag:"FINTECH",   emoji:"💳", color:"#10b981",
    title:"Sistem Pembayaran Pajak Daerah",
    short:"Pembayaran online real-time dengan integrasi payment gateway multi-channel.",
    desc:"Platform pembayaran pajak online yang aman dan efisien. Dilengkapi monitoring status pembayaran real-time, laporan transaksi otomatis, rekonsiliasi data, dan integrasi payment gateway untuk berbagai metode pembayaran.",
    tech:["Laravel","REST API","MySQL","Payment Gateway"] },
  { id:4, tag:"ANALYTICS", emoji:"📊", color:"#f59e0b",
    title:"Dashboard Analitik Pajak Daerah",
    short:"Monitoring tagihan, analisis & statistik pajak dengan grafik interaktif real-time.",
    desc:"Dashboard monitoring komprehensif untuk tracking status tagihan, analisis data pembayaran, dan visualisasi statistik pajak. Dilengkapi grafik interaktif, real-time analytics, dan laporan eksekutif untuk mendukung pengambilan keputusan strategis.",
    tech:["Livewire","Chart.js","Oracle","Data Analytics"] },
  { id:5, tag:"OPS·SYS",   emoji:"📋", color:"#8b5cf6",
    title:"Aplikasi Penagihan Pajak Daerah",
    short:"Tracking tunggakan, notifikasi otomatis WhatsApp & laporan realisasi penagihan.",
    desc:"Sistem penagihan pajak terintegrasi dengan fitur tracking tunggakan, notifikasi otomatis via WhatsApp, penjadwalan penagihan, dan laporan realisasi. Meningkatkan efektivitas pengumpulan pajak secara signifikan.",
    tech:["Laravel","PostgreSQL","Livewire","WhatsApp API"] },
  { id:6, tag:"SURVEY",    emoji:"📡", color:"#06b6d4",
    title:"Aplikasi Survey Data Pajak",
    short:"Pengumpulan & sinkronisasi data lapangan objek pajak secara digital offline-online.",
    desc:"Aplikasi mobile-friendly untuk petugas lapangan dalam melakukan survey dan pendataan objek pajak. Mendukung pengambilan foto, input data spasial, sinkronisasi offline-online, dan validasi otomatis data hasil survei ke database pusat.",
    tech:["Laravel","REST API","PostgreSQL","Leaflet"] },
  { id:7, tag:"GIS·MAP",   emoji:"🌾", color:"#ec4899",
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
  { id:"hero", label:"Home" },
  { id:"experience", label:"Experience" },
  { id:"skills", label:"Skills" },
  { id:"projects", label:"Projects" },
  { id:"education", label:"Education" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#f4f2ee;color:#1a1a2e;font-family:'DM Sans',sans-serif;overflow-x:hidden;cursor:none}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#ede9e3}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#4f46e5,#0ea5e9);border-radius:2px}
::selection{background:rgba(79,70,229,0.14);color:#4f46e5}
.serif{font-family:'Cormorant Garamond',serif}
.mono{font-family:'DM Mono',monospace}

@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes floatY2{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-8px) rotate(-6deg)}}
@keyframes spinCW{to{transform:rotate(360deg)}}
@keyframes spinCCW{to{transform:rotate(-360deg)}}
@keyframes dotBlink{0%,100%{opacity:1}50%{opacity:0.2}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes orbDrift1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(60px,-40px) scale(1.07)}70%{transform:translate(-30px,28px) scale(0.95)}}
@keyframes orbDrift2{0%,100%{transform:translate(0,0)}45%{transform:translate(-55px,45px)}75%{transform:translate(35px,-25px)}}
@keyframes shimmerText{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes fadeSlideUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
@keyframes badgeFloat{0%,100%{transform:perspective(400px) rotateY(-8deg) rotateX(5deg) translateY(0)}50%{transform:perspective(400px) rotateY(-8deg) rotateX(5deg) translateY(-10px)}}
@keyframes badgeFloat2{0%,100%{transform:perspective(400px) rotateY(8deg) rotateX(-5deg) translateY(0)}50%{transform:perspective(400px) rotateY(8deg) rotateX(-5deg) translateY(-8px)}}

.noise{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.022;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px 200px}
.grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(79,70,229,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(79,70,229,0.032) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)}
.orb-1{position:fixed;width:720px;height:720px;top:-260px;right:-220px;border-radius:50%;background:radial-gradient(circle,rgba(79,70,229,0.07) 0%,transparent 70%);animation:orbDrift1 28s ease-in-out infinite;pointer-events:none;z-index:0}
.orb-2{position:fixed;width:580px;height:580px;bottom:-190px;left:-130px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.06) 0%,transparent 70%);animation:orbDrift2 34s ease-in-out infinite;pointer-events:none;z-index:0}
.orb-3{position:fixed;width:360px;height:360px;top:42%;left:38%;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.04) 0%,transparent 70%);animation:orbDrift1 22s ease-in-out 4s infinite;pointer-events:none;z-index:0}

.card-3d{background:rgba(255,255,255,0.82);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.96);border-radius:20px;box-shadow:0 2px 8px rgba(26,26,46,0.05),0 8px 32px rgba(26,26,46,0.08),0 0 0 1px rgba(255,255,255,0.5);transition:box-shadow 0.15s ease,transform 0.15s ease;transform-style:preserve-3d;position:relative;overflow:hidden}
.card-shine{position:absolute;inset:0;border-radius:20px;pointer-events:none;z-index:10;transition:opacity 0.3s;opacity:0}

.shimmer-text{background:linear-gradient(135deg,#4f46e5 0%,#0ea5e9 40%,#10b981 70%,#4f46e5 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmerText 6s linear infinite}

.badge{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:2px;padding:3px 10px;border-radius:4px;font-weight:500;text-transform:uppercase}
.divider{height:1px;background:linear-gradient(90deg,transparent,rgba(79,70,229,0.14),rgba(14,165,233,0.12),transparent)}
.section-num{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:1px solid rgba(79,70,229,0.2);font-family:'DM Mono',monospace;font-size:11px;color:#4f46e5;flex-shrink:0}

.desktop-nav{display:flex!important}
.ham-btn{display:none!important}
.mob-menu-wrap{display:none!important}
@media(max-width:700px){.desktop-nav{display:none!important}.ham-btn{display:flex!important}.mob-menu-wrap{display:block!important}}

.hero-inner{display:flex;align-items:center;gap:clamp(40px,6vw,100px);flex-wrap:wrap}
.hero-text{flex:1;min-width:280px;z-index:2;position:relative}
.hero-photo-wrap{flex-shrink:0;z-index:2;position:relative}
@media(max-width:700px){.hero-inner{flex-direction:column-reverse;text-align:center}.hero-photo-wrap{margin-bottom:12px}.cta-row{justify-content:center!important}.stat-row{justify-content:center!important}}

.proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:1024px){.proj-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.proj-grid{grid-template-columns:1fr}}
.skill-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}
.edu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}

.marquee-wrap{overflow:hidden;width:100%}
.marquee-inner{display:flex;width:max-content;animation:marquee 20s linear infinite}
.marquee-wrap:hover .marquee-inner{animation-play-state:paused}
`;

/* THREE.JS BACKGROUND */
function ThreeCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    let animId, renderer, scene, camera;
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      const THREE = window.THREE;
      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.z = 6;

      /* Particle cloud */
      const N = 2000;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const palette = [[0.31,0.27,0.9],[0.055,0.647,0.914],[0.063,0.725,0.506],[0.545,0.361,0.965],[0.9,0.62,0.08],[0.925,0.22,0.60]];
      for (let i = 0; i < N; i++) {
        pos[i*3]   = (Math.random()-0.5)*28;
        pos[i*3+1] = (Math.random()-0.5)*28;
        pos[i*3+2] = (Math.random()-0.5)*18;
        const c = palette[Math.floor(Math.random()*palette.length)];
        col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2];
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
      const pMat = new THREE.PointsMaterial({ size:0.05, vertexColors:true, transparent:true, opacity:0.5 });
      const pts = new THREE.Points(geo, pMat);
      scene.add(pts);

      /* Wireframe 3D shapes */
      const shapes3d = [
        { g: new THREE.OctahedronGeometry(0.9,0),    c:0x4f46e5, x:-3.8, y:1.6,  z:-2,   sx:0.003, sy:0.005 },
        { g: new THREE.TetrahedronGeometry(0.75,0),  c:0x0ea5e9, x: 4.0, y:-1.4, z:-1.5, sx:0.006, sy:0.004 },
        { g: new THREE.IcosahedronGeometry(0.7,0),   c:0x10b981, x:-4.2, y:-2.2, z:-3,   sx:0.004, sy:0.003 },
        { g: new THREE.TorusGeometry(0.55,0.16,8,24),c:0x8b5cf6, x: 3.2, y:2.4,  z:-2.5, sx:0.007, sy:0.005 },
        { g: new THREE.DodecahedronGeometry(0.65,0), c:0xf59e0b, x: 0.4, y:3.0,  z:-3.5, sx:0.004, sy:0.006 },
        { g: new THREE.OctahedronGeometry(0.5,0),    c:0xec4899, x:-1.8, y:-2.8, z:-2,   sx:0.008, sy:0.004 },
        { g: new THREE.TorusGeometry(0.4,0.12,6,18), c:0x06b6d4, x: 1.5, y:-3.2, z:-2.5, sx:0.005, sy:0.007 },
      ];
      const meshes = shapes3d.map(s => {
        const m = new THREE.Mesh(s.g, new THREE.MeshBasicMaterial({ color:s.c, wireframe:true, transparent:true, opacity:0.16 }));
        m.position.set(s.x, s.y, s.z);
        m.userData = { sx:s.sx, sy:s.sy, ox:s.x, oy:s.y };
        scene.add(m);
        return m;
      });

      let mouse = {x:0, y:0}, t = 0;
      const onMove = e => {
        mouse.x = (e.clientX/window.innerWidth  - 0.5) * 0.8;
        mouse.y = -(e.clientY/window.innerHeight - 0.5) * 0.8;
      };
      window.addEventListener("mousemove", onMove);

      const tick = () => {
        animId = requestAnimationFrame(tick);
        t += 0.007;
        pts.rotation.y += 0.0002;
        pts.rotation.x += 0.00008;
        camera.position.x += (mouse.x - camera.position.x) * 0.022;
        camera.position.y += (mouse.y - camera.position.y) * 0.022;
        camera.lookAt(0,0,0);
        meshes.forEach((m, i) => {
          m.rotation.x += m.userData.sx;
          m.rotation.y += m.userData.sy;
          m.position.y = m.userData.oy + Math.sin(t*0.55 + i*1.1) * 0.65;
          m.position.x = m.userData.ox + Math.cos(t*0.38 + i*0.85) * 0.22;
        });
        renderer.render(scene, camera);
      };
      tick();

      const onResize = () => {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
      };
    };
    document.head.appendChild(script);
    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
      try { document.head.removeChild(script); } catch(e) {}
    };
  }, []);
  return <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}}/>;
}

function Background() {
  return (
    <>
      <div className="noise"/>
      <div className="grid-bg"/>
      <div className="orb-1"/><div className="orb-2"/><div className="orb-3"/>
      <ThreeCanvas/>
      {[{t:14,l:14,bt:1,bl:1},{t:14,r:14,bt:1,br:1},{b:14,l:14,bb:1,bl:1},{b:14,r:14,bb:1,br:1}].map((c,i)=>(
        <div key={i} style={{position:"fixed",width:22,height:22,pointerEvents:"none",zIndex:1,top:c.t,bottom:c.b,left:c.l,right:c.r,borderTop:c.bt?"1px solid rgba(79,70,229,0.18)":undefined,borderBottom:c.bb?"1px solid rgba(79,70,229,0.18)":undefined,borderLeft:c.bl?"1px solid rgba(79,70,229,0.18)":undefined,borderRight:c.br?"1px solid rgba(79,70,229,0.18)":undefined}}/>
      ))}
    </>
  );
}

/* CURSOR */
function Cursor() {
  const ring=useRef(null), dot=useRef(null);
  useEffect(()=>{
    let mx=0,my=0,fx=0,fy=0,raf;
    const mv=e=>{mx=e.clientX;my=e.clientY;};
    document.addEventListener("mousemove",mv);
    const loop=()=>{fx+=(mx-fx)*0.1;fy+=(my-fy)*0.1;if(ring.current){ring.current.style.left=fx+"px";ring.current.style.top=fy+"px";}if(dot.current){dot.current.style.left=mx+"px";dot.current.style.top=my+"px";}raf=requestAnimationFrame(loop);};
    loop();
    return ()=>{document.removeEventListener("mousemove",mv);cancelAnimationFrame(raf);};
  },[]);
  return (<>
    <div ref={ring} style={{position:"fixed",width:34,height:34,border:"1.5px solid rgba(79,70,229,0.35)",borderRadius:"50%",pointerEvents:"none",zIndex:99999,transform:"translate(-50%,-50%)",boxShadow:"0 0 14px rgba(79,70,229,0.1)"}}/>
    <div ref={dot}  style={{position:"fixed",width:5,height:5,background:"#4f46e5",borderRadius:"50%",pointerEvents:"none",zIndex:99999,transform:"translate(-50%,-50%)",boxShadow:"0 0 8px rgba(79,70,229,0.5)"}}/>
  </>);
}

/* SCROLL BAR */
function ScrollBar() {
  const [p,setP]=useState(0);
  useEffect(()=>{const fn=()=>{const s=document.documentElement.scrollHeight-window.innerHeight;setP(s>0?(window.scrollY/s)*100:0);};window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return (<div style={{position:"fixed",top:0,left:0,right:0,height:2,zIndex:9999,background:"rgba(26,26,46,0.05)"}}><div style={{height:"100%",width:p+"%",background:"linear-gradient(90deg,#4f46e5,#0ea5e9,#10b981)",transition:"width 0.1s",boxShadow:"0 0 8px rgba(79,70,229,0.35)"}}/></div>);
}

/* ACTIVE SECTION */
function useActiveSection() {
  const [a,setA]=useState("hero");
  useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setA(e.target.id)}),{threshold:0.28});NAV_ITEMS.forEach(n=>{const el=document.getElementById(n.id);if(el)o.observe(el);});return()=>o.disconnect();},[]);
  return a;
}

/* NAV */
function FloatingNav() {
  const active=useActiveSection();
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>60);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const go=useCallback(id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setOpen(false);},[]);
  return (<>
    <nav className="desktop-nav" style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:1000,display:"flex",alignItems:"center",gap:2,padding:"6px 6px 6px 20px",background:scrolled?"rgba(244,242,238,0.95)":"rgba(244,242,238,0.65)",backdropFilter:"blur(28px)",border:`1px solid ${scrolled?"rgba(79,70,229,0.18)":"rgba(79,70,229,0.08)"}`,borderRadius:60,boxShadow:scrolled?"0 8px 40px rgba(26,26,46,0.1)":"none",transition:"all 0.4s",whiteSpace:"nowrap"}}>
      <span className="mono" style={{fontSize:10,letterSpacing:4,color:"#4f46e5",paddingRight:16,borderRight:"1px solid rgba(79,70,229,0.12)",marginRight:4,fontWeight:500}}>LWP</span>
      {NAV_ITEMS.map(n=>(
        <button key={n.id} onClick={()=>go(n.id)} style={{padding:"8px 16px",borderRadius:50,border:"none",cursor:"pointer",fontSize:12,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all 0.25s",background:active===n.id?"rgba(79,70,229,0.1)":"transparent",color:active===n.id?"#4f46e5":"rgba(26,26,46,0.42)",boxShadow:active===n.id?"inset 0 0 0 1px rgba(79,70,229,0.2)":"none"}}
          onMouseEnter={e=>{if(active!==n.id)e.currentTarget.style.color="rgba(26,26,46,0.8)";}}
          onMouseLeave={e=>{if(active!==n.id)e.currentTarget.style.color="rgba(26,26,46,0.42)";}}
        >{n.label}</button>
      ))}
    </nav>
    <button className="ham-btn" onClick={()=>setOpen(o=>!o)} style={{position:"fixed",top:16,right:16,zIndex:1002,width:44,height:44,borderRadius:12,background:"rgba(244,242,238,0.95)",backdropFilter:"blur(20px)",border:`1px solid ${open?"rgba(79,70,229,0.3)":"rgba(79,70,229,0.12)"}`,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer",transition:"all 0.3s"}}>
      {[0,1,2].map(i=><span key={i} style={{width:16,height:1.5,background:"#4f46e5",display:"block",borderRadius:2,transition:"all 0.3s",transform:open&&i===0?"rotate(45deg) translate(4px,4px)":open&&i===2?"rotate(-45deg) translate(4px,-4px)":"none",opacity:open&&i===1?0:1}}/>)}
    </button>
    <div className="mob-menu-wrap" style={{position:"fixed",inset:0,zIndex:1001,pointerEvents:open?"auto":"none"}}>
      <div onClick={()=>setOpen(false)} style={{position:"absolute",inset:0,background:"rgba(244,242,238,0.5)",backdropFilter:"blur(8px)",opacity:open?1:0,transition:"opacity 0.3s"}}/>
      <div style={{position:"absolute",top:70,right:12,width:220,background:"rgba(255,255,255,0.97)",backdropFilter:"blur(20px)",border:"1px solid rgba(79,70,229,0.12)",borderRadius:18,overflow:"hidden",transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",opacity:open?1:0,transform:open?"translateY(0)":"translateY(-10px)",boxShadow:"0 20px 60px rgba(26,26,46,0.12)"}}>
        {NAV_ITEMS.map((n,i)=>(
          <button key={n.id} onClick={()=>go(n.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"13px 18px",background:active===n.id?"rgba(79,70,229,0.06)":"transparent",border:"none",borderBottom:i<NAV_ITEMS.length-1?"1px solid rgba(26,26,46,0.05)":"none",color:active===n.id?"#4f46e5":"rgba(26,26,46,0.6)",fontSize:13,fontWeight:500,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",transition:"all 0.2s"}}>
            {n.label}{active===n.id&&<span style={{width:6,height:6,borderRadius:"50%",background:"#4f46e5"}}/>}
          </button>
        ))}
      </div>
    </div>
  </>);
}

/* INVIEW + REVEAL */
function useInView(ref, threshold=0.1) {
  const [v,setV]=useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold});o.observe(el);return()=>o.disconnect();},[ref,threshold]);
  return v;
}
function Reveal({children,delay=0}) {
  const ref=useRef(null);const v=useInView(ref);
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(26px)",transition:`opacity 0.85s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.85s cubic-bezier(0.4,0,0.2,1) ${delay}ms`}}>{children}</div>;
}

/* 3D TILT CARD */
function TiltCard({children,style={},intensity=12}) {
  const ref=useRef(null);
  const onMove=useCallback(e=>{
    const el=ref.current;if(!el)return;
    const r=el.getBoundingClientRect();
    const dx=(e.clientX-r.left-r.width/2)/r.width;
    const dy=(e.clientY-r.top-r.height/2)/r.height;
    const rx=-dy*intensity, ry=dx*intensity;
    el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
    el.style.boxShadow=`${-ry*1.8}px ${rx*1.8}px 50px rgba(26,26,46,0.14),0 20px 60px rgba(79,70,229,0.09),0 0 0 1px rgba(79,70,229,0.07)`;
    const s=el.querySelector(".shine");
    if(s){s.style.background=`radial-gradient(circle at ${(dx+0.5)*100}% ${(dy+0.5)*100}%,rgba(255,255,255,0.38) 0%,transparent 55%)`;s.style.opacity="1";}
  },[intensity]);
  const onLeave=useCallback(e=>{
    const el=ref.current;if(!el)return;
    el.style.transform="perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    el.style.boxShadow="0 2px 8px rgba(26,26,46,0.05),0 8px 32px rgba(26,26,46,0.08),0 0 0 1px rgba(255,255,255,0.5)";
    const s=el.querySelector(".shine");if(s)s.style.opacity="0";
  },[]);
  return (
    <div ref={ref} className="card-3d" style={{transition:"transform 0.14s ease,box-shadow 0.14s ease",...style}} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="card-shine shine"/>
      {children}
    </div>
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
  const [imgErr,setImgErr]=useState(false);
  const [show,setShow]=useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),80);},[]);
  const a=d=>({opacity:show?1:0,transform:show?"none":"translateY(32px)",transition:`opacity 0.95s cubic-bezier(0.4,0,0.2,1) ${d}ms,transform 0.95s cubic-bezier(0.4,0,0.2,1) ${d}ms`});
  return (
    <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 0 80px",position:"relative"}}>
      {/* Marquee */}
      <div style={{...a(0),marginBottom:48}}>
        <div className="marquee-wrap" style={{padding:"11px 0",borderTop:"1px solid rgba(79,70,229,0.07)",borderBottom:"1px solid rgba(79,70,229,0.07)"}}>
          <div className="marquee-inner">
            {[...Array(3)].map((_,k)=>(
              <div key={k} style={{display:"flex",alignItems:"center",gap:24,paddingRight:24}}>
                {["Full Stack Developer","Web GIS Specialist","Laravel Expert","REST API","PostgreSQL","Docker","Linux Server","GPA 3.92"].map((t,i)=>(
                  <span key={i} style={{display:"flex",alignItems:"center",gap:14,fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(26,26,46,0.3)",letterSpacing:2,whiteSpace:"nowrap"}}>
                    <span style={{width:3,height:3,borderRadius:"50%",background:"rgba(79,70,229,0.3)",display:"inline-block",flexShrink:0}}/>{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-inner">
        {/* TEXT */}
        <div className="hero-text">
          <div style={{...a(150),display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"#10b981",display:"inline-block",animation:"dotBlink 2s infinite"}}/>
            <span className="mono" style={{fontSize:10,letterSpacing:4,color:"#10b981",fontWeight:500}}>AVAILABLE FOR WORK</span>
          </div>
          <div style={a(250)}>
            <h1 className="serif" style={{fontSize:"clamp(52px,9vw,112px)",fontWeight:700,lineHeight:0.87,letterSpacing:-3,color:"#1a1a2e",marginBottom:2}}>Lintang</h1>
            <h1 className="serif shimmer-text" style={{fontSize:"clamp(52px,9vw,112px)",fontWeight:700,lineHeight:0.87,letterSpacing:-3,marginBottom:2}}>Windy</h1>
            <h1 className="serif" style={{fontSize:"clamp(52px,9vw,112px)",fontWeight:700,lineHeight:0.87,letterSpacing:-3,color:"rgba(26,26,46,0.09)",marginBottom:32}}>Pratama</h1>
          </div>
          <div style={{...a(340),display:"flex",alignItems:"center",gap:12,marginBottom:24,flexWrap:"wrap"}}>
            <div style={{width:32,height:1,background:"rgba(79,70,229,0.3)"}}/>
            <span style={{fontSize:14,color:"rgba(26,26,46,0.48)"}}>Full Stack Web Developer</span>
            <span className="badge" style={{background:"rgba(79,70,229,0.07)",color:"#4f46e5",border:"1px solid rgba(79,70,229,0.14)"}}>Laravel · GIS · API</span>
          </div>
          <div className="stat-row" style={{...a(420),display:"flex",gap:32,marginBottom:36,flexWrap:"wrap"}}>
            {[{val:"2+",lab:"Years"},{val:"5",lab:"Daerah"},{val:"7",lab:"Systems"},{val:"3.92",lab:"GPA"}].map((s,i)=>(
              <div key={i}>
                <div className="serif" style={{fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700,color:"#1a1a2e",lineHeight:1}}>{s.val}</div>
                <div className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.28)",letterSpacing:3,marginTop:4}}>{s.lab}</div>
              </div>
            ))}
          </div>
          <div className="cta-row" style={{...a(500),display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {label:"WhatsApp",href:"https://wa.me/6285158311928",primary:true},
              {label:"Email",href:"mailto:lintangpratama526@gmail.com"},
              {label:"LinkedIn",href:"https://www.linkedin.com/in/lintangpratamaa"},
              {label:"Download CV",href:CV,download:true},
            ].map((c,i)=>(
              <a key={i} href={c.href} {...(c.download?{download:"CV-Lintang.pdf"}:{target:"_blank",rel:"noreferrer"})}
                style={{display:"flex",alignItems:"center",gap:7,padding:c.primary?"11px 22px":"11px 18px",borderRadius:10,textDecoration:"none",fontSize:13,fontWeight:500,transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",background:c.primary?"#1a1a2e":"rgba(255,255,255,0.78)",border:c.primary?"1px solid #1a1a2e":"1px solid rgba(26,26,46,0.1)",color:c.primary?"#f4f2ee":"rgba(26,26,46,0.6)",boxShadow:c.primary?"0 6px 20px rgba(26,26,46,0.18)":"0 2px 8px rgba(26,26,46,0.04)"}}
                onMouseEnter={e=>{
                  if(c.primary)Object.assign(e.currentTarget.style,{background:"#4f46e5",borderColor:"#4f46e5",boxShadow:"0 12px 32px rgba(79,70,229,0.4)",transform:"translateY(-3px) scale(1.03)"});
                  else Object.assign(e.currentTarget.style,{background:"rgba(255,255,255,0.97)",borderColor:"rgba(79,70,229,0.22)",color:"#4f46e5",transform:"translateY(-3px) scale(1.03)",boxShadow:"0 12px 32px rgba(26,26,46,0.1)"});
                }}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:c.primary?"#1a1a2e":"rgba(255,255,255,0.78)",borderColor:c.primary?"#1a1a2e":"rgba(26,26,46,0.1)",color:c.primary?"#f4f2ee":"rgba(26,26,46,0.6)",transform:"none",boxShadow:c.primary?"0 6px 20px rgba(26,26,46,0.18)":"0 2px 8px rgba(26,26,46,0.04)"})}
              >{c.label}</a>
            ))}
          </div>
          <p style={{...a(580),maxWidth:480,marginTop:28,fontSize:13,lineHeight:1.9,color:"rgba(26,26,46,0.36)",borderLeft:"2px solid rgba(79,70,229,0.14)",paddingLeft:16}}>
            Lulusan D3 Manajemen Informatika, berpengalaman membangun ekosistem sistem pajak daerah — pelayanan, pemetaan GIS, pembayaran, penagihan, survey, hingga dashboard analitik — untuk 5 daerah.
          </p>
        </div>

        {/* PHOTO with 3D rings */}
        <div className="hero-photo-wrap" style={a(280)}>
          <div style={{position:"relative",width:"clamp(200px,24vw,290px)",height:"clamp(200px,24vw,290px)"}}>
            <div style={{position:"absolute",inset:-22,borderRadius:"50%",border:"1px dashed rgba(79,70,229,0.16)",animation:"spinCW 26s linear infinite"}}/>
            <div style={{position:"absolute",inset:-14,borderRadius:"50%",border:"1px solid rgba(14,165,233,0.11)",animation:"spinCCW 20s linear infinite"}}/>
            {/* Color ring */}
            <div style={{position:"absolute",inset:-5,borderRadius:"50%",background:"conic-gradient(from 0deg,#4f46e5,#0ea5e9,#10b981,#8b5cf6,#ec4899,#4f46e5)",animation:"spinCW 9s linear infinite",opacity:0.65}}/>
            <div style={{position:"absolute",inset:-2,borderRadius:"50%",background:"#f4f2ee"}}/>
            {/* Photo */}
            <div style={{position:"absolute",inset:0,borderRadius:"50%",overflow:"hidden",background:"#e5e0d8",boxShadow:"0 0 0 4px white,0 24px 60px rgba(79,70,229,0.22),0 8px 24px rgba(26,26,46,0.14)"}}>
              {imgErr?(
                <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,rgba(79,70,229,0.1),rgba(14,165,233,0.05))"}}>
                  <span style={{fontSize:56}}>👨‍💻</span>
                  <span className="mono" style={{fontSize:9,color:"rgba(79,70,229,0.5)",letterSpacing:3}}>LWP</span>
                </div>
              ):(
                <img src={PHOTO} alt="Lintang" onError={()=>setImgErr(true)} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
              )}
            </div>
            {/* Depth shadow */}
            <div style={{position:"absolute",bottom:-30,left:"50%",transform:"translateX(-50%)",width:"90%",height:40,background:"radial-gradient(ellipse,rgba(79,70,229,0.25),transparent)",filter:"blur(14px)"}}/>

            {/* 3D badge: GPA */}
            <div style={{position:"absolute",top:-10,right:-18,background:"rgba(255,255,255,0.93)",backdropFilter:"blur(16px)",border:"1px solid rgba(79,70,229,0.14)",borderRadius:14,padding:"9px 16px",boxShadow:"0 10px 36px rgba(79,70,229,0.14),0 2px 8px rgba(26,26,46,0.06),0 0 0 1px rgba(255,255,255,0.7)",animation:"badgeFloat 4.5s ease-in-out infinite"}}>
              <div className="mono" style={{fontSize:8,color:"rgba(26,26,46,0.28)",letterSpacing:2,marginBottom:2}}>GPA</div>
              <div className="serif" style={{fontSize:22,fontWeight:700,color:"#4f46e5",lineHeight:1}}>3.92</div>
            </div>

            {/* 3D badge: Systems */}
            <div style={{position:"absolute",bottom:4,left:-20,background:"rgba(255,255,255,0.93)",backdropFilter:"blur(16px)",border:"1px solid rgba(16,185,129,0.16)",borderRadius:14,padding:"9px 16px",boxShadow:"0 10px 36px rgba(16,185,129,0.14),0 2px 8px rgba(26,26,46,0.06),0 0 0 1px rgba(255,255,255,0.7)",animation:"badgeFloat2 5.5s ease-in-out 1.2s infinite"}}>
              <div className="mono" style={{fontSize:8,color:"rgba(26,26,46,0.28)",letterSpacing:2,marginBottom:2}}>SYSTEMS</div>
              <div className="serif" style={{fontSize:22,fontWeight:700,color:"#10b981",lineHeight:1}}>7 Built</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{position:"absolute",bottom:32,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span className="mono" style={{fontSize:8,letterSpacing:5,color:"rgba(26,26,46,0.18)",writingMode:"vertical-rl"}}>SCROLL</span>
        <div style={{width:1,height:44,background:"linear-gradient(180deg,rgba(79,70,229,0.3),transparent)"}}/>
      </div>
    </section>
  );
}

/* EXP CARD */
function ExpCard({item}) {
  const ref=useRef(null);const v=useInView(ref);
  return (
    <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateX(-24px)",transition:"opacity 0.8s cubic-bezier(0.4,0,0.2,1),transform 0.8s cubic-bezier(0.4,0,0.2,1)"}}>
      <TiltCard intensity={6} style={{padding:"clamp(20px,3vw,32px)"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${item.color},transparent)`,borderRadius:"20px 20px 0 0"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:12}}>
          <div>
            <h3 style={{fontSize:"clamp(16px,2vw,20px)",fontWeight:600,color:"#1a1a2e",marginBottom:4}}>{item.title}</h3>
            <div style={{fontSize:13,color:item.color,fontWeight:500}}>{item.company}</div>
            <div className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.28)",letterSpacing:2,marginTop:4}}>{item.date} · {item.location}</div>
          </div>
          <span className="badge" style={{background:`${item.color}12`,color:item.color,border:`1px solid ${item.color}20`,flexShrink:0}}>{item.status}</span>
        </div>
        <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
          {item.bullets.map((b,i)=>(
            <li key={i} style={{display:"flex",gap:10,fontSize:13,color:"rgba(26,26,46,0.5)",lineHeight:1.7}}>
              <span style={{width:4,height:4,borderRadius:"50%",background:item.color,flexShrink:0,marginTop:8}}/>
              {b}
            </li>
          ))}
        </ul>
      </TiltCard>
    </div>
  );
}

/* SKILL CARD */
function SkillCard({skill,idx}) {
  const ref=useRef(null);const v=useInView(ref);
  return (
    <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(20px) scale(0.96)",transition:`opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${idx*45}ms,transform 0.7s cubic-bezier(0.4,0,0.2,1) ${idx*45}ms`}}>
      <TiltCard intensity={10} style={{padding:"20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:32,height:32,borderRadius:8,background:`${skill.accent}0d`,border:`1px solid ${skill.accent}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,fontFamily:"'DM Mono',monospace",color:skill.accent}}>{skill.icon}</div>
          <span className="mono" style={{fontSize:9,color:skill.accent,letterSpacing:3,textTransform:"uppercase",fontWeight:500}}>{skill.category}</span>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {skill.items.map((tag,j)=>(
            <span key={j} style={{padding:"4px 10px",borderRadius:6,fontSize:11,background:`${skill.accent}08`,color:"rgba(26,26,46,0.56)",border:`1px solid ${skill.accent}12`,transition:"all 0.18s",cursor:"default",fontWeight:500}}
              onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:skill.accent,color:"white",borderColor:skill.accent,transform:"scale(1.06)"})}
              onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:`${skill.accent}08`,color:"rgba(26,26,46,0.56)",borderColor:`${skill.accent}12`,transform:"scale(1)"})}
            >{tag}</span>
          ))}
        </div>
      </TiltCard>
    </div>
  );
}

/* PROJECT CARD */
function ProjectCard({project,idx}) {
  const [flipped,setFlipped]=useState(false);
  const ref=useRef(null);const v=useInView(ref);
  return (
    <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(32px)",transition:`opacity 0.75s cubic-bezier(0.4,0,0.2,1) ${idx*55}ms,transform 0.75s cubic-bezier(0.4,0,0.2,1) ${idx*55}ms`}}>
      <div style={{height:300,perspective:1400}}>
        <div style={{width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",transition:"transform 0.72s cubic-bezier(0.4,0,0.2,1)",transform:flipped?"rotateY(180deg)":"rotateY(0)"}}>
          {/* FRONT */}
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",borderRadius:20,background:"rgba(255,255,255,0.88)",backdropFilter:"blur(24px)",border:"1px solid rgba(255,255,255,0.92)",boxShadow:"0 4px 20px rgba(26,26,46,0.07),0 0 0 1px rgba(255,255,255,0.5)",padding:"22px 22px 18px",display:"flex",flexDirection:"column",transition:"box-shadow 0.3s"}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 16px 48px rgba(26,26,46,0.12),0 4px 12px ${project.color}18,0 0 0 1px ${project.color}14`;}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 4px 20px rgba(26,26,46,0.07),0 0 0 1px rgba(255,255,255,0.5)";}}
          >
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <span className="badge" style={{background:`${project.color}0f`,color:project.color,border:`1px solid ${project.color}1e`}}>{project.tag}</span>
                <div style={{width:28,height:2,background:`linear-gradient(90deg,${project.color},transparent)`,marginTop:8,borderRadius:2}}/>
              </div>
              <span style={{fontSize:32,animation:"floatY 4s ease-in-out infinite",flexShrink:0}}>{project.emoji}</span>
            </div>
            <h3 style={{fontSize:14,fontWeight:600,color:"#1a1a2e",lineHeight:1.45,marginBottom:8}}>{project.title}</h3>
            <p style={{fontSize:11,color:"rgba(26,26,46,0.38)",lineHeight:1.72,flex:1,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{project.short}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,margin:"10px 0 12px"}}>
              {project.tech.map((t,i)=><span key={i} className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.26)",background:"rgba(26,26,46,0.03)",padding:"2px 7px",borderRadius:4}}>{t}</span>)}
            </div>
            <button onClick={()=>setFlipped(true)} style={{alignSelf:"flex-end",padding:"7px 16px",borderRadius:8,background:`${project.color}0e`,border:`1px solid ${project.color}22`,color:project.color,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.22s",letterSpacing:0.5}}
              onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:project.color,color:"white",boxShadow:`0 8px 24px ${project.color}35`,transform:"translateY(-2px)"})}
              onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:`${project.color}0e`,color:project.color,boxShadow:"none",transform:"none"})}
            >Detail →</button>
          </div>
          {/* BACK */}
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",borderRadius:20,background:"rgba(255,255,255,0.97)",border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 4px 20px rgba(26,26,46,0.07)",padding:"22px 22px 18px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:34,height:34,borderRadius:10,background:`${project.color}10`,border:`1px solid ${project.color}1e`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{project.emoji}</div>
                <div>
                  <div className="badge" style={{background:`${project.color}10`,color:project.color,border:`1px solid ${project.color}14`,display:"inline-block",marginBottom:4}}>{project.tag}</div>
                  <div style={{fontSize:12,fontWeight:600,color:"#1a1a2e",lineHeight:1.3}}>{project.title}</div>
                </div>
              </div>
              <div style={{height:1,background:`linear-gradient(90deg,${project.color}20,transparent)`,marginBottom:12}}/>
              <p style={{fontSize:11,color:"rgba(26,26,46,0.46)",lineHeight:1.82}}>{project.desc}</p>
            </div>
            <div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {project.tech.map((t,i)=><span key={i} style={{fontSize:10,padding:"4px 10px",borderRadius:6,background:`${project.color}0e`,color:project.color,border:`1px solid ${project.color}20`,fontWeight:600}}>{t}</span>)}
              </div>
              <button onClick={()=>setFlipped(false)} style={{padding:"6px 14px",borderRadius:8,background:"transparent",border:"1px solid rgba(26,26,46,0.09)",color:"rgba(26,26,46,0.36)",fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(26,26,46,0.18)",color:"#1a1a2e"})}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(26,26,46,0.09)",color:"rgba(26,26,46,0.36)"})}
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
  const ref=useRef(null);const v=useInView(ref);
  return (
    <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(24px)",transition:`opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${idx*130}ms,transform 0.8s cubic-bezier(0.4,0,0.2,1) ${idx*130}ms`}}>
      <TiltCard intensity={7} style={{padding:"clamp(22px,3vw,32px)"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${edu.color},transparent)`,borderRadius:"20px 20px 0 0"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16,marginBottom:6}}>
          <div>
            <h3 style={{fontSize:"clamp(15px,2vw,18px)",fontWeight:600,color:"#1a1a2e",marginBottom:4}}>{edu.degree}</h3>
            <div style={{fontSize:13,color:edu.color,fontWeight:500}}>{edu.school}</div>
          </div>
          {edu.gpa&&(
            <div style={{padding:"10px 16px",background:`${edu.color}08`,border:`1px solid ${edu.color}15`,borderRadius:12,textAlign:"center",flexShrink:0}}>
              <div className="serif" style={{fontSize:22,fontWeight:700,color:edu.color,lineHeight:1}}>{edu.gpa}</div>
              <div className="mono" style={{fontSize:8,color:"rgba(26,26,46,0.26)",letterSpacing:3,marginTop:3}}>GPA</div>
            </div>
          )}
        </div>
        <div className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.2)",letterSpacing:3,marginBottom:16}}>{edu.period}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {edu.achievements.map((a,i)=><span key={i} style={{fontSize:12,color:"rgba(26,26,46,0.46)",padding:"5px 12px",background:"rgba(26,26,46,0.025)",border:"1px solid rgba(26,26,46,0.06)",borderRadius:8}}>{a}</span>)}
        </div>
      </TiltCard>
    </div>
  );
}

/* APP */
export default function App() {
  return (<>
    <style>{CSS}</style>
    <Background/>
    <Cursor/>
    <ScrollBar/>
    <FloatingNav/>

    <main style={{maxWidth:1080,margin:"0 auto",padding:"0 clamp(20px,5vw,56px)",position:"relative",zIndex:1}}>
      <Hero/>
      <div className="divider"/>

      <section id="experience" style={{paddingTop:80,paddingBottom:80}}>
        <Reveal><SectionLabel num="01">Experience</SectionLabel></Reveal>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {EXPERIENCES.map((item,i)=><ExpCard key={i} item={item}/>)}
        </div>
      </section>
      <div className="divider"/>

      <section id="skills" style={{paddingTop:80,paddingBottom:80}}>
        <Reveal><SectionLabel num="02">Skills & Expertise</SectionLabel></Reveal>
        <div className="skill-grid">
          {SKILLS.map((s,i)=><SkillCard key={i} skill={s} idx={i}/>)}
        </div>
      </section>
      <div className="divider"/>

      <section id="projects" style={{paddingTop:80,paddingBottom:80}}>
        <Reveal><SectionLabel num="03">Projects</SectionLabel></Reveal>
        <Reveal delay={80}>
          <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:32,padding:"16px 22px",background:"rgba(255,255,255,0.78)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.92)",borderRadius:16,boxShadow:"0 2px 16px rgba(26,26,46,0.05)",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
              <div style={{width:36,height:36,borderRadius:10,background:"rgba(79,70,229,0.07)",border:"1px solid rgba(79,70,229,0.14)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏢</div>
              <div>
                <div className="mono" style={{fontSize:9,color:"#4f46e5",letterSpacing:3,marginBottom:2}}>SCOPE</div>
                <div style={{fontSize:15,fontWeight:600,color:"#1a1a2e",lineHeight:1}}>7 Sistem · 5 Daerah</div>
              </div>
            </div>
            <div style={{width:1,height:36,background:"rgba(79,70,229,0.1)",flexShrink:0}}/>
            <p style={{fontSize:13,color:"rgba(26,26,46,0.42)",lineHeight:1.75,flex:1,minWidth:200}}>
              Ketujuh sistem dikembangkan untuk <span style={{color:"#4f46e5",fontWeight:600}}>5 daerah (kota/kabupaten)</span> — dari pelayanan, GIS, pembayaran, penagihan, survey, hingga analitik.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="mono" style={{fontSize:9,color:"rgba(26,26,46,0.2)",letterSpacing:3,marginBottom:20}}>↺ KLIK "DETAIL" UNTUK FLIP CARD 3D</p>
        </Reveal>
        <div className="proj-grid">
          {PROJECTS.map((p,i)=><ProjectCard key={p.id} project={p} idx={i}/>)}
        </div>
      </section>
      <div className="divider"/>

      <section id="education" style={{paddingTop:80,paddingBottom:80}}>
        <Reveal><SectionLabel num="04">Education</SectionLabel></Reveal>
        <div className="edu-grid">
          {EDUCATION.map((edu,i)=><EduCard key={i} edu={edu} idx={i}/>)}
        </div>
      </section>
    </main>

    <footer style={{borderTop:"1px solid rgba(26,26,46,0.06)",padding:"40px clamp(20px,5vw,56px)",position:"relative",zIndex:1}}>
      <div style={{maxWidth:1080,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
        <div>
          <div className="serif" style={{fontSize:24,fontWeight:700,color:"#1a1a2e",marginBottom:4,letterSpacing:-0.5}}>Lintang Windy Pratama</div>
          <div className="mono" style={{fontSize:10,color:"rgba(26,26,46,0.24)",letterSpacing:2}}>Full Stack Developer · 2024</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {[{l:"in",h:"https://www.linkedin.com/in/lintangpratamaa"},{l:"✉",h:"mailto:lintangpratama526@gmail.com"},{l:"📱",h:"https://wa.me/6285158311928"}].map((s,i)=>(
            <a key={i} href={s.h} target="_blank" rel="noreferrer" style={{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(26,26,46,0.08)",color:"rgba(26,26,46,0.36)",textDecoration:"none",fontSize:14,transition:"all 0.3s",background:"rgba(255,255,255,0.7)"}}
              onMouseEnter={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(79,70,229,0.24)",color:"#4f46e5",background:"rgba(79,70,229,0.06)",transform:"translateY(-3px)",boxShadow:"0 8px 20px rgba(79,70,229,0.12)"})}
              onMouseLeave={e=>Object.assign(e.currentTarget.style,{borderColor:"rgba(26,26,46,0.08)",color:"rgba(26,26,46,0.36)",background:"rgba(255,255,255,0.7)",transform:"none",boxShadow:"none"})}
            >{s.l}</a>
          ))}
        </div>
      </div>
    </footer>
  </>);
}