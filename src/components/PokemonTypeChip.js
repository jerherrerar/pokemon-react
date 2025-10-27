import Chip from "@mui/material/Chip";

import { PokemonTypesColor } from "../utils/constants";
import { capitalizeFirstLetter } from "../utils/strings";

const PokemonTypeChip = ({ name }) => {
  return (
    <Chip
      sx={{ bgcolor: PokemonTypesColor[name], height: 20, color: "#FFFFFF" }}
      label={capitalizeFirstLetter(name)}
    />
  );
};

export default PokemonTypeChip;
