export const onlyNumbers = (value: string): string => {
  return value ? value.replace(/\D/g, '') : '';
};
