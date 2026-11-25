// Sorria Bem Garavelo - Odontologia | Controller Principal (JavaScript Vanilla)

// Garantir que a página sempre abra no início (topo) ao carregar
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo({ top: 0, behavior: 'instant' });
if (window.location.hash) {
  history.replaceState("", document.title, window.location.pathname + window.location.search);
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. INICIALIZAR ÍCONES LUCIDE
  initializeIcons();

  // 1b. AJUSTAR IMAGEM DE FUNDO DO HERO (PASTA IMAGENS)
  setupHeroBackground();

  // 2. HEADER TRANSIÇÃO DE DECORAÇÃO (STICKY)
  setupHeaderScroll();

  // 3. MENU DE NAVEGAÇÃO MOBILE
  setupMobileMenu();

  // 4. TRATAMENTO DE IMAGENS (FALLBACKS RESILIENTES)
  setupImageFallbacks();

  // 5. SLIDER INTERATIVO "ANTES E DEPOIS"
  setupInteractiveSlider();

  // 5b. INICIALIZAR CARROSSEL DA GALERIA (SWIPER)
  initializeGallerySwiper();

  // 6. SANFONA DE DÚVIDAS (FAQ)
  setupFAQAccordion();

  // 7. COPIAR ENDEREÇO EM UM CLIQUE
  setupAddressClipboard();

  // 8. FLUTUADOR WHATSAPP E TIMER
  setupWhatsAppWidget();

  // 9. MODAIS DE INFORMAÇÕES (TERMOS E PRIVACIDADE)
  setupInfoModals();

  // 10. ANIMAÇÕES FLUIDAS E INTERACTION REVEAL
  setupScrollAnimations();

  // 11. ANIMAÇÕES DE CONTADORES NUMÉRICOS
  setupNumberCounters();
});

// Inicializador seguro de Ícones Lucide
function initializeIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 1b. Função setupHeroBackground com busca na pasta imagens
function setupHeroBackground() {
  const possibleUrls = [
    './imagens/fachada.jpg'
  ];

  let loaded = false;
  function tryNext(index) {
    if (index >= possibleUrls.length || loaded) return;
    const url = possibleUrls[index];
    const img = new Image();
    img.onload = () => {
      if (!loaded) {
        loaded = true;
      }
    };
    img.onerror = () => {
      tryNext(index + 1);
    };
    img.src = url;
  }
  tryNext(0);
}

// 2. Setup do Header Sticky ao rolar a página
function setupHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-lg', 'py-2.5', 'border-amber-500/80');
      header.classList.remove('py-3.5', 'border-amber-400/80');
    } else {
      header.classList.remove('shadow-lg', 'py-2.5', 'border-amber-500/80');
      header.classList.add('py-3.5', 'border-amber-400/80');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// 3. Setup do Menu Hamburguer Mobile
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menuTray = document.getElementById('mobile-menu-tray');
  const hamburgerIcon = document.getElementById('menu-icon-hamburger');
  const closeIcon = document.getElementById('menu-icon-close');

  if (!toggleBtn || !menuTray) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = menuTray.classList.contains('hidden');
    if (isHidden) {
      menuTray.classList.remove('hidden');
      hamburgerIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
    } else {
      menuTray.classList.add('hidden');
      hamburgerIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
  });

  // Fechar o menu ao clicar em qualquer item
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuTray.classList.add('hidden');
      hamburgerIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    });
  });
}

// 4. Fallbacks de imagem corrigidos
function setupImageFallbacks() {
  const images = document.querySelectorAll('.img-fallback');
  images.forEach(img => {
    const fallbackUrl = img.getAttribute('data-fallback');
    if (!fallbackUrl) return;
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.src = fallbackUrl;
    }, { once: true });
  });
}

// 5. Slider de Antes e Depois interativo
function setupInteractiveSlider() {
  const sliderInput = document.getElementById('hero-slider-input');
  const afterLayer = document.getElementById('hero-slider-after-layer');
  const sliderHandle = document.getElementById('hero-slider-handle');

  if (!sliderInput || !afterLayer || !sliderHandle) return;

  // Atualizar corte horizontal com base no range input
  sliderInput.addEventListener('input', (event) => {
    const val = event.target.value;
    afterLayer.style.clipPath = `polygon(${val}% 0, 100% 0, 100% 100%, ${val}% 100%)`;
    sliderHandle.style.left = `${val}%`;
  });
}

// 5b. Inicializador do carrossel da Galeria (Swiper.js)
function initializeGallerySwiper() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper.js is not loaded yet');
    return;
  }
  const swiperElement = document.querySelector('.gallery-swiper');
  if (!swiperElement) return;

  new Swiper('.gallery-swiper', {
    slidesPerView: 1.25,
    spaceBetween: 16,
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2.2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24
      }
    }
  });
}

// 6. FAQ Accordion com micro-transição
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-content');
    const iconSpan = item.querySelector('.faq-icon');

    if (content) {
      content.classList.remove('hidden');
      content.style.maxHeight = '0px';
    }

    btn?.addEventListener('click', () => {
      const isCurrentlyActive = content?.classList.contains('active');

      faqItems.forEach(innerItem => {
        const innerContent = innerItem.querySelector('.faq-content');
        const innerIconSpan = innerItem.querySelector('.faq-icon');
        if (innerContent) {
          innerContent.classList.remove('active');
          innerContent.style.maxHeight = '0px';
        }
        innerItem.classList.remove('border-brand-yellow');
        innerItem.classList.add('border-slate-200');
        if (innerIconSpan) {
          innerIconSpan.innerHTML = `<i data-lucide="plus" class="w-4 h-4 text-slate-500"></i>`;
        }
      });

      if (!isCurrentlyActive && content) {
        content.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight + 35}px`;
        item.classList.remove('border-slate-200');
        item.classList.add('border-brand-yellow');
        if (iconSpan) {
          iconSpan.innerHTML = `<i data-lucide="minus" class="w-4 h-4 text-brand-dark"></i>`;
        }
      }

      initializeIcons();
    });
  });
}

// 7. Copiar endereço por clique
function setupAddressClipboard() {
  const btn = document.getElementById('copy-address-btn');
  const btnText = document.getElementById('copy-btn-text');
  const addressText = document.getElementById('clinic-address-text');

  if (!btn || !addressText) return;

  btn.addEventListener('click', () => {
    const rawToCopy = addressText.textContent?.trim() || '';
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(rawToCopy)
      .then(() => {
        if (btnText) {
          btnText.textContent = 'Copiado!';
          btn.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
          btn.classList.remove('text-slate-700');

          setTimeout(() => {
            btnText.textContent = 'Copiar Endereço';
            btn.classList.remove('bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
            btn.classList.add('text-slate-700');
          }, 2000);
        }
      })
      .catch((err) => {
        console.error('Falha de escrita no clipboard', err);
      });
  });
}

// 8. Widget de WhatsApp flutuante (Sempre visível desde o carregamento inicial)
function setupWhatsAppWidget() {
  const widget = document.getElementById('float-whatsapp-widget');
  const tooltip = document.getElementById('float-whatsapp-tooltip');
  const closeTooltip = document.getElementById('close-whatsapp-tooltip');

  if (!widget) return;

  // Garante visibilidade imediata em todas as telas
  widget.classList.remove('hidden');

  closeTooltip?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    tooltip?.classList.add('hidden');
  });
}

// 9. Modais de Termos e Privacidade
function setupInfoModals() {
  const termsModal = document.getElementById('terms-modal');
  const privacyModal = document.getElementById('privacy-modal');

  const openTermsBtn = document.getElementById('open-terms-modal-btn');
  const openPrivacyBtn = document.getElementById('open-privacy-modal-btn');

  const closeTermsBtn = document.getElementById('close-terms-btn');
  const closeTermsFooterBtn = document.getElementById('close-terms-btn-footer');
  const closePrivacyBtn = document.getElementById('close-privacy-btn');
  const closePrivacyFooterBtn = document.getElementById('close-privacy-btn-footer');

  if (!termsModal || !privacyModal) return;

  initializeIcons();

  openTermsBtn?.addEventListener('click', () => {
    termsModal.classList.remove('hidden');
    termsModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  });

  openPrivacyBtn?.addEventListener('click', () => {
    privacyModal.classList.remove('hidden');
    privacyModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  });

  const closeTerms = () => {
    termsModal.classList.add('hidden');
    termsModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  const closePrivacy = () => {
    privacyModal.classList.add('hidden');
    privacyModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  closeTermsBtn?.addEventListener('click', closeTerms);
  closeTermsFooterBtn?.addEventListener('click', closeTerms);
  closePrivacyBtn?.addEventListener('click', closePrivacy);
  closePrivacyFooterBtn?.addEventListener('click', closePrivacy);

  termsModal.addEventListener('click', (e) => {
    if (e.target === termsModal) closeTerms();
  });

  privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) closePrivacy();
  });
}

// 10. Sistema Inteligente de Scroll Reveal (Reversível com threshold 0.15)
function setupScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}

// 11. Animação de Contador Numérico Suave
function setupNumberCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const startCount = (el) => {
    if (el.dataset.counting === 'true') return;
    el.dataset.counting = 'true';

    const target = parseInt(el.getAttribute('data-counter-target'), 10);
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = parseInt(el.getAttribute('data-counter-duration'), 10) || 1600;

    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = `${prefix}${target.toLocaleString('pt-BR')}${suffix}`;
      el.dataset.counting = 'false';
      return;
    }

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out cubic: 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);

      el.textContent = `${prefix}${current.toLocaleString('pt-BR')}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target.toLocaleString('pt-BR')}${suffix}`;
        el.dataset.counting = 'false';
      }
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCount(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => counterObserver.observe(el));
  } else {
    counterElements.forEach(el => startCount(el));
  }
}
