import axios from 'axios';
import IUserInfo from '../interfaces/IUserInfo';
import backendEndpoints from './backendEndpoints';

export default async (userInfo: IUserInfo) => {
  try {
    const res = await axios.post(
      backendEndpoints.login,
      { ...userInfo },
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { message: 'Nome de usuário ou senha inválidos' };
    }
  }
};
