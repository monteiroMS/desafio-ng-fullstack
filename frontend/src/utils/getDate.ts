export default (date: string) => new Date(date).toLocaleString(
  'pt-BR',
  { dateStyle: 'short' },
);
