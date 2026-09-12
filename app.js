(() => {
  "use strict";

  const quotes = Array.isArray(window.LIFTED_QUOTES) ? window.LIFTED_QUOTES : [];

  // Header + progress
  const header = document.getElementById("site-header");
  const progress = document.getElementById("scroll-progress-bar");
  const updateScrollUI = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    progress.style.width = `${pct}%`;
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  // Reveal on scroll
  const revealItems = [...document.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  // Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileNav.hidden = true;
    document.body.classList.remove("menu-open");
  };
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    if (open) return closeMenu();
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileNav.hidden = false;
    document.body.classList.add("menu-open");
  });
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  // Sources section
  const sourceFeatureQuote = document.getElementById("source-feature-quote");
  const sourceFeatureAuthor = document.getElementById("source-feature-author");
  const sourceFeatureWork = document.getElementById("source-feature-work");
  const sourceNext = document.getElementById("source-next");
  const sourceIndex = document.getElementById("source-index");
  let sourceCursor = Math.max(0, quotes.findIndex(q => q.author === "Henry David Thoreau"));

  function renderSource(item) {
    if (!item) return;
    sourceFeatureQuote.textContent = item.quote;
    sourceFeatureAuthor.textContent = item.author;
    sourceFeatureWork.textContent = item.source;
  }

  sourceNext.addEventListener("click", () => {
    if (!quotes.length) return;
    sourceCursor = (sourceCursor + 1 + Math.floor(Math.random() * Math.max(1, quotes.length - 1))) % quotes.length;
    renderSource(quotes[sourceCursor]);
  });

  const authors = [...new Set(quotes.map(q => q.author))].slice(0, 12);
  sourceIndex.innerHTML = authors.map(author => `<div class="source-person">${author}</div>`).join("");

  // Get Lifted
  const stateList = document.getElementById("state-list");
  const stateButtons = [...stateList.querySelectorAll("button[data-state]")];
  const liftResult = document.getElementById("lift-result");
  const liftTransition = document.getElementById("lift-transition");
  const liftQuote = document.getElementById("lift-quote");
  const liftAuthor = document.getElementById("lift-author");
  const liftSource = document.getElementById("lift-source");
  const liftAgain = document.getElementById("lift-again");
  const liftReset = document.getElementById("lift-reset");
  let currentState = null;
  let currentQuoteId = null;

  function chooseQuote(state) {
    const pool = quotes.filter(q => Array.isArray(q.states) && q.states.includes(state));
    if (!pool.length) return null;
    const fresh = pool.filter(q => q.id !== currentQuoteId);
    const candidates = fresh.length ? fresh : pool;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function renderLift(item) {
    if (!item) return;
    currentQuoteId = item.id;
    const destination = Array.isArray(item.toward) && item.toward.length ? item.toward[0] : "perspective";
    liftTransition.textContent = `${currentState}  →  ${destination}`;
    liftQuote.textContent = `“${item.quote}”`;
    liftAuthor.textContent = item.author;
    liftSource.textContent = item.source;
    liftResult.hidden = false;
    liftResult.classList.remove("is-entering");
    void liftResult.offsetWidth;
    liftResult.classList.add("is-entering");
  }

  function activateState(state) {
    currentState = state;
    stateButtons.forEach(btn => btn.classList.toggle("is-active", btn.dataset.state === state));
    renderLift(chooseQuote(state));
  }

  stateButtons.forEach(button => button.addEventListener("click", () => activateState(button.dataset.state)));
  liftAgain.addEventListener("click", () => currentState && renderLift(chooseQuote(currentState)));
  liftReset.addEventListener("click", () => {
    currentState = null;
    currentQuoteId = null;
    stateButtons.forEach(btn => btn.classList.remove("is-active"));
    liftResult.hidden = true;
  });
})();
