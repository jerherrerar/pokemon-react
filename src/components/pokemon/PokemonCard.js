import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { capitalizeFirstLetter } from "../../utils/strings";

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <Card
      sx={{
        width: 100,
        height: 100
      }}
      onClick={() => onClick(pokemon)}
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
          image={pokemon.sprites.other["official-artwork"].front_default}
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
  );
};

export default PokemonCard;
