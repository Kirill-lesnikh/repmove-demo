export function generateRandomString(stringLen: number): string {
    return [...Array(stringLen + 10)]
        .map((value) => (Math.random() * 1000000)
        .toString(36).replace('.', ''))
        .join('')
        .substring(0, stringLen);
}