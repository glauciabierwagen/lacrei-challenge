import "styled-components";
import type { AppTheme } from "./theme";

declare module "styled-components" {
  // Declaration merging requires an interface to augment the library theme.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}