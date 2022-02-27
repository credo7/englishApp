export const authorized = () => {
  return {
    type: "TRUE",
  };
};

export const unauthorized = () => {
    return {
        type: 'FALSE'
    }
}
