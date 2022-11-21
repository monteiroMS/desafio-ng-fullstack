import IFrontEndUser from './IFrontEndUser';

export default interface ICRUDService<T> {
  create(obj: T): Promise<IFrontEndUser>,
  getAll(): Promise<T[]>,
  getOneById(id: number): Promise<T | null>,
  update(id: number, obj: T): Promise<number>,
  delete(id: number): Promise<number>,
}
