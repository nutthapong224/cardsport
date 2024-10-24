import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const GoogleSheetData = () => {
  const [data, setData] = useState([]);
  const [fnameSearch, setFnameSearch] = useState("");
  const [lnameSearch, setLnameSearch] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedSportType, setSelectedSportType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCSVData = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTA6TGRXnKyGRoBeF52lUpgIKj3851eY4oK9izypZdYW6HEa51keal9_aAO8owBmyAZCUO3gz6m6p6-/pub?output=csv";

      try {
        const response = await fetch(url);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            setData(result.data);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    fetchCSVData();
  }, []);

  // Extract unique campus and sport type options for dropdowns
  const uniqueCampuses = [...new Set(data.map((row) => row.campus))];
  const uniqueSportTypes = [...new Set(data.map((row) => row.sporttype))];

  const handleViewDetails = (rowId) => {
    navigate(`/playercardb/${rowId}`);
  };

  const handleFnameSearchChange = (event) => {
    setFnameSearch(event.target.value);
  };

  const handleLnameSearchChange = (event) => {
    setLnameSearch(event.target.value);
  };

  const handleCampusChange = (event) => {
    setSelectedCampus(event.target.value);
  };

  const handleSportTypeChange = (event) => {
    setSelectedSportType(event.target.value);
  };

  const filteredData = data.filter((row) => {
    const fnameMatch = row.fname?.toLowerCase().includes(fnameSearch.toLowerCase());
    const lnameMatch = row.lname?.toLowerCase().includes(lnameSearch.toLowerCase());
    const campusMatch = selectedCampus ? row.campus === selectedCampus : true;
    const sportTypeMatch = selectedSportType ? row.sporttype === selectedSportType : true;

    return fnameMatch && lnameMatch && campusMatch && sportTypeMatch;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontFamily: "'Kanit', sans-serif" }}
      >
        ระบบค้นหาข้อมูลผู้สมัคร
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="กรุณากรอกชื่อ"
            variant="outlined"
            fullWidth
            value={fnameSearch}
            onChange={handleFnameSearchChange}
            sx={{ fontFamily: "'Kanit', sans-serif" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="กรุณากรอกนามสกุล"
            variant="outlined"
            fullWidth
            value={lnameSearch}
            onChange={handleLnameSearchChange}
            sx={{ fontFamily: "'Kanit', sans-serif" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>วิทยาเขต</InputLabel>
            <Select
              value={selectedCampus}
              onChange={handleCampusChange}
              label="วิทยาเขต"
              sx={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <MenuItem value="">
                <em>ทั้งหมด</em>
              </MenuItem>
              {uniqueCampuses.map((campus, index) => (
                <MenuItem key={index} value={campus}>
                  {campus}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>หน่วยงาน/สังกัด</InputLabel>
            <Select
              value={selectedSportType}
              onChange={handleSportTypeChange}
              label="หน่วยงาน/สังกัด"
              sx={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <MenuItem value="">
                <em>ทั้งหมด</em>
              </MenuItem>
              {uniqueSportTypes.map((sporttype, index) => (
                <MenuItem key={index} value={sporttype}>
                  {sporttype}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper} elevation={3} sx={{ overflowX: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>

            <TableCell sx={{ fontFamily: "'Kanit', sans-serif" }}>ชื่อ-นามสกุล</TableCell>
            <TableCell sx={{ fontFamily: "'Kanit', sans-serif" }}>วิทยาเขต</TableCell>
            <TableCell sx={{ fontFamily: "'Kanit', sans-serif" }}>แสดงข้อมูล</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.idimport}>
         

              <TableCell sx={{ fontFamily: "'Kanit', sans-serif" }}>{row.fname} {row.lname}</TableCell>
              <TableCell sx={{ fontFamily: "'Kanit', sans-serif" }}>{row.campus}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(row.id)}
                  sx={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  แสดงข้อมูล
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default GoogleSheetData;
