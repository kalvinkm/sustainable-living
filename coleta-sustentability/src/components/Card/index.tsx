import './style.css';

interface CardProps {
  readonly image: string;
  readonly title: string;
  readonly subtitle: string;
  readonly address: string;
  readonly number: number;
  readonly uf: string;
  readonly city: string;
}

export function Card({ image, title, subtitle, uf, city, address, number }: CardProps) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <p>{city}, {uf}, {address} Nº {number}</p>
    </div>
  );
}
