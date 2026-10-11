import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["**/.playwright-results/**"] },
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/app/page.tsx"],
    rules: {
      // The tokenizer is intentionally held in a ref and read inside memoized
      // render calculations; the version state explicitly invalidates them.
      "react-hooks/refs": "off",
    },
  },
  {
    files: [
      "src/components/Hero.tsx",
      "src/components/ThemeToggle.tsx",
      "src/components/TypeWriter.tsx",
      "src/lib/hooks.ts",
    ],
    rules: {
      // These effects synchronize browser preferences/storage and in-view state.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
