import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 5 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          CRUD Google Sheet
        </Typography>
        <Box>
          <Button
            component={RouterLink}
            to="/add"
            variant="contained"
            color="secondary"
            size="small"
          >
            Add
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
