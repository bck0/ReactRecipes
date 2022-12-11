export const uid = () => {
  const random = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return random;
};
