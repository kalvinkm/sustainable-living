import "./style.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalComplete: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-complete-overlay">
      <div className="modal-complete">
        <div className="checkmark-container">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h1>Sucesso!</h1>
        <p>Ponto de coleta cadastrado.</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};
