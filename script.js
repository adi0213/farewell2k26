/* ============================================================
   Farewell 2022–2026 — script.js
   Animated title cycling + particle stars + video placeholder
============================================================ */

/* ── Farewell title cycling ─────────────────────────────── */
const titles = [
  "Milte Rahenge ❤️",
  "Until We Meet Again",
  "End of an Era",
  "Batch of 2022–2026",
  "Always in Our Hearts 🌙",
  "Forever Connected ✨",
];

let currentIndex = 0;
const titleEl = document.getElementById("farewell-title");

/**
 * Cycles to the next title with a smooth fade transition.
 */
function cycleTitle() {
  // Fade out
  titleEl.classList.add("fade-out");
  titleEl.classList.remove("fade-in");

  setTimeout(() => {
    // Update text
    currentIndex = (currentIndex + 1) % titles.length;
    titleEl.textContent = titles[currentIndex];

    // Fade in
    titleEl.classList.remove("fade-out");
    titleEl.classList.add("fade-in");
  }, 520); // half the CSS transition duration
}

// Start cycling after a short delay
setTimeout(() => {
  titleEl.classList.add("fade-in");
  setInterval(cycleTitle, 3600);
}, 800);

/* ── Floating particle stars ────────────────────────────── */
const particleContainer = document.getElementById("particles");
const PARTICLE_COUNT = 55;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle() {
  const p = document.createElement("span");
  p.className = "particle";

  const size = randomBetween(1.2, 3.5);
  const left = randomBetween(0, 100);
  const duration = randomBetween(10, 22);
  const delay = randomBetween(0, duration);

  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: -6px;
    animation-duration: ${duration}s;
    animation-delay: -${delay}s;
    opacity: 0;
  `;

  particleContainer.appendChild(p);
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  createParticle();
}

/* ── Video placeholder hide logic ───────────────────────── */
const video = document.getElementById("farewell-video");
const placeholder = document.getElementById("video-placeholder");

/**
 * Hides the placeholder once the video has actual data to play.
 */
function hidePlaceholder() {
  if (placeholder && video.readyState >= 1 && video.src && !video.error) {
    placeholder.classList.add("hidden");
  }
}

/**
 * Attempts autoplay on load; browsers may still block in strict cases.
 */
function ensureAutoplay() {
  if (!video) {
    return;
  }

  video.muted = true;
  video.playsInline = true;

  const playAttempt = video.play();

  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {
      // Retry once metadata is available for browsers with stricter timing.
      video.addEventListener(
        "loadeddata",
        () => {
          video.play().catch(() => {});
        },
        { once: true },
      );
    });
  }
}

video.addEventListener("loadedmetadata", hidePlaceholder);
video.addEventListener("play", hidePlaceholder);

window.addEventListener("DOMContentLoaded", ensureAutoplay);

// Also check immediately (in case video loads fast / from cache)
hidePlaceholder();
ensureAutoplay();

/* ── Card entrance glow on scroll into view ─────────────── */
const card = document.getElementById("farewell-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        card.style.boxShadow = `
          0 0 0 1px rgba(255,255,255,0.06),
          0 12px 56px rgba(0,0,0,0.65),
          0 0 100px rgba(90, 159, 255, 0.55),
          inset 0 1px 0 rgba(255,255,255,0.09)
        `;
        observer.disconnect();
      }
    });
  },
  { threshold: 0.4 },
);

observer.observe(card);
