const toast=(m)=>{const t=document.getElementById("toast");t.textContent=m;t.classList.add("show");clearTimeout(toast._id);toast._id=setTimeout(()=>t.classList.remove("show"),2200)}
document.getElementById("form")?.addEventListener("submit",e=>{e.preventDefault();toast("Pesan terkirim ✓ — demo");e.target.reset()})
document.getElementById("filter")?.addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b) return;
  [...e.currentTarget.children].forEach(x=>x.classList.toggle("on",x===b));
  const f=b.dataset.f;
  document.querySelectorAll("#grid .work").forEach(c=>{
    c.style.display=f==="all"||c.dataset.cat===f?"":"none"
  })
})
const links=[...document.querySelectorAll(".top-nav a,.bottom-nav a")]
const setActive=id=>{
  links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id))
}
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting) setActive(e.target.id)})},{rootMargin:"-40% 0px -55% 0px",threshold:0})
document.querySelectorAll("main section[id]").forEach(s=>io.observe(s))
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const id=a.getAttribute("href"); if(id.length>1){e.preventDefault();document.querySelector(id)?.scrollIntoView({behavior:"smooth"})}
}))
document.getElementById("themeBtn")?.addEventListener("click",()=>{
  const d=document.documentElement;
  const dark=d.style.colorScheme==="dark";
  d.style.colorScheme=dark?"light":"dark";
  document.body.style.filter=dark?"":"invert(1) hue-rotate(180deg)";
  document.body.querySelectorAll("img").forEach(i=>i.style.filter=dark?"":"invert(1) hue-rotate(180deg)");
  toast(dark?"Light mode":"Dark mode (demo)")
})
