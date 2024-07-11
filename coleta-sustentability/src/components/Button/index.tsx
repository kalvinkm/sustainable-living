import { Link } from 'react-router-dom';
import "./style.css";

export function Button() {
  return (
    <div>
      <Link to="/collection-points" className="register">
        <span className="registerLabel">
          <svg
            stroke="#fff"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
        </span>
        <strong>Cadastre um ponto de coleta</strong>
      </Link>
    </div>
  );
}

