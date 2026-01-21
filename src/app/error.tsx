"use client";
import InternalServerErrorView from "@/section/error/internal-server-error-view";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <InternalServerErrorView />;
}
