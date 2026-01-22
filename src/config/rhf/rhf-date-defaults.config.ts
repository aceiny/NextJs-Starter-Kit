// Default values for common HeroUI RHF date/time field props

export const RHF_BASE_DEFAULTS = {
  disabled: false,
  isInvalid: false,
  isRequired: false,
  isReadOnly: false,
  className: "",
  variant: "bordered" as const,
  color: "default" as const,
  size: "md" as const,
  radius: "md" as const,
  labelPlacement: "inside" as const,
  autoFocus: false,
  disableAnimation: false,
};

export const RHF_DATE_LIKE_DEFAULTS = {
  hourCycle: 24 as const,
  hideTimeZone: false,
  shouldForceLeadingZeros: true,
  validationBehavior: "native" as const,
};
