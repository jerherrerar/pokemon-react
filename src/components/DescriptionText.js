import Typography from "@mui/material/Typography";

const DescriptionText = ({ text }) => {
  return (
    <Typography variant="h5" component="div" sx={{ fontSize: 10 }}>
      {text}
    </Typography>
  );
};

export default DescriptionText;
