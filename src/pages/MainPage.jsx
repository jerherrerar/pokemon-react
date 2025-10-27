import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemons } from "../apiService";

const MainPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemons();
        setPokemons(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const handlePokemonClick = (pokemon) => {
    navigate(`/detail/${pokemon.id}`, { state: { pokemon } });
  };

  if (loading) return <p>Loading pokemons...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <>
            <li key={pokemon.name}>{pokemon.name}</li>
            <button onClick={() => handlePokemonClick(pokemon)}>GOOO</button>
          </>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
