"use client";

/**
 * Re-export nuqs hooks for query parameter management
 * 
 * nuqs provides type-safe search params state management with:
 * - useState-like API that syncs with URL
 * - Built-in parsers (string, integer, boolean, etc.)
 * - Multiple query states management
 * - Server-side support
 * - History controls
 * 
 * @see https://nuqs.47ng.com/docs
 */

export {
  useQueryState,
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsFloat,
  parseAsBoolean,
  parseAsStringEnum,
  parseAsArrayOf,
  parseAsJson,
  parseAsIsoDateTime,
  parseAsTimestamp,
  parseAsNumberLiteral,
  parseAsStringLiteral,
} from "nuqs";

/**
 * Legacy alias for useQueryState with single string parameter
 * @deprecated Use useQueryState directly from nuqs
 */
export const useSearchParams = (key: string) => {
  const { useQueryState } = require("nuqs");
  const [value] = useQueryState(key);
  return value;
};
