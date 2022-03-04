import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalDeactivate } from "../../../store/action-creators/modal";
import { RootState } from "../../../store/reducers";
import Backdrop from "../Backdrop";
import "./index.scss";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stifness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = () => {
  const dispatch = useDispatch();
  const text = useSelector((state: RootState) => state.modal.errorMessage);
  return (
    <Backdrop onClick={() => dispatch(modalDeactivate)}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="modal-text">{text}</div>
        <button
          className="modal-exit"
          onClick={() => dispatch(modalDeactivate())}
        >
          Close
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
