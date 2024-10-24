import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the row index from the URL
import Papa from "papaparse";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";
import iconimage from "../assets/icon.jpg"; 

import iconimages from "../assets/icons.png";
import b from "../assets/b.png";
import logo from "../assets/logos.png";
import qrcode from "../assets/qrcode.png";
import backgroundimg from "../assets/background3.png";

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
    
        fontFamily: "'Kanit', sans-serif",
        backgroundImage: `url(${backgroundimg})`, // Set the background image here
        backgroundSize: "cover", // Cover the entire card area with the background image
        backgroundPosition: "center", // Center the background image
        color: "black", // Set all text to black by default
      }}
    >
      <CardContent>
        {/* Navbar-like top section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2, 
        
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
              fontSize: "12px",
              textAlign: "center",
              mx: 1,
              fontFamily: "'Kanit', sans-serif",
              color: "black",
            }}
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
              color: "black",
            }}
          >
            <h3
              style={{
                fontFamily: "'Kanit', sans-serif",
           
                fontSize: "13px", // Decrease font size 
              }}
            >
              ครั้งที่
            </h3>
            <h1
              style={{
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
            color: "black",
          }}
        >
          <h1
            style={{
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
            color: "black", 
            mt: 2
          }}
        >
          <span >ชื่อสกุล : </span>
          {rowData.fname} {rowData.lname}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            fontFamily: "'Kanit', sans-serif",
            color: "black",
          }}
        >
          <span > ตำแหน่ง: </span>
          {rowData.sporttype}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            fontFamily: "'Kanit', sans-serif",
            color: "black", 

          }}
        >
          <span > หน่วยงาน/สังกัด : </span>
          {rowData.campus}
        </Typography>

        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center the images horizontally
            gap: 1,
            mb: 1.5, 
            mt:4
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
            mt: 4,
            flexDirection: "row",
          }}
        >
          <CardMedia
            component="img"
            height="80"
            image={iconimages}
            alt="Logo"
            sx={{ objectFit: "contain", width: "auto" }}
          />
          <Typography
            sx={{
              fontSize: "12px",
              mx: 2,
              fontFamily: "'Kanit', sans-serif",
              color: "black", 
              marginLeft:"30px"
            }}
          >
            ระหว่างวันที่ 1 - 6 ธันวาคม 2567 <br />ณ
            มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนาน่าน
          </Typography>
          <CardMedia
            component="img"
            height="80"
            image={qrcode}
            alt="Logo"
            sx={{ objectFit: "contain", width: "auto", }}
          />
        </Box>
      </CardContent>
    </Card> 
    
  );
};

export default Playercardb;
