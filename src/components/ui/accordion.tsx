"use client";

import { useId, useState, type ReactNode } from "react";
import styled from "styled-components";

export type AccordionItem = { id: string; question: string; answer: ReactNode };
export type AccordionProps = { items: readonly AccordionItem[] };

const List = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  min-height: ${({ theme }) => theme.layout.target};
  padding: 1.5rem 0.25rem;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.0625rem;
  font-weight: 700;
  text-align: left;
  line-height: 1.5;
  &:hover { color: ${({ theme }) => theme.colors.primary}; }
  span:last-child { flex-shrink: 0; color: ${({ theme }) => theme.colors.primary}; font-size: 1.5rem; }
`;
const Panel = styled.div`
  padding: 0 0.25rem 1.5rem;
  max-width: 72ch;
  color: ${({ theme }) => theme.colors.muted};
`;

/** Item IDs must be unique within an instance. Multiple panels may be open. */
export function Accordion({ items }: AccordionProps) {
  const instanceId = useId();
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  function toggle(id: string) {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <List>
      {items.map(({ id, question, answer }) => {
        const triggerId = `${instanceId}-${id}-trigger`;
        const panelId = `${instanceId}-${id}-panel`;
        const open = expanded.has(id);
        return (
          <Item key={id}>
            <h3>
              <Trigger type="button" id={triggerId} aria-expanded={open} aria-controls={panelId} onClick={() => toggle(id)}>
                <span>{question}</span><span aria-hidden="true">{open ? "−" : "+"}</span>
              </Trigger>
            </h3>
            <Panel id={panelId} role="region" aria-labelledby={triggerId} hidden={!open}>{answer}</Panel>
          </Item>
        );
      })}
    </List>
  );
}