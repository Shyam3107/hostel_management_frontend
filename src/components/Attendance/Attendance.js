import { useEffect } from "react";
import { connect } from "react-redux";

import {
  getAttendance,
  addAttendance,
} from "../../containers/Attendance/action";
import BackDropLoader from "../CustomComponents/BackDropLoader/BackDropLoader";
import uploadFileForm from "../../utils/uploadFileForm";
import CustomTable, {
  createHeadCells,
} from "../CustomComponents/CustomTable/CustomTable";
import { formatDate } from "../../utils/constants";

const Attendance = (props) => {
  let { getAttendance } = props;
  let { userType } = props.user.user;

  useEffect(() => {
    getAttendance();
  }, [getAttendance]);

  let { loading, attendance, addLoading } = props.attendance;

  const handleFileSubmit = (file) => {
    props.addAttendance(uploadFileForm(file), getAttendance);
  };

  let header = ["Roll No", "Name", "Time"];

  header = createHeadCells(header);

  if (!attendance) attendance = [];

  attendance = attendance.map((val) => ({
    ...val,
    Time: formatDate(val.Time),
  }));

  return (
    <div>
      {addLoading && <BackDropLoader />}
      <div style={{ margin: "20px" }}>
        <CustomTable
          onFileUpload={userType !== "STUDENT" && handleFileSubmit}
          rows={attendance}
          headCells={header}
          heading="Attendance"
          loading={loading}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    attendance: state.attendance,
    user: state.user,
  };
};

export default connect(mapStateToProps, { getAttendance, addAttendance })(
  Attendance
);
