async function loadJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function el(tag, className, text){
  const e = document.createElement(tag);
  if(className) e.className = className;
  if(text !== undefined && text !== null) e.textContent = text;
  return e;
}

function smoothAnchors(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click",(ev)=>{
      const href = a.getAttribute("href");
      if(!href || href === "#") return;
      const t = document.querySelector(href);
      if(t){
        ev.preventDefault();
        t.scrollIntoView({behavior:"smooth", block:"start"});
      }
    })
  })
}

function initMobileNav(){
  const toggle = document.querySelector(".nav-toggle");
  const list = document.querySelector(".nav-list");
  if(!toggle || !list) return;
  toggle.addEventListener("click", ()=>{
    const open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true":"false");
  });
  list.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>list.classList.remove("open")));
}

function renderNav(items){
  const list = document.getElementById("navList");
  list.innerHTML = "";
  const map = {
    "What We Do":"#what-we-do",
    "Who We Serve":"#who-we-serve",
    "AI Alignment":"#ai-alignment",
    "About":"#about",
    "Contact":"/contact",
  };
  items.forEach(name=>{
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = map[name] || "/contact";
    a.textContent = name;
    li.appendChild(a);
    list.appendChild(li);
  });
}

function makeCard(item){
  const c = el("article","card");
  const t = el("h3","card-title", item.title ? item.title.toUpperCase() : "");
  const b = el("p","card-body", item.body || "");
  c.append(t,b);
  // Activate on hover/tap
  const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if(fineHover){
    c.addEventListener("mouseenter", ()=>{
      c.parentElement.querySelectorAll(".card").forEach(x=>x.classList.remove("active"));
      c.classList.add("active");
    });
  }else{
    c.addEventListener("click", ()=>{
      const is = c.classList.contains("active");
      c.parentElement.querySelectorAll(".card").forEach(x=>x.classList.remove("active"));
      if(!is) c.classList.add("active");
    });
  }
  return c;
}

function initCarousel(trackId, carouselRootSelector, cards, intervalMs){
  const track = document.getElementById(trackId);
  const root = document.querySelector(`${carouselRootSelector}[data-carousel]`) || document.querySelector(carouselRootSelector);
  const prev = root.querySelector(".prev");
  const next = root.querySelector(".next");

  // Build card elements
  const originals = cards.map((card)=>makeCard(card));
  const visible = 2;
  const total = originals.length;
  const clonesHead = originals.slice(0, visible).map(n=>n.cloneNode(true));
  const clonesTail = originals.slice(total - visible).map(n=>n.cloneNode(true));

  track.innerHTML = "";
  clonesTail.forEach(n=>track.appendChild(n));
  originals.forEach(n=>track.appendChild(n));
  clonesHead.forEach(n=>track.appendChild(n));

  let index = visible; // start at first real card
  let autoTimer = null;

  function measureStep(){
    const sample = track.querySelector(".card");
    if(!sample) return {step: 0, gap: 14};
    const step = sample.getBoundingClientRect().width;
    return {step, gap: 14}; // must match CSS gap
  }

  function setActiveByVirtualIndex(){
    const realIndex = ((index - visible) % total + total) % total;
    const all = track.querySelectorAll(".card");
    all.forEach(x=>x.classList.remove("active"));
    // active card corresponds to the first visible real card
    const active = all[index];
    if(active) active.classList.add("active");
  }

  function update(animate=true){
    const {step, gap} = measureStep();
    const shift = index * (step + gap);
    track.style.transition = animate ? "transform 500ms ease" : "none";
    track.style.transform = `translateX(${-shift}px)`;
    setActiveByVirtualIndex();
  }

  // Hover highlighting: only the hovered card should be "active"
  track.addEventListener("mouseover", (e)=>{
    const card = e.target.closest(".card");
    if(!card) return;
    track.querySelectorAll(".card").forEach(x=>x.classList.remove("active"));
    card.classList.add("active");
  });

  track.addEventListener("mouseleave", ()=>{
    setActiveByVirtualIndex();
  });

  function goNext(){
    index += 1;
    update(true);
  }
  function goPrev(){
    index -= 1;
    update(true);
  }

  if(next) next.addEventListener("click", ()=>{ stopAuto(); goNext(); startAuto(); });
  if(prev) prev.addEventListener("click", ()=>{ stopAuto(); goPrev(); startAuto(); });

  track.addEventListener("transitionend", ()=>{
    // Seamless wrap: if we moved into clones, jump back without animation
    if(index >= total + visible){
      index = visible;
      update(false);
    } else if(index < visible){
      index = total + visible - 1;
      update(false);
    }
  });

  function startAuto(){
    if(intervalMs <= 0) return;
    autoTimer = setInterval(()=>goNext(), intervalMs);
  }
  function stopAuto(){
    if(autoTimer){ clearInterval(autoTimer); autoTimer = null; }
  }

  // initial position (no animation) then start cycling
  requestAnimationFrame(()=>{ update(false); startAuto(); });
}

async function init(){
  const [hero, wwd, wws, ai, about, contact] = await Promise.all([
    loadJSON("content/hero.json"),
    loadJSON("content/what_we_do.json"),
    loadJSON("content/who_we_serve.json"),
    loadJSON("content/ai_alignment.json"),
    loadJSON("content/about.json"),
    loadJSON("content/contact.json"),
  ]);

  renderNav(hero.nav || []);
  initMobileNav();
  smoothAnchors();

  // HERO
  document.getElementById("heroKicker").textContent = hero.kicker || "";
  document.getElementById("heroL0").textContent = hero.headline_l0 || "";
  document.getElementById("heroL1").textContent = hero.headline_l1 || "";
  document.getElementById("heroBody").textContent = hero.body || "";
    document.getElementById("heroBottomCta").textContent = "Contact ValorForge";
  const heroImg = document.getElementById("heroImg");
  heroImg.src = hero.image || "";
  heroImg.alt = "ValorForge hero image";

  // WHAT WE DO
  document.getElementById("wwdTitle").textContent = wwd.title || "What We Do";
  document.getElementById("wwdIntro").textContent = wwd.intro || "";
  document.getElementById("wwdImg").src = wwd.image || "";
  document.getElementById("wwdImg").alt = "What we do";
      document.getElementById("wwdBottomCta").textContent = wwd.cta_label || "Discuss capabilities";
  initCarousel("wwdTrack", 'section#what-we-do .carousel', wwd.cards || [], 5000);

  // WHO WE SERVE
  document.getElementById("wwsTitle").textContent = wws.title || "Who We Serve";
  document.getElementById("wwsIntro").textContent = wws.intro || "";
  document.getElementById("wwsImg").src = wws.image || "";
  document.getElementById("wwsImg").alt = "Who we serve";
      document.getElementById("wwsBottomCta").textContent = wws.cta_label || "See fit for your mission";
  initCarousel("wwsTrack", 'section#who-we-serve .carousel', wws.cards || [], 5000);

  // AI ALIGNMENT
  document.getElementById("aiTitle").textContent = ai.title || "AI Alignment";
  document.getElementById("aiIntro").textContent = ai.intro || "";
  document.getElementById("aiImg").src = ai.image || "";
  document.getElementById("aiImg").alt = "AI alignment";
      document.getElementById("aiBottomCta").textContent = ai.cta_label || "Align with the plan";
  initCarousel("aiTrack", 'section#ai-alignment .carousel', ai.cards || [], 5000);

  // ABOUT
  document.getElementById("aboutTitle").textContent = about.title || "About";
  document.getElementById("aboutIntro").textContent = about.company_body || "";
  document.getElementById("aboutImg").src = about.image || "assets/img/generated-image-1.png";
  document.getElementById("aboutBottomCta").textContent = about.cta_label || "Contact ValorForge";

  initCarousel("aboutTrack", '#about .carousel', (about.cards || []).map(c => ({ title: c.title, body: c.body })), 5000);

// CONTACT
  document.getElementById("contactTitle").textContent = contact.title || "Contact";
  document.getElementById("contactIntro").textContent = contact.intro || "";
  document.getElementById("contactImg").src = contact.image || "";
  document.getElementById("contactImg").alt = "Contact";
  document.getElementById("addrLabel").textContent = contact.address_label || "Address";
  document.getElementById("addrValue").textContent = contact.address_value || "";
  document.getElementById("phoneLabel").textContent = contact.phone_label || "Phone";
  document.getElementById("phoneValue").textContent = contact.phone_value || "";
  document.getElementById("emailLabel").textContent = contact.email_label || "Email";
  const emailA = document.getElementById("emailValue");
  emailA.textContent = contact.email_value || "";
  emailA.href = `mailto:${contact.email_value || ""}`;
    // Hide contact rows if empty (user requested removing address/phone/email blocks)
    const phoneRow = document.getElementById("phoneRow");
    if (phoneRow && !(contact.phone_label || contact.phone_value)) phoneRow.remove();
    const emailRow = document.getElementById("emailRow");
    if (emailRow && !(contact.email_label || contact.email_value)) emailRow.remove();

  document.getElementById("contactCta").textContent = contact.cta_label || "Send message";
  }

document.addEventListener("DOMContentLoaded", ()=>{
  init().catch(err=>console.error(err));

  // Netlify form submission (AJAX) + in-page confirmation (no redirect)
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("formToast");
  const toastClose = document.getElementById("toastClose");

  function showToast(message) {
    if (!toast) return;
    const msg = toast.querySelector(".toast-msg");
    if (msg) msg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 6000);
  }
  if (toastClose) toastClose.addEventListener("click", () => toast && toast.classList.remove("show"));

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData(form);
        // Ensure Netlify receives the form name
        if (!formData.get("form-name")) formData.set("form-name", form.getAttribute("name") || "contact");
        const body = new URLSearchParams();
        for (const [k, v] of formData.entries()) body.append(k, v);

        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });

        if (!res.ok) throw new Error("Network response was not ok");
        form.reset();
        showToast("Thank you, we will contact you shortly.");
      } catch (err) {
        showToast("Sorry — something went wrong. Please try again.");
      }
    });
  }

});