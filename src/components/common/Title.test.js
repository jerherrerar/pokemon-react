import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Title from "./Title";
import backIcon from "../../assets/icons/backIcon.png";

describe("PokemonTitle component", () => {
  test("renders component", () => {
    const pokemonName = "Name";
    const pokemonId = "#123";
    render(
      <BrowserRouter>
        <Title title={pokemonName} subtitle={pokemonId} icon={backIcon} />
      </BrowserRouter>
    );
    expect(screen.getByText(pokemonId)).toBeInTheDocument();
    expect(screen.getByText(pokemonName)).toBeInTheDocument();
    expect(screen.getByTestId("title-icon")).toBeInTheDocument();
  });
});
