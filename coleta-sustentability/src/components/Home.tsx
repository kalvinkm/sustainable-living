import { Button } from "./Button";
import { ClickableDiv } from "./ClickableDiv";
import { Header } from "./Header";

import './Home.css'

export function Home() {
    return (
        <div className="home-container">
          <Header />
          <main className="main-container">
            <h1 className="title">
              Coleta <br /> Sustentável
            </h1>
            <p className="home-text">
              Encontre pontos de coleta sustentável <br /> próximo de você!
            </p>
            <Button  />
            <ClickableDiv />
          </main>
        </div>
    );
  }