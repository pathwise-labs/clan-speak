import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Routes, type RoutePath } from './routes';

interface RouterValue {
  path: string;
  navigate: (path: RoutePath | string) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

function readHash(): string {
  const h = window.location.hash.replace(/^#/, '');
  return h || Routes.Home;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(readHash);

  useEffect(() => {
    const onHash = () => setPath(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (to: RoutePath | string) => {
    const next = to.startsWith('/') ? to : `/${to}`;
    if (`#${next}` === window.location.hash) {
      setPath(next); // same hash — force state in sync
    } else {
      window.location.hash = next;
    }
  };

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useNavigation(): RouterValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useNavigation must be used within a RouterProvider');
  return ctx;
}
