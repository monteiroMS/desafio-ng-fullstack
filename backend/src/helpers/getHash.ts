import * as bcrypt from 'bcrypt';

export default (password: string) => bcrypt.hashSync(password, 6);
