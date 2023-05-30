/**
 * Reads text from user clipboard
 * @returns string
 */
export const readTextFromClipboard = async (): Promise<string> => {
    try {
      const text = await navigator.clipboard.readText()
      return text
    } catch {
      return ''
    }
}