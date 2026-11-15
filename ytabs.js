// Tabs
const accordionQuery = window.matchMedia('(max-width: 767px)');
const tabGroups = [];

// Slide an accordion panel open or closed
function slidePanel(panel, open) {
	panel.style.maxHeight = panel.scrollHeight + 'px';
	if (!open) {
		panel.getBoundingClientRect();
		panel.style.maxHeight = '0px';
		return;
	}
	const release = () => {
		panel.removeEventListener('transitionend', onEnd);
		if (panel.classList.contains('active') && panel.closest('.is-accordion')) panel.style.maxHeight = 'none';
	};
	const onEnd = e => {
		if (e.target === panel && e.propertyName === 'max-height') release();
	};
	panel.addEventListener('transitionend', onEnd);
	setTimeout(release, 600);
}

document.querySelectorAll('.tabs-group').forEach((group, groupIndex) => {
	// groupIndex starts at 0, so add 1 to start from group1
	const currentGroupNum = groupIndex + 1;

	const tabsList = group.querySelector('.tabs-list');
	const tabs = group.querySelectorAll('.tabs-btn');
	const panels = group.querySelectorAll('.tabs-div');

	// Add role to the main ul
	if (tabsList) tabsList.setAttribute('role', 'tablist');

	tabs.forEach((btn, index) => {
		const currentTabNum = index + 1;
		const parentLi = btn.closest('li');
		const panel = panels[index];

		// Create dynamic IDs (for example: group1-tab-btn-1)
		const btnId = `group${currentGroupNum}-tab-btn-${currentTabNum}`;
		const panelId = `group${currentGroupNum}-tab-div-${currentTabNum}`;

		// 1. Set accessibility attributes for the button
		btn.id = btnId;
		btn.setAttribute('role', 'tab');
		btn.setAttribute('aria-controls', panelId);

		// 2. Set accessibility attributes for the content (panel)
		if (panel) {
			panel.id = panelId;
			panel.setAttribute('role', 'tabpanel');
			panel.setAttribute('aria-labelledby', btnId);
		}

		// 3. Activate the first tab by default (hide the rest) + roving tabindex
		if (index === 0) {
			parentLi.classList.add('active');
			btn.setAttribute('aria-selected', 'true');
			btn.tabIndex = 0;
			if (panel) panel.classList.add('active');
		} else {
			parentLi.classList.remove('active');
			btn.setAttribute('aria-selected', 'false');
			btn.tabIndex = -1;
			if (panel) panel.classList.remove('active');
		}

		// 4. Click listener for each tab
		btn.addEventListener('click', () => {
			// On small screens the tabs are an accordion: open this item, or close it if it is open
			if (group.classList.contains('is-accordion')) {
				const wasOpen = parentLi.classList.contains('active');
				tabs.forEach((t, i) => {
					const open = !wasOpen && i === index;
					const wasPanelOpen = t.closest('li').classList.contains('active');
					t.closest('li').classList.toggle('active', open);
					t.setAttribute('aria-expanded', String(open));
					if (panels[i]) {
						panels[i].classList.toggle('active', open);
						if (open !== wasPanelOpen) slidePanel(panels[i], open);
					}
				});
				return;
			}

			// Reset all tabs in the current group
			group.querySelectorAll('.tabs-list li').forEach(li => li.classList.remove('active'));
			tabs.forEach(t => {
				t.setAttribute('aria-selected', 'false');
				t.tabIndex = -1;
			});
			panels.forEach(p => p.classList.remove('active'));

			// Activate the clicked tab and panel
			parentLi.classList.add('active');
			btn.setAttribute('aria-selected', 'true');
			btn.tabIndex = 0;
			if (panel) panel.classList.add('active');

			// When switching to another tab - focus moves to the first link inside the panel
			// of the matching panel, and does not stay on the tab button itself
			const firstLink = panel ? panel.querySelector('a[href]') : null;
			if (firstLink) {
				firstLink.focus();
			} else {
				btn.focus();
			}
		});
	});

	tabGroups.push({ group, tabsList, tabs: Array.from(tabs), panels: Array.from(panels) });
});

// Switch a group between tabs and accordion
function setAccordionMode(entry, on) {
	const { group, tabsList, tabs, panels } = entry;
	if (on === group.classList.contains('is-accordion')) return;
	group.classList.toggle('is-accordion', on);

	if (on) {
		// Each panel moves under its own button and the roles change to an accordion
		if (tabsList) tabsList.removeAttribute('role');
		tabs.forEach((btn, i) => {
			const panel = panels[i];
			btn.removeAttribute('role');
			btn.removeAttribute('aria-selected');
			btn.tabIndex = 0;
			btn.setAttribute('aria-expanded', String(!!panel && panel.classList.contains('active')));
			if (panel) {
				btn.closest('li').appendChild(panel);
				panel.setAttribute('role', 'region');
				panel.style.maxHeight = panel.classList.contains('active') ? 'none' : '0px';
			}
		});
		return;
	}

	// Back to tabs: the panels return after the list and one tab is always selected
	let activeIndex = panels.findIndex(p => p.classList.contains('active'));
	if (activeIndex < 0) activeIndex = 0;
	if (tabsList) tabsList.setAttribute('role', 'tablist');
	tabs.forEach((btn, i) => {
		const panel = panels[i];
		const selected = i === activeIndex;
		btn.setAttribute('role', 'tab');
		btn.removeAttribute('aria-expanded');
		btn.setAttribute('aria-selected', String(selected));
		btn.tabIndex = selected ? 0 : -1;
		btn.closest('li').classList.toggle('active', selected);
		if (panel) {
			group.appendChild(panel);
			panel.style.maxHeight = '';
			panel.setAttribute('role', 'tabpanel');
			panel.classList.toggle('active', selected);
		}
	});
}

// Apply the mode now and whenever the screen size crosses the breakpoint
function applyAccordionMode() {
	tabGroups.forEach(entry => setAccordionMode(entry, accordionQuery.matches));
}
applyAccordionMode();
if (accordionQuery.addEventListener) {
	accordionQuery.addEventListener('change', applyAccordionMode);
} else if (accordionQuery.addListener) {
	accordionQuery.addListener(applyAccordionMode);
}

// Keyboard Navigation
document.addEventListener('keydown', e => {
	if (e.keyCode !== 37 && e.keyCode !== 39) return;

	const active = document.activeElement;
	// Do not interfere with text fields - arrow keys move the caret there
	if (['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName) || active.isContentEditable) return;

	const isTabBtn = active.classList.contains('tabs-btn');
	const panelAncestor = active.closest('.tabs-div');
	if (!isTabBtn && !panelAncestor) return;

	const group = (isTabBtn ? active : panelAncestor).closest('.tabs-group');
	if (group && group.classList.contains('is-accordion')) return;
	const parentUl = group ? group.querySelector('.tabs-list') : active.closest('.tabs-list');
	if (!parentUl) return;
	const allLis = Array.from(parentUl.querySelectorAll('li'));

	let currentIndex;
	if (isTabBtn) {
		currentIndex = allLis.indexOf(active.closest('li'));
	} else {
		const panels = Array.from(group.querySelectorAll('.tabs-div'));
		currentIndex = panels.indexOf(panelAncestor);
	}
	if (currentIndex === -1) return;

	let nextIndex;
	if (e.keyCode === 37) { // Left (Next in RTL/LTR depending on context, assuming standard flow)
		nextIndex = (currentIndex + 1) % allLis.length;
		allLis[nextIndex].querySelector('.tabs-btn').click();
	} else if (e.keyCode === 39) { // Right
		nextIndex = (currentIndex - 1 + allLis.length) % allLis.length;
		allLis[nextIndex].querySelector('.tabs-btn').click();
	}
});

/* =========================================
   Copy Code Functionality
   ========================================= */
function copyCode(buttonElement) {
    let codeElement;
    
    if (buttonElement.parentElement.classList.contains('source-header')) {
        codeElement = buttonElement.parentElement.nextElementSibling.querySelector('.code-snippet');
    } else {
        codeElement = buttonElement.parentElement.querySelector('.code-snippet');
    }
    
    if (codeElement) {
        const textToCopy = codeElement.innerText;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = "Copied! ✔";
            buttonElement.classList.add('copied');
            
            setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Error copying text: ', err);
        });
    }
}