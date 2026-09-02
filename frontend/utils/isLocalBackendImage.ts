export function isLocalBackendImage(src: string | null | undefined): boolean {
    if (!src) return false;
    return src.includes("localhost:3001");
}