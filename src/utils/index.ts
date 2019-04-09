export const checkCode = async (code: string): Promise<boolean> => {
  const response = await fetch("/codes.json"); // Yes, normally it shouldn't retrieve all codes if the app had a proper backend..
  const codes = await response.json();
  return !!codes.find((c: string) => c === code);
};