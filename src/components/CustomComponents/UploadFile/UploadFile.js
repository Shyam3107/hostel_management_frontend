import { useState, useRef } from "react";
import {
  Paper,
  Typography,
  Button,
  MenuItem,
  Popper,
  Box,
} from "@mui/material";

export default function UploadFile({ onFileUpload }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleUpload = () => {
    onFileUpload(file);
    setFile(null);
    setFileName(null);
    inputRef.current.value = null;
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button onClick={handleClick}>
        <img
          src="https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
          style={{ width: "30px" }}
          alt="upload"
        />
      </Button>
      <Popper open={open} anchorEl={anchorEl}>
        <Paper style={{ padding: "10px" }}>
          <input
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            ref={inputRef}
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileName(e.target.files[0] ? e.target.files[0].name : "");
            }}
          />
          <label htmlFor="contained-button-file">
            <MenuItem>
              <Typography style={{ fontWeight: 500, fontSize: "14px" }}>
                {fileName ? fileName : "Select a CSV File"}
              </Typography>
            </MenuItem>
          </label>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <Button
              style={{ fontSize: "13px", padding: "7px 10px" }}
              variant="contained"
              onClick={handleUpload}
              disabled={file ? false : true}
            >
              Upload
            </Button>
          </Box>
        </Paper>
      </Popper>
    </div>
  );
}
