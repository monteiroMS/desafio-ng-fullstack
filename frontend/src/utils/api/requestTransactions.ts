import axios from 'axios';
import backendEndpoints from './backendEndpoints';

export default async (username: string, authorization: string) => {
  try {
    const res = await axios.get(
      `${backendEndpoints.getTransactions}${username}`,
      { headers: { authorization } },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      return {
        message: 'Houve um problema com a requisição',
      };
    }
  }
};
