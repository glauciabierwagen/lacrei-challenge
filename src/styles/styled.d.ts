import "styled-components";
import type { AppTheme } from "./theme";

declare module "styled-components" {
  // A interface acrescenta os tipos do tema à biblioteca.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}