document.addEventListener('DOMContentLoaded', () => {
    // 1. リンククリック時のフィードバック
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // イベントのデフォルト動作（リンクへの遷移）を一時的に停止
            // ただし、target="_blank"の場合は新しいタブが開かれるため、
            // その前にアニメーションが実行されることを意図
            // event.preventDefault(); // これを有効にするとリンク遷移がキャンセルされます。

            // クラスを追加してアニメーションをトリガー
            link.classList.add('clicked');

            // アニメーションが終わったらクラスを削除し、元の状態に戻す
            // アニメーションの秒数に合わせて調整してください (CSSのtransition-duration)
            setTimeout(() => {
                link.classList.remove('clicked');
                // もしevent.preventDefault()を有効にしている場合は、
                // ここで手動でリンク先に遷移させることができます。
                // window.open(link.href, link.target || '_self');
            }, 300); // 0.3秒後に元に戻す (CSSのtransition durationと合わせる)
        });
    });

    // 2. スムーズスクロール (現在コンテンツが少ないため直接的な効果は薄いですが、将来的な拡張用)
    // ページ内リンク（例: <a href="#about">About</a>）がある場合に有効
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // その他、今後追加できそうな機能のアイデア:
    // - ダークモード切り替え機能
    // - プロフィール文のタイプライターアニメーション
    // - SNSアイコンのホバーエフェクト強化 (CSSでも可能ですがJSでより複雑に)
    // - ページ読み込み時のフェードインアニメーション
});
