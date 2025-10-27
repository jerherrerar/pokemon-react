import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { getPokemons } from "../services/api";
import Main from "../layout/Main";
import pokedexIcon from "../assets/icons/pokedexIcon.png";
import Title from "../components/common/Title";
import PokemonCard from "../components/pokemon/PokemonCard";

const MainPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
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

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  let displayPokemon = searchText
    ? pokemons.filter((el) => el.name.includes(searchText))
    : pokemons;

  if (loading) return <p>Loading pokemons...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Main color="#DC0A2D">
      <Title title="Pokedex" icon={pokedexIcon} />
      <TextField
        label="Search"
        variant="filled"
        fullWidth
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#FFFFFF"
            }
          }
        }}
        value={searchText}
        onChange={handleSearch}
      />
      <Card
        sx={{
          marginTop: 4,
          borderRadius: 8,
          height: "100%"
        }}
        variant="outlined"
      >
        <CardContent
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            paddingTop: 8
          }}
        >
          <Grid
            container
            gap={1}
            sx={{
              alignItems: "center",
              display: "flex"
            }}
          >
            {displayPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={handlePokemonClick}
              />
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Main>
  );
};

export default MainPage;
