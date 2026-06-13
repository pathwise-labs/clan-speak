import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { useOverlayRoot } from '@/layout/Overlay';
import { IconButton } from '../IconButton/IconButton';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Hide the close button (e.g. forced choices). */
  hideClose?: boolean;
}

export function Modal({ open, onClose, title, children, hideClose }: ModalProps) {
  const root = useOverlayRoot();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !root) return null;

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal__backdrop" aria-label="Close" onClick={onClose} />
      <div className="modal__sheet">
        {(title || !hideClose) && (
          <div className="modal__head">
            <h3 className="modal__title">{title}</h3>
            {!hideClose && <IconButton icon="close" label="Close" onClick={onClose} />}
          </div>
        )}
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    root,
  );
}
