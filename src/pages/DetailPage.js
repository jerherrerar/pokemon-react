import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { getPokemonById, getPokemonSpeciesById } from "../apiService";
import PokemonTypeChip from "../components/PokemonTypeChip";
import SubtitleText from "../components/SubtitleText";
import { PokemonTypesColor } from "../utils/constants";
import DescriptionText from "../components/DescriptionText";
import PokemonAbout from "../components/PokemonAbout";
import PokemonStats from "../components/PokemonStats";
import PokemonTitle from "../components/PokemonTitle";

function DetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(location.state?.pokemon);
  const [species, setSpecies] = useState(null);
  const [mainColor, setMainColor] = useState("#000000");
  const [loading, setLoading] = useState(!location.state?.pokemon);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pokemonData = pokemon;
        if (!pokemon) {
          pokemonData = await getPokemonById(id);
          setPokemon(pokemonData);
        }

        const speciesData = await getPokemonSpeciesById(pokemonData.id);
        setSpecies(speciesData);

        const primaryType = pokemonData.types[0].type.name;
        setMainColor(PokemonTypesColor[primaryType] || "#000000");
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, pokemon]);

  if (loading) return <p>Loading pokemon details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!pokemon) {
    navigate("/", { replace: true });
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <Card
        sx={{
          width: 360,
          height: 640,
          backgroundColor: mainColor,
          display: "flex",
          flexDirection: "column"
        }}
        variant="outlined"
      >
        <CardContent
          sx={{
            padding: 0.5,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            "&:last-child": { paddingBottom: 0.5 }
          }}
        >
          <PokemonTitle name={pokemon.name} id={pokemon.id} />
          <CardMedia
            component="img"
            sx={{
              width: 200,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 200
            }}
            image={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
          <Card
            sx={{
              marginTop: "auto",
              borderRadius: 8
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
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "center", width: "100%" }}
              >
                {pokemon.types.map((type) => (
                  <PokemonTypeChip key={type.slot} name={type.type.name} />
                ))}
              </Stack>
              <SubtitleText text="About" color={mainColor} />
              <PokemonAbout
                weight={pokemon.weight}
                height={pokemon.height}
                abilities={pokemon.abilities}
              />
              {species && (
                <DescriptionText
                  text={species.flavor_text_entries[0].flavor_text}
                />
              )}
              <SubtitleText text="Base Stats" color={mainColor} />
              <PokemonStats stats={pokemon.stats} color={mainColor} />
            </CardContent>
          </Card>
        </CardContent>
        {/* <CardActions>
          <Button size="small" onClick={() => navigate("/")}>
            BACK
          </Button>
        </CardActions> */}
      </Card>
    </Box>
  );
}

export default DetailPage;
