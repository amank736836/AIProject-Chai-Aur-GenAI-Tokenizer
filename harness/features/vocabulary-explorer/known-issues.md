# FEAT-003 Known Issues and Gaps

- RUN-2026-002 exercised token-fragment/ID/no-match search, All/Special/Merged/Chars filters, JSON clipboard/download, parsing and scroll-list focus. Permission denial and byte-for-byte comparison with the complete map remain untested.
- Search and row caps are implementation limits (220 visible / up to 400 supplied), not product requirements; user expectations are UNKNOWN / REQUIRES VALIDATION.
- No database or server-side vocabulary persistence exists in this repository.
- Cross-browser behavior has only been exercised in Chromium.
