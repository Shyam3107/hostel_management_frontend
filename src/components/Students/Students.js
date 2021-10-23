import { useEffect } from "react";
import { connect } from "react-redux";

import { getStudents, addStudents } from "../../containers/Students/action";
import BackDropLoader from "../CustomComponents/BackDropLoader/BackDropLoader";
import uploadFileForm from "../../utils/uploadFileForm";
import CustomTable, {
  createHeadCells,
} from "../CustomComponents/CustomTable/CustomTable";

const Student = (props) => {
  let { getStudents } = props;
  useEffect(() => {
    getStudents();
  }, [getStudents]);

  let { loading, students, addLoading } = props.students;

  const handleFileSubmit = (file) => {
    props.addStudents(uploadFileForm(file), getStudents);
  };

  let header = [
    "Roll No",
    "Name",
    "Phone No",
    "E-Mail",
    "Year",
    "Programme",
    "Department",
    "Hostel",
    "Room No",
  ];

  header = createHeadCells(header);

  if (!students) students = [];

  return (
    <div>
      {addLoading && <BackDropLoader />}
      <div style={{ margin: "20px" }}>
        <CustomTable
          onFileUpload={handleFileSubmit}
          rows={students}
          headCells={header}
          heading="Students"
          loading={loading}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

export default connect(mapStateToProps, { getStudents, addStudents })(Student);
