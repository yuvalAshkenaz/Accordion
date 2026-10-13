# אקורדיון שאלות ותשובות (FAQ Accordion)

אקורדיון נגיש ב-Vanilla JS (בלי jQuery), עם אנימציית פתיחה וסגירה חלקה לפי `max-height`. בנוי לאתרים בעברית (RTL).

## קבצים

| קובץ | תיאור |
|---|---|
| `demo.html` | דף הדגמה מלא, בעיצוב של https://y-tools.dooble.us/accordion/. נפתח ישירות בדפדפן. |
| `style.css` | העיצוב של דף הכלים (ערכת נושא **כהה**). משמש רק לתצוגה החיה. |
| `scripts.js` | הלוגיקה: פתיחה וסגירה, ARIA וחישוב גובה. |
| `index.php` | העמוד של הכלי באתר Y-Tools (WordPress). הנתיבים הם דרך `THEME`. |
| `logo.svg` | הלוגו שמוצג ב-`demo.html`. |

## שימוש באתר

להעתיק מהבלוק "קוד להטמעה" בדף ההדגמה: HTML, CSS ו-JS. ה-CSS שמוצג שם הוא גרסה **בהירה** לאתרים עם רקע לבן, והוא שונה מ-`style.css` בתיקייה הזו (הכהה).

מבנה ה-HTML:

```html
<ul class="faq-accordion-list">
    <li class="faq-accordion-item">
        <h3 class="faq-accordion-title">
            <button type="button" class="faq-accordion-btn">
                השאלה?
                <span class="faq-icon" aria-hidden="true"></span>
            </button>
        </h3>
        <div class="faq-accordion-content">
            <div class="faq-content-inner">התשובה.</div>
        </div>
    </li>
</ul>
```

- הכפתור נמצא **בתוך** ה-`h3` (ולא להפך). אפשר להחליף את רמת הכותרת לפי ההיררכיה בעמוד.
- פריט שמקבל את ה-class `active` יהיה פתוח בטעינה.

## נגישות

- `aria-expanded` ו-`aria-controls` על הכפתור, ומזהים ייחודיים נוצרים אוטומטית.
- `role="region"` ו-`aria-labelledby` על התשובה, רק כשיש עד 6 פריטים באקורדיון (המלצת W3C).
- תשובה סגורה מוסתרת עם `visibility: hidden`: אין לה פוקוס במקלדת והיא לא נקראת בקורא מסך. ההסתרה מתעכבת 0.4 שניות בסגירה כדי שהאנימציה תסתיים.
- מסגרת פוקוס גלויה על הכפתור (`:focus-visible`).

## התנהגות

- פתיחת פריט סוגרת את שאר הפריטים **באותו אקורדיון בלבד**, כך שאפשר לשים כמה אקורדיונים באותו עמוד.
- הגובה מחושב אוטומטית ומתעדכן עם `ResizeObserver` (שינוי גודל מסך, גופנים או תמונות שנטענים באיחור). לדפדפנים ישנים יש fallback על `load` ו-`resize`.
- בלי JS התשובות נשארות סגורות.

## הערות

- האנימציה (`max-height`, 0.4 שניות, `cubic-bezier(0.4, 0, 0.2, 1)`) נשארה זהה לגרסה הקודמת.
- לא משתמשים ב-`<details>`/`<summary>` בכוונה: האנימציה הזו לא נתמכת שם בכל הדפדפנים.
- בדף ההדגמה, צביעת התחביר משתמשת ב-class-ים `code-tag`, `code-attr`, `code-string`, `code-comment`, `code-keyword` ו-`code-function`.

## הבדלים מהגרסה הישנה (מעבר מהעתקה קודמת)

- נדרש לעדכן גם את ה-HTML: הכפתור עבר לתוך ה-`h3` ואייקון ה-+/- קיבל `aria-hidden="true"`.
- ה-CSS החדש כולל `visibility: hidden` לתשובה סגורה, outline לפוקוס, וירושה של גודל וגופן ל-`.faq-accordion-btn`.
- ב-JS: מזהים רצופים במקום `Math.random()`, סגירה בתוך אותו אקורדיון בלבד, ו-`ResizeObserver`.
