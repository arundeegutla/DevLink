// Example Code
export const throwError = () => {
  const error: any = new Error("broken");
  error.status = 401;
  throw error;
};
