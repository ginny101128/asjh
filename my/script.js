/* ==========================================================================
   姿穎的自我介紹網站 - 互動腳本 (Interactive Script)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 動態打字效果 (Typing Animation)
  const typedElement = document.getElementById('typed-output');
  const phrases = [
    '全方位數位商管跨領域人才',
    '熱愛商業經營與電子商務',
    '探索智慧科技與網頁開發',
    '智光商工合作課程學習中'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // 停頓時間
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typedElement) {
    typeEffect();
  }

  // 2. Q版頭像與原照片切換互動 (Avatar Toggle)
  const avatarImg = document.getElementById('avatar-img');
  const avatarBadge = document.getElementById('avatar-badge');
  const toggleBtn = document.getElementById('toggle-avatar-btn');
  
  const qAvatarSrc = 'images/q_avatar.png';
  const realAvatarSrc = '1.jpg';
  let isQVersion = true;

  if (toggleBtn && avatarImg) {
    toggleBtn.addEventListener('click', () => {
      avatarImg.style.opacity = '0';
      setTimeout(() => {
        if (isQVersion) {
          avatarImg.src = realAvatarSrc;
          avatarBadge.textContent = '📷 姿穎原照片';
          toggleBtn.textContent = '✨ 切換為 Q版可愛風格';
          isQVersion = false;
        } else {
          avatarImg.src = qAvatarSrc;
          avatarBadge.textContent = '✨ AI Q版風格';
          toggleBtn.textContent = '📷 切換為原照片展示';
          isQVersion = true;
        }
        avatarImg.style.opacity = '1';
      }, 250);
    });
  }

  // 3. 技能進度條捲動監聽觸發 (Scroll Observer for Skill Bars)
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-progress');
        entry.target.style.width = targetWidth;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // 4. 點讚與氣泡動態效果 (Interactive Cheer & Floating Hearts)
  const cheerBtn = document.getElementById('cheer-btn');
  const cheerCountEl = document.getElementById('cheer-count');
  const cheerContainer = document.querySelector('.cheer-section');

  // 初始化點讚數
  let cheerCount = parseInt(localStorage.getItem('ziying_cheer_count') || '88', 10);
  if (cheerCountEl) {
    cheerCountEl.textContent = cheerCount;
  }

  if (cheerBtn && cheerContainer) {
    cheerBtn.addEventListener('click', (e) => {
      cheerCount++;
      cheerCountEl.textContent = cheerCount;
      localStorage.setItem('ziying_cheer_count', cheerCount);

      // 產生愛心/星光動畫
      const symbols = ['💖', '✨', '🌸', '🎀', '⭐', '💗'];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = randomSymbol;

      const rect = cheerBtn.getBoundingClientRect();
      const containerRect = cheerContainer.getBoundingClientRect();

      const offsetX = e.clientX - containerRect.left - 15;
      const offsetY = e.clientY - containerRect.top - 20;

      heart.style.left = `${offsetX}px`;
      heart.style.top = `${offsetY}px`;

      cheerContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1200);
    });
  }

  // 5. 導覽列滾動啟動 (Navbar Active State)
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
