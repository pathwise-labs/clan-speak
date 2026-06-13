import type { ReactNode } from 'react';
import './PhoneFrame.css';
import { OverlayProvider } from './Overlay';

/**
 * The device shell. Constrains the whole app to a phone-sized viewport, centred
 * on the page, with a faux status bar and notch — so a desktop browser previews
 * Cànan as if on a phone. All overlays (lesson, modals) portal inside the frame.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone">
      <div className="phone__bezel">
        <div className="phone__notch" aria-hidden="true" />
        <div className="phone__statusbar" aria-hidden="true">
          <span className="phone__time">9:41</span>
          <span className="phone__sysicons">
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="1" />
              <rect x="4.5" y="5" width="3" height="6" rx="1" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" opacity="0.4" />
            </svg>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" opacity="0.5" />
              <rect x="2" y="2" width="15" height="8" rx="1.5" fill="currentColor" />
              <rect x="21.5" y="3.5" width="1.5" height="5" rx="0.75" fill="currentColor" opacity="0.5" />
            </svg>
          </span>
        </div>
        <div className="phone__screen">
          <OverlayProvider>{children}</OverlayProvider>
        </div>
      </div>
    </div>
  );
}
