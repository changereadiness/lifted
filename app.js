(() => {
  "use strict";

  const quotes = Array.isArray(window.LIFTED_QUOTES) ? window.LIFTED_QUOTES : [];
  const stateView = document.getElementById("state-view");
  const quoteView = document.getElementById("quote-view");
  const stateButtons = [...document.querySelectorAll(".state-button")];

  const quoteContext = document.getElementById("quote-context");
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const sourceToggle = document.getElementById("source-toggle");
  const quoteSource = document.getElementById("quote-source");
  const whyToggle = document.getElementById("why-toggle");
  const whyText = document.getElementById("why-text");
  const againButton = document.getElementById("again-button");
  const changeButton = document.getElementById("change-button");

  let currentState = null;
  let currentQuote = null;

  const stateLabels = {
    lost: "lost",
    confused: "confused",
    afraid: "afraid",
    discouraged: "discouraged",
    stuck: "stuck",
    restless: "restless",
    overwhelmed: "overwhelmed",
    angry: "angry",
    doubtful: "doubtful",
    inspired: "inspired",
    curious: "curious",
    grateful: "grateful"
  };

  function historyKey(state) {
    return `lifted:recent:${state}`;
  }

  function getRecent(state) {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(historyKey(state)) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function remember(state, id) {
    const recent = [id, ...getRecent(state).filter(item => item !== id)].slice(0, 3);
    try {
      sessionStorage.setItem(historyKey(state), JSON.stringify(recent));
    } catch {
      // Lifted still works if storage is unavailable.
    }
  }

  function eligibleQuotes(state) {
    return quotes.filter(item => item.states.includes(state));
  }

  function pickQuote(state) {
    const pool = eligibleQuotes(state);
    if (!pool.length) return null;

    const recent = new Set(getRecent(state));
    const fresh = pool.filter(item => !recent.has(item.id));
    const candidates = fresh.length ? fresh : pool;

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function resetDisclosure() {
    quoteSource.hidden = true;
    sourceToggle.setAttribute("aria-expanded", "false");
    sourceToggle.textContent = "source";

    whyText.hidden = true;
    whyToggle.setAttribute("aria-expanded", "false");
  }

  function renderQuote(item) {
    currentQuote = item;
    remember(currentState, item.id);
    resetDisclosure();

    quoteContext.textContent = `feeling ${stateLabels[currentState]}`;
    quoteText.textContent = `“${item.quote}”`;
    quoteAuthor.textContent = item.author;

    quoteSource.textContent = "";
    const sourceCopy = document.createElement("span");
    sourceCopy.textContent = item.source;

    if (item.sourceUrl) {
      const spacer = document.createTextNode(" · ");
      const sourceLink = document.createElement("a");
      sourceLink.href = item.sourceUrl;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "view source";
      quoteSource.append(sourceCopy, spacer, sourceLink);
    } else {
      quoteSource.append(sourceCopy);
    }

    const destination = item.toward[0] || "perspective";
    whyText.textContent = `Selected for ${stateLabels[currentState]} → ${destination}.`;
  }

  function showQuote(state) {
    currentState = state;
    const item = pickQuote(state);

    if (!item) {
      console.warn(`No verified quotes available for state: ${state}`);
      return;
    }

    renderQuote(item);

    stateView.classList.remove("view--active");
    stateView.setAttribute("aria-hidden", "true");

    quoteView.classList.add("view--active");
    quoteView.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => againButton.focus({ preventScroll: true }));
  }

  function showStates() {
    quoteView.classList.remove("view--active");
    quoteView.setAttribute("aria-hidden", "true");

    stateView.classList.add("view--active");
    stateView.removeAttribute("aria-hidden");

    currentState = null;
    currentQuote = null;
    resetDisclosure();

    requestAnimationFrame(() => stateButtons[0]?.focus({ preventScroll: true }));
  }

  stateButtons.forEach(button => {
    button.addEventListener("click", () => showQuote(button.dataset.state));
  });

  againButton.addEventListener("click", () => {
    const item = pickQuote(currentState);
    if (item) {
      quoteView.classList.remove("view--active");
      void quoteView.offsetWidth;
      renderQuote(item);
      quoteView.classList.add("view--active");
    }
  });

  changeButton.addEventListener("click", showStates);

  sourceToggle.addEventListener("click", () => {
    const opening = quoteSource.hidden;
    quoteSource.hidden = !opening;
    sourceToggle.setAttribute("aria-expanded", String(opening));
    sourceToggle.textContent = opening ? "hide source" : "source";
  });

  whyToggle.addEventListener("click", () => {
    const opening = whyText.hidden;
    whyText.hidden = !opening;
    whyToggle.setAttribute("aria-expanded", String(opening));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && quoteView.classList.contains("view--active")) {
      showStates();
    }
  });
})();
