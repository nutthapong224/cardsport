import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom"; // For page navigation
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
  Avatar,
} from "@mui/material";

const GoogleSheetData = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Use navigate for redirecting

  useEffect(() => {
    const fetchCSVData = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTA6TGRXnKyGRoBeF52lUpgIKj3851eY4oK9izypZdYW6HEa51keal9_aAO8owBmyAZCUO3gz6m6p6-/pub?output=csv";

      try {
        const response = await fetch(url);
        const csvText = await response.text();

        // Parse CSV data using PapaParse
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            setData(result.data); // Store the parsed data
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    fetchCSVData();
  }, []);

  // Function to handle the button click for a specific row
  const handleViewDetails = (rowIndex) => {
    // Navigate to the details page with the row index in the URL
    navigate(`/playercardb/${rowIndex}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sports Registration Data
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Campus</TableCell>
              <TableCell>Sport Type</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.fname}</TableCell>
                <TableCell>{row.lname}</TableCell>
                <TableCell>{row.campus}</TableCell>
                <TableCell>{row.sporttype}</TableCell>
                <TableCell>
                  <Avatar
                    alt={`${row.fname} ${row.lname}`}
                    src={row.imgurl}
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>
                  {/* Button to view details for this row */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(index)}
                  >
                    View Details
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
