import toastMessage from "../../components/CustomComponents/ToastMessage/toastMessage";
import * as actionTypes from "./actionTypes";
import { success } from "../../utils/constants";

import axios from "axios";
import { API, handleError } from "../../APIs/APIs";

export const getAttendance = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_ATTENDANCE_PENDING,
  });
  axios
    .get(API.GET_ATTENDANCE)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({
          type: actionTypes.GET_ATTENDANCE_SUCCESS,
          payload: data.data,
        });
      }
      return;
    })
    .catch((err) => {
      return handleError(
        dispatch,
        {
          type: actionTypes.GET_ATTENDANCE_FAILURE,
          err: err,
        },
        err
      );
    });
};

export const addAttendance =(dtp, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_ATTENDANCE_PENDING,
    });
    axios
      .post(API.ADD_ATTENDANCE, dtp)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch({
            type: actionTypes.ADD_ATTENDANCE_SUCCESS,
          });
          cb();
          return toastMessage(data.message, success);
        }
      })
      .catch((err) => {
        return handleError(
          dispatch,
          {
            type: actionTypes.ADD_ATTENDANCE_FAILURE,
            err: err,
          },
          err
        );
      });
  };
