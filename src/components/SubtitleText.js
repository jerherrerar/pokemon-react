import Typography from "@mui/material/Typography";

const SubtitleText = ({ text, color }) => {
  return (
    <Typography
      variant="h5"
      component="div"
      sx={{ fontSize: 14, color: { color }, fontWeight: "bold" }}
    >
      {text}
    </Typography>
  );
};

export default SubtitleText;
