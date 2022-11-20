import axios from 'axios';
import ITransaction from '../../interfaces/ITransaction';
import backendEndpoints from '../backendEndpoints';

export default async (transaction: ITransaction, authorization: string) => {
  try {
    const res = await axios.post(
      backendEndpoints.transaction,
      { ...transaction },
      { headers: { authorization } }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return {
        message: 'Houve um problema com a transação. Por favor, tente novamente',
      };
    }
  }
};