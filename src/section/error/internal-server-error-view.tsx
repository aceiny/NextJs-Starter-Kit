import { cn } from "@/lib/utils";
import Image from "next/image";
import illistration500Src from "@/../public/illustrations/illustration-500.svg";
import { ButtonConfig } from "@/types/shared/domain/button-config.type";
import { APP_PATHS } from "@/shared/constants/paths";
import { ActionButton } from "@/components/ui/action-button";

export interface InternalServerErrorViewProps {
  title?: string;
  description?: string;
  showButtons?: boolean;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  showIllustration?: boolean;
  illustrationSrc?: any;
}

export default function InternalServerErrorView({
  title = "500 — Internal Server Error",
  description = "Oops — something went wrong on our end. Please try again .",
  showButtons = true,
  primaryButton = {
    text: "Go back home",
    href: APP_PATHS.BASE,
    variant: "faded",
    size: "lg",
    ripple: true,
  },
  secondaryButton = {
    text: "Contact support",
    href: APP_PATHS.CONTACT,
    variant: "ghost",
    size: "lg",
    ripple: true,
  },
  showIllustration = true,
  illustrationSrc = illistration500Src,
}: InternalServerErrorViewProps = {}) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center py-12 px-4 bg-background",
      )}
    >
      <div className="container mx-auto max-w-2xl xs:max-w-3xl flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-foreground">
            {title}
          </h1>
          <p className=" text-sm sm:text-lg text-muted-foreground mb-6 max-w-xl">
            {description}
          </p>
        </div>

        {showIllustration && (
          <div className="w-full flex items-center justify-center">
            <Image
              src={illustrationSrc}
              alt="Internal Server Error Illustration"
              width={420}
              height={320}
              className="w-full h-auto max-w-md"
            />
          </div>
        )}

        {showButtons && (
          <div className="flex sm:flex-row flex-col items-center justify-center gap-3">
            <ActionButton btn={primaryButton} />
            <ActionButton btn={secondaryButton} />
          </div>
        )}
      </div>
    </div>
  );
}
