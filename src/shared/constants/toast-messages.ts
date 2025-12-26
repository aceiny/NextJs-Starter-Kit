export const toastMessages = {
  default: {
    eventCreated: "Event has been created",
  },
  success: {
    eventCreated: "Event created successfully",
  },
  info: {
    arriveEarly: "Arrive 10 minutes early to prepare for the event",
  },
  warning: {
    tooEarly: "The event cannot start earlier than 8:00 AM",
  },
  error: {
    eventFailed: "Failed to create the event",
  },
  promise: {
    loading: "Creating event...",
    success: (data: { name: string }) => `${data.name} has been created`,
    error: "Something went wrong while creating the event.",
  },
} as const;
