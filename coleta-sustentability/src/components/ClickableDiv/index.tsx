import { useState } from 'react';
import { Modal } from '../Modal';
import './style.css';

export function ClickableDiv() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleOpenModal();
    }
  };

  return (
    <div
      className="clickable-div"
      onClick={handleOpenModal}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      Pesquisar pontos de coleta
      <Modal show={showModal} onClose={handleCloseModal}>
        <h1>Pontos de Coleta</h1>
        <form action="/search-results">
          <label htmlFor="search">Cidade</label>
          <div className="search-field">
            <input type="text" name="search" placeholder="Pesquise por Cidade" />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
