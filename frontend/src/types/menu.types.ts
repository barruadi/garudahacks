
export const menuOptions = ["Local Products", "Cultural Sites"] as const;

export type menuOption = (typeof menuOptions)[number];