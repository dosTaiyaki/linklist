// ダークモード切り替え機能
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  
  // ローカルストレージからテーマ設定を取得
  const currentTheme = localStorage.getItem('theme');
  
  // 初期テーマ設定
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  } else if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '🌙';
  } else {
    // システム設定に従う
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
      themeIcon.textContent = '☀️';
    }
  }
  
  // テーマ切り替えボタンのクリックイベント
  themeToggle.addEventListener('click', function() {
    // ボタンのアニメーション
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 150);
    
    if (document.body.classList.contains('dark-mode')) {
      // ダークモードからライトモードに切り替え
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      // ライトモードからダークモードに切り替え
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // システムのカラーモード変更を監視
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        themeIcon.textContent = '☀️';
      } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
      }
    }
  });
});

// ページ読み込み時のアニメーション
window.addEventListener('load', function() {
  const linkSections = document.querySelectorAll('.link-section');
  const linkCards = document.querySelectorAll('.link-card');
  
  // セクションのアニメーション
  linkSections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
  });
  
  // リンクカードのホバー効果強化
  linkCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    card.addEventListener('click', function(e) {
      // クリック時のリップル効果
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// リップルアニメーションのCSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// リンククリック時のアナリティクス（オプション）
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('link-card')) {
    // ここにGoogle Analyticsやその他のトラッキングコードを追加できます
    console.log('Link clicked:', e.target.href);
    
    // クリック時の視覚的フィードバック
    e.target.style.transform = 'scale(0.98)';
    setTimeout(() => {
      e.target.style.transform = '';
    }, 150);
  }
});

// スクロールアニメーション
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.container');
  const speed = scrolled * 0.5;
  
  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// ページの読み込み完了時の追加アニメーション
window.addEventListener('load', function() {
  // ヘッダーのタイトルアニメーション
  const title = document.querySelector('h1');
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
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      subtitle.style.transition = 'all 0.8s ease';
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 500);
  }
}); 