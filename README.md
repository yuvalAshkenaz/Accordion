# y-tabs 2.2

**y-tabs** is a tiny, accessible tabs library written in **vanilla JavaScript** and CSS. No dependencies, no setup code.  
On screens up to **767px** wide the tabs turn into a smooth **accordion** automatically, and switch back to tabs when the screen gets wider.

> 🚀 **Live page and demo:** [y-tools.dooble.us/ytabs](https://y-tools.dooble.us/ytabs/)

---

## ✨ Key Features

- **Tabs and accordion in one** — on mobile (up to 767px) every panel slides open under its own button, one at a time, and a second click closes it.
- **No setup code** — add the classes and include the two files. The script finds every group on the page.
- **Several groups per page** — each `.tabs-group` works on its own.
- **Accessible** — sets `role`, `aria-selected`, `aria-controls`, `aria-labelledby` and `aria-expanded` for you, uses a roving `tabindex`, and has a visible `:focus-visible` outline.
- **Keyboard support** — the left and right arrow keys move between tabs.
- **Reduced motion** — the accordion animation is turned off for `prefers-reduced-motion`.
- **Vanilla JS** — no jQuery, no frameworks.

---

## 📦 Installation

Download [`ytabs.css`](https://y-tools.dooble.us/wp-content/themes/ytools/tools/ytabs/ytabs.css) and [`ytabs.js`](https://y-tools.dooble.us/wp-content/themes/ytools/tools/ytabs/ytabs.js) and include them in your HTML. **Both files are needed**: the CSS styles the tabs and the accordion, and the script decides when the group becomes an accordion.

```html
<link rel="stylesheet" href="ytabs.css" />
<script src="ytabs.js"></script>
```

Put the `<script>` at the end of the `<body>`, after the tabs markup.

---

## 🚀 Usage

```html
<!-- Wrapper: one .tabs-group per set of tabs (you can have several on a page) -->
<div class="tabs-group">

	<!-- List of buttons: class tabs-list on the ul, class tabs-btn on every button -->
	<ul class="tabs-list" role="tablist">
		<li><button type="button" class="tabs-btn">First tab</button></li>
		<li><button type="button" class="tabs-btn">Second tab</button></li>
	</ul>

	<!-- Panels: class tabs-div, directly inside .tabs-group, after the list, in the same order as the buttons -->
	<div class="tabs-div">
		<h3>First panel</h3>
		<p>Content of the first tab.</p>
	</div>

	<div class="tabs-div">
		<h3>Second panel</h3>
		<p>Content of the second tab.</p>
	</div>

</div>
```

| Class | Where | Description |
|---|---|---|
| `tabs-group` | Wrapper `div` | One set of tabs and its panels. |
| `tabs-list` | `ul` | The list of tab buttons. |
| `tabs-btn` | `button` inside each `li` | A tab button. |
| `tabs-div` | `div` directly inside `.tabs-group` | A panel. The first button opens the first panel, the second button the second panel, and so on, so keep both in the same order. |

The first tab is open by default. The script adds `active`, `is-accordion` and all the `aria-*` attributes by itself, so you do not write them.

---

## 📱 Tabs and accordion

| Screen width | What you get |
|---|---|
| 768px and up | Tabs. One panel is always open. |
| Up to 767px | Accordion. Each panel moves under its own button, opens with a slide animation, and a click on the open item closes it. |

When the group becomes an accordion the script adds the class `is-accordion` to `.tabs-group`, moves each panel into its `li`, and switches the roles from `tab` / `tabpanel` to buttons with `aria-expanded` and regions. When the screen gets wider, everything goes back. You can restyle the accordion with the `.tabs-group.is-accordion` selectors in `ytabs.css`.

---

## 🎨 Customization

The colors come from CSS variables. Set them in your own CSS (on `:root` or on a wrapper) to match your site.

| Variable | Default | Description |
|---|---|---|
| `--primary` | `#3560cf` | Text color of the open tab. |
| `--text-main` | `#141833` | Text color of the panels and the hovered tab. |
| `--text-muted` | `#565c7d` | Text color of the closed tabs. |
| `--card-border` | `#b9c0e6` | Border color of the tabs and the panels. |

The remaining colors (the blue accent `#517fe5`, white panels) are written in `ytabs.css`, so change them there or override the selectors.

---

## ⌨️ Keyboard

- `Tab` moves the focus to the open tab, and `Enter` or `Space` selects the focused tab.
- `←` and `→` move between the tabs and open the one you reach. The order follows right-to-left sites: `←` goes to the next tab and `→` to the previous one.
- The arrow keys do nothing in accordion mode, where `Tab` and `Enter` are used.

---

## ♿ Accessibility and notes

- Use real `button` elements for the tabs, so they work with the keyboard without extra code.
- The script sets the ARIA roles for tabs, and switches them to the accordion pattern on small screens.
- Moving to another tab moves the focus to the first link in its panel, or stays on the tab when the panel has no link.
- The breakpoint (767px) is the `accordionQuery` line at the top of `ytabs.js`. Change `767px` there, and the matching `max-width` you use in your own CSS, if you need another one.

---

## 🌐 Browser support

Modern browsers (Chrome, Edge, Firefox, Safari). It uses `matchMedia`, `classList` and CSS transitions.

---

## 📄 License

[MIT](LICENSE) © yuvalAshkenaz

---

## 🔗 Links

- Live page: [y-tools.dooble.us/ytabs](https://y-tools.dooble.us/ytabs/)
- More libraries by the same author: [y-tools.dooble.us](https://y-tools.dooble.us/)

Created by [Yuval Ashkenazi](https://y-tools.dooble.us/).
