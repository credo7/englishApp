import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { RootState } from "../../store/reducers";

function Popup() {
  const isModal = useSelector((state: RootState) => state.modal.isActive);
  if (isModal) {
    return ReactDOM.createPortal(<Modal />, document.getElementById("portal")!);
  } else return null;
}

export default Popup;
