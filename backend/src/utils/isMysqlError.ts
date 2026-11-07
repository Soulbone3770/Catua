
export const isMysqlError = (err: unknown, code: string): boolean => {
    return typeof err === "object" && err !== null && (err as {code?: string}).code === code
}