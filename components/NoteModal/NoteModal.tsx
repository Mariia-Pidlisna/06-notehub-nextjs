'use client'

import { createPortal } from "react-dom";
import css from "./NoteModal.module.css";
import { useEffect } from "react";

interface NoteModalProps {
    children: React.ReactNode,
    onClose: () => void,
}

export default function NoteModal({ children, onClose }: NoteModalProps) {

    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    
    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
            onClose();
        }
        };
        document.addEventListener("keydown", onEscape);

        return () => {
        document.removeEventListener("keydown", onEscape);
        };
    }, [onClose]);

return createPortal(    
    <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdrop}
        >
        <div className={css.modal}>
            {children}
        </div>
    </div>,
    document.body
    )
}