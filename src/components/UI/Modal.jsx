import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';
import styles from '../../styles/Modal.module.css';

export default function Modal({ children, open, className = '', onClose }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return () => {
            modal.close();
        };
    }, [open]);

    return createPortal(
        <dialog className={`${styles.modal} ${className}`} ref={dialog} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}
