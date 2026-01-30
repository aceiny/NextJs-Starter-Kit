import NotFoundView from "@/section/error/not-found-view";
import { APP_PATHS } from "@/shared/constants/paths";

export default function NotFoundExamplePage() {
  return (
    <NotFoundView
      title="404 — Page not found"
      description="This is an example of the 404 error page. The actual page you're looking for doesn't exist."
      primaryButton={{
        text: "Go back home",
        href: APP_PATHS.BASE,
        variant: "faded",
        size: "lg",
        ripple: true,
      }}
      secondaryButton={{
        text: "View Examples",
        href: APP_PATHS.EXAMPLE,
        variant: "ghost",
        size: "lg",
        ripple: true,
      }}
    />
  );
}
