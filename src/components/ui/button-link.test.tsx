import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "@/test/render";
import { theme } from "@/styles/theme";
import { ButtonLink, type ButtonLinkVariant } from "./button-link";

describe("ButtonLink", () => {
  it.each<{ variant: ButtonLinkVariant | undefined; secondary: boolean }>([
    { variant: undefined, secondary: false },
    { variant: "primary", secondary: false },
    { variant: "secondary", secondary: true },
  ])("renders the $variant variant as a themed link", ({ variant, secondary }) => {
    renderWithTheme(<ButtonLink href="/sobre" $variant={variant}>Saiba mais</ButtonLink>);

    const link = screen.getByRole("link", { name: "Saiba mais" });
    expect(link).toHaveAttribute("href", "/sobre");
    expect(link).not.toHaveAttribute("$variant");
    expect(link).toHaveStyle({
      color: secondary ? theme.colors.primary : theme.colors.white,
      "background-color": secondary ? theme.colors.white : theme.colors.primary,
      "min-height": `${Number.parseFloat(theme.layout.target) * 16}px`,
    });
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("supports keyboard focus and Enter activation with native link semantics", async () => {
    const onClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault());
    const { user } = renderWithTheme(<ButtonLink href="/sobre" onClick={onClick}>Sobre</ButtonLink>);
    const link = screen.getByRole("link", { name: "Sobre" });

    await user.tab();
    expect(link).toHaveFocus();
    await user.keyboard(" ");
    expect(onClick).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("forwards external link attributes", () => {
    renderWithTheme(
      <ButtonLink href="https://example.com/help" target="_blank" rel="noopener noreferrer" aria-label="Ajuda externa">
        Ajuda
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "Ajuda externa" });
    expect(link).toHaveAttribute("href", "https://example.com/help");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});