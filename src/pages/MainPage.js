import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getPokemons } from "../apiService";
import Main from "../layout/Main";
import pokedexIcon from "../assets/icons/pokedexIcon.png";
import { capitalizeFirstLetter } from "../utils/strings";

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

  // const displayPokemon = [pokemons[0], pokemons[1]];
  let displayPokemon = searchText
    ? pokemons.filter((el) => el.name.includes(searchText))
    : pokemons;

  if (loading) return <p>Loading pokemons...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Main color="#DC0A2D">
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          width: "100%",
          padding: 2,
          gap: 2
        }}
      >
        <img
          src={pokedexIcon}
          alt=""
          style={{
            width: 20,
            height: 20,
            objectFit: "contain"
          }}
        />
        <Typography sx={{ fontSize: 24, color: "#FFFFFF", fontWeight: "bold" }}>
          Pokedex
        </Typography>
      </Stack>
      <TextField
        label="Search"
        variant="filled"
        fullWidth
        sx={{
          borderRadius: 15,
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
              <Grid key={pokemon.id}>
                <Card
                  sx={{
                    width: 100,
                    height: 100
                  }}
                  onClick={() => handlePokemonClick(pokemon)}
                >
                  <CardContent
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative"
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 70, width: 70, objectFit: "contain" }}
                      image={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                      alt={pokemon.name}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ position: "absolute", right: 1 }}
                    >
                      #{pokemon.id}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ position: "absolute", bottom: 8 }}
                    >
                      {capitalizeFirstLetter(pokemon.name)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Main>
  );
};

export default MainPage;
