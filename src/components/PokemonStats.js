import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { StatsLabels } from "../utils/constants";

const PokemonStats = ({ stats, color }) => {
  return (
    <Stack sx={{ width: "100%" }}>
      {stats.map((stat) => (
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          key={stat.stat.name}
        >
          <Typography
            sx={{ fontSize: 10, color: color, width: 43, fontWeight: "bold" }}
          >
            {StatsLabels[stat.stat.name]}
          </Typography>
          <Typography sx={{ fontSize: 10, width: 40 }}>
            {stat.base_stat}
          </Typography>
          <Box sx={{ width: "100%", color: color, alignContent: "center" }}>
            <LinearProgress
              variant="determinate"
              color="inherit"
              value={stat.base_stat / 3}
            />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

export default PokemonStats;
