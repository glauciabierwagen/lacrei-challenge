import { screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@/test/render";
import { Accordion, type AccordionItem } from "./accordion";

const items: readonly AccordionItem[] = [
  { id: "purpose", question: "Qual é o objetivo?", answer: <p>Promover respeito e escuta.</p> },
  { id: "details", question: "Como saber mais?", answer: <a href="/sobre">Conheça o projeto</a> },
];

function panelFor(trigger: HTMLElement) {
  const id = trigger.getAttribute("aria-controls");
  expect(id).toBeTruthy();
  const panel = document.getElementById(id!);
  expect(panel).not.toBeNull();
  return panel!;
}

describe("Accordion", () => {
  it("starts collapsed with labelled, controlled, hidden panels", () => {
    renderWithTheme(<Accordion items={items} />);

    for (const item of items) {
      const trigger = screen.getByRole("button", { name: item.question });
      const panel = panelFor(trigger);
      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(panel).toHaveAttribute("role", "region");
      expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
      expect(panel).toHaveAttribute("hidden");
      expect(panel).not.toBeVisible();
      expect(within(trigger).getByText("+")).toHaveAttribute("aria-hidden", "true");
    }
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it.each(["{Enter}", " "])("opens and closes a panel using %s", async (key) => {
    const { user } = renderWithTheme(<Accordion items={items} />);
    const trigger = screen.getByRole("button", { name: items[0].question });
    const panel = panelFor(trigger);

    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard(key);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("hidden");
    expect(screen.getByRole("region", { name: items[0].question })).toBeVisible();
    expect(within(trigger).getByText("−")).toHaveAttribute("aria-hidden", "true");

    await user.keyboard(key);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("hidden");
    expect(panel).not.toBeVisible();
    expect(trigger).toHaveFocus();
  });

  it("keeps panels independently expanded and exposes rich answer links", async () => {
    const { user } = renderWithTheme(<Accordion items={items} />);
    const first = screen.getByRole("button", { name: items[0].question });
    const second = screen.getByRole("button", { name: items[1].question });
    await user.click(first);
    await user.click(second);
    expect(screen.getAllByRole("region")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Conheça o projeto" })).toHaveAttribute("href", "/sobre");

    await user.click(first);
    expect(panelFor(first)).not.toBeVisible();
    expect(panelFor(second)).toBeVisible();
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("generates distinct relationships for repeated item IDs in separate instances", () => {
    renderWithTheme(<><Accordion items={items} /><Accordion items={items} /></>);
    const triggers = screen.getAllByRole("button");
    const ids = triggers.flatMap((trigger) => [trigger.id, panelFor(trigger).id]);
    expect(new Set(ids).size).toBe(ids.length);
    for (const trigger of triggers) {
      expect(panelFor(trigger)).toHaveAttribute("aria-labelledby", trigger.id);
    }
  });

  it("renders an empty list without interactive elements", () => {
    const { container } = renderWithTheme(<Accordion items={[]} />);
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { hidden: true })).not.toBeInTheDocument();
  });

  it("has no axe violations with collapsed or expanded panels", async () => {
    const { container, user } = renderWithTheme(<Accordion items={items} />);
    expect((await axe(container)).violations).toEqual([]);
    await user.click(screen.getByRole("button", { name: items[0].question }));
    await user.click(screen.getByRole("button", { name: items[1].question }));
    expect((await axe(container)).violations).toEqual([]);
  });
});