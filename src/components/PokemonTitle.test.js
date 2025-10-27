import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PokemonTitle from "./PokemonTitle";
import { capitalizeFirstLetter } from "../utils/strings";

describe("PokemonTitle component", () => {
  test("renders component", () => {
    const pokemonName = "name";
    const pokemonId = "123";
    render(
      <BrowserRouter>
        <PokemonTitle name={pokemonName} id={pokemonId} />
      </BrowserRouter>
    );
    expect(screen.getByText(`#${pokemonId}`)).toBeInTheDocument();

    expect(
      screen.getByText(capitalizeFirstLetter(pokemonName))
    ).toBeInTheDocument();
  });
});
