import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the row index from the URL
import Papa from "papaparse";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";
import iconimage from "../assets/icon.jpg";
import b from "../assets/b.png";
import logo from "../assets/logo.png";
import qrcode from "../assets/qrcode.png";

const Playercardb = () => {
  const { rowIndex } = useParams(); // Get the row index from the URL
  const [rowData, setRowData] = useState(null);

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
            const data = result.data;
            setRowData(data[rowIndex]); // Fetch the row data based on the index
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    fetchCSVData();
  }, [rowIndex]);

  // Show loading state while data is being fetched
  if (!rowData) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 2,
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <CardContent>
        {/* Navbar-like top section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
            flexDirection: "row",
          }}
        >
          <CardMedia
            component="img"
            height="60"
            image={logo}
            alt="Logo"
            sx={{ objectFit: "contain", width: "auto" }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: "10px",
              textAlign: "center",
              mx: 1,
              fontFamily: "'Kanit', sans-serif",
            }}
            style={{ fontSize: "14px", color: "red" }}
          >
            การแข่งขัน <br /> กีฬามหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา <br />
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "10px",
              textAlign: "center",
              mx: 1,
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            <h3
              style={{
                color: "red", // Inner color
                fontFamily: "'Kanit', sans-serif",
                marginTop: "0", // Decreases the top margin
                fontSize: "13px", // Decrease font size
              }}
            >
              ครั้งที่
            </h3>
            <h1
              style={{
                color: "red", // Inner color
                fontFamily: "'Kanit', sans-serif",
                textShadow:
                  "2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white", // White shadow all around the text
                display: "inline-block", // Makes the shadow wrap tightly around the text
                marginTop: "-30px", // Decreases the top margin
                fontSize: "30px", // Decrease font size
              }}
            >
              39
            </h1>
          </Typography>
        </Box>

        {/* Title Section */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            textAlign: "center",
            mx: 2,
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          <h1
            style={{
              color: "red", // Inner color
              fontFamily: "'Kanit', sans-serif",
              textShadow:
                "2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white", // White shadow all around the text
              display: "inline-block", // Makes the shadow wrap tightly around the text
              marginTop: "-40px", // Decreases the top margin
              fontSize: "24px", // Adjusted font size
            }}
          >
            "พุทธรักษาเกมส์"
          </h1>
        </Typography>

        {/* Student Info */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          <span style={{ color: "red" }}>ชื่อสกุล : </span>
          {rowData.fname} {rowData.lname}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          <span style={{ color: "red" }}> ตำแหน่ง: </span>
          {rowData.sporttype}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          <span style={{ color: "red" }}> หน่วยงาน/สังกัด : </span>
          {rowData.campus}
        </Typography>

        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center the images horizontally
            gap: 1,
            mb: 1.5,
          }}
        >
          <CardMedia
            component="img"
            height="160"
            image={rowData.imgurl} // Assuming rowData contains the image URL
            alt={`${rowData.fname} ${rowData.lname}`}
            sx={{ width: "48%" }}
            style={{ border: "3px solid red" }}
          />
          <CardMedia
            component="img"
            height="165"
            image={b}
            alt="Second Image"
            sx={{ width: "48%" }}
          />
        </Box>

        {/* Footer Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
            mt: 1.5,
            flexDirection: "row",
          }}
        >
          <CardMedia
            component="img"
            height="50"
            image={qrcode}
            alt="Logo"
            sx={{ objectFit: "contain", width: "auto" }}
          />
          <Typography
            sx={{
              fontSize: "12px",
              mx: 1,
              fontFamily: "'Kanit', sans-serif",
            }}
            style={{ color: "red", fontSize: "13px" }}
          >
            ระหว่างวันที่1-6ธันวาคม 2567 <br />ณ
            มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนาน่าน
          </Typography>
          <CardMedia
            component="img"
            height="50"
            image={iconimage}
            alt="Logo"
            sx={{ objectFit: "contain", width: "auto" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Playercardb;
