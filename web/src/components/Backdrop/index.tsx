import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }: any) => {
  return (
    <motion.div className="backdrop" onClick={onClick}>
      {children}
    </motion.div>
  );
};

export default Backdrop;
