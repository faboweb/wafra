import { Platform } from "react-native";
// @ts-ignore
import { useNavigate, useLocation, useRouter } from "router";

type RouterActions = {
  push: (
    path: string | { pathname: string; params?: Record<string, string> }
  ) => void;
  replace: (path: string) => void;
  back: () => void;
  getCurrentPath: () => string;
  getParam: (key: string) => string | null;
};

export function useRouter(): RouterActions {
  const expoRouter = Platform.OS !== "web" ? useRouter() : null;
  const navigate = Platform.OS === "web" ? useNavigate() : null;
  const location = Platform.OS === "web" ? useLocation() : null;

  const router: RouterActions = {
    push: (path) => {
      if (Platform.OS === "web") {
        if (typeof path === "string") {
          navigate?.(path);
        } else {
          const search = new URLSearchParams(path.params || {}).toString();
          navigate?.(`${path.pathname}${search ? `?${search}` : ""}`);
        }
      } else {
        if (typeof path === "string") {
          expoRouter?.push(path as any);
        } else {
          expoRouter?.push({
            pathname: path.pathname,
            params: path.params,
          });
        }
      }
    },

    replace: (path) => {
      if (Platform.OS === "web") {
        navigate?.(path, { replace: true });
      } else {
        expoRouter?.replace(path as any);
      }
    },

    back: () => {
      if (Platform.OS === "web") {
        navigate?.(-1);
      } else {
        expoRouter?.back();
      }
    },

    getCurrentPath: () => {
      if (Platform.OS === "web") {
        return location?.pathname || "/";
      } else {
        return "/";
      }
    },

    getParam: (key) => {
      if (Platform.OS === "web") {
        const params = new URLSearchParams(location?.search || "");
        return params.get(key);
      } else {
        return expoRouter?.getParam(key) || null;
      }
    },
  };

  return router;
}

// Optional: Type-safe route params
export type AppRoutes = {
  "/(onboard)": undefined;
  "/(dashboard)": undefined;
  "/profile": undefined;
  // Add more routes as needed
};

// Usage example with type-safe routes
export function useTypedRouter() {
  const router = useRouter();

  return {
    ...router,
    pushTyped: <T extends keyof AppRoutes>(route: T, params?: AppRoutes[T]) => {
      router.push(route as string);
    },
  };
}
