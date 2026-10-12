/* chiliz | R26-IT-075 site script (no dependencies) */
(function () {
  "use strict";
  var d = document, html = d.documentElement;
  html.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ---------- Mobile nav & dropdown ---------- */
  var header = $(".site-header"), menuBtn = $(".menu-btn");
  if (menuBtn) menuBtn.addEventListener("click", function () {
    var open = header.classList.toggle("nav-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$(".has-dd").forEach(function (li) {
    var b = $(".dd-btn", li);
    b.addEventListener("click", function (e) {
      e.preventDefault();
      var open = li.classList.toggle("open");
      b.setAttribute("aria-expanded", open);
    });
    d.addEventListener("click", function (e) { if (!li.contains(e.target)) { li.classList.remove("open"); b.setAttribute("aria-expanded", "false"); } });
  });
  d.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { $$(".has-dd.open").forEach(function (l) { l.classList.remove("open"); }); if (header) header.classList.remove("nav-open"); }
  });

  /* ---------- Reveal & counters ---------- */
  function countUp(el) {
    var end = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length;
    var fmt = function (v) { return v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }); };
    if (reduce) { el.textContent = fmt(end); return; }
    var t0 = null, dur = 1100;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting && en.boundingClientRect.top > 0) return;
        var t = en.target;
        t.classList.add("in");
        if (t.dataset.count) countUp(t);
        if (t.classList.contains("progress")) { var i = $("i", t); i.style.width = i.dataset.w; }
        if (t.classList.contains("timeline")) { var f = $(".fill", t); if (f) f.style.height = f.dataset.h; }
        io.unobserve(t);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -30px 0px" });
    $$("[data-reveal],[data-count],.progress,.timeline").forEach(function (el) { io.observe(el); });
  } else {
    $$("[data-reveal]").forEach(function (el) { el.classList.add("in"); });
    $$("[data-count]").forEach(function (el) { el.textContent = el.dataset.count; });
  }

  /* ---------- Back to top ---------- */
  var top = $(".to-top");
  if (top) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { top.classList.toggle("show", window.scrollY > 700); ticking = false; });
    }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  }

  /* ---------- Domain: TOC highlighting ---------- */
  var tocLinks = $$(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { tocLinks.forEach(function (a) { a.classList.remove("active"); }); var a = map[en.target.id]; if (a) a.classList.add("active"); }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) { var s = d.getElementById(id); if (s) so.observe(s); });
  }

  /* ---------- Tabs (methodology) ---------- */
  $$("[role=tablist]").forEach(function (list) {
    var tabs = $$("[role=tab]", list);
    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab, p = d.getElementById(t.getAttribute("aria-controls"));
        t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
        p.hidden = !on; p.classList.remove("play");
        if (on) { void p.offsetWidth; p.classList.add("play"); }
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { activate(t); });
      t.addEventListener("keydown", function (e) {
        var n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
        if (n === null) return; e.preventDefault(); activate(tabs[(n + tabs.length) % tabs.length], true);
      });
    });
    var hash = location.hash.slice(1), pre = tabs.filter(function (t) { return t.dataset.key === hash; })[0];
    activate(pre || tabs[0]);
    if (pre) setTimeout(function () { var m = d.getElementById("methodology"); if (m) m.scrollIntoView(); }, 50);
  });

  /* ---------- Milestones selector ---------- */
  var sel = $("#ms-select");
  if (sel) {
    var detail = $("#ms-detail"), items = $$(".tl");
    function show(id, scroll) {
      var src = d.getElementById(id); if (!src) return;
      var tpl = $("template", src);
      detail.innerHTML = tpl.innerHTML;
      detail.classList.add("swap"); void detail.offsetWidth; detail.classList.remove("swap");
      items.forEach(function (it) { it.classList.toggle("is-selected", it === src); });
      sel.value = id;
      if (history.replaceState) history.replaceState(null, "", "#" + id);
      if (scroll) detail.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
    sel.addEventListener("change", function () { show(sel.value, false); });
    items.forEach(function (it) {
      it.tabIndex = 0;
      it.addEventListener("click", function () { show(it.id, true); });
      it.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(it.id, true); } });
    });
    var h = location.hash.slice(1);
    show(d.getElementById(h) ? h : sel.dataset.default, !!d.getElementById(h));
    window.addEventListener("hashchange", function () { var k = location.hash.slice(1); if (d.getElementById(k)) show(k, true); });
  }

  /* ---------- PDF viewer ---------- */
  var viewer = $("#viewer");
  if (viewer) {
    var frame = $("iframe", viewer), vt = $("#viewer-title"), vo = $("#viewer-open"), vd = $("#viewer-dl");
    var small = function () { return window.matchMedia("(max-width: 760px)").matches || /iPhone|iPad|Android/i.test(navigator.userAgent); };
    $$("[data-view]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        var src = b.getAttribute("href");
        if (small() || typeof viewer.showModal !== "function") return; // let the browser open it in a new tab
        e.preventDefault();
        vt.textContent = b.dataset.title || "Document";
        vo.href = src; vd.href = src; vd.setAttribute("download", src.split("/").pop());
        frame.src = src + "#view=FitH";
        viewer.showModal();
      });
    });
    $("#viewer-close").addEventListener("click", function () { viewer.close(); });
    viewer.addEventListener("close", function () { frame.src = "about:blank"; });
    viewer.addEventListener("click", function (e) { if (e.target === viewer) viewer.close(); });
  }

  /* ---------- Image lightbox ---------- */
  var lb = $("#lightbox");
  if (lb) {
    var lbi = $("img", lb);
    $$("[data-zoom]").forEach(function (img) {
      img.classList.add("zoomable"); img.tabIndex = 0;
      var open = function () { lbi.src = img.dataset.zoom || img.currentSrc || img.src; lbi.alt = img.alt; lb.showModal(); };
      img.addEventListener("click", open);
      img.addEventListener("keydown", function (e) { if (e.key === "Enter") open(); });
    });
    lb.addEventListener("click", function () { lb.close(); });
  }

  /* ---------- Site search ---------- */
  var IDX = [
    ["Home", "index.html", "Overview, abstract, components, system flow, field visits, prototype, chiliz"],
    ["System flow diagram", "index.html#flow", "Complete flow of the rover system"],
    ["Field testing visits (HARTI)", "index.html#field", "Malagala Padukka, Hanwella Avissawella chilli plantations"],
    ["Prototype 1 vs Prototype 2", "index.html#prototype", "What's next, antenna camera, soil sensor stick"],
    ["chiliz commercialization plan", "index.html#chiliz", "Pricing, subscription, rover hardware, business model, go-to-market"],
    ["Literature survey", "domain.html#literature", "Precision agriculture, CNN disease detection, soil health, smart irrigation, GNSS, zone mapping"],
    ["Research gap", "domain.html#gap", "Comparison with existing systems"],
    ["Research problem", "domain.html#problem", "Disease, water stress, soil imbalance, GNSS degradation"],
    ["Research question", "domain.html#question", "How can an autonomous rover improve chilli crop monitoring"],
    ["Research objectives", "domain.html#objectives", "Main and specific objectives"],
    ["Methodology", "domain.html#methodology", "Component pipelines"],
    ["Navigation and irrigation methodology", "domain.html#navigation", "GNSS reliability, drip irrigation, Isolation Forest, Random Forest"],
    ["Disease detection methodology", "domain.html#disease", "EfficientNet-B0, Grad-CAM, TFLite"],
    ["Field zone mapping methodology", "domain.html#zones", "Sentinel-2, NDVI, K-Means, silhouette"],
    ["Soil health methodology", "domain.html#soil", "LSTM, XGBoost, NPK"],
    ["Technologies used", "domain.html#technologies", "Python, TensorFlow, scikit-learn, XGBoost, Leaflet"],
    ["Milestones", "milestones.html", "Assessments timeline and status"],
    ["Project proposal milestone", "milestones.html#m-proposal", "15 March 2026"],
    ["Progress Presentation 1", "milestones.html#m-pp1", "11 to 13 May 2026"],
    ["Progress Presentation 2", "milestones.html#m-pp2", "31 August to 2 September 2026"],
    ["Final presentation and viva", "milestones.html#m-final", "19 to 21 October 2026"],
    ["Documents", "documents.html", "Project charter, proposal, research paper, group report"],
    ["Presentations", "presentations.html", "Proposal, progress 1, progress 2, final slides"],
    ["About us", "about.html", "Group members and supervisors"],
    ["Contact us", "contact.html", "Emails, phone, email template"]
  ];
  var sd = $("#search"), sbtn = $(".search-btn");
  if (sd) {
    var si = $("input", sd), sl = $("ul", sd), hl = 0;
    function render() {
      var q = si.value.trim().toLowerCase();
      var res = IDX.filter(function (r) { return !q || (r[0] + " " + r[2]).toLowerCase().indexOf(q) > -1; }).slice(0, 9);
      hl = 0;
      sl.innerHTML = res.length ? res.map(function (r, i) {
        return '<li><a href="' + r[1] + '"' + (i === 0 ? ' class="hl"' : "") + ">" + r[0] + "<small>" + r[2] + "</small></a></li>";
      }).join("") : '<li class="empty">No matches. Try "soil", "viva" or "proposal".</li>';
    }
    function openS() { render(); sd.showModal(); si.value = ""; render(); si.focus(); }
    if (sbtn) sbtn.addEventListener("click", openS);
    d.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openS(); }
      if (e.key === "/" && !/input|textarea|select/i.test(d.activeElement.tagName) && !sd.open) { e.preventDefault(); openS(); }
    });
    si.addEventListener("input", render);
    si.addEventListener("keydown", function (e) {
      var links = $$("a", sl); if (!links.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); links[hl].classList.remove("hl");
        hl = (hl + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length; links[hl].classList.add("hl");
        links[hl].scrollIntoView({ block: "nearest" });
      }
      if (e.key === "Enter") { e.preventDefault(); location.href = links[hl].href; sd.close(); }
    });
    sl.addEventListener("click", function (e) { if (e.target.closest("a")) sd.close(); });
    sd.addEventListener("click", function (e) { if (e.target === sd) sd.close(); });
  }

  /* ---------- Copy buttons ---------- */
  function copyText(txt, btn) {
    var done = function () { var o = btn.textContent; btn.textContent = "Copied"; btn.classList.add("ok"); setTimeout(function () { btn.textContent = o; btn.classList.remove("ok"); }, 1400); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done);
    else { var t = d.createElement("textarea"); t.value = txt; d.body.appendChild(t); t.select(); try { d.execCommand("copy"); done(); } catch (e) {} t.remove(); }
  }
  $$("[data-copy]").forEach(function (b) { b.addEventListener("click", function () { copyText(b.dataset.copy, b); }); });

  /* ---------- Contact: email template ---------- */
  var form = $("#mailform");
  if (form) {
    var rec = $("#to"), subj = $("#subject"), body = $("#message"), nm = $("#name"), em = $("#email"), org = $("#org"), msg = $(".form-msg", form);
    var tpl = function () {
      return "Dear " + (rec.selectedOptions[0].dataset.greet || "Research Team") + ",\n\n" +
        "I am " + (nm.value || "[your name]") + (org.value ? " from " + org.value : "") + ". I am writing regarding the research project R26-IT-075, Smart Chilli Crop Intelligence System Using an Autonomous Ground Rover (chiliz).\n\n" +
        "[Write your message here]\n\n" +
        "Kind regards,\n" + (nm.value || "[your name]") + "\n" + (em.value || "[your email]");
    };
    var touched = false;
    body.addEventListener("input", function () { touched = true; });
    function refresh() { if (!touched) body.value = tpl(); }
    [rec, nm, org, em].forEach(function (el) { el.addEventListener("input", refresh); el.addEventListener("change", refresh); });
    refresh();
    $("#reset-tpl").addEventListener("click", function () { touched = false; refresh(); msg.textContent = "Template restored."; });
    $("#copy-tpl").addEventListener("click", function (e) { copyText("To: " + rec.value + "\nSubject: " + subj.value + "\n\n" + body.value, e.currentTarget); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      [nm, em, subj, body].forEach(function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.closest(".field").classList.toggle("invalid", bad); if (bad) ok = false;
      });
      if (!ok) { msg.textContent = ""; return; }
      location.href = "mailto:" + rec.value + "?subject=" + encodeURIComponent(subj.value) + "&body=" + encodeURIComponent(body.value);
      msg.textContent = "Your email app should open with the message ready to send.";
    });
  }
})();
