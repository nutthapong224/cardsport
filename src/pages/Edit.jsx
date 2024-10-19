import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const Edit = () => {
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const { rowIndex } = useParams();
  const [data, setData] = useState({
    studentid: "",
    fname: "",
    lname: "",
    campus: "",
    imgurl: "",
  });

  const getData = async () => {
    try {
      const res = await fetch(
        `https://api.sheetbest.com/sheets/f8b45086-c0c3-4777-9bb1-bba73f0e267a/${rowIndex}`
      );
      const data = await res.json();
      setData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.sheetbest.com/sheets/f8b45086-c0c3-4777-9bb1-bba73f0e267a/${rowIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        navigate("/"); // use navigate instead of history.replace
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
        Edit Student Information
      </Typography>

      <TextField
        label="Student ID"
        variant="outlined"
        fullWidth
        name="studentid"
        value={data.studentid}
        onChange={handleChange}
      />

      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        name="fname"
        value={data.fname}
        onChange={handleChange}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        name="lname"
        value={data.lname}
        onChange={handleChange}
      />

      <TextField
        label="Campus"
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

      <Box textAlign="center">
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default Edit;
