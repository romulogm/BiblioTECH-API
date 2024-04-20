// Interfaces
//import { IBaseQueryParams } from './common.interface';
import { Collection } from '../collection/collection.entity';
import { ReadStatus } from '../book/book.entity';


export interface ICreateBook {
  title: string;
  authors?: string[];
  publishedYear?: number;
  description?: string;
  edition?: string;
  isbn?: string;
  pageCount?: number;
  categories?: string[];
  read?: ReadStatus;
  collection?: Collection;
  }

export interface IDeleteBook {
  id: number;
}

export interface IUpdateBook {
  id: number;
  title?: string;
  authors?: string[];
  publishedYear?: number;
  description?: string;
  edition?: string;
  isbn?: string;
  pageCount?: number;
  categories?: string[];
  read?: ReadStatus;
  collection?: Collection;
}

export interface IListBook {  
  userId: number;
}

export interface IDetailBook {
  id: number;
}

export interface ISearchISBN {
  isbn: string;
}

