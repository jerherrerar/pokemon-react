// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import backIcon from "../assets/icons/backIcon.png";
import { capitalizeFirstLetter } from "../utils/strings";

const PokemonTitle = ({ name, id }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 1
        }}
      >
        <button
          onClick={handleBack}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleBack();
            }
          }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer"
          }}
          aria-label="Go back to home page"
        >
          <img
            src={backIcon}
            alt=""
            style={{
              width: 20,
              height: 20,
              objectFit: "contain"
            }}
          />
        </button>
        <Typography sx={{ fontSize: 24, color: "#FFFFFF", fontWeight: "bold" }}>
          {capitalizeFirstLetter(name)}
        </Typography>
      </Stack>

      <Typography sx={{ fontSize: 12, color: "#FFFFFF" }}>#{id}</Typography>
    </Stack>
  );
};

export default PokemonTitle;
