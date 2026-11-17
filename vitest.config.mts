import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    clearMocks: true,
    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["text", "html", "lcov"],
      include: [
        "src/components/ui/button-link.tsx",
        "src/components/ui/accordion.tsx",
        "src/components/layout/header.tsx",
        "src/components/layout/footer.tsx",
      ],
      thresholds: {
        perFile: true,
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});