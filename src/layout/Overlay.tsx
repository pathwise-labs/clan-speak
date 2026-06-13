import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

/**
 * Overlays (the lesson, modals) must render INSIDE the phone frame, not on
 * document.body. This context exposes a DOM node, mounted by <OverlayHost/>
 * near the top of the frame, that portals target.
 */
const OverlayContext = createContext<HTMLElement | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  return (
    <OverlayContext.Provider value={node}>
      {children}
      <div className="overlay-host" ref={setNode} />
    </OverlayContext.Provider>
  );
}

export function useOverlayRoot(): HTMLElement | null {
  return useContext(OverlayContext);
}
