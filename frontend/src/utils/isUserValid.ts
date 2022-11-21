import IUserInfo from '../interfaces/IUserInfo';

const MIN_PASSWORD_LENGTH = 8;
const MIN_USERNAME_LENGTH = 3;

export default ({ username, password }: IUserInfo) => {
  const isUsernameValid = username.length >= MIN_USERNAME_LENGTH;
  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  return isUsernameValid && isPasswordValid;
};
