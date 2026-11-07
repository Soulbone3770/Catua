
export const CORREGIBLES = ["VALIDATION", "UNAUTHENTICATED", "CONFLICT"] as const;

export type ErrCorregiblesType = typeof CORREGIBLES[number];

export const esCorregible = (code: string): boolean => {
    return (CORREGIBLES as readonly string[]).includes(code); 
}