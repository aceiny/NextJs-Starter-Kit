"use client";

import { addToast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { toastMessages } from "@/shared/constants/toast-messages";

export function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          addToast({
            title: toastMessages.default.eventCreated,
            color: "default",
          })
        }
      >
        Default
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          addToast({
            title: toastMessages.success.eventCreated,
            color: "success",
          })
        }
      >
        Success
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          addToast({
            title: "Information",
            description: toastMessages.info.arriveEarly,
            color: "primary",
          })
        }
      >
        Info
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          addToast({
            title: toastMessages.warning.tooEarly,
            color: "warning",
          })
        }
      >
        Warning
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          addToast({
            title: toastMessages.error.eventFailed,
            color: "danger",
          })
        }
      >
        Error
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          const promise = new Promise<{ name: string }>((resolve, reject) => {
            setTimeout(() => {
              const success = Math.random() > 0.3;
              if (success) {
                resolve({ name: "Event" });
              } else {
                reject(new Error("Failed to create event"));
              }
            }, 3000);
          });

          promise
            .then((data) => {
              addToast({
                title: toastMessages.promise.success(data),
                color: "success",
              });
            })
            .catch(() => {
              addToast({
                title: toastMessages.promise.error,
                color: "danger",
              });
            });

          addToast({
            title: toastMessages.promise.loading,
            color: "default",
            timeout: 3000,
          });
        }}
      >
        Promise
      </Button>
    </div>
  );
}
