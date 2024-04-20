// Interfaces
//import { IBaseQueryParams } from './common.interface';

export interface ICreateCollection {
  title: string;
  description: string;
  userId: number; 
  //books: Book[];
}

export interface IUpdateCollection {
  title: string;
  description: string;
  id: number; 
}

export interface IDeleteCollection {
  id: number; 
}

export interface IListCollection {
  userId: number; 
}