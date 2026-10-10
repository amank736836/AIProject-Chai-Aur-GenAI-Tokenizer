# Self-hosted fonts

The UI uses three self-hosted variable fonts so the build never depends on a
network request to Google Fonts:

| File                          | Family        | Used for                        |
| ----------------------------- | ------------- | ------------------------------- |
| `Geist-Variable.woff2`        | Geist Sans    | body copy                       |
| `GeistMono-Variable.woff2`    | Geist Mono    | tokens, ids, code blocks        |
| `SpaceGrotesk-Variable.woff2` | Space Grotesk | display type (headings, hero)   |

They are loaded through `next/font/local` in `src/app/layout.tsx`, which
exposes the CSS variables `--font-geist-sans`, `--font-geist-mono` and
`--font-space-grotesk` consumed by `src/app/globals.css`.

## Refreshing the files

The upstream packages are pinned as dev dependencies:

```sh
npm install
cp node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2 src/fonts/
cp node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2 src/fonts/
cp node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2 \
   src/fonts/SpaceGrotesk-Variable.woff2
```

Both families are licensed under the SIL Open Font License 1.1 — see
`LICENSE-Geist.txt` and `LICENSE-SpaceGrotesk.txt`.
