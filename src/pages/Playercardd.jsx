import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";
import iconimage from "../assets/icon.jpg";
import d from "../assets/d.png";
import logo from "../assets/logo.png";
import qrcode from "../assets/qrcode.png";

const Playercardd = () => {
  const { rowIndex } = useParams();
  const [studentData, setStudentData] = useState({
    type: "",
    fname: "",
    lname: "",
    campus: "",
    imgurl: "",
    sporttype: ""
  });

  const fetchStudentData = async () => {
    try {
      const res = await fetch(
        `https://api.sheetbest.com/sheets/f8b45086-c0c3-4777-9bb1-bba73f0e267a/${rowIndex}`
      );
      const data = await res.json();
      setStudentData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [rowIndex]);

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 2, fontFamily: "'Kanit', sans-serif" }}>
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
            style={{fontSize:"14px" ,color: "red" }}
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

        {/* Two Images Side by Side */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center the images horizontally
            gap: 1,
            mb: 1.5,
          }}
        >
          {studentData.imgurl && (
            <CardMedia
              component="img"
              height="160"
              image={studentData.imgurl}
              alt={`${studentData.fname} ${studentData.lname}`}
              sx={{ width: "48%" }}
              style={{ border: "3px solid red" }}
            />
          )}
          <CardMedia
            component="img"
            height="165"
            image={d}
            alt="Second Image"
            sx={{ width: "48%" }}
          />
        </Box>

        {/* Student Info */}
        <Typography
  variant="body2"
  sx={{
    fontSize: "12px",
    fontFamily: "'Kanit', sans-serif",
  }}
>
  <span style={{ color: "red" }}>ชื่อสกุล : </span>
  {studentData.fname} {studentData.lname}
</Typography>
        <Typography
          variant="body2"

          sx={{
            fontSize: "12px",
            fontFamily: "'Kanit', sans-serif",
          }}
        > 
          <span style={{ color: "red" }}> ตำแหน่ง: </span>
          {studentData.sporttype}
        </Typography>
        <Typography
          variant="body2"
     
          sx={{
            fontSize: "12px",
            fontFamily: "'Kanit', sans-serif",
          }}
        >
                      <span style={{ color: "red" }}>     หน่วยงาน/สังกัด : </span>
       {studentData.campus}
        </Typography>

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
            style={{ color: "red" , fontSize:"13px"}}
          >
 
              ระหว่างวันที่1-6ธันวาคม 2567 <br />
              ณ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนาน่าน
         
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

export default Playercardd;
