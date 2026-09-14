const EXPERIMENT_START = new Date('2026-09-14T00:00:00');

function dayNumber() {
  const now = new Date();
  const localStart = new Date(
    EXPERIMENT_START.getFullYear(),
    EXPERIMENT_START.getMonth(),
    EXPERIMENT_START.getDate()
  );
  const localToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.max(0, Math.floor((localToday - localStart) / 86400000));
  return diff;
}

function formatDay(value) {
  return `DAY ${String(value).padStart(3, '0')}`;
}

function updateClock() {
  const days = dayNumber();
  const dayCounter = document.getElementById('day-counter');
  const metricDays = document.getElementById('metric-days');

  if (dayCounter) dayCounter.textContent = formatDay(days);
  if (metricDays) metricDays.textContent = String(days);
}

function initReveal() {
  const items = [...document.querySelectorAll('.reveal')];

  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  items.forEach(item => observer.observe(item));
}

async function hydratePublicMetrics() {
  try {
    const response = await fetch('data/public-metrics.json', { cache: 'no-store' });
    if (!response.ok) return;

    const data = await response.json();
    const cycles = document.getElementById('metric-cycles');
    const primary = document.getElementById('metric-primary');
    const capabilities = document.getElementById('metric-capability');

    if (cycles && Number.isFinite(data.recordedCycles)) cycles.textContent = data.recordedCycles;
    if (primary && data.dominantBottleneck) primary.textContent = data.dominantBottleneck;
    if (capabilities && Number.isFinite(data.newCapabilities)) capabilities.textContent = data.newCapabilities;
  } catch (_) {
    // The site remains fully usable without the metrics file.
  }
}

updateClock();
initReveal();
hydratePublicMetrics();
