export default (strDate: string) => {
  const date = new Date(strDate);
  return date.toLocaleString(
    'pt-BR',
    { dateStyle: 'short' },
  );
};