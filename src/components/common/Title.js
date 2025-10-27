import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Title = ({ title, subtitle, icon, action }) => {
  let iconComponent = (
    <img
      src={icon}
      alt=""
      style={{
        width: 20,
        height: 20,
        objectFit: "contain"
      }}
      data-testid="title-icon"
    />
  );
  if (action) {
    iconComponent = (
      <button
        onClick={action}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer"
        }}
      >
        {iconComponent}
      </button>
    );
  }
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        paddingTop: 2,
        marginLeft: 2,
        marginBottom: 2,
        gap: 2
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 1
        }}
      >
        {iconComponent}
        <Typography sx={{ fontSize: 24, color: "#FFFFFF", fontWeight: "bold" }}>
          {title}
        </Typography>
      </Stack>

      <Typography sx={{ fontSize: 12, color: "#FFFFFF" }}>
        {subtitle}
      </Typography>
    </Stack>
  );
};

export default Title;
