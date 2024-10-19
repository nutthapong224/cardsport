import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Home = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://api.sheetbest.com/sheets/f8b45086-c0c3-4777-9bb1-bba73f0e267a"
      );
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (rowIndex) => {
    try {
      const res = await fetch(
        `https://api.sheetbest.com/sheets/f8b45086-c0c3-4777-9bb1-bba73f0e267a/${rowIndex}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        const updatedData = data.filter((_, i) => i !== rowIndex);
        setData(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "auto", mt: 4 }}>
      {data?.map((item, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{item.type}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">
                <strong>{item.fname} {item.lname}</strong> --- {item.campus}
              </Typography>
              <Box>
                <Button
                  component={Link}
                  to={`/playercard/${i}`}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  playertype a
                </Button> 
                <Button
                  component={Link}
                  to={`/playercardb/${i}`}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  playertype b
                </Button>
                <Button
                  component={Link}
                  to={`/playercardc/${i}`}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  playertype c
                </Button>
                <Button
                  component={Link}
                  to={`/playercardd/${i}`}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  playertype d
                </Button> 
                <Button
                  component={Link}
                  to={`/playercarde/${i}`}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  playertype e
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
            <Typography>
              <img
                src={item.imgurl}
                alt={`${item.fname} ${item.lname}`}
                style={{ width: "100px", height: "100px" }}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Home;
