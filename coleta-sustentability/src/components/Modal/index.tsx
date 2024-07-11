import "./style.css";
import { ReactNode, KeyboardEvent } from "react";

interface ModalProps {
  readonly show: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
}

export function Modal({ show, onClose, children }: ModalProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyPress}
            tabIndex={0}
          >
            <button className="modal-close" onClick={onClose}>
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
