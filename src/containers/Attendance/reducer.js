import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  attendance: null,
  error: null,
  addLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_ATTENDANCE_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_ATTENDANCE_SUCCESS:
      return { ...initialState, attendance: action.payload };
    case actionTypes.GET_ATTENDANCE_FAILURE:
      return { ...initialState, error: action.payload };
    case actionTypes.ADD_ATTENDANCE_PENDING:
      return { ...state, addLoading: true };
    case actionTypes.ADD_ATTENDANCE_SUCCESS:
      return { ...state, addLoading: false };
    case actionTypes.ADD_ATTENDANCE_FAILURE:
      return { ...state, addLoading: false };
    default:
      return state;
  }
}
