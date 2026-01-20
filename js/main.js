/* === js/main.js === */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ギャラリー機能 ---
    const galleries = document.querySelectorAll('.room-gallery, .room-gallery-modal');
    
    galleries.forEach(gallery => {
        // 詳細ページ(room-detail.html)用
        let mainImage = gallery.querySelector('#galleryMainImage'); 
        
        // モーダル用 (HTML構造が違うため)
        if (!mainImage) {
            mainImage = gallery.querySelector('.main-image-modal');
        }
        
        const thumbnails = gallery.querySelectorAll('.thumbnail');

        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    mainImage.src = thumbnail.src;
                    thumbnails.forEach(item => item.classList.remove('is-active'));
                    thumbnail.classList.add('is-active');
                });
            });
        }
    });

    // --- 2. フェードインアニメーション ---
    const targets = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    targets.forEach(target => {
        observer.observe(target);
    });
    
    
    // --- 3. モーダル開閉機能 ---
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('is-visible');
            }
        });
    });

    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('is-visible');
            }
        });
    });
    
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                overlay.classList.remove('is-visible');
            }
        });
    });


    // --- 4. 【重要】ハンバーガーメニュー開閉 (スマホ用) ---
    // これがないとメニューが開きません！
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (hamburgerBtn && mobileMenu) {
        // ボタンを押したら開閉
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');
        });

        // メニュー内のリンクを押したら閉じる
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('is-active');
                mobileMenu.classList.remove('is-active');
            });
        });
    }
});