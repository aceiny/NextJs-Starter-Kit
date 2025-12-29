"use client";
import {
  usePathname,
  useRouter,
  useSearchParams as useSP,
} from "next/navigation";

export const useSearchParams = (key: string) => {
  const searchParams = useSP();
  const params = searchParams.get(key);
  return params;
};

// New hook that gets all search params at once to avoid conditional hooks
export const useAllSearchParams = () => {
  const searchParams = useSP();

  // Convert URLSearchParams to a plain object
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

/**
 * Hook for setting query params.
 */
type SetParamArgs = {
  name: string;
  value: string | null | undefined;
  replace?: boolean;
};

type SetMultipleParamsArgs = {
  params: Record<string, string | null | undefined>;
  replace?: boolean;
};

export const useSetQueryParams = () => {
  const router = useRouter();
  const searchParams = useSP();
  const pathname = usePathname();

  const setParam = ({ name, value, replace }: SetParamArgs) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== null && value !== undefined && value !== "") {
      params.set(name, String(value));
    } else {
      params.delete(name);
    }

    const url = `${pathname}?${params.toString()}`;

    if (replace) {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  };

  // New function to set multiple params at once
  const setMultipleParams = ({
    params: paramsToSet,
    replace = true,
  }: SetMultipleParamsArgs) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(paramsToSet).forEach(([name, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.set(name, String(value));
      } else {
        params.delete(name);
      }
    });

    const url = `${pathname}?${params.toString()}`;

    if (replace) {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  };

  return { setParam, setMultipleParams };
};
