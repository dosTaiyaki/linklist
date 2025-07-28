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
  
  linkSections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
});

// リンククリック時のアナリティクス（オプション）
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('link-card')) {
    // ここにGoogle Analyticsやその他のトラッキングコードを追加できます
    console.log('Link clicked:', e.target.href);
  }
}); 