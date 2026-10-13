# FAQ Accordion

An accessible FAQ accordion in vanilla JS (no jQuery), with a smooth `max-height` open/close animation. Built for RTL (Hebrew) sites.

## Files

| File | Description |
|---|---|
| `demo.html` | Full demo page, styled like https://y-tools.dooble.us/accordion/. Open it directly in a browser. |
| `style.css` | Styles of the demo page (dark theme). Used only for the live preview. |
| `scripts.js` | Accordion logic: open/close, ARIA attributes and height calculation. |
| `logo.svg` | Logo shown in `demo.html`. |

## Usage

Copy the HTML, CSS and JS from the "Code to embed" section of `demo.html`. The CSS shown there is a **light** theme for sites with a white background, and differs from the dark `style.css` in this folder.

HTML structure:

```html
<ul class="faq-accordion-list">
    <li class="faq-accordion-item">
        <h3 class="faq-accordion-title">
            <button type="button" class="faq-accordion-btn">
                Question?
                <span class="faq-icon" aria-hidden="true"></span>
            </button>
        </h3>
        <div class="faq-accordion-content">
            <div class="faq-content-inner">Answer.</div>
        </div>
    </li>
</ul>
```

- The button sits **inside** the `h3`. Change the heading level to fit the page hierarchy.
- An item with the `active` class is open on page load.

## Accessibility

- `aria-expanded` and `aria-controls` on the button, with unique ids generated automatically.
- `role="region"` and `aria-labelledby` on the answer, only when the accordion has up to 6 items (W3C recommendation).
- Closed answers use `visibility: hidden`, so they are not focusable and not read by screen readers. The hiding is delayed by 0.4s on close so the animation can finish.
- Visible focus outline on the button (`:focus-visible`).

## Behavior

- Opening an item closes the other items in the **same accordion only**, so several accordions can live on one page.
- Height is calculated automatically and kept up to date with `ResizeObserver` (window resize, late-loading fonts or images). Older browsers fall back to `load` and `resize` events.
- Without JavaScript the answers stay closed.
