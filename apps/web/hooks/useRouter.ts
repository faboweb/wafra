import { useRouter as useNextRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

type RouterActions = {
  push: (path: string | { pathname: string; params?: Record<string, string> }) => void;
  replace: (path: string) => void;
  back: () => void;
  getCurrentPath: () => string;
  getParam: (key: string) => string | null;
};

export function useRouter(): RouterActions {
  const nextRouter = useNextRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router: RouterActions = {
    push: (path) => {
      if (typeof path === 'string') {
        nextRouter.push(path);
      } else {
        const search = new URLSearchParams(path.params || {}).toString();
        nextRouter.push(`${path.pathname}${search ? `?${search}` : ''}`);
      }
    },

    replace: (path) => {
      nextRouter.replace(path);
    },

    back: () => {
      nextRouter.back();
    },

    getCurrentPath: () => {
      return pathname || '/';
    },

    getParam: (key) => {
      return searchParams.get(key);
    },
  };

  return router;
}

// Type-safe route params
export type AppRoutes = {
  '/': undefined;
  '/dashboard': undefined;
  '/profile': undefined;
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
