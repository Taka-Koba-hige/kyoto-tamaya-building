/* === js/main.js (この内容でファイル全体を置き換えてください) === */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 改良版ギャラリー機能 (複数対応) ---
    // ページ内にある .room-gallery (詳細ページ用) や 
    // .room-gallery-modal (モーダル用) の数だけ実行
    
    const galleries = document.querySelectorAll('.room-gallery, .room-gallery-modal');
    
    galleries.forEach(gallery => {
        // 各ギャラリーの「メイン画像」と「サムネイル群」を見つける
        
        // 詳細ページ(room-detail.html)用
        let mainImage = gallery.querySelector('#galleryMainImage'); 
        
        // モーダル用 (HTML構造が違うため)
        if (!mainImage) {
            mainImage = gallery.querySelector('.main-image-modal');
        }
        
        const thumbnails = gallery.querySelectorAll('.thumbnail');

        // メイン画像とサムネイルが両方存在する場合のみ、機能を有効化
        if (mainImage && thumbnails.length > 0) {
            
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    // メイン画像を切り替え
                    // (サムネイルの src を直接使う)
                    mainImage.src = thumbnail.src;
                    
                    // まず、このギャラリー内の全てのサムネイルから .is-active を削除
                    thumbnails.forEach(item => item.classList.remove('is-active'));
                    
                    // クリックされたサムネイルに .is-active を追加
                    thumbnail.classList.add('is-active');
                });
            });
        }
    });

    // --- 2. フェードインアニメーション (全ページ共通) ---
    // (これはオリジナルのコードと同一です)
    const targets = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度表示したら監視を解除
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // 10%見えたら発火
    });

    targets.forEach(target => {
        observer.observe(target);
    });
    
    
    // --- 3. 【NEW】モーダル開閉機能 ---
    
    // 開くボタン (data-modal-target 属性を持つすべて)
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    
    // 閉じるボタン ( .modal-close 属性を持つすべて)
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // 背景 ( .modal-overlay 属性を持つすべて)
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    // 開くロジック
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modalTarget; // "modal-room-a" などを取得
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('is-visible');
            }
        });
    });

    // 閉じるロジック (閉じるボタン)
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            // ボタンの親にある .modal-overlay を見つけて閉じる
            const modal = closeBtn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('is-visible');
            }
        });
    });
    
    // 閉じるロジック (背景クリック)
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            // クリックされたのが背景そのもの(overlay)か、
            // 中身(content)かを確認し、背景なら閉じる
            if (event.target === overlay) {
                overlay.classList.remove('is-visible');
            }
        });
    });
    
});