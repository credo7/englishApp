export const authorized = () => {
  return {
    type: "AUTH_TRUE",
  };
};

export const unauthorized = () => {
  return {
    type: "AUTH_FALSE",
  };
};
