import { Card } from "../Card";
import "./style.css";

import colectoria from "../../assets/colectoria.avif";
import paperside from "../../assets/paperside.avif";
import { useEffect, useState } from "react";

interface LocalPoint {
  img: string;
  title: string;
  subtitle: string;
  address: string;
  number: number;
  uf: string;
  city: string;
}

export function CardContainer() {
  const [localPoints, setLocalPoints] = useState<LocalPoint[]>([
    {
      img: colectoria,
      title: "Colectoria",
      subtitle: "Resíduos Eletrônicos, Lâmpadas",
      address: "Guilherme Gemballa, Jardim América",
      number: 260,
      uf: "SC",
      city: "Rio do Sul",
    },
    {
      img: paperside,
      title: "Papersider",
      subtitle: "Resíduos Eletrônicos, Lâmpadas",
      address: "Guilherme Gemballa, Jardim América",
      number: 260,
      uf: "SC",
      city: "Rio do Sul",
    },
  ]);

  useEffect(() => {
    const selectedFile = localStorage.getItem("selectedFile");
    const name = localStorage.getItem("name");
    const selectItems = localStorage.getItem("selectedItems");
    const logradouro = localStorage.getItem("logradouro");
    const numero = localStorage.getItem("numero");
    const uf = localStorage.getItem("selectedUf");
    const city = localStorage.getItem("selectedCity");

    const localStorageData = {
      selectedFile,
      name,
      selectItems: selectItems ? JSON.parse(selectItems) : [],
      logradouro,
      numero: numero ? parseInt(numero) : 0,
      uf,
      city
    };

    console.log("Dados do localStorage:", localStorageData);

    if (
      localStorageData.selectedFile &&
      localStorageData.name &&
      localStorageData.logradouro &&
      localStorageData.numero &&
      localStorageData.uf &&
      localStorageData.city
    ) {
      const newPoint: LocalPoint = {
        img: localStorageData.selectedFile,
        title: localStorageData.name,
        subtitle: localStorageData.selectItems.join(", "),
        address: localStorageData.logradouro,
        number: localStorageData.numero,
        uf: localStorageData.uf,
        city: localStorageData.city
      };

      setLocalPoints((prevPoints) => {
        const exists = prevPoints.some(
          (point) =>
            point.img === newPoint.img &&
            point.title === newPoint.title &&
            point.subtitle === newPoint.subtitle &&
            point.address === newPoint.address &&
            point.number === newPoint.number &&
            point.uf === newPoint.uf &&
            point.city === newPoint.city
        );

        if (!exists) {
          return [...prevPoints, newPoint];
        }
        return prevPoints;
      });
    }
  }, []);

  return (
    <main className="card-container">
      <h4>
        <strong>{localPoints.length} pontos encontrados</strong>
      </h4>
      <div className="cards">
        {localPoints.map((point: LocalPoint, index: number) => (
          <Card
            key={index}
            image={point.img}
            title={point.title}
            subtitle={point.subtitle}
            address={point.address}
            number={point.number}
            uf={point.uf}
            city={point.city}
          />
        ))}
      </div>
    </main>
  );
}
