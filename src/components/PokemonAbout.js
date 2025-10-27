import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import heightIcon from "../assets/icons/heightIcon.png";
import weightIcon from "../assets/icons/weightIcon.png";
import { capitalizeFirstLetter } from "../utils/strings";

const Attribute = ({ desc, value, icon }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: 55,
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Box>
        {value.map((val) => (
          <Stack direction="row" key={val} sx={{ alignItems: "center" }}>
            {icon && (
              <img
                src={icon}
                alt=""
                style={{
                  width: 12,
                  height: 12,
                  objectFit: "contain"
                }}
              />
            )}
            <Typography sx={{ fontSize: 10, marginLeft: 1 }}>
              {capitalizeFirstLetter(val)}
            </Typography>
          </Stack>
        ))}
      </Box>

      <Typography sx={{ fontSize: 8 }}> {desc} </Typography>
    </Stack>
  );
};

const PokemonAbout = ({ weight, height, abilities }) => {
  const moves = abilities.map((ability) => ability.ability.name);
  return (
    <Stack
      direction="row"
      sx={{ width: "100%" }}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <Attribute
        desc="Weight"
        value={[`${weight / 10} Kg`]}
        icon={weightIcon}
      />
      <Attribute desc="Height" value={[`${height / 10} m`]} icon={heightIcon} />
      <Attribute desc="Moves" value={moves} />
    </Stack>
  );
};

export default PokemonAbout;
