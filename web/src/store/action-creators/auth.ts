export const authorized = () => {
  return {
    type: "AUTH_TRUE",
    payload:''
  };
};

export const unauthorized = () => {
  return {
    type: "AUTH_FALSE",
    payload:''
  };
};
