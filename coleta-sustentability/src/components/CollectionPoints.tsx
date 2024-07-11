import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import Dropzone from "./Dropzone";
import { ModalComplete } from "./CompleteModal";
import lamp from "../assets/lampadas.svg";
import battery from "../assets/baterias.svg";
import pappers from "../assets/papeis-papelao.svg";
import eletronicWaste from "../assets/eletronicos.svg";
import organicWaste from "../assets/organicos.svg";
import oils from "../assets/oleo.svg";
import "./CollectionPoints.css";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

export function CollectionPoints() {
  const navigate = useNavigate();
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    logradouro: "",
    numero: "",
  });

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedItemTexts, setSelectedItemTexts] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [disableNumber, setDisableNumber] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/distritos?orderBy=nome`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectedUf(e: ChangeEvent<HTMLSelectElement>) {
    const uf = e.target.value;

    setSelectedUf(uf);
  }

  function handleSelectedCity(e: ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;

    setSelectedCity(city);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(idx: number, text: string) {
    const alreadySelected = selectedItems.indexOf(idx);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== idx);
      const filteredTexts = selectedItemTexts.filter((item) => item !== text);
      setSelectedItems(filteredItems);
      setSelectedItemTexts(filteredTexts);
    } else {
      setSelectedItems([...selectedItems, idx]);
      setSelectedItemTexts([...selectedItemTexts, text]);
    }
  }

  const item = [
    {
      imgSrc: lamp,
      imgAlt: "Lâmpadas",
      text: "Lâmpadas",
    },
    {
      imgSrc: battery,
      imgAlt: "Pilhas e Baterias",
      text: "Pilhas e Baterias",
    },
    {
      imgSrc: pappers,
      imgAlt: "Papéis e Papelão",
      text: "Papéis e Papelão",
    },
    {
      imgSrc: eletronicWaste,
      imgAlt: "Resíduos Eletrônicos",
      text: "Resíduos Eletrônicos",
    },
    {
      imgSrc: organicWaste,
      imgAlt: "Redíduos Orgânicos",
      text: "Redíduos Orgânicos",
    },
    {
      imgSrc: oils,
      imgAlt: "Óleo de Cozinha",
      text: "Óleo de Cozinha",
    },
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setFormSubmitted(true);

    if (!selectedFile) {
      return;
    }

    if (!formData.name || !formData.email || !formData.whatsapp) {
      return;
    }

    if (selectedUf === "0" || selectedCity === "0") {
      return;
    }

    if (!formData.logradouro) {
      return;
    }

    if (!formData.numero && !disableNumber) {
      return;
    }

    if (selectedItems.length === 0) {
      return;
    }

    // Convert the file to base64 and save to localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem("selectedFile", base64String);
    };
    reader.readAsDataURL(selectedFile);

    localStorage.setItem("name", formData.name);
    localStorage.setItem("selectedUf", selectedUf);
    localStorage.setItem("selectedCity", selectedCity);
    localStorage.setItem("logradouro", formData.logradouro);
    localStorage.setItem("numero", formData.numero || "");
    localStorage.setItem("selectedItems", JSON.stringify(selectedItemTexts));

    setIsModalOpen(true);
  }

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setDisableNumber(e.target.checked);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    navigate("/");
  }

  return (
    <div className="collection-points-container">
      <div className="collection-points-header">
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
      <form
        action=""
        className="form-collection-points"
        onSubmit={handleSubmit}
      >
        <h1 className="form-title">
          Cadastro do
          <br /> ponto de coleta
        </h1>

        <div className="dropzone-area">
          <Dropzone onFileUploaded={setSelectedFile} />
          {formSubmitted && !selectedFile && (
            <div className="dropzone-message-error">Adicione uma imagem</div>
          )}
        </div>

        <fieldset>
          <legend>
            <h2 className="legend-title-data">Dados</h2>
          </legend>
        </fieldset>
        <div className="field">
          <label htmlFor="name">Nome da entidade</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
          />
          {formSubmitted && !formData.name && (
            <div className="name-message-error">Preencha o nome</div>
          )}
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
            />
            {formSubmitted && !formData.email && (
              <div className="email-message-error">Preencha o email</div>
            )}
          </div>

          <div className="field">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              onChange={handleInputChange}
            />
            {formSubmitted && !formData.whatsapp && (
              <div className="email-message-error">Preencha o Whatsapp</div>
            )}
          </div>
        </div>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço do mapa</span>
          </legend>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
              {formSubmitted && selectedUf === "0" && (
                <div className="uf-message-error">Selecione o estado</div>
              )}
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {formSubmitted && selectedCity === "0" && (
                <div className="city-message-error">Selecione a cidade</div>
              )}
            </div>
          </div>
          <div className="field-group places-and-number">
            <div className="fields-groups-input">
              <div className="field">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  type="text"
                  name="logradouro"
                  id="logradouro"
                  onChange={handleInputChange}
                />
                {formSubmitted && !formData.logradouro && (
                  <div className="place-message-error">Digite o endereço</div>
                )}
              </div>
              <div className="field">
                <label htmlFor="numero">Número</label>
                <input
                  type="text"
                  name="numero"
                  id="numero"
                  onChange={handleInputChange}
                  disabled={disableNumber}
                />
                {formSubmitted && !formData.numero && !disableNumber && (
                  <div className="place-message-error">Digite o número</div>
                )}
              </div>
            </div>
            <div className="field checkbox-area">
              <input
                type="checkbox"
                id="disableNumeroCheckbox"
                onChange={handleCheckboxChange}
                className="custom-checkbox"
              />
              <label
                htmlFor="disableNumeroCheckbox"
                className="disableNumeroCheckbox"
              >
                Endereço sem número
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span className="select-items">
              Selecione um ou mais ítens abaixo
            </span>
          </legend>

          <ul className="items-grid">
            {item.map((item, idx) => (
              <li
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectItem(idx, item.text)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectItem(idx, item.text);
                  }
                }}
                aria-pressed={selectedItems.includes(idx)}
                className={selectedItems.includes(idx) ? "selected" : ""}
              >
                <img src={item.imgSrc} alt={item.imgAlt} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          {formSubmitted && selectedItems.length === 0 && (
            <div className="items-message-error">Escolha no minímo um item</div>
          )}
        </fieldset>

        <button
          className="page-create-button"
          type="submit"
          onClick={() => console.log("CLICOU")}
        >
          Cadastrar ponto de coleta
        </button>
      </form>
      <ModalComplete isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
