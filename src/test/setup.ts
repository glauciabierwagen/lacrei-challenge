import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, vi } from "vitest";

// Simula a rota atual para os testes não dependerem do Next.js em execução.
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

beforeEach(() => {
  vi.mocked(usePathname).mockReturnValue("/");
});

// Limpa a tela e restaura as simulações após cada teste.
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});