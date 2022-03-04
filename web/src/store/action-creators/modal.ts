export const modalActivate = (text: string) => {
  return {
    type: "MODAL_ACTIVATE",
    payload: text,
  };
};

export const modalDeactivate = () => {
  return {
    type: "MODAL_DEACTIVATE",
    payload: "",
  };
};
