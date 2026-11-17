"use client";

import Link from "next/link";
import styled from "styled-components";

export type ButtonLinkVariant = "primary" | "secondary";

// Mantém a navegação de um link com aparência de botão em duas variantes.
export const ButtonLink = styled(Link)<{ $variant?: ButtonLinkVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: ${({ theme }) => theme.layout.target};
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
  text-decoration: none;
  color: ${({ theme, $variant }) => $variant === "secondary" ? theme.colors.primary : theme.colors.white};
  background: ${({ theme, $variant }) => $variant === "secondary" ? theme.colors.white : theme.colors.primary};
  transition: background-color 160ms ease, color 160ms ease;
  &:hover {
    background: ${({ theme, $variant }) => $variant === "secondary" ? theme.colors.surface : theme.colors.primaryHover};
  }
`;