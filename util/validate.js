export const validateConfigLength = config => {
  if (config.length !== 1) {
    return false;
  } else {
    return true;
  }
};
