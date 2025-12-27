画像アセット移行手順

1) 既存の `ico/Profile.jpg` を `assets/images/avatar.jpg` に移動する（好みでリネーム可）。
   - Windows PowerShell 例:
     Move-Item -Path .\ico\Profile.jpg -Destination .\assets\images\avatar.jpg

2) 必要に応じてサイズを最適化する（例: 400x400 を推奨、品質 75%）。
   - ImageMagick 例:
     magick convert assets/images/avatar.jpg -resize 400x400 -quality 75 assets/images/avatar.jpg

3) `index.html` は現在 `assets/avatar.svg` を参照するようになっています。実際の写真を使いたい場合は、`assets/avatar.svg` を `assets/images/avatar.jpg` に差し替えるか、`index.html` 内の参照を更新してください。

4) Git 管理下でファイルを移動したらコミットしてください:
   git add assets/images/avatar.jpg index.html
   git commit -m "Move profile image to assets and update references"

5) 画像の一貫性を保つため、他のSNSアイコンも `assets/images/` にまとめることを推奨します。
