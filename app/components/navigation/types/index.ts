// navigation/types/index.ts
import type { ROOT_QUERYResult } from "types/sanity/sanity.generated";

export type HeaderMenu = NonNullable<
  NonNullable<ROOT_QUERYResult["header"]>["menu"]
>;

export type MenuItem = HeaderMenu[number];

export type InternalLinkType = Extract<MenuItem, { _type: "internalLink" }>;
export type ExternalLinkType = Extract<MenuItem, { _type: "externalLink" }>;
export type MegaMenuType = Extract<MenuItem, { _type: "megaMenu" }>;
