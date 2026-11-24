// リンク一覧は index.html に直接記述しています（JavaScriptが無効でも表示されます）。
// このスクリプトは補助機能のみを担当します：GA4計測、季節の切り替え、年表示。

/**
 * 日付判定に使う「今日」の月日を返します。
 * 基準は日本時間（Asia/Tokyo）。URLに ?date=MM-DD がある場合は表示確認用にその日付を使います。
 */
function getTodayMonthDay() {
  const override = new URLSearchParams(location.search).get("date");
  if (override && /^\d{1,2}-\d{1,2}$/.test(override)) {
    const [month, day] = override.split("-").map(Number);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return { month: month - 1, day };
    }
  }
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());
  const value = (type) => Number(parts.find((p) => p.type === type).value);
  return { month: value("month") - 1, day: value("day") };
}

/**
 * クリスマス期間（12/24-25）にアバター画像をクリスマス仕様に差し替えます。
 */
function applySeasonalAvatar() {
  const { month, day } = getTodayMonthDay();
  if (month === 11 && (day === 24 || day === 25)) {
    const avatar = document.querySelector(".profile__avatar");
    if (avatar) {
      avatar.src = "./assets/images/avatar_christmas.jpg";
      avatar.alt = "Taiyakidos のクリスマスプロフィール画像";
    }
  }
}

/**
 * 誕生日（12/10）だけ、ヘッダー風テーマ（birthday.css）を style.css の後ろに追加で読み込みます。
 * birthday.css は差分のみを定義しているため、差し替えではなく追加読み込みにしています。
 */
function applyBirthdayTheme() {
  const { month, day } = getTodayMonthDay();
  if (month === 11 && day === 10 && !document.getElementById("birthday-theme")) {
    const link = document.createElement("link");
    link.id = "birthday-theme";
    link.rel = "stylesheet";
    link.href = "./birthday.css";
    document.head.appendChild(link);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const linksNav = document.getElementById("links");
  if (linksNav) {
    linksNav.addEventListener("click", (e) => {
      const card = e.target.closest("a.link-card");
      if (!card || typeof gtag !== "function") return;
      gtag("event", "link_click", {
        link_label: card.dataset.label || "",
        link_group: card.dataset.group || "",
        link_url: card.protocol === "mailto:" ? "mailto:" : card.href,
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
