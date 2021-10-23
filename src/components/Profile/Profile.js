import { connect } from "react-redux";
import { Paper } from "@mui/material";

const Profile = (props) => {
  let { user } = props.user;

  const studentData = [
    {
      label: "Name",
      value: user.firstName + " " + user.lastName,
    },
    {
      label: "Roll No",
      value: user.rollNo,
    },
    {
      label: "Phone No.",
      value: user.phone,
    },
    {
      label: "E-Mail",
      value: user.email,
    },
    {
      label: "Year",
      value: user.year,
    },
    {
      label: "Programme",
      value: user.programme,
    },
    {
      label: "Department",
      value: user.department,
    },
    {
      label: "Hostel",
      value: user.hostel,
    },
    {
      label: "Room No.",
      value: user.roomNo,
    },
  ];

  return (
    <div
      style={{
        justifyContent: "center",
        verticalAlign: "middle",
        display: "flex",
        padding: "30px 0",
      }}
    >
      <Paper style={{ width: "400px", padding: "30px", borderRadius: "5%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src="https://www.oseyo.co.uk/wp-content/uploads/2020/05/empty-profile-picture-png-2-2.png"
            width="100px"
            alt="Profile pic"
          />
        </div>
        {studentData.map((val, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", margin: "18px 0", fontSize: "1.2rem" }}
            >
              <div style={{ width: "100%", fontWeight: "600" }}>
                {val.label}
              </div>
              <div style={{ width: "100%", textAlign: "center" }}>
                {val.value}
              </div>
            </div>
          );
        })}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
