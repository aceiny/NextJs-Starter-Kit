import { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
      retry: (failureCount, error: any) => {
        // Retry only on server errors (status 5xx)
        if (error?.response?.status >= 500 && error?.response?.status < 600) {
          return true;
        }
        return false;
      },
      refetchOnWindowFocus: false, // do not refetch on window focus
    },
  },
};
