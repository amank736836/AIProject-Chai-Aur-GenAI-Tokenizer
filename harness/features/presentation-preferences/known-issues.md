# FEAT-005 Known Issues and Gaps

- No WCAG target, supported browser list or manual accessibility results are checked in.
- No browser automation framework is installed; visual, storage and reduced-motion cases remain unexecuted.
- `ThemeToggle` accesses localStorage directly without try/catch, unlike the bootstrap and generic `useLocalStorage` hook; behavior when storage access throws has not been tested.
- No deployment-level CSP/security-header configuration was found. Dependency findings are tracked by BUG-001.
