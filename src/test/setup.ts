import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

beforeEach(() => {
  vi.mocked(usePathname).mockReturnValue("/");
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});