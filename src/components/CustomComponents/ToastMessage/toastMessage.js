import { toast } from "react-toastify";
import { error, success } from "../../../utils/constants";

export default function toastMessage(message, type) {
  console.log("message : ", message);
  console.log("type : ", type);
  toast(message, {
    hideProgressBar: true,
    type: type,
    position: "bottom-center",
    pauseOnHover: false,
  });
//   toast.warn('Wow so easy!', {
//     position: "bottom-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     });
}
