// ===== Mobile drawer =====
const drawer = document.getElementById("drawer");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
function openDrawer(){ drawer?.classList.add("open"); document.body.style.overflow="hidden"; }
function closeDrawer(){ drawer?.classList.remove("open"); document.body.style.overflow=""; }
openMenu?.addEventListener("click", openDrawer);
closeMenu?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (e)=>{ if(e.target === drawer) closeDrawer(); });
document.querySelectorAll(".mLink").forEach(a => a.addEventListener("click", closeDrawer));

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Scroll Reveal (fade + slide) =====
const items = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
items.forEach(el => io.observe(el));

// ===== Animated counters (stats) =====
function animateNumber(el, to, duration=900){
  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(prefersReduce){ el.textContent = to; return; }
  const start = performance.now();
  const from = 0;
  const isTime = String(to).includes("h");
  const isVolume = String(to).includes("m");
  const clean = parseFloat(String(to).replace(/[^\d.]/g,"")) || 0;

  function tick(now){
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const current = Math.round(from + (clean - from) * eased);
    if(isTime) el.textContent = current + "h";
    else if(isVolume) el.textContent = current + "m³";
    else el.textContent = current + "+";
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll("[data-count]");
const statsObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      animateNumber(el, el.getAttribute("data-count"));
      statsObserver.unobserve(el);
    }
  });
},{threshold:.4});
statNums.forEach(el=>statsObserver.observe(el));

// ===== Smooth active nav highlighting =====
const sections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = Array.from(document.querySelectorAll('a[href^="#"]')).filter(a=>a.closest("nav"));
const secObs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.getAttribute("id");
      navLinks.forEach(a=>{
        a.classList.toggle("active", a.getAttribute("href")==="#"+id);
      });
    }
  });
},{rootMargin:"-45% 0px -50% 0px", threshold:0});
sections.forEach(s=>secObs.observe(s));