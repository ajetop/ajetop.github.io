const FALLBACK={
  profile:{name:"Teja Sukakemana",role:"Product Designer & Frontend Developer",location:"Jakarta, ID",desc:"Bangun produk digital yang clean, cepat, dan manusiawi. Fokus di UI mobile, design system, dan UX intuitif.",avatar:"https://i.pravatar.cc/300?img=15",stats:[{label:"Proyek",value:"24+"},{label:"Tahun",value:"5th"},{label:"Kepuasan",value:"98%"}]},
  skills:[{name:"UI Design - Figma",level:"92%"},{name:"Frontend - HTML/CSS/JS",level:"88%"},{name:"React / Next.js",level:"80%"}],
  works:[{id:1,cat:"app",year:"2026",title:"Dompet Mobile - Fintech",desc:"Redesign onboarding, +32% konversi."},{id:2,cat:"web",year:"2025",title:"Portal Edukasi",desc:"Dashboard guru-murid, clean & cepat."},{id:3,cat:"brand",year:"2025",title:"Kopi Lokal Rebrand",desc:"Identitas + packaging minimal."}],
  pages:{
    blog:[{slug:"desain-mobile-2026",title:"Tren Desain Mobile 2026",date:"2026-09-10",excerpt:"Neumorphism balik, tapi lebih subtle. Ini rangkuman pola UI yang work."},{slug:"optimasi-performa",title:"Optimasi Performa Tanpa Ribet",date:"2026-08-22",excerpt:"LCP, CLS, dan trik lazy-load yang sering kelewat."},{slug:"design-system-kecil",title:"Design System untuk Tim Kecil",date:"2026-07-15",excerpt:"Tidak perlu 100 komponen. Mulai dari 12 token ini."}],
    koleksi:[{slug:"ikon-neo",name:"Ikon Neo - 240 assets",cat:"icons"},{slug:"wallpaper-gradient",name:"Wallpaper Gradient Pack",cat:"wallpaper"},{slug:"template-notion",name:"Template Notion Portfolio",cat:"template"}]
  }
};
let SITE=null;
async function loadData(){
  if(SITE) return SITE;
  if(window.SITE_DATA){ SITE=window.SITE_DATA; return SITE; }
  try{
    const r=await fetch("data/site.json");
    if(r.ok){ SITE=await r.json(); return SITE; }
  }catch(e){}
  SITE=FALLBACK;
  return SITE;
}
const CORE=["beranda","karya","blog","kontak"];
const Layout={
  nav:[
    {id:"beranda",label:"Beranda",icon:"\u2302"},
    {id:"karya",label:"Karya",icon:"\u2B22"},
    {id:"blog",label:"Blog",icon:"\u2630"},
    {id:"kontak",label:"Kontak",icon:"\u2709"},
    {id:"tentang",label:"Tentang",icon:"\u25D0"},
    {id:"skill",label:"Skill",icon:"\u2726"},
    {id:"koleksi",label:"Koleksi",icon:"\u25C6"}
  ],
  link(n,active){
    return `<a href="#${n.id}" data-ref="${n.id}" class="${n.id===active?'active':''}"><i>${n.icon}</i><span>${n.label}</span></a>`;
  },
  renderNav(active){
    const main=this.nav.filter(n=>CORE.includes(n.id));
    const all=this.nav.map(n=>this.link(n,active)).join("");
    const t=document.getElementById("topNav"),b=document.getElementById("bottomNav"),d=document.getElementById("drawerList");
    if(t) t.innerHTML=all;
    if(b) b.innerHTML=main.map(n=>this.link(n,active)).join("")+`<button id="moreBtn" aria-label="menu lainnya" class="${CORE.includes(active)?'':'active'}"><i>\u2630</i><span>Lainnya</span></button>`;
    if(d) d.innerHTML=all;
    document.getElementById("moreBtn")?.addEventListener("click",openDrawer);
    d?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeDrawer));
  },
  hero(p){
    return `<section class="hero-app"><div class="hero-card"><div class="hero-top"><img class="avatar" src="${p.avatar}" alt="foto"><div class="chip-online"><span></span> Available</div></div><h1>${p.name}<span class="accent">.</span></h1><p class="role">${p.role} \u2014 ${p.location}</p><p class="desc">${p.desc}</p><div class="cta-row"><a href="#kontak" class="btn primary">Hubungi \u2192</a><a href="#karya" class="btn ghost">Lihat Karya</a></div><div class="stats">${p.stats.map(s=>`<div><b>${s.value}</b><span>${s.label}</span></div>`).join("")}</div></div><div class="hero-actions"><a href="#" class="mini-card"><span>\u2B22</span> GitHub</a><a href="#" class="mini-card"><span>\u25CE</span> LinkedIn</a><a href="#" class="mini-card"><span>\u2726</span> CV.pdf</a></div></section>`;
  },
  tentang(p){
    return `<section class="section"><div class="section-head"><h2>Tentang</h2><a href="/" class="link-more">← Beranda</a></div><div class="card"><p class="lead">Tidak ikut campur urusan orang, tidak suka dicampuri. Kalau bisa membantu, ya membantu.</p><div class="info-grid"><div class="info"><span class="k">Lokasi</span><span class="v">${p.location} • Ngarit</span></div><div class="info"><span class="k">Role</span><span class="v">${p.role}</span></div><div class="info"><span class="k">Fokus</span><span class="v">Urusan sendiri</span></div></div><div class="values"><div class="value"><b>01</b><h4>Tahu Batas</h4><p>Menghargai ruang dan urusan masing-masing.</p></div><div class="value"><b>02</b><h4>Secukupnya</h4><p>Tidak berlebihan, tidak kekurangan.</p></div><div class="value"><b>03</b><h4>Kalau Bisa Bantu</h4><p>Tidak banyak bicara, langsung membantu.</p></div></div></div></section>`;
  },
  skills(sk){
    return `<section class="section"><div class="section-head"><h2>Keahlian</h2><span class="pill">${sk.length} Stack</span></div><div class="card"><div class="skills">${sk.map(s=>`<div class="skill"><div class="skill-head"><span>${s.name}</span><span>${s.level}</span></div><div class="bar"><i style="width:${s.level}"></i></div></div>`).join("")}</div><div class="tags"><span>Design System</span><span>Prototyping</span><span>UX Research</span><span>Motion</span><span>Responsive</span><span>A11y</span></div></div></section>`;
  },
  karya(ws){
    return `<section class="section"><div class="section-head"><h2>Karya Pilihan</h2><a href="#karya" class="link-more">Semua</a></div><div class="grid">${ws.map(w=>`<article class="work"><div class="thumb t${w.id}"></div><div class="work-body"><span class="cat">${w.cat} \u2022 ${w.year}</span><h3>${w.title}</h3><p>${w.desc}</p><a href="#karya/${w.id}">Buka \u2192</a></div></article>`).join("")}</div></section>`;
  },
  kontak(){
    return `<section class="section"><div class="section-head"><h2>Kontak</h2><span class="muted">Balas &lt; 24 jam</span></div><div class="card contact-card"><div class="contact-info"><a class="c-item" href="#"><i>\u2709</i> nama@email.com</a><a class="c-item" href="#"><i>\u25F7</i> wa.me/62xxxx</a><a class="c-item" href="#"><i>\u25CE</i> Jakarta \u2022 Remote</a></div><form id="form"><label>Nama<input required name="name" placeholder="Nama kamu"></label><label>Email<input required type="email" name="email" placeholder="email@contoh.com"></label><label>Pesan<textarea required name="msg" rows="4" placeholder="Ceritakan kebutuhan..."></textarea></label><button class="btn primary full" type="submit">Kirim Pesan</button><p class="form-note">Demo \u2014 tampil toast, tanpa backend.</p></form></div></section>`;
  }
};
function toast(m){
  const t=document.getElementById("toast"); if(!t) return;
  t.textContent=m; t.classList.add("show"); clearTimeout(toast._id); toast._id=setTimeout(()=>t.classList.remove("show"),2200);
}
function bindForm(){
  const f=document.getElementById("form");
  if(f) f.addEventListener("submit",e=>{e.preventDefault(); toast("Pesan terkirim \u2713 \u2014 demo"); e.target.reset();});
}
function openDrawer(){
  document.getElementById("drawer")?.classList.add("open");
  document.getElementById("backdrop")?.classList.add("show");
  document.getElementById("drawer")?.setAttribute("aria-hidden","false");
  document.getElementById("moreBtn")?.classList.add("active");
}
function closeDrawer(){
  document.getElementById("drawer")?.classList.remove("open");
  document.getElementById("backdrop")?.classList.remove("show");
  document.getElementById("drawer")?.setAttribute("aria-hidden","true");
}
function setTheme(t){
  document.documentElement.dataset.theme=t;
  try{localStorage.setItem("theme",t)}catch(e){}
  const b=document.getElementById("themeBtn");
  if(b) b.textContent=t==="dark"?"\u263E":"\u25D0";
}
function initTheme(){
  let t=null;
  try{t=localStorage.getItem("theme")}catch(e){}
  if(!t) t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  setTheme(t);
}
function workDetail(id,data){
  const w=data.works.find(x=>String(x.id)===String(id));
  if(!w) return `<section class="section"><div class="card"><h2>Tidak ditemukan</h2><p class="muted">Karya #${id} tidak ada.</p><a href="#karya" class="btn ghost">Kembali</a></div></section>`;
  return `<section class="section"><a href="#karya" class="link-more">\u2190 Kembali</a><div class="card" style="margin-top:10px"><div class="thumb t${w.id}" style="height:180px;border-radius:16px"></div><div style="margin-top:14px"><span class="cat">${w.cat} \u2022 ${w.year}</span><h2 style="margin:6px 0">${w.title}</h2><p class="muted">${w.desc}</p><p style="margin-top:10px">Placeholder detail karya. Ganti dengan data real di <code>data/site.json</code> \u2192 works[].</p></div></div></section>`;
}
function blogList(data){
  const posts=data.pages?.blog||[];
  return `<section class="section"><div class="section-head"><h2>Blog</h2><span class="pill">${posts.length} Post</span></div><div class="grid">${posts.map(p=>`<article class="work"><div class="thumb" style="background:linear-gradient(135deg,#6C5CE7,#06B6D4);height:110px"></div><div class="work-body"><span class="cat">${p.date}</span><h3>${p.title}</h3><p>${p.excerpt}</p><a href="#blog/${p.slug}">Baca \u2192</a></div></article>`).join("")}</div></section>`;
}
function blogDetail(slug,data){
  const p=(data.pages?.blog||[]).find(x=>x.slug===slug);
  if(!p) return `<section class="section"><div class="card"><h2>Post tidak ada</h2><a href="#blog" class="btn ghost">Kembali</a></div></section>`;
  return `<section class="section"><a href="#blog" class="link-more">\u2190 Blog</a><article class="card" style="margin-top:10px"><span class="cat">${p.date}</span><h2>${p.title}</h2><p class="muted" style="margin-top:8px">${p.excerpt}</p><p style="margin-top:12px">Konten dummy. Tambah field <code>content</code> di <code>data/site.json</code> untuk isi lengkap.</p></article></section>`;
}
function koleksiList(data){
  const items=data.pages?.koleksi||[];
  return `<section class="section"><div class="section-head"><h2>Koleksi</h2><span class="pill">${items.length} Item</span></div><div class="grid">${items.map(k=>`<article class="work"><div class="thumb" style="background:linear-gradient(135deg,#F59E0B,#EF4444);height:110px"></div><div class="work-body"><span class="cat">${k.cat}</span><h3>${k.name}</h3><a href="#koleksi/${k.slug}">Lihat \u2192</a></div></article>`).join("")}</div></section>`;
}
function koleksiDetail(slug,data){
  const k=(data.pages?.koleksi||[]).find(x=>x.slug===slug);
  if(!k) return `<section class="section"><div class="card"><h2>Item tidak ada</h2><a href="#koleksi" class="btn ghost">Kembali</a></div></section>`;
  return `<section class="section"><a href="#koleksi" class="link-more">\u2190 Koleksi</a><div class="card" style="margin-top:10px"><span class="cat">${k.cat}</span><h2>${k.name}</h2><p class="muted">Placeholder koleksi. Edit di data/site.json.</p></div></section>`;
}
async function render(){
  const data=await loadData();
  const raw=(location.hash||"#beranda").slice(1);
  const [page, param]=raw.split("/");
  const cur=page||"beranda";
  Layout.renderNav(cur);
  const c=document.getElementById("content");
  let html="";
  if(cur==="beranda") html=Layout.hero(data.profile)+Layout.tentang(data.profile)+Layout.skills(data.skills)+Layout.karya(data.works)+Layout.kontak();
  else if(cur==="tentang") html=Layout.tentang(data.profile)+Layout.kontak();
  else if(cur==="skill") html=Layout.skills(data.skills);
  else if(cur==="karya" && param) html=workDetail(param,data);
  else if(cur==="karya") html=Layout.karya(data.works);
  else if(cur==="blog" && param) html=blogDetail(param,data);
  else if(cur==="blog") html=blogList(data);
  else if(cur==="koleksi" && param) html=koleksiDetail(param,data);
  else if(cur==="koleksi") html=koleksiList(data);
  else if(cur==="kontak") html=Layout.kontak();
  else html=`<section class="section"><div class="card"><h2>404</h2><p class="muted">Halaman #${cur} tidak ada.</p><a href="#beranda" class="btn primary">Ke Beranda</a></div></section>`;
  c.innerHTML=html;
  bindForm();
  closeDrawer();
  window.scrollTo({top:0});
}
window.addEventListener("hashchange",render);
document.getElementById("themeBtn")?.addEventListener("click",()=>{
  const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
  setTheme(next);
  toast(next==="dark"?"Dark mode":"Light mode");
});
document.getElementById("menuBtn")?.addEventListener("click",openDrawer);
document.getElementById("drawerClose")?.addEventListener("click",closeDrawer);
document.getElementById("backdrop")?.addEventListener("click",closeDrawer);
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeDrawer()});
let touchY=null;
document.getElementById("drawer")?.addEventListener("touchstart",e=>{touchY=e.touches[0].clientY},{passive:true});
document.getElementById("drawer")?.addEventListener("touchmove",e=>{
  if(touchY===null) return;
  if(e.touches[0].clientY-touchY>60) closeDrawer();
},{passive:true});
initTheme();
render();
