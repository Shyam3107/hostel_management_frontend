import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CustomDateTimePicker from "../CustomComponents/CustomDateTimePicker/CustomDateTimePicker";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxWidth: "90vw",
};

const initial = {
  fromDate: moment().add(1, "days").set("hour", 6),
  toDate: moment().add(1, "days").set("hour", 19),
  place: null,
  purpose: null,
};

export default function AddLeaveModal({
  open,
  setOpen,
  handleSubmit,
  callBack,
}) {
  const handleClose = () => setOpen(false);

  const [leaveForm, setLeaveForm] = useState(initial);

  const formFields = [
    {
      name: "From Date",
      id: "fromDate",
      type: "DATE",
      value: leaveForm.fromDate,
    },
    {
      name: "To Date",
      id: "toDate",
      type: "DATE",
      value: leaveForm.toDate,
      minDate: leaveForm.fromDate,
    },
    {
      name: "Place",
      id: "place",
      value: leaveForm.place,
    },
    {
      name: "Purpose",
      id: "purpose",
      value: leaveForm.purpose,
    },
  ];

  const handleFieldChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.id]: e.target.value });
  };

  const cb = () => {
    handleClose();
    setLeaveForm(initial);
    callBack();
  };

  const handleFormSubmit = () => {
    handleSubmit(leaveForm, cb);
  };

  const buttonDisabled = Object.values(leaveForm).every((val) => val);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          style={{ textAlign: "center" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Apply For Leave
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {formFields.map((val) => {
            return (
              <Box key={val.id} marginTop="15px" display="flex">
                <Typography
                  style={{
                    display: "inline-block",
                    width: "100px",
                  }}
                >
                  {val.name}
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                {val.type === "DATE" ? (
                  <CustomDateTimePicker
                    id={val.id}
                    value={val.value}
                    setValue={setLeaveForm}
                    minDate={val.minDate}
                  />
                ) : (
                  <TextField
                    variant="standard"
                    id={val.id}
                    placeholder={val.name}
                    value={val.value}
                    onChange={handleFieldChange}
                  />
                )}
              </Box>
            );
          })}
        </Typography>
        <Box
          style={{
            marginTop: "30px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button
            variant="contained"
            style={{
              padding: "7px 20px",
              borderRadius: "10%",
              backgroundColor: buttonDisabled ? "#48A7C4" : null,
            }}
            onClick={handleFormSubmit}
            disabled={!buttonDisabled}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
