/* === js/main.js === */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ギャラリー機能 ---
    const galleries = document.querySelectorAll('.room-gallery, .room-gallery-modal');
    
    galleries.forEach(gallery => {
        let mainImage = gallery.querySelector('#galleryMainImage'); 
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


    // --- 4. ハンバーガーメニュー開閉 ---
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('is-active');
                mobileMenu.classList.remove('is-active');
            });
        });
    }


    // --- 5. 【追加】フォーム送信のカスタマイズ (AJAX送信) ---
    // これにより、無料プランでもサンクスページへ遷移できます
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // 通常の送信をキャンセル
            event.preventDefault();
            
            // 送信ボタンを無効化（二重送信防止）
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if(submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '送信中...';
            }

            // フォームデータを取得
            const formData = new FormData(contactForm);
            
            // Formspreeに裏側で送信 (AJAX)
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // 成功したらサンクスページへ手動で移動
                    // ※ contact.html に書いた <input name="_next"> は無視してこちらで移動させます
                    window.location.href = 'thanks.html'; 
                } else {
                    // エラーの場合
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert('送信に失敗しました。もう一度お試しください。');
                        }
                    });
                    if(submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = '送信する';
                    }
                }
            })
            .catch(error => {
                alert('エラーが発生しました。ネットワーク環境をご確認ください。');
                if(submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '送信する';
                }
            });
        });
    }

});