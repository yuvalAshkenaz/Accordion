document.addEventListener("DOMContentLoaded", function() {
    const lists = document.querySelectorAll('.faq-accordion-list');
    if (!lists.length) return;

    // מונה משותף לכל העמוד - מבטיח מזהים ייחודיים גם כשיש כמה אקורדיונים
    let uid = 0;

    // עדכון ה-max-height של התוכן לפי הגובה האמיתי של התוכן הפנימי
    function updateHeight(content, inner) {
        if (!content || !inner) return;
        content.style.maxHeight = inner.offsetHeight + 'px';
    }

    // מעקב אחרי שינויי גובה (גופנים, תמונות, שינוי גודל מסך) ועדכון ה-max-height
    function watchHeight(content, inner) {
        if (!content || !inner) return;
        if ('ResizeObserver' in window) {
            new ResizeObserver(function() {
                updateHeight(content, inner);
            }).observe(inner);
            return;
        }
        updateHeight(content, inner);
        window.addEventListener('load', function() { updateHeight(content, inner); });
        window.addEventListener('resize', function() { updateHeight(content, inner); });
    }

    // הפעלת אקורדיון אחד: נגישות, גובה דינמי ולחיצה
    function initAccordion(list) {
        const items = list.querySelectorAll('.faq-accordion-item');
        if (!items.length) return;

        // לפי הנחיות W3C - role="region" רק כשיש עד 6 פריטים, כדי לא להציף את ה-landmarks
        const useRegion = items.length <= 6;

        items.forEach(item => {
            const btn = item.querySelector('.faq-accordion-btn');
            const content = item.querySelector('.faq-accordion-content');
            const inner = item.querySelector('.faq-content-inner');
            if (!btn || !content || !inner) return;

            uid++;
            const btnId = 'faq-btn-' + uid;
            const contentId = 'faq-text-' + uid;

            btn.id = btnId;
            btn.setAttribute('aria-controls', contentId);
            btn.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

            content.id = contentId;
            if (useRegion) {
                content.setAttribute('role', 'region');
                content.setAttribute('aria-labelledby', btnId);
            }

            watchHeight(content, inner);

            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // סגירת שאר הפריטים באותו אקורדיון בלבד
                items.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-accordion-btn');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                });

                // פתיחת הפריט הנוכחי אם היה סגור
                if (!isActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    lists.forEach(initAccordion);
});
