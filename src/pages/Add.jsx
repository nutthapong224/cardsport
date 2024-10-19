import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const Add = () => {
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [data, setData] = useState({
    type: "",
    fname: "",
    lname: "",
    campus: "",
    imgurl: "", 
    sporttype: "" // added new field for sport type
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://api.sheetbest.com/sheets/f8b45086-c0c3-4777-9bb1-bba73f0e267a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        navigate("/"); // use navigate() instead of history.replace()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Add Student Information
      </Typography>

      <TextField
        label="ประเภท"
        variant="outlined"
        fullWidth
        name="type"
        value={data.type}
        onChange={handleChange}
      />

      <TextField
        label="ชื่อ"
        variant="outlined"
        fullWidth
        name="fname"
        value={data.fname}
        onChange={handleChange}
      />

      <TextField
        label="สกุล"
        variant="outlined"
        fullWidth
        name="lname"
        value={data.lname}
        onChange={handleChange}
      />

      <TextField
        label="วิทยาเขต"
        variant="outlined"
        fullWidth
        name="campus"
        value={data.campus}
        onChange={handleChange}
      />

      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        name="imgurl"
        value={data.imgurl}
        onChange={handleChange}
      />

      <TextField
        label="หน่วยงาน/สังกัด"
        variant="outlined"
        fullWidth
        name="sporttype" 
        value={data.sporttype}
        onChange={handleChange}
      />

      <Box textAlign="center">
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
