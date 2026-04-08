document.addEventListener('DOMContentLoaded', function () {
    const THEME_KEY = 'theme';
    const root = document.documentElement;

    function injectThemeStyles() {
        if (document.getElementById('theme-dark-overrides')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'theme-dark-overrides';
        style.textContent = `
            html, body {
                transition: background-color 0.2s ease, color 0.2s ease;
            }

            [data-bs-theme="dark"] body {
                background-color: #111827 !important;
                color: #e5e7eb;
            }

            [data-bs-theme="dark"] .sidebar {
                background: #0b1220 !important;
                border-right: 1px solid #1f2937;
            }

            [data-bs-theme="dark"] .sidebar a {
                color: #e5e7eb !important;
            }

            [data-bs-theme="dark"] .sidebar a:hover {
                background: #1f2937 !important;
            }

            [data-bs-theme="dark"] .card,
            [data-bs-theme="dark"] .table,
            [data-bs-theme="dark"] .form-control,
            [data-bs-theme="dark"] .form-select {
                box-shadow: none;
            }

            [data-bs-theme="dark"] .table thead.table-dark th {
                background-color: #1f2937;
            }
        `;

        document.head.appendChild(style);
    }

    function applyTheme(theme) {
        const finalTheme = theme === 'dark' ? 'dark' : 'light';
        root.setAttribute('data-bs-theme', finalTheme);
        localStorage.setItem(THEME_KEY, finalTheme);

        const icon = document.getElementById('themeToggleIcon');
        const label = document.getElementById('themeToggleText');
        if (icon && label) {
            icon.className = finalTheme === 'dark' ? 'bi bi-sun-fill me-2' : 'bi bi-moon-stars-fill me-2';
            label.textContent = finalTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
    }

    function createToggleButton() {
        const sidebar = document.querySelector('.sidebar');
        if (document.getElementById('themeToggleBtn')) {
            return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'themeToggleBtn';
        button.innerHTML = '<i id="themeToggleIcon" class="bi bi-moon-stars-fill me-2"></i><span id="themeToggleText">Dark Mode</span>';

        button.addEventListener('click', function () {
            const current = root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });

        if (sidebar) {
            const wrapper = document.createElement('div');
            wrapper.className = 'mt-3 px-2';
            button.className = 'btn btn-outline-light btn-sm w-100 d-flex align-items-center justify-content-center';
            wrapper.appendChild(button);
            sidebar.appendChild(wrapper);
            return;
        }

        button.className = 'btn btn-dark btn-sm d-flex align-items-center justify-content-center';
        button.style.position = 'fixed';
        button.style.top = '16px';
        button.style.right = '16px';
        button.style.zIndex = '1080';
        button.style.borderRadius = '999px';
        button.style.padding = '8px 14px';
        document.body.appendChild(button);
    }

    injectThemeStyles();
    createToggleButton();

    const savedTheme = localStorage.getItem(THEME_KEY);
    applyTheme(savedTheme || 'light');
});