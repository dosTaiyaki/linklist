// リンクデータ定義（ハードコード定数のため innerHTML 経由でも XSS リスクなし）
// 外部ソースからの取得に変更する場合はサニタイズ処理を追加してください。
const LINKS = [
  {
    label: "X（メイン）",
    group: "SNS",
    url: "https://x.com/Taiyakidos",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.927l4.253 5.649zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    color: "var(--color-x)",
  },
  {
    label: "X（サブ）",
    group: "SNS",
    url: "https://x.com/Taiyakidos_sub",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.927l4.253 5.649zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    color: "var(--color-x)",
  },
  {
    label: "YouTube",
    group: "SNS",
    url: "https://www.youtube.com/@Taiyakidos",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.57A3.01 3.01 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.01 3.01 0 0 0 2.12 2.13C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.57a3.01 3.01 0 0 0 2.12-2.13A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.52V8.48L15.82 12l-6.07 3.52z"/></svg>`,
    color: "var(--color-youtube)",
  },
  {
    label: "Instagram",
    group: "SNS",
    url: "https://www.instagram.com/taiyakidos",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    color: "var(--color-instagram)",
  },
  {
    label: "Threads",
    group: "SNS",
    url: "https://www.threads.com/@taiyakidos",
    icon: `<picture><source srcset="./ico/Threads_w.png" media="(prefers-color-scheme: dark)"><img src="./ico/Threads_b.png" alt="Threads アイコン" width="24" height="24" /></picture>`,
    color: "var(--color-threads)",
  },
  {
    label: "Misskey.io",
    group: "SNS",
    url: "https://misskey.io/@Taiyakidos",
    icon: `<img src="./ico/misskey.png" alt="Misskey アイコン" width="24" height="24" />`,
    color: "var(--color-misskey)",
  },
  {
    label: "note",
    group: "読む・聞く",
    url: "https://note.com/taiyakidos",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493 493" aria-hidden="true"><path d="m139.57,142.06c41.19,0,97.6-2.09,138.1-1.04,54.34,1.39,74.76,25.06,75.45,83.53.69,33.06,0,127.73,0,127.73h-58.79c0-82.83.35-96.5,0-122.6-.69-22.97-7.25-33.92-24.9-36.01-18.69-2.09-71.07-.35-71.07-.35v158.96h-58.79v-210.22Z"/></svg>`, 
    color: "var(--color-note)",
  },
  {
    label: "質問箱",
    group: "読む・聞く",
    url: "https://note.com/qa/taiyakidos",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493 493" aria-hidden="true"><path d="m139.57,142.06c41.19,0,97.6-2.09,138.1-1.04,54.34,1.39,74.76,25.06,75.45,83.53.69,33.06,0,127.73,0,127.73h-58.79c0-82.83.35-96.5,0-122.6-.69-22.97-7.25-33.92-24.9-36.01-18.69-2.09-71.07-.35-71.07-.35v158.96h-58.79v-210.22Z"/></svg>`, 
    color: "var(--color-note)",
  },
  {
    label: "Discord（コミュニティ）",
    group: "コミュニティ・連絡先",
    url: "https://discord.com/invite/A6Gy7ggmq2",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
    color: "var(--color-discord)",
  },
  {
    label: "Discord（個人アカウント）",
    group: "コミュニティ・連絡先",
    url: "https://discord.com/users/813386818644213761",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
    color: "var(--color-discord)",
  },
  {
    label: "GitHub",
    group: "コミュニティ・連絡先",
    url: "https://github.com/dosTaiyaki",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    color: "var(--color-github)",
  },
  {
    label: "メール",
    group: "コミュニティ・連絡先",
    url: "mailto:taiyaki_dos@yahoo.co.jp",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v.2l8 5 8-5V8H4zm16 8V10.3l-7.5 4.7a1 1 0 0 1-1 0L4 10.3V16h16z"/></svg>`,
    color: "var(--color-mail)",
  },
];

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("toast--show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("toast--show"), 2000);
}

function buildLinks() {
  const container = document.getElementById("links");
  if (!container) return;

  container.replaceChildren();

  const ul = document.createElement("ul");
  ul.className = "links__list";

  let currentGroup = null;

  LINKS.forEach((link, index) => {
    if (link.group && link.group !== currentGroup) {
      currentGroup = link.group;
      const headingLi = document.createElement("li");
      const heading = document.createElement("h2");
      heading.className = "links__heading";
      heading.textContent = currentGroup;
      headingLi.appendChild(heading);
      ul.appendChild(headingLi);
    }

    const li = document.createElement("li");

    const card = document.createElement("a");
    card.href = link.url;
    const isExternal = /^https?:\/\//i.test(link.url);
    if (isExternal) {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }
    card.className = "link-card";
    card.style.setProperty("--accent", link.color);
    card.style.setProperty("--i", index);
    card.setAttribute("aria-label", isExternal ? `${link.label}を新しいタブで開く` : link.label);
    card.dataset.label = link.label;
    card.dataset.group = link.group || "";

    const icon = document.createElement("span");
    icon.className = "link-card__icon";
    icon.innerHTML = link.icon;

    const label = document.createElement("span");
    label.className = "link-card__label";
    label.textContent = link.label;

    const arrow = document.createElement("span");
    arrow.className = "link-card__arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>';

    card.append(icon, label, arrow);
    li.appendChild(card);

    if (link.url.startsWith("mailto:")) {
      li.classList.add("links__item--mail");
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "link-card__copy";
      copyBtn.setAttribute("aria-label", "メールアドレスをコピー");
      copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
      copyBtn.addEventListener("click", async () => {
        const address = link.url.slice("mailto:".length);
        let copied = false;
        try {
          await navigator.clipboard.writeText(address);
          copied = true;
        } catch {
          const ta = document.createElement("textarea");
          ta.value = address;
          document.body.appendChild(ta);
          ta.select();
          try { copied = document.execCommand("copy"); } catch { copied = false; }
          ta.remove();
        }
        showToast(copied ? "メールアドレスをコピーしました" : address);
        if (typeof gtag === "function") {
          gtag("event", "mail_copy", { link_label: link.label });
        }
      });
      li.appendChild(copyBtn);
    }

    ul.appendChild(li);
  });

  container.appendChild(ul);
}



/**
 * クリスマス期間（12/24-25）にアバター画像をクリスマス仕様に差し替えます。
 */
function applySeasonalAvatar() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  if (month === 11 && (day === 24 || day === 25)) {
    const avatar = document.querySelector(".profile__avatar");
    if (avatar) {
      avatar.src = "./assets/images/avatar_christmas.jpg";
      avatar.alt = "Taiyakidos のクリスマスプロフィール画像";
    }
  }
}

/**
 * 誕生日（12/10）だけ、ヘッダー風テーマ（birthday.css）に切り替えます。
 */
function applyBirthdayTheme() {
  const now = new Date();
  if (now.getMonth() === 11 && now.getDate() === 10) {
    const link = document.querySelector('link[rel="stylesheet"]');
    if (link) link.href = "./birthday.css";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buildLinks();

  const linksNav = document.getElementById("links");
  if (linksNav) {
    linksNav.addEventListener("click", (e) => {
      const card = e.target.closest("a.link-card");
      if (!card || typeof gtag !== "function") return;
      gtag("event", "link_click", {
        link_label: card.dataset.label || "",
        link_group: card.dataset.group || "",
        link_url: card.href,
      });
    });
  }
  applyBirthdayTheme();
  applySeasonalAvatar();

  const yearElem = document.getElementById("year");
  if (yearElem) {
    yearElem.textContent = String(new Date().getFullYear());
  }
});
