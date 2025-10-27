import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Main = ({ children, color }) => {
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
          backgroundColor: color,
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
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Main;
