import InternalServerErrorView from "@/section/error/internal-server-error-view";
import { APP_PATHS } from "@/shared/constants/paths";

export default function ServerErrorPage() {
  return (
    <InternalServerErrorView
      title="500 — Internal Server Error"
      description="This is an example of the 500 error page. Something went wrong on our end."
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
