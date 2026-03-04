import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect, ReactNode } from "react";

interface NoteModalProps {
  onClose: () => void;
  children: ReactNode; 
}

function NoteModal({ onClose, children }: NoteModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={css.modal}>
        {children} 
      </div>
    </div>,
    document.body
  );
}

export default NoteModal;
