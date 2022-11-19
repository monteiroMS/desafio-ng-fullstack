const TOKEN_KEY = 'user_token';

export const getUserFromLS = () => {
  const user = localStorage.getItem(TOKEN_KEY);
  if (!user) return null;
  return JSON.parse(user);
};

export const createLocalStorage = () => {
  const user = localStorage.getItem(TOKEN_KEY);
  if (!user) {
    localStorage.setItem(TOKEN_KEY, '');
  }
};

createLocalStorage();

export const saveTokenOnLS = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
