/* ============================
   COSMO RUN — LANDING PAGE JS
============================ */

'use strict';

/* ============================
   NAVBAR SCROLL EFFECT
============================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ============================
   STICKY BUY BUTTON
   Show after hero section on mobile
============================ */
const stickyBuy = document.getElementById('stickyBuy');
const heroSection = document.getElementById('home');

window.addEventListener('scroll', () => {
  if (!stickyBuy) return;
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  if (heroBottom < 0) {
    stickyBuy.style.display = 'block';
  } else {
    stickyBuy.style.display = 'none';
  }
});

/* ============================
   SCROLL REVEAL ANIMATION
============================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ============================
   HERO THUMBNAIL SWITCHER
============================ */
function switchHeroImg(thumbEl) {
  const imgSrc = thumbEl.dataset.img;
  const heroImg = document.getElementById('heroMainImg');
  const heroPlaceholder = document.getElementById('heroPlaceholder');

  // Switch active state on thumbs
  document.querySelectorAll('.hero-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');

  // Attempt to load new image
  const testImg = new Image();
  testImg.onload = () => {
    heroImg.src = imgSrc;
    heroImg.style.display = 'block';
    heroPlaceholder.style.display = 'none';
    heroPlaceholder.querySelector('.ph-name').textContent = imgSrc;
  };
  testImg.onerror = () => {
    heroImg.style.display = 'none';
    heroPlaceholder.style.display = 'flex';
    heroPlaceholder.querySelector('.ph-name').textContent = imgSrc;
  };
  testImg.src = imgSrc;
}

/* ============================
   COLOR SECTION SWITCHER
============================ */
function selectColor(btnEl) {
  const colorImg = btnEl.dataset.img;
  const colorName = btnEl.dataset.name;

  // Update active state
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  // Update selected color label
  document.getElementById('selectedColorName').textContent = colorName;

  // Update preview image
  const previewImg = document.getElementById('colorPreviewImg');
  const previewPlaceholder = document.getElementById('colorPreviewPlaceholder');
  const previewName = document.getElementById('colorPreviewName');

  previewName.textContent = colorImg;

  const testImg = new Image();
  testImg.onload = () => {
    previewImg.src = colorImg;
    previewImg.style.display = 'block';
    previewPlaceholder.style.display = 'none';
  };
  testImg.onerror = () => {
    previewImg.style.display = 'none';
    previewPlaceholder.style.display = 'flex';
  };
  testImg.src = colorImg;

  // Also sync the form color button
  document.querySelectorAll('.color-form-btn').forEach(b => {
    b.classList.remove('selected');
    if (b.dataset.color === btnEl.dataset.color) {
      b.classList.add('selected');
    }
  });
  document.getElementById('selectedColor').value = btnEl.dataset.color;
}

/* ============================
   FORM COLOR SELECTOR
============================ */
function selectFormColor(btnEl) {
  document.querySelectorAll('.color-form-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');
  document.getElementById('selectedColor').value = btnEl.dataset.color;

  // Sync section color picker
  document.querySelectorAll('.color-btn').forEach(b => {
    b.classList.remove('active');
    if (b.dataset.color === btnEl.dataset.color) {
      b.classList.add('active');
      // Also update preview
      const colorImg = b.dataset.img;
      const colorName = b.dataset.name;
      document.getElementById('selectedColorName').textContent = colorName;

      const previewImg = document.getElementById('colorPreviewImg');
      const previewPlaceholder = document.getElementById('colorPreviewPlaceholder');
      const previewName = document.getElementById('colorPreviewName');
      previewName.textContent = colorImg;

      const testImg = new Image();
      testImg.onload = () => {
        previewImg.src = colorImg;
        previewImg.style.display = 'block';
        previewPlaceholder.style.display = 'none';
      };
      testImg.onerror = () => {
        previewImg.style.display = 'none';
        previewPlaceholder.style.display = 'flex';
      };
      testImg.src = colorImg;
    }
  });
}

/* ============================
   SIZE SELECTOR
============================ */
function selectSize(el) {
  document.querySelectorAll('.size-opt').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('selectedSize').value = el.textContent.trim();
  // Clear size error if shown
  const fgSize = document.getElementById('fg-size');
  if (fgSize) {
    fgSize.classList.remove('has-error');
    const sizeInput = document.getElementById('selectedSize');
    if (sizeInput) sizeInput.classList.remove('error');
  }
}

/* ============================
   QUANTITY CONTROL
============================ */
let quantity = 1;

function changeQty(delta) {
  quantity = Math.max(1, Math.min(10, quantity + delta));
  document.getElementById('qtyValue').value = quantity;
}

/* ============================
   FORM VALIDATION & SUBMIT
============================ */
function validateField(id, groupId, condition) {
  const input = document.getElementById(id);
  const group = document.getElementById(groupId);
  if (!input || !group) return true;
  if (!condition(input.value)) {
    group.classList.add('has-error');
    input.classList.add('error');
    return false;
  } else {
    group.classList.remove('has-error');
    input.classList.remove('error');
    return true;
  }
}

function submitOrder(event) {
  event.preventDefault();

  const phonePatt = /^(05|06|07)\d{8}$/;

  let valid = true;

  valid &= validateField('fullName', 'fg-name', v => v.trim().length >= 3);
  valid &= validateField('phone', 'fg-phone', v => phonePatt.test(v.trim()));
  valid &= validateField('state', 'fg-state', v => v !== '');
  valid &= validateField('address', 'fg-address', v => v.trim().length >= 5);

  // Validate size
  const sizeVal = document.getElementById('selectedSize').value;
  const fgSize = document.getElementById('fg-size');
  if (!sizeVal) {
    fgSize.classList.add('has-error');
    valid = false;
  } else {
    fgSize.classList.remove('has-error');
  }

  if (!valid) {
    // Scroll to first error
    const firstError = document.querySelector('.has-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Collect order data
  const orderData = {
    name: document.getElementById('fullName').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    state: document.getElementById('state').options[document.getElementById('state').selectedIndex].text,
    address: document.getElementById('address').value.trim(),
    color: document.getElementById('selectedColor').value,
    size: sizeVal,
    quantity: quantity,
    total: 3500 * quantity + ' دج',
  };

  console.log('📦 Order Submitted:', orderData);

  // Show success
  showToast();
  document.getElementById('orderForm').reset();
  quantity = 1;
  document.getElementById('qtyValue').value = 1;
  document.querySelectorAll('.size-opt').forEach(s => s.classList.remove('selected'));
  document.getElementById('selectedSize').value = '';
  document.querySelectorAll('.color-form-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector('.color-form-btn.cf-blue').classList.add('selected');
  document.getElementById('selectedColor').value = 'blue';
}

/* Real-time phone format cleanup */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
  });
}

/* ============================
   TOAST NOTIFICATION
============================ */
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ============================
   LIGHTBOX
============================ */
function openLightbox(imgSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  lightboxImg.src = imgSrc;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ============================
   SMOOTH ANCHOR SCROLL
============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================
   INIT — run on page load
============================ */
window.addEventListener('DOMContentLoaded', () => {
  // Set initial color preview placeholder text
  const previewName = document.getElementById('colorPreviewName');
  if (previewName) previewName.textContent = 'shoe-blue.jpg';

  // Try to load default hero image, fallback to placeholder
  const heroImg = document.getElementById('heroMainImg');
  if (heroImg) {
    heroImg.onerror = function () {
      this.style.display = 'none';
      const ph = document.getElementById('heroPlaceholder');
      if (ph) ph.style.display = 'flex';
    };
  }
});
