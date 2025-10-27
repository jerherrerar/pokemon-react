import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { getPokemonById, getPokemonSpeciesById } from "../services/api";
import PokemonTypeChip from "../components/pokemon/PokemonTypeChip";
import SubtitleText from "../components/pokemon/SubtitleText";
import { PokemonTypesColor } from "../utils/constants";
import DescriptionText from "../components/pokemon/DescriptionText";
import PokemonAbout from "../components/pokemon/PokemonAbout";
import PokemonStats from "../components/pokemon/PokemonStats";
import Title from "../components/common/Title";
import backIcon from "../assets/icons/backIcon.png";
import Main from "../layout/Main";
import { capitalizeFirstLetter } from "../utils/strings";

const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(location.state?.pokemon);
  const [species, setSpecies] = useState(null);
  const [mainColor, setMainColor] = useState("#EFEFEF");
  const [loading, setLoading] = useState(!location.state?.pokemon);
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigate("/");
  };

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
        setMainColor(PokemonTypesColor[primaryType] || "#EFEFEF");
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
    <Main color={mainColor}>
      <Title
        title={capitalizeFirstLetter(pokemon.name)}
        subtitle={`#${pokemon.id}`}
        icon={backIcon}
        action={handleBack}
      />
      <CardMedia
        component="img"
        sx={{
          width: 200,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 115
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
    </Main>
  );
};

export default DetailPage;
