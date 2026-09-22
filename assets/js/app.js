const FALLBACK={
  profile:{name:"Teja Sukakemana",role:"Product Designer & Frontend Developer",location:"Jakarta, ID",desc:"Bangun produk digital yang clean, cepat, dan manusiawi. Fokus di UI mobile, design system, dan UX intuitif.",avatar:"https://i.pravatar.cc/300?img=15",stats:[{label:"Proyek",value:"24+"},{label:"Tahun",value:"5th"},{label:"Kepuasan",value:"98%"}]},
  skills:[{name:"UI Design - Figma",level:"92%"},{name:"Frontend - HTML/CSS/JS",level:"88%"},{name:"React / Next.js",level:"80%"}],
  kontak:{email:"nama@email.com",whatsapp:"wa.me/62xxxx",location:"Jakarta \u2022 Remote"},
  social:[{label:"GitHub",icon:"\u2B22",url:"#"},{label:"LinkedIn",icon:"\u25CE",url:"#"},{label:"CV.pdf",icon:"\u2726",url:"#"}]
};
let SITE=null;
async function loadData(){
  if(SITE) return SITE;
  if(window.SITE_DATA && window.SITE_DATA.profile){ SITE=window.SITE_DATA; return SITE; }
  const base=(window.SITE_BASEURL||"").replace(/\/$/,"");
  try{ const r=await fetch(base+"/data/site.json"); if(r.ok){ const j=await r.json(); if(j.profile){ SITE=j; return SITE; } } }catch(e){}
  SITE=FALLBACK; return SITE;
}
const CORE=["beranda","karya","blog","kontak"];
const Layout={
  nav:[
    {id:"beranda",label:"Beranda",icon:"\u2302",path:"/"},
    {id:"karya",label:"Karya",icon:"\u2B22",path:"/karya/"},
    {id:"blog",label:"Blog",icon:"\u2630",path:"/blog/"},
    {id:"koleksi",label:"Koleksi",icon:"\u25C6",path:"/koleksi/"},
    {id:"tentang",label:"Tentang",icon:"\u25D0",path:"/tentang/"},
    {id:"skill",label:"Skill",icon:"\u2726",path:"/skill/"},
    {id:"kontak",label:"Kontak",icon:"\u2709",path:"/kontak/"}
  ],
  link(n,active){
    const base=(window.SITE_BASEURL||"").replace(/\/$/,"");
    let href=n.path;
    if(href.startsWith("/#")){
      href=base+href;
      if(href.startsWith("//")) href=href.slice(1);
    }else if(href.startsWith("/")){
      href=base+href;
    }
    return `<a href="${href}" data-ref="${n.id}" class="${n.id===active?'active':''}"><i>${n.icon}</i><span>${n.label}</span></a>`;
  },
  renderNav(active){
    const main=this.nav.filter(n=>CORE.includes(n.id));
    const all=this.nav.map(n=>this.link(n,active)).join("");
    const t=document.getElementById("topNav"),b=document.getElementById("bottomNav"),d=document.getElementById("drawerList");
    if(t) t.innerHTML=all;
    if(b) b.innerHTML=main.map(n=>this.link(n,active)).join("")+`<button id="moreBtn" aria-label="Lainnya" class="${CORE.includes(active)?'':'active'}"><i>\u2630</i><span>Lainnya</span></button>`;
    if(d) d.innerHTML=all;
    document.getElementById("moreBtn")?.addEventListener("click",openDrawer);
    d?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeDrawer));
  },
  hero(p){
    const social=(SITE&&SITE.social)||FALLBACK.social;
    return `<section class="hero-app"><div class="hero-card"><div class="hero-top"><img class="avatar" src="${p.avatar}" alt="foto ${p.name}" width="84" height="84" loading="lazy" decoding="async"><div class="chip-online"><span></span> Available</div></div><h1>${p.name}<span class="accent">.</span></h1><p class="role">${p.role} \u2014 ${p.location}</p><p class="desc">${p.desc}</p><div class="cta-row"><a href="#kontak" class="btn primary">Hubungi \u2192</a><a href="${(window.SITE_BASEURL||"")}/karya/" class="btn ghost">Lihat Karya</a></div><div class="stats">${p.stats.map(s=>`<div><b>${s.value}</b><span>${s.label}</span></div>`).join("")}</div></div><div class="hero-actions">${social.map(s=>`<a href="${s.url}" class="mini-card"><span>${s.icon}</span> ${s.label}</a>`).join("")}</div></section>`;
  },
  tentang(p){
    return `<section class="section"><div class="section-head"><h2>Tentang</h2><a href="/" class="link-more">← Beranda</a></div><div class="card"><p class="lead">Tidak ikut campur urusan orang, tidak suka dicampuri. Kalau bisa membantu, ya membantu.</p><div class="info-grid"><div class="info"><span class="k">Lokasi</span><span class="v">${p.location} • Ngarit</span></div><div class="info"><span class="k">Role</span><span class="v">${p.role}</span></div><div class="info"><span class="k">Fokus</span><span class="v">Urusan sendiri</span></div></div><div class="values"><div class="value"><b>01</b><h4>Tahu Batas</h4><p>Menghargai ruang dan urusan masing-masing.</p></div><div class="value"><b>02</b><h4>Secukupnya</h4><p>Tidak berlebihan, tidak kekurangan.</p></div><div class="value"><b>03</b><h4>Kalau Bisa Bantu</h4><p>Tidak banyak bicara, langsung membantu.</p></div></div></div></section>`;
  },
  skills(sk){
    return `<section id="skill" class="section"><div class="section-head"><h2>Keahlian</h2><span class="pill">${sk.length} Stack</span></div><div class="card"><div class="skills">${sk.map(s=>`<div class="skill"><div class="skill-head"><span>${s.name}</span><span>${s.level}</span></div><div class="bar"><i style="width:${s.level}"></i></div></div>`).join("")}</div><div class="tags"><span>Design System</span><span>Prototyping</span><span>UX Research</span><span>Motion</span><span>Responsive</span><span>A11y</span></div></div></section>`;
  },
  kontak(k){
    const c=k||(SITE&&SITE.kontak)||FALLBACK.kontak;
    return `<section id="kontak" class="section"><div class="section-head"><h2>Kontak</h2><span class="muted">Balas &lt; 24 jam</span></div><div class="card contact-card"><div class="contact-info"><a class="c-item" href="mailto:${c.email}"><i>\u2709</i> ${c.email}</a><a class="c-item" href="https://${c.whatsapp}"><i>\u25F7</i> ${c.whatsapp}</a><a class="c-item" href="#"><i>\u25CE</i> ${c.location}</a></div><form id="form" novalidate><label>Nama<input required name="name" placeholder="Nama kamu" autocomplete="name"></label><label>Email<input required type="email" name="email" placeholder="email@contoh.com" autocomplete="email"></label><label>Pesan<textarea required name="msg" rows="4" placeholder="Ceritakan kebutuhan..."></textarea></label><button class="btn primary full" type="submit">Kirim Pesan</button><p class="form-note">Demo \u2014 tampil toast, tanpa backend.</p></form></div></section>`;
  }
};
function toast(m){ const t=document.getElementById("toast"); if(!t) return; t.textContent=m; t.classList.add("show"); clearTimeout(toast._id); toast._id=setTimeout(()=>t.classList.remove("show"),2200); }
function bindForm(){ const f=document.getElementById("form"); if(f) f.addEventListener("submit",e=>{e.preventDefault(); if(!f.checkValidity()){ f.reportValidity(); return;} toast("Pesan terkirim \u2713 \u2014 demo"); e.target.reset();}); }
function openDrawer(){ document.getElementById("drawer")?.classList.add("open"); const b=document.getElementById("backdrop"); if(b){b.hidden=false; requestAnimationFrame(()=>b.classList.add("show"))} document.getElementById("drawer")?.setAttribute("aria-hidden","false"); }
function closeDrawer(){ document.getElementById("drawer")?.classList.remove("open"); const b=document.getElementById("backdrop"); if(b) b.classList.remove("show"); setTimeout(()=>{if(b) b.hidden=true},250); document.getElementById("drawer")?.setAttribute("aria-hidden","true"); }
function setTheme(t){ document.documentElement.dataset.theme=t; try{localStorage.setItem("theme",t)}catch(e){} const b=document.getElementById("themeBtn"); if(b) b.textContent=t==="dark"?"\u263E":"\u25D0"; }
function initTheme(){ let t=null; try{t=localStorage.getItem("theme")}catch(e){} if(!t) t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"; setTheme(t); }
async function render(){
  const data=await loadData();
  const base=(window.SITE_BASEURL||"").replace(/\/$/,"");
  let path=window.location.pathname;
  if(base && path.startsWith(base)) path=path.slice(base.length);
  if(path==="") path="/";
  const isStatic=path!=="/" && path!=="/index.html";
  let cur="beranda";
  if(isStatic){
    if(path.startsWith("/blog")) cur="blog";
    else if(path.startsWith("/karya")) cur="karya";
    else if(path.startsWith("/koleksi")) cur="koleksi";
    else if(path.startsWith("/tentang")) cur="tentang";
    else if(path.startsWith("/skill")) cur="skill";
    else if(path.startsWith("/kontak")) cur="kontak";
    Layout.renderNav(cur);
    bindForm();
    closeDrawer();
    return;
  }
  const raw=(location.hash||"").slice(1);
  cur=raw ? raw.split("/")[0] : "beranda";
  if(!["beranda","tentang","skill","kontak"].includes(cur)) cur="beranda";
  Layout.renderNav(cur);
  bindForm();
  closeDrawer();
  if(raw && document.getElementById(cur)){
    setTimeout(()=>document.getElementById(cur)?.scrollIntoView({behavior:"smooth",block:"start"}),80);
  }
}
window.addEventListener("hashchange",render);
document.getElementById("themeBtn")?.addEventListener("click",()=>{ const next=document.documentElement.dataset.theme==="dark"?"light":"dark"; setTheme(next); toast(next==="dark"?"Dark mode":"Light mode"); });
document.getElementById("drawerClose")?.addEventListener("click",closeDrawer);
document.getElementById("backdrop")?.addEventListener("click",closeDrawer);
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeDrawer()});
let touchY=null;
document.getElementById("drawer")?.addEventListener("touchstart",e=>{touchY=e.touches[0].clientY},{passive:true});
document.getElementById("drawer")?.addEventListener("touchmove",e=>{ if(touchY===null) return; if(e.touches[0].clientY-touchY>60) closeDrawer(); },{passive:true});
initTheme();
render();
