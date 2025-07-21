let lastScrollY = window.scrollY;
const nav = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (!nav) return;

  if (window.scrollY > lastScrollY) {
    // runtergescrollt → Navbar verstecken
    nav.style.transform = "translateY(-100%)";
  } else {
    // hochgescrollt → Navbar zeigen
    nav.style.transform = "translateY(0)";
  }

  lastScrollY = window.scrollY;
});
