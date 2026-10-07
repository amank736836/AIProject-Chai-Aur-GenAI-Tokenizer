# UI Scenarios (Manual)

## SCN-501 — Browser interaction and accessibility sweep

**Preconditions:** Run `npm run dev` or `npm run build && npm run start`; use a real browser. No browser automation dependency is present.

1. Load `/`; inspect all sections, navigation and console for hydration/runtime errors.
2. At desktop and narrow viewports, navigate by keyboard and pointer; check focus visibility, section anchors and horizontal overflow.
3. Train preset/custom corpus; use speed, stop and instant training; verify status and merge output.
4. Edit input; check token stream, IDs, decoded value, clear shortcut, Enter/copy behavior and clipboard-denied path.
5. Search/filter vocabulary; check no-match state, JSON clipboard and downloaded file.
6. Toggle theme; reload and change OS color scheme. Repeat with localStorage denied/unavailable if feasible.
7. Enable reduced motion; confirm the page remains usable and training completes without waiting for animated merges.
8. Use screen-reader tooling to validate meaningful labels, headings, status/toast announcements and hidden decorative effects.

**Cases:** TC-101–TC-108. All NOT_EXECUTED as of RUN-2026-001. Browser support matrix and accessibility target are UNKNOWN / REQUIRES VALIDATION.
