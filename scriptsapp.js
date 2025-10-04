// ウェブページ全体のインタラクティブ機能
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // テーマを設定する関数
  function setTheme(dark) {
    if (themeToggle) {
      document.body.classList.toggle('dark-mode', dark);
      themeIcon.textContent = dark ? '☀️' : '🌙';
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
  }

  // 初期テーマの設定
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    setTheme(prefersDark);
  }

  // テーマ切り替えボタンのクリックイベント
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-mode');
      setTheme(isDark);
    });
  }
  
  // システムのカラーモード変更を監視
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
    }
  });

  // ページ読み込み時のアニメーション
  const linkSections = document.querySelectorAll('.link-section');
  const linkCards = document.querySelectorAll('.link-card');
  const title = document.querySelector('h1');
  const subtitle = document.querySelector('.subtitle');

  // セクションのアニメーション
  linkSections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
  });
  
  // ヘッダータイトルのアニメーション
  if (title) {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    setTimeout(() => {
      title.style.transition = 'all 0.8s ease';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // サブタイトルのアニメーション
  if (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    setTimeout(() => {
      subtitle.style.transition = 'all 0.8s ease';
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 500);
  }

  // リンクカードのインタラクティブ機能
  linkCards.forEach(card => {
    // ホバー効果（CSS の方が滑らかだが JS でも制御）
    card.addEventListener('mouseenter', () => card.style.boxShadow = '0 8px 18px rgba(0,0,0,0.12)');
    card.addEventListener('mouseleave', () => card.style.boxShadow = '');

    // pointerdown でリップル生成（タッチ対応）
    card.addEventListener('pointerdown', function(e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.background = 'rgba(255,255,255,0.25)';
      ripple.style.animation = 'ripple 600ms linear';

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
  
  // リップルアニメーションのCSSを動的に追加
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
  document.head.appendChild(style);
});

// スクロールアニメーションをrequestAnimationFrameでスムーズに
let ticking = false;

window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.container');

  if (!ticking) {
    window.requestAnimationFrame(function() {
      // 小さめのパララックスに抑える
      const speed = scrolled * 0.05;
      if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});
