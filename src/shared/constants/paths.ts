/* ----------------------------------------------------
  Paths Builders Utility Functions
---------------------------------------------------- */

/**
 * Utility function to build paths under the AUTH module.
 * @param subPath - Optional subpath under "/auth"
 * @returns Full path string
 */
const buildAuthPath = (subPath: string) =>
  `/auth${subPath ? `/${subPath}` : ""}`;

/* ----------------------------------------------------
   Application Paths
---------------------------------------------------- */

/**
 * Centralized application paths
 * @readonly
 */
export const APP_PATHS = {
  /** Base path of the application */
  BASE: "/",
  EXAMPLE: "/example",

  /** Authentication-related routes */
  AUTH: {
    /** Base path for authentication */
    BASE: buildAuthPath(""),

    /** Login page path */
    LOGIN: buildAuthPath("login"),

    /** Register page path */
    REGISTER: buildAuthPath("register"),

    /** Forgot password page path */
    FORGOT_PASSWORD: buildAuthPath("forgot-password"),
  },
} as const;
