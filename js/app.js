document.addEventListener('DOMContentLoaded', () => {
  // 0. Dynamic Theme & Text Loader from Admin Panel
  applySavedTheme();
  applySavedTexts();

  function applySavedTheme() {
    const savedTheme = localStorage.getItem('jony_site_theme');
    if (savedTheme) {
      document.documentElement.classList.remove('theme-ruby-gold', 'theme-emerald', 'theme-violet-cyan', 'theme-luxury-gold');
      document.documentElement.classList.add(savedTheme);
    }
  }

  function applySavedTexts() {
    const savedTexts = JSON.parse(localStorage.getItem('jony_site_texts') || '{}');
    for (const key in savedTexts) {
      const elements = document.querySelectorAll(`[data-key="${key}"]`);
      elements.forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = savedTexts[key];
        } else {
          el.textContent = savedTexts[key];
        }
      });
    }

    // Title tegini ham yangilash
    if (savedTexts.brand_name) {
      document.title = `${savedTexts.brand_name} — Kichik va O'rta Biznes uchun Raqamli Yechimlar`;
    }
  }

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMobileNav = () => {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  };

  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileNav);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // 2. Phone Input Mask (+998 __ ___ __ __)
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (!input.value) {
        input.value = '+998 ';
      }
    });

    input.addEventListener('input', (e) => {
      let matrix = '+998 (__) ___ __ __';
      let i = 0;
      let def = matrix.replace(/\D/g, "");
      let val = e.target.value.replace(/\D/g, "");

      if (def.length >= val.length) val = def;

      e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      });
    });

    input.addEventListener('blur', () => {
      if (input.value === '+998 ' || input.value === '+998') {
        input.value = '';
      }
    });
  });

  // 3. Interactive Project Budget & ROI Calculator
  const calcCheckboxes = document.querySelectorAll('.calc-option');
  const totalPriceEl = document.getElementById('calcTotalPrice');
  const totalDaysEl = document.getElementById('calcTotalDays');
  const totalRoiEl = document.getElementById('calcTotalRoi');
  const applyCalcBtn = document.getElementById('applyCalcToForm');

  function updateCalculator() {
    let totalPrice = 0;
    let totalDays = 0;
    let baseRoi = 80;
    let selectedCount = 0;

    calcCheckboxes.forEach(cb => {
      if (cb.checked) {
        totalPrice += parseInt(cb.dataset.price || 0, 10);
        totalDays += parseInt(cb.dataset.days || 0, 10);
        baseRoi += parseInt(cb.dataset.roi || 35, 10);
        selectedCount++;
      }
    });

    if (selectedCount === 0) {
      if (totalPriceEl) totalPriceEl.textContent = "0";
      if (totalDaysEl) totalDaysEl.textContent = "0";
      if (totalRoiEl) totalRoiEl.textContent = "+0%";
      return;
    }

    if (totalPriceEl) totalPriceEl.textContent = new Intl.NumberFormat('uz-UZ').format(totalPrice);
    if (totalDaysEl) totalDaysEl.textContent = Math.max(5, Math.round(totalDays * 0.75));
    if (totalRoiEl) totalRoiEl.textContent = `+${baseRoi}%`;
  }

  calcCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateCalculator);
  });
  updateCalculator();

  if (applyCalcBtn) {
    applyCalcBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        calcCheckboxes.forEach(cb => {
          if (cb.checked) {
            const formCheckbox = document.querySelector(`.form-service-cb[value="${cb.value}"]`);
            if (formCheckbox) formCheckbox.checked = true;
          }
        });
      }
    });
  }

  // 4. Numbers Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.counter-value');
  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        statNumbers.forEach(num => {
          const target = +num.getAttribute('data-target');
          const prefix = num.getAttribute('data-prefix') || '';
          const suffix = num.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = target / 40;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              num.innerText = prefix + Math.ceil(count) + suffix;
              setTimeout(updateCount, 30);
            } else {
              num.innerText = prefix + target + suffix;
            }
          };
          updateCount();
        });
        counted = true;
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        faqItems.forEach(otherItem => {
          const otherAns = otherItem.querySelector('.faq-answer');
          const otherIcn = otherItem.querySelector('.faq-icon');
          if (otherAns) otherAns.classList.add('hidden');
          if (otherIcn) otherIcn.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 6. Lead Generation Form Submission & Anti-DDoS / Rate Limiter
  const leadForm = document.getElementById('leadGenerationForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const submitBtn = document.getElementById('leadSubmitBtn');
  const submitSpinner = document.getElementById('submitSpinner');
  const submitText = document.getElementById('submitText');
  const rateLimitWarning = document.getElementById('rateLimitWarning');

  let lastSubmitTime = 0;

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 6.1 Anti-Bot Honeypot tekshiruvi
      const honeyField = document.getElementById('botCheckField');
      if (honeyField && honeyField.value.trim() !== "") {
        console.warn("Bot aniqlandi va bloklandi.");
        return; // Botlar to'ldirsa jim bloklanadi
      }

      // 6.2 Anti-DDoS / Rate Limiting (Kamida 10 soniya oraliq)
      const now = Date.now();
      if (now - lastSubmitTime < 10000) {
        if (rateLimitWarning) {
          rateLimitWarning.classList.remove('hidden');
          setTimeout(() => rateLimitWarning.classList.add('hidden'), 4000);
        }
        return;
      }

      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const note = document.getElementById('userNote') ? document.getElementById('userNote').value.trim() : '';

      const selectedServices = [];
      document.querySelectorAll('.form-service-cb:checked').forEach(cb => {
        selectedServices.push(cb.value);
      });

      if (!name || phone.length < 17) {
        alert("Iltimos, ismingiz va to'liq telefon raqamingizni kiriting!");
        return;
      }

      // Show loading
      if (submitSpinner && submitText) {
        submitSpinner.classList.remove('hidden');
        submitText.textContent = "Yuborilmoqda...";
        submitBtn.disabled = true;
      }

      lastSubmitTime = now;

      setTimeout(() => {
        const newLead = {
          name,
          phone,
          services: selectedServices.join(', ') || 'Umumiy',
          note: note,
          time: new Date().toLocaleString('uz-UZ')
        };
        const currentLeads = JSON.parse(localStorage.getItem('jony_leads') || '[]');
        currentLeads.unshift(newLead);
        localStorage.setItem('jony_leads', JSON.stringify(currentLeads));

        if (submitSpinner && submitText) {
          submitSpinner.classList.add('hidden');
          submitText.textContent = "Biz bilan bog'lanish";
          submitBtn.disabled = false;
        }

        leadForm.reset();
        openModal();
      }, 900);
    });
  }

  function openModal() {
    if (successModal) {
      successModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      createConfetti();
    }
  }

  function closeModal() {
    if (successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeModal();
    });
  }

  // Dynamic Confetti
  function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#E11D48', '#BE123C', '#F59E0B', '#FBBF24', '#10B981', '#6366F1', '#FFFFFF'];

    for (let i = 0; i < 75; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 3,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.rot += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      frame++;
      if (frame < 90) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    render();
  }
});

// ==========================================
// 7. ADMIN AUTHENTICATION POPUP & BRUTEFORCE PROTECTION
// ==========================================
let failedAttempts = 0;
let lockoutTime = 0;

window.openAdminAuthModal = function() {
  const modal = document.getElementById('adminAuthModal');
  const input = document.getElementById('adminPassInput');
  const errorMsg = document.getElementById('adminAuthError');
  const cooldownMsg = document.getElementById('adminCooldownMsg');

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (errorMsg) errorMsg.classList.add('hidden');
    if (cooldownMsg) cooldownMsg.classList.add('hidden');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 200);
    }
  }
};

window.closeAdminAuthModal = function() {
  const modal = document.getElementById('adminAuthModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

window.handleAdminAuth = function(e) {
  e.preventDefault();

  const now = Date.now();
  const cooldownMsg = document.getElementById('adminCooldownMsg');
  const errorMsg = document.getElementById('adminAuthError');
  const input = document.getElementById('adminPassInput');

  // Bruteforce Cooldown tekshiruvi (60 soniya)
  if (now < lockoutTime) {
    const remainSec = Math.ceil((lockoutTime - now) / 1000);
    if (cooldownMsg) {
      cooldownMsg.textContent = `⏳ Xavfsizlik qulfi: ${remainSec} soniya kuting.`;
      cooldownMsg.classList.remove('hidden');
    }
    return;
  }

  const entered = input ? input.value.trim() : '';
  const correct = localStorage.getItem('jony_admin_pin') || '88888888';

  if (entered === correct) {
    // Muvaffaqiyatli kirish
    failedAttempts = 0;
    sessionStorage.setItem('jony_admin_auth', 'true');
    closeAdminAuthModal();
    window.location.href = 'admin.html';
  } else {
    failedAttempts++;
    if (errorMsg) errorMsg.classList.remove('hidden');

    if (failedAttempts >= 3) {
      lockoutTime = Date.now() + 60000; // 1 daqiqaga bloklash
      if (cooldownMsg) {
        cooldownMsg.textContent = "⏳ 3 marta xato kiritildi. 1 daqiqa kuting.";
        cooldownMsg.classList.remove('hidden');
      }
      failedAttempts = 0;
    }
  }
};
