const header = document.querySelector(".header");
const btnNav = document.querySelector(".btn-mobile-nav");
const heroSection = document.querySelector(".section-hero");

function setNav(open) {
  header.classList.toggle("nav-open", open);
  btnNav.setAttribute("aria-expanded", String(open));
  btnNav.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

btnNav.addEventListener("click", () => {
  setNav(!header.classList.contains("nav-open"));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && header.classList.contains("nav-open")) {
    setNav(false);
    btnNav.focus();
  }
});

window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (e.matches) setNav(false);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }

    if (link.closest(".main-nav")) setNav(false);
  });
});

new IntersectionObserver(
  (entries) => {
    document.body.classList.toggle("sticky", !entries[0].isIntersecting);
  },
  { root: null, threshold: 0, rootMargin: "-80px" }
).observe(heroSection);