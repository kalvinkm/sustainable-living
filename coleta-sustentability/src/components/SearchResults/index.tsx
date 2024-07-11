import { CardContainer } from "../CardContainer";
import { Header } from "../Header";
import "./style.css";

export function SearchResults() {
  return (
    <div className="page-search-results">
      <div className="page-search-header">
        <Header />
        <a href="/" className="back-to-home">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar para home
        </a>
      </div>
      <CardContainer />
    </div>
  );
}
