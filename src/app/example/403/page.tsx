import PermissionDeniedView from "@/section/error/permission-denied-view";
import { APP_PATHS } from "@/shared/constants/paths";

export default function ForbiddenPage() {
  return (
    <PermissionDeniedView
      title="403 — Permission Denied"
      description="This is an example of the 403 error page. You don't have permission to access this resource."
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
