import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { getLeave, addLeave, editLeave } from "../../containers/Leave/action";
import BackDropLoader from "../CustomComponents/BackDropLoader/BackDropLoader";
import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader";
import AddLeaveModal from "./AddLeaveModal";
import { formatDate } from "../../utils/constants";
import CustomDialog from "../CustomComponents/CustomDialog/CustomDialog";

const Leave = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [leaveForm, setLeaveForm] = useState({
    leaveId: null,
    accept: true,
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let { getLeave, user } = props;

  useEffect(() => {
    getLeave();
  }, [getLeave]);

  let { loading, leave, addLoading, editLoading } = props.leave;
  let { userType } = user.user;

  let header = [
    "Roll No",
    "Name",
    "From Date",
    "To Date",
    "Place",
    "Purpose",
    "Remarks",
    "Type",
    "Status",
    "Action",
  ];

  if (!leave) leave = [];

  leave = leave.map((val) => ({
    ...val,
    "From Date": formatDate(val["From Date"]),
    "To Date": formatDate(val["To Date"]),
  }));

  const emptyRows =
    page > 0 ? Math.min(3, (1 + page) * rowsPerPage - leave.length) : 0;

  const handleEditLeave = (leaveId, accept) => {
    setDialogOpen(true);
    setLeaveForm({ leaveId, accept });
  };

  const handleAgree = () => {
    props.editLeave(
      {
        leaveId: leaveForm.leaveId,
        remarks,
        leaveStatus:
          userType === "STUDENT"
            ? "CANCELLED"
            : leaveForm.accept
            ? "APPROVED"
            : "REJECTED",
      },
      () => {
        getLeave();
        setRemarks("");
      }
    );
  };

  return (
    <div>
      {(addLoading || editLoading) && <BackDropLoader />}
      <AddLeaveModal
        open={open}
        setOpen={setOpen}
        handleSubmit={props.addLeave}
        callBack={getLeave}
      />
      <CustomDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        remarks={remarks}
        setRemarks={userType !== "STUDENT" && setRemarks}
        handleAgree={handleAgree}
      />
      <div style={{ margin: "20px" }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              style={{ margin: "10px 0 0 10px" }}
            >
              Leaves
              {userType === "STUDENT" && (
                <span style={{ float: "right", marginRight: "10px" }}>
                  <Button onClick={() => setOpen(true)}>
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/vectory-bonus-3/40/button_add-512.png"
                      style={{ width: "30px" }}
                      alt="upload"
                    />
                  </Button>
                </span>
              )}
            </Typography>

            {!loading && leave.length > 0 && (
              <React.Fragment>
                <TableContainer>
                  <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <TableHead>
                      <TableRow>
                        {header.map((headCell, index) => (
                          <TableCell key={index}>{headCell}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leave
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const disableCancelIcon =
                            row.Status === "REJECTED" ||
                            row.Status === "CANCELLED";
                          return (
                            <TableRow hover key={index}>
                              {header.map((headVal, ind) => {
                                if (headVal === "Action") {
                                  return (
                                    <TableCell key={ind}>
                                      {userType !== "STUDENT" &&
                                        row.Status !== "APPROVED" && (
                                          <CheckCircleIcon
                                            style={{
                                              color: "green",
                                              marginRight: "5px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              setRemarks(row.Remarks);
                                              handleEditLeave(row._id, true);
                                            }}
                                          />
                                        )}
                                      <CancelIcon
                                        style={{
                                          color: disableCancelIcon
                                            ? "grey"
                                            : "red",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          if (!disableCancelIcon) {
                                            setRemarks(row.Remarks);
                                            handleEditLeave(row._id, false);
                                          }
                                        }}
                                      />
                                    </TableCell>
                                  );
                                }
                                return (
                                  <TableCell key={ind}>
                                    {row[headVal]}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows,
                          }}
                        ></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={leave.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(e, p) => setPage(p)}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </React.Fragment>
            )}
            {loading && <CustomLoader />}
            {!loading && leave.length === 0 && (
              <Box
                style={{
                  textAlign: "center",
                  padding: "20px 0",
                  fontWeight: "500",
                }}
              >
                No Leave found
              </Box>
            )}
          </Paper>
        </Box>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leave: state.leave,
    user: state.user,
  };
};

export default connect(mapStateToProps, { getLeave, addLeave, editLeave })(
  Leave
);
