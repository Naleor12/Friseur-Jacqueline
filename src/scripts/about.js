import { debounce } from 'lodash';

function initAbout() {
  if (typeof window === 'undefined') return;

  // Parallax effect
  const parallaxBg = document.getElementById('about-parallax-bg');
  let ticking = false;

  const updateParallax = debounce(() => {
    if (!parallaxBg) return;

    const scrolled = window.pageYOffset;
    const aboutSection = document.getElementById('ueber-uns');

    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      const sectionTop = rect.top + scrolled;
      const sectionHeight = rect.height;

      if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
        const progress = (scrolled - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
        const translateY = progress * 30;
        parallaxBg.style.transform = `scale(1.1) translateY(${translateY}px)`;
      }
    }

    ticking = false;
  }, 16);

  if (window.innerWidth > 1024) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // Toggle TeamCard
  window.toggleExpanded = (person) => {
    const collapsed = document.getElementById(`${person}-collapsed`);
    const expanded = document.getElementById(`${person}-expanded`);
    const icon = document.getElementById(`${person}-expand-icon`);

    if (!collapsed || !expanded || !icon) return;

    if (collapsed.classList.contains('hidden')) {
      collapsed.classList.remove('hidden');
      expanded.classList.add('hidden');
      icon.style.transform = 'rotate(0deg)';
      collapsed.querySelector('button')?.setAttribute('aria-expanded', 'false');
    } else {
      collapsed.classList.add('hidden');
      expanded.classList.remove('hidden');
      icon.style.transform = 'rotate(180deg)';
      expanded.querySelector('button')?.setAttribute('aria-expanded', 'true');

      setTimeout(() => {
        const card = expanded.closest('.team-card');
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  console.log('About section initialized!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAbout);
} else {
  initAbout();
}