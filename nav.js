/* nav.js — Gedeeld navigatiebolk voor alle Total Travel pagina's
 * Laad dit script in elke pagina: <script src="nav.js"></script>
 * Plaatsing: direct na <body>, VOOR alle pagina-inhoud
 * Het script injecteert de volledige nav (topbar + mobileNav + nav) en
 * past ankers automatisch aan afhankelijk van de huidige pagina.
 */

(function(){
  /* ── Injecteer nav-CSS als <style> in <head> ── */
  /* Zorgt dat nav altijd correct is, ongeacht eigen CSS van de pagina */
  var navStyle = document.createElement('style');
  navStyle.id = 'tt-nav-css';
  navStyle.textContent = `
:root{
  --s:#A0522D;--sdk:#7A3E21;--slt:#C4784A;
  --z:#C4A882;--zlt:#DDD0BC;--zdm:#B09068;
  --i:#F5F0E8;--iw:#EDE5D8;--ic:#E8DDD0;
  --t:#2D1F14;--e:#1A1410;--w:#FAF8F4;
  --sub:#5A4030;--dim:#8A7060;
  --pf:'Playfair Display',Georgia,serif;
  --dm:'DM Sans',system-ui,sans-serif;
  --ease:cubic-bezier(.25,.46,.45,.94);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--dm);background:var(--i);color:var(--e);overflow-x:hidden;cursor:none}
img{display:block;max-width:100%}
a{text-decoration:none;color:inherit}

.cursor{width:10px;height:10px;background:var(--s);border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .15s var(--ease)}
.cursor-ring{width:36px;height:36px;border:1px solid var(--s);border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:transform .35s var(--ease),opacity .2s;opacity:.6}

.reveal{opacity:0;transform:translateY(32px);transition:opacity .8s var(--ease),transform .8s var(--ease)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-left{opacity:0;transform:translateX(-40px);transition:opacity .9s var(--ease),transform .9s var(--ease)}
.reveal-left.visible{opacity:1;transform:translateX(0)}
.reveal-right{opacity:0;transform:translateX(40px);transition:opacity .9s var(--ease),transform .9s var(--ease)}
.reveal-right.visible{opacity:1;transform:translateX(0)}

/* TOPBAR */
.topbar{position:fixed;top:0;left:0;right:0;z-index:101;height:34px;background:var(--s);display:flex;align-items:center;justify-content:center;padding:0}
.topbar-inner{width:100%;max-width:1280px;padding:0 48px;display:flex;align-items:center;justify-content:space-between}
.topbar-left{display:flex;align-items:center;gap:24px}
.topbar-item{display:flex;align-items:center;gap:7px;font-size:10.5px;font-weight:400;letter-spacing:.03em;color:rgba(250,248,244,.82);white-space:nowrap;transition:color .2s}
.topbar-item:hover{color:var(--w)}
.topbar-item svg{opacity:.7;flex-shrink:0}
.topbar-right{display:flex;align-items:center;gap:8px}
.topbar-btn{font-family:var(--dm);font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:4px 14px;transition:background .2s,color .2s;white-space:nowrap;cursor:pointer;border:none}
.topbar-btn.outline{background:transparent;color:rgba(250,248,244,.82);border:1px solid rgba(250,248,244,.3)}
.topbar-btn.outline:hover{background:rgba(250,248,244,.1);color:var(--w);border-color:rgba(250,248,244,.6)}
.topbar-btn.solid{background:var(--w);color:var(--s)}
.topbar-btn.solid:hover{background:var(--i)}
.topbar-divider{width:1px;height:14px;background:rgba(250,248,244,.2)}

/* NAV */
nav.scrolled{border-bottom-color:var(--zlt);box-shadow:0 2px 32px rgba(45,31,20,.06)}
.nav-inner{width:100%;max-width:none;padding:0 40px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px}
.nav-left{display:flex;align-items:center;gap:16px}
.nav-center{display:flex;align-items:center;justify-content:center}
.nav-right{display:flex;align-items:center;justify-content:flex-end;gap:20px}
.nav-logo{font-family:var(--dm);font-size:22px;font-weight:500;letter-spacing:.20em;text-transform:uppercase;color:var(--t);white-space:nowrap;text-decoration:none;display:inline-block}
.nav-logo .dot{color:var(--s)}
.nav-links{display:flex;align-items:center;gap:28px;list-style:none}
.nav-links a{font-size:12.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--sub);transition:color .2s;white-space:nowrap}
.nav-links a:hover{color:var(--s)}
.nav-hamburger-mob{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px}
.nav-hamburger-mob span{width:22px;height:1.5px;background:var(--t);transition:.3s;display:block}
.nav-cta-hide-mobile{background:var(--s)!important;color:var(--w)!important;padding:9px 22px!important;font-family:var(--dm);font-size:10px!important;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;display:inline-block;white-space:nowrap;transition:background .2s!important;line-height:1}
.nav-cta-hide-mobile:hover{background:var(--sdk)!important}

/* DROPDOWN — hangt aan nav, niet aan li */
.has-dropdown{position:static}
.nav-link-drop{display:flex;align-items:center;gap:5px}
.nav-arrow{font-size:8px;transition:transform .2s;display:inline-block}
.has-dropdown:hover .nav-arrow{transform:rotate(180deg)}

/* Nav is de positioning parent voor dropdowns */
nav{position:fixed;top:34px;left:0;right:0;z-index:100;height:62px;display:flex;align-items:center;justify-content:center;padding:0;background:rgba(250,248,244,.96);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:border-color .3s,box-shadow .3s,top .3s}

.dest-dropdown,.thema-dropdown{
  position:absolute;
  top:62px; /* hoogte van de nav */
  left:0;
  right:0;
  visibility:hidden;
  opacity:0;
  pointer-events:none;
  z-index:500;
  transition:opacity .18s ease, visibility .18s ease;
}
.has-dropdown:hover .nav-arrow{transform:rotate(180deg)}
/* nav-arrow rotation wordt ook via JS inline style gezet */

.dest-dropdown,.thema-dropdown{
  position:absolute;
  top:62px;
  left:0;
  right:0;
  visibility:hidden;
  opacity:0;
  pointer-events:none;
  z-index:500;
  transition:opacity .15s ease, visibility .15s ease;
}
/* open/close wordt door JS geregeld via inline styles — geen :hover regel */
.dd-inner{background:var(--w);border-top:3px solid var(--s);box-shadow:0 24px 64px rgba(45,31,20,.16);display:flex;align-items:stretch;max-width:1480px;margin:0 auto}

/* BESTEMMINGEN */
.dest-dropdown{}
.dd-inner.dest-inner{width:100%}
.dest-continents{width:200px;flex-shrink:0;background:var(--i);border-right:1px solid var(--zlt);display:flex;flex-direction:column;padding:8px 0}
.dest-continent-btn{padding:11px 18px;font-family:var(--pf);font-size:15px;font-weight:400;color:var(--sub);text-align:left;border:none;background:transparent;cursor:pointer;border-left:3px solid transparent;transition:background .12s,color .12s,border-color .12s;display:flex;align-items:center;justify-content:space-between;white-space:nowrap;width:100%}
.dest-continent-btn .cnt-count{font-size:10px;font-family:var(--dm);font-weight:400;color:var(--dim);margin-left:8px}

/* mobileNav CSS */

#mobileNav{
  display:none;position:fixed;top:0;left:0;width:100%;height:100%;
  z-index:9999;background:#2D1F14;overflow-y:auto;
  -webkit-overflow-scrolling:touch;
  font-family:'DM Sans',sans-serif;
}
#mobileNav.open{display:block}
#mobileNav .mn-head{
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 24px;
  border-bottom:1px solid rgba(196,168,130,.18);
  position:sticky;top:0;background:#2D1F14;z-index:1;
}
#mobileNav .mn-wordmark{
  font-size:13px;font-weight:500;letter-spacing:.2em;
  text-transform:uppercase;color:#F5F0E8;
}
#mobileNav .mn-wordmark span{color:#A0522D}
#mobileNav .mn-close{
  background:none;border:none;cursor:pointer;
  font-size:24px;color:#C4A882;padding:4px 8px;line-height:1;
}
#mobileNav .mn-item{
  border-bottom:1px solid rgba(196,168,130,.1);
}
#mobileNav .mn-btn{
  display:flex;align-items:center;justify-content:space-between;
  width:100%;padding:17px 24px;
  background:none;border:none;cursor:pointer;text-align:left;
  font-family:'Playfair Display',Georgia,serif;
  font-size:21px;font-weight:400;color:#F5F0E8;
  -webkit-tap-highlight-color:transparent;
}
#mobileNav .mn-btn .mn-plus{
  font-family:'DM Sans',sans-serif;
  font-size:22px;font-weight:300;color:#A0522D;
  flex-shrink:0;margin-left:12px;
}
#mobileNav .mn-sub{display:none;background:rgba(0,0,0,.12)}
#mobileNav .mn-sub.open{display:block}
#mobileNav .mn-region-btn{
  display:flex;align-items:center;justify-content:space-between;
  width:100%;padding:12px 24px 12px 36px;
  background:none;border:none;cursor:pointer;text-align:left;
  font-family:'DM Sans',sans-serif;
  font-size:12px;font-weight:600;letter-spacing:.1em;
  text-transform:uppercase;color:#C4A882;
  border-top:1px solid rgba(196,168,130,.07);
  text-decoration:none;
  -webkit-tap-highlight-color:transparent;
  box-sizing:border-box;
}
#mobileNav .mn-region-btn .mn-plus{
  font-size:16px;color:#B09068;margin-left:10px;
}
#mobileNav .mn-region-sub{display:none;padding:4px 0 8px}
#mobileNav .mn-region-sub.open{display:block}
#mobileNav .mn-region-sub a{
  display:block;padding:9px 24px 9px 56px;
  font-family:'Playfair Display',Georgia,serif;
  font-style:italic;font-size:16px;
  color:rgba(245,240,232,.5);
  text-decoration:none;
  -webkit-tap-highlight-color:transparent;
}
#mobileNav .mn-thema-list{background:rgba(0,0,0,.12);padding:4px 0 8px}
#mobileNav .mn-thema-list a{
  display:block;padding:9px 24px 9px 56px;
  font-family:'Playfair Display',Georgia,serif;
  font-style:italic;font-size:16px;
  color:rgba(245,240,232,.5);
  text-decoration:none;
  border-bottom:1px solid rgba(196,168,130,.07);
  -webkit-tap-highlight-color:transparent;
}
#mobileNav .mn-thema-list a:last-child{border-bottom:none}
#mobileNav .mn-direct{
  display:block;padding:17px 24px;
  font-family:'Playfair Display',Georgia,serif;
  font-size:21px;font-weight:400;color:#F5F0E8;
  text-decoration:none;
  border-bottom:1px solid rgba(196,168,130,.1);
  -webkit-tap-highlight-color:transparent;
}
#mobileNav .mn-cta{
  display:block;margin:24px;padding:16px;
  background:#A0522D;color:#FAF8F4;
  font-family:'DM Sans',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;text-align:center;
  text-decoration:none;
}
`;
  /* Voeg toe aan begin van <head> zodat pagina-eigen CSS het kan overschrijven */
  var firstStyle = document.head.querySelector('style, link[rel="stylesheet"]');
  if (firstStyle) {
    document.head.insertBefore(navStyle, firstStyle);
  } else {
    document.head.appendChild(navStyle);
  }

  /* ── Bepaal of we op de homepage zijn of een subpagina ── */
  var isHome = (
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/') ||
    window.location.pathname === ''
  );
  var prefix = isHome ? '' : 'index.html';

  /* ── Nav HTML ── */
  var navHTML = `<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>



<div id="mobileNav">
  <div class="mn-head">
    <div class="mn-wordmark">TOTAL <span>&middot;</span> TRAVEL</div>
    <button class="mn-close" onclick="toggleNav()">&#10005;</button>
  </div>

  <!-- Bestemmingen -->
  <div class="mn-item">
    <button class="mn-btn" onclick="mnToggle(this)">
      Bestemmingen <span class="mn-plus">+</span>
    </button>
    <div class="mn-sub">
      <button class="mn-region-btn" onclick="mnRegion(this)">Afrika <span class="mn-plus">+</span></button>
      <div class="mn-region-sub">
        <a href="marokko.html" onclick="toggleNav()">Marokko</a>
        <a href="#" onclick="toggleNav()">Namibi&euml;</a>
        <a href="#" onclick="toggleNav()">Zanzibar</a>
        <a href="#" onclick="toggleNav()">Zuid-Afrika</a>
      </div>
      <button class="mn-region-btn" onclick="mnRegion(this)">Antarctica <span class="mn-plus">+</span></button>
      <div class="mn-region-sub">
        <a href="#" onclick="toggleNav()">Antarctica</a>
      </div>
      <button class="mn-region-btn" onclick="mnRegion(this)">Azi&euml; <span class="mn-plus">+</span></button>
      <div class="mn-region-sub">
        <a href="#" onclick="toggleNav()">Japan</a>
        <a href="#" onclick="toggleNav()">Maleisi&euml;</a>
        <a href="#" onclick="toggleNav()">Singapore</a>
        <a href="#" onclick="toggleNav()">Thailand</a>
        <a href="#" onclick="toggleNav()">Vietnam</a>
      </div>
      <button class="mn-region-btn" onclick="mnRegion(this)">Europa <span class="mn-plus">+</span></button>
      <div class="mn-region-sub">
        <a href="#" onclick="toggleNav()">Denemarken</a>
        <a href="#" onclick="toggleNav()">Duitsland</a>
        <a href="#" onclick="toggleNav()">Finland</a>
        <a href="#" onclick="toggleNav()">Frankrijk</a>
        <a href="#" onclick="toggleNav()">Griekenland</a>
        <a href="#" onclick="toggleNav()">Itali&euml;</a>
        <a href="#" onclick="toggleNav()">Noorwegen</a>
        <a href="#" onclick="toggleNav()">Oostenrijk</a>
        <a href="#" onclick="toggleNav()">Portugal</a>
        <a href="#" onclick="toggleNav()">Spanje</a>
        <a href="#" onclick="toggleNav()">Zweden</a>
        <a href="#" onclick="toggleNav()">Zwitserland</a>
      </div>
      <button class="mn-region-btn" onclick="mnRegion(this)">Midden-Oosten <span class="mn-plus">+</span></button>
      <div class="mn-region-sub">
        <a href="#" onclick="toggleNav()">Bahrein</a>
        <a href="#" onclick="toggleNav()">Jordani&euml;</a>
        <a href="#" onclick="toggleNav()">Oman</a>
        <a href="#" onclick="toggleNav()">Qatar</a>
        <a href="#" onclick="toggleNav()">Saudi-Arabi&euml;</a>
        <a href="#" onclick="toggleNav()">Ver. Arabische Emiraten</a>
      </div>
      <button class="mn-region-btn" onclick="mnRegion(this)">Noord-Amerika <span class="mn-plus">+</span></button>
      <div class="mn-region-sub">
        <a href="#" onclick="toggleNav()">Canada</a>
        <a href="#" onclick="toggleNav()">Verenigde Staten</a>
      </div>
      <button class="mn-region-btn" onclick="mnRegion(this)">Oceani&euml; <span class="mn-plus">+</span></button>
      <div class="mn-region-sub">
        <a href="#" onclick="toggleNav()">Australi&euml;</a>
        <a href="#" onclick="toggleNav()">Nieuw-Zeeland</a>
      </div>
      <button class="mn-region-btn" onclick="mnRegion(this)">Zuid-Amerika <span class="mn-plus">+</span></button>
      <div class="mn-region-sub">
        <a href="#" onclick="toggleNav()">Argentini&euml;</a>
        <a href="#" onclick="toggleNav()">Brazili&euml;</a>
        <a href="#" onclick="toggleNav()">Chili</a>
        <a href="#" onclick="toggleNav()">Ecuador</a>
      </div>
    </div>
  </div>

  <!-- Thema's -->
  <div class="mn-item">
    <button class="mn-btn" onclick="mnToggle(this)">
      Thema's <span class="mn-plus">+</span>
    </button>
    <div class="mn-sub">
      <a href="#" class="mn-region-btn" onclick="toggleNav()">Cruises</a>
      <a href="#" class="mn-region-btn" onclick="toggleNav()">Formule 1 reizen</a>
      <a href="#" class="mn-region-btn" onclick="toggleNav()">Golfreizen</a>
      <a href="#" class="mn-region-btn" onclick="toggleNav()">Incentives</a>
      <a href="#" class="mn-region-btn" onclick="toggleNav()">Stedentrips</a>
      <a href="#" class="mn-region-btn" onclick="toggleNav()">Vakantiereizen</a>
      <a href="#" class="mn-region-btn" onclick="toggleNav()">Voetbalreizen</a>
    </div>
  </div>

  <!-- Directe links -->
  <a class="mn-direct" href="#prive" onclick="toggleNav()">Priv&eacute; Reizen</a>
  <a class="mn-direct" href="totaltravel-incentives.html">Zakelijke Incentives</a>
  <a class="mn-direct" href="totaltravel-wederverkoper.html">Reisprofessionals</a>
  <a class="mn-direct" href="#specialisaties" onclick="toggleNav()">Specialisaties</a>
  <a class="mn-direct" href="#over" onclick="toggleNav()">Over ons</a>
  <a class="mn-direct" href="#aangesloten" onclick="toggleNav()">Aangesloten</a>

  <a class="mn-cta" href="totaltravel-aanvraag.html" onclick="toggleNav()">Reis aanvragen</a>
</div>

<div class="topbar">
  <div class="topbar-inner">
    <div class="topbar-left">
      <a href="totaltravel-aanvraag.html" class="topbar-btn outline" style="text-decoration:none">Reis aanvragen</a>
      <button class="topbar-btn outline">Abonneer op nieuwsbrief</button>
    </div>
    <div class="topbar-right">
      <a href="#over" class="topbar-item">Over ons</a>
      <div class="topbar-divider"></div>
      <a href="tel:+31786817579" class="topbar-item">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.17 1.18 2 2 0 012.14 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
        +31 78 681 75 79
      </a>
      <div class="topbar-divider"></div>
      <a href="/cdn-cgi/l/email-protection#046d6a626b44706b7065687076657261682a6a68" class="topbar-item hide-mobile">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        &#105;&#110;&#102;&#111;&#64;&#116;&#111;&#116;&#97;&#108;&#116;&#114;&#97;&#118;&#101;&#108;&#46;&#110;&#108;
      </a>
    </div>
  </div>
</div>

<nav id="nav">
  <div class="nav-inner"><div class="nav-left"><div class="nav-hamburger nav-hamburger-mob" onclick="toggleNav()"><span></span><span></span><span></span></div><a href="index.html" class="nav-logo">TOTAL <span class="dot">&middot;</span> TRAVEL</a></div><div class="nav-center">
  <ul class="nav-links">

    <li class="has-dropdown"><a href="#bestemmingen" class="nav-link-drop">Bestemmingen <span class="nav-arrow">&#9660;</span></a>
      <div class="dest-dropdown"><div class="dd-inner dest-inner">
        <div class="dest-continents">
          <button class="dest-continent-btn active" onmouseenter="showContinent('afrika',this)">Afrika<span class="cnt-count">4</span></button>
          <button class="dest-continent-btn" onmouseenter="showContinent('antarctica',this)">Antarctica<span class="cnt-count">1</span></button>
          <button class="dest-continent-btn" onmouseenter="showContinent('azie',this)">Azi&euml;<span class="cnt-count">5</span></button>
          <button class="dest-continent-btn" onmouseenter="showContinent('europa',this)">Europa<span class="cnt-count">12</span></button>
          <button class="dest-continent-btn" onmouseenter="showContinent('midden-oosten',this)">Midden-Oosten<span class="cnt-count">6</span></button>
          <button class="dest-continent-btn" onmouseenter="showContinent('noord-amerika',this)">Noord-Amerika<span class="cnt-count">2</span></button>
          <button class="dest-continent-btn" onmouseenter="showContinent('oceanie',this)">Oceani&euml;<span class="cnt-count">2</span></button>
          <button class="dest-continent-btn" onmouseenter="showContinent('zuid-amerika',this)">Zuid-Amerika<span class="cnt-count">4</span></button>
        </div>
        <div class="dest-panels">

          <!-- AFRIKA: Marokko, Namibië, Zuid-Afrika, Zanzibar → alfa: Marokko, Namibië, Zanzibar, Zuid-Afrika -->
          <div class="dest-panel active" id="panel-afrika">
            <div class="dest-panel-label">Afrika &mdash; 4 bestemmingen</div>
            <div class="dest-cards">
              <div class="dest-card" onclick="location='marokko.html'"><div class="dest-card-inner dest-photo" style="background-image:url('Media/marokko.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Marokko</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/namibie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Namibi&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/zanzibar.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Zanzibar</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/zuidafrika.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Zuid-Afrika</span></div></div>
            </div>
          </div>

          <!-- ANTARCTICA -->
          <div class="dest-panel" id="panel-antarctica">
            <div class="dest-panel-label">Antarctica &mdash; 1 bestemming</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/antarctica.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Antarctica</span></div></div>
            </div>
          </div>

          <!-- AZIË: alfa: Japan, Maleisië, Singapore, Thailand, Vietnam -->
          <div class="dest-panel" id="panel-azie">
            <div class="dest-panel-label">Azi&euml; &mdash; 5 bestemmingen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/japan.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Japan</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/maleisie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Maleisi&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/singapore.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Singapore</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/thailand.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Thailand</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/vietnam.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Vietnam</span></div></div>
            </div>
          </div>

          <!-- EUROPA: alfa: Denemarken, Duitsland, Finland, Frankrijk, Griekenland, Italië, Noorwegen, Oostenrijk, Portugal, Spanje, Zweden, Zwitserland -->
          <div class="dest-panel" id="panel-europa">
            <div class="dest-panel-label">Europa &mdash; 12 bestemmingen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/denemarken.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Denemarken</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/duitsland.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Duitsland</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/finland.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Finland</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/frankrijk.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Frankrijk</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/griekenland.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Griekenland</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/italie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Itali&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/noorwegen.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Noorwegen</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/oostenrijk.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Oostenrijk</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/portugal.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Portugal</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/spanje.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Spanje</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/zweden.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Zweden</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/zwitserland.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Zwitserland</span></div></div>
            </div>
          </div>

          <!-- MIDDEN-OOSTEN: alfa: Bahrein, Jordanië, Oman, Qatar, Saudi-Arabië, Ver. Arabische Emiraten -->
          <div class="dest-panel" id="panel-midden-oosten">
            <div class="dest-panel-label">Midden-Oosten &mdash; 6 bestemmingen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/bahrein.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Bahrein</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/jordanie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Jordani&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/oman.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Oman</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/qatar.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Qatar</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/saudiarabie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Saudi-Arabi&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/verenigdearabischeemiraten.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Ver. Arabische Emiraten</span></div></div>
            </div>
          </div>

          <!-- NOORD-AMERIKA: alfa: Canada, Verenigde Staten -->
          <div class="dest-panel" id="panel-noord-amerika">
            <div class="dest-panel-label">Noord-Amerika &mdash; 2 bestemmingen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/canada.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Canada</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/verenigde-staten.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Verenigde Staten</span></div></div>
            </div>
          </div>

          <!-- OCEANIË: alfa: Australië, Nieuw-Zeeland -->
          <div class="dest-panel" id="panel-oceanie">
            <div class="dest-panel-label">Oceani&euml; &mdash; 2 bestemmingen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/australie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Australi&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/nieuwzeeland.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Nieuw-Zeeland</span></div></div>
            </div>
          </div>

          <!-- ZUID-AMERIKA: alfa: Argentinië, Brazilië, Chili, Ecuador -->
          <div class="dest-panel" id="panel-zuid-amerika">
            <div class="dest-panel-label">Zuid-Amerika &mdash; 4 bestemmingen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/argentinie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Argentini&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/brazilie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Brazili&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/chili.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Chili</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/ecuador.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Ecuador</span></div></div>
            </div>
          </div>

        </div>
      </div></div>
    </li>


    <li class="has-dropdown"><a href="#themas" class="nav-link-drop">Thema's <span class="nav-arrow">&#9660;</span></a>
      <div class="thema-dropdown"><div class="dd-inner thema-inner">
        <div class="dest-continents">
          <button class="dest-continent-btn active" onmouseenter="showThema('cruises',this)">Cruises</button>
          <button class="dest-continent-btn" onmouseenter="showThema('formule1',this)">Formule 1 reizen</button>
          <button class="dest-continent-btn" onmouseenter="showThema('golf',this)">Golfreizen</button>
          <button class="dest-continent-btn" onmouseenter="showThema('incentives',this)">Incentives</button>
          <button class="dest-continent-btn" onmouseenter="showThema('stedentrips',this)">Stedentrips</button>
          <button class="dest-continent-btn" onmouseenter="showThema('vakantie',this)">Vakantiereizen</button>
          <button class="dest-continent-btn" onmouseenter="showThema('voetbal',this)">Voetbalreizen</button>
        </div>
        <div class="dest-panels">
          <div class="dest-panel active" id="tpanel-cruises">
            <div class="dest-panel-label">Cruises</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/thema-cruises.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Cruises</span></div></div>
            </div>
          </div>
          <div class="dest-panel" id="tpanel-formule1">
            <div class="dest-panel-label">Formule 1 reizen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/f1-abudhabi.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Abu Dhabi</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/f1-bahrein.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Bahrein</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/f1-qatar.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Qatar</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/f1-saudiarabie.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Saudi-Arabi&euml;</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/f1-singapore.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Singapore</span></div></div>
            </div>
          </div>
          <div class="dest-panel" id="tpanel-golf">
            <div class="dest-panel-label">Golfreizen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/golf-marokko.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Marokko</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/golf-portugal.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Portugal</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/golf-spanje.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Spanje</span></div></div>
            </div>
          </div>
          <div class="dest-panel" id="tpanel-incentives">
            <div class="dest-panel-label">Incentives</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/thema-incentives.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Incentives</span></div></div>
            </div>
          </div>
          <div class="dest-panel" id="tpanel-stedentrips">
            <div class="dest-panel-label">Stedentrips</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/stad-barcelona.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Barcelona</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/stad-lissabon.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Lissabon</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/stad-londen.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Londen</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/stad-madrid.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Madrid</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/stad-newyork.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">New York</span></div></div>
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/stad-porto.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Porto</span></div></div>
            </div>
          </div>
          <div class="dest-panel" id="tpanel-vakantie">
            <div class="dest-panel-label">Vakantiereizen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/thema-vakantiereizen.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Vakantiereizen</span></div></div>
            </div>
          </div>
          <div class="dest-panel" id="tpanel-voetbal">
            <div class="dest-panel-label">Voetbalreizen</div>
            <div class="dest-cards">
              <div class="dest-card"><div class="dest-card-inner dest-photo" style="background-image:url('Media/thema-voetbal.jpg')"></div><div class="dest-card-overlay"></div><div class="dest-card-name"><span class="dest-pin">&#9679;</span><span class="dest-name">Voetbalreizen</span></div></div>
            </div>
          </div>
        </div>
      </div></div>
    </li>
    <li><a href="#prive">Priv&eacute; Reizen</a></li>
    <li><a href="totaltravel-incentives.html">Zakelijke Incentives</a></li>
    <li><a href="totaltravel-wederverkoper.html">Reisprofessionals</a></li>
    <li><a href="#specialisaties">Specialisaties</a></li>
  </ul>
</div><div class="nav-right"><a href="totaltravel-aanvraag.html" class="nav-cta nav-cta-hide-mobile">Reis aanvragen</a></div></div></nav>
``;

  /* ── Pas ankers aan voor subpagina's ── */
  if (!isHome) {
    navHTML = navHTML
      .replace(/href="#bestemmingen"/g, 'href="index.html#bestemmingen"')
      .replace(/href="#themas"/g, 'href="index.html#themas"')
      .replace(/href="#prive"/g, 'href="index.html#prive"')
      .replace(/href="#specialisaties"/g, 'href="index.html#specialisaties"')
      .replace(/href="#over"/g, 'href="index.html#over"')
      .replace(/href="#aangesloten"/g, 'href="index.html#aangesloten"')
      .replace(/href="#contact"/g, 'href="index.html#contact"')
      /* Topbar CTA verwijst op subpagina's naar aanvraagformulier */
      .replace(/href="totaltravel-aanvraag\.html" class="topbar-btn/g, 'href="totaltravel-aanvraag.html" class="topbar-btn');
  }

  /* ── Injecteer nav in de DOM ── */
  var container = document.createElement('div');
  container.innerHTML = navHTML;
  document.body.insertBefore(container, document.body.firstChild);

  /* ── Markeer actieve nav-link ── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mn-direct').forEach(function(a){
    var href = a.getAttribute('href') || '';
    var hrefPage = href.split('/').pop().split('#')[0];
    if (hrefPage && hrefPage === page) {
      a.style.color = 'var(--s)';
      a.classList.add('nav-active');
    }
  });

  /* ── Cursor ── */
  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursorRing');
  if (cursor) {
    document.addEventListener('mousemove', function(e){
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      ring.style.left   = e.clientX + 'px';
      ring.style.top    = e.clientY + 'px';
    });
  }

  /* ── Topbar + nav scroll ── */
  var nav    = document.getElementById('nav');
  var topbar = document.querySelector('.topbar');
  if (nav && topbar) {
    window.addEventListener('scroll', function(){
      var scrolled = window.scrollY > 40;
      nav.classList.toggle('scrolled', scrolled);
      if (scrolled) {
        topbar.style.transform  = 'translateY(-100%)';
        topbar.style.transition = 'transform .3s ease';
        nav.style.top           = '0';
      } else {
        topbar.style.transform = '';
        nav.style.top          = '34px';
      }
    }, {passive: true});
  }

  /* ── Dropdown (hover) ── */
  document.querySelectorAll('.has-dropdown').forEach(function(li){
    var dd    = li.querySelector('.dest-dropdown, .thema-dropdown');
    var arrow = li.querySelector('.nav-arrow');
    var timer = null;
    if (!dd) return;
    function openDD() {
      clearTimeout(timer);
      dd.style.visibility   = 'visible';
      dd.style.opacity      = '1';
      dd.style.pointerEvents = 'all';
      if (arrow) arrow.style.transform = 'rotate(180deg)';
    }
    function closeDD() {
      timer = setTimeout(function(){
        dd.style.visibility   = 'hidden';
        dd.style.opacity      = '0';
        dd.style.pointerEvents = 'none';
        if (arrow) arrow.style.transform = '';
      }, 120);
    }
    li.addEventListener('mouseenter', openDD);
    li.addEventListener('mouseleave', closeDD);
    dd.addEventListener('mouseenter', function(){ clearTimeout(timer); });
    dd.addEventListener('mouseleave', closeDD);
  });

})(); /* einde IIFE */

/* ── Globale nav-functies (worden aangeroepen vanuit inline onclick) ── */
function showContinent(id, btn) {
  document.querySelectorAll('.dest-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.dest-continent-btn:not(.empty)').forEach(function(b){ b.classList.remove('active'); });
  var panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
}

function showThema(id, btn) {
  document.querySelectorAll('[id^="tpanel-"]').forEach(function(p){ p.classList.remove('active'); });
  btn.closest('.dest-continents').querySelectorAll('.dest-continent-btn').forEach(function(b){ b.classList.remove('active'); });
  var panel = document.getElementById('tpanel-' + id);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
}

function toggleNav() {
  var m = document.getElementById('mobileNav');
  if (!m) return;
  if (m.classList.contains('open')) {
    m.classList.remove('open');
    m.querySelectorAll('.mn-sub, .mn-region-sub').forEach(function(s){ s.classList.remove('open'); });
    m.querySelectorAll('.mn-plus').forEach(function(p){ p.textContent = '+'; });
  } else {
    m.classList.add('open');
  }
}

function mnToggle(btn) {
  var sub    = btn.nextElementSibling;
  var plus   = btn.querySelector('.mn-plus');
  var isOpen = sub.classList.contains('open');
  btn.closest('#mobileNav').querySelectorAll('.mn-item > .mn-btn + .mn-sub').forEach(function(s){ s.classList.remove('open'); });
  btn.closest('#mobileNav').querySelectorAll('.mn-item > .mn-btn .mn-plus').forEach(function(p){ p.textContent = '+'; });
  if (!isOpen) { sub.classList.add('open'); if (plus) plus.textContent = '\u2212'; }
}

function mnRegion(btn) {
  var sub    = btn.nextElementSibling;
  var plus   = btn.querySelector('.mn-plus');
  var isOpen = sub.classList.contains('open');
  btn.closest('.mn-sub').querySelectorAll('.mn-region-sub').forEach(function(s){ s.classList.remove('open'); });
  btn.closest('.mn-sub').querySelectorAll('.mn-region-btn .mn-plus').forEach(function(p){ p.textContent = '+'; });
  if (!isOpen) { sub.classList.add('open'); if (plus) plus.textContent = '\u2212'; }
}
