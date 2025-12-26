/**
 * Extracts a readable error message from various error types.
 * Supports Axios errors, NestJS validation errors, native JS errors, and unknown errors.
 *
 * @param {unknown} error - The error object to extract a message from.
 * @returns {string} A human-readable error message.
 *
 * @example
 * try {
 *   await api.post('/events', data);
 * } catch (err) {
 *   const message = extractError(err);
 *   console.log(message);
 * }
 */
export function extractErrorMessage(error: unknown): string {
  // Axios error
  if (typeof error === "object" && error !== null) {
    // @ts-ignore
    if ("response" in error && error.response) {
      const resp = (error as any).response;

      // If errors are an array (common in NestJS)
      if (resp.data?.message && Array.isArray(resp.data.message)) {
        return resp.data.message.join(", ");
      }

      // Standard error message format
      if (resp.data?.message && typeof resp.data.message === "string") {
        return resp.data.message;
      }

      // Fallback to status text
      if (resp.statusText) return resp.statusText;
    }

    // Native JS error
    if ("message" in error && typeof (error as any).message === "string") {
      return (error as any).message;
    }
  }

  // Fallback for unknown errors
  return "An unexpected error occurred";
}
