import { getRepository } from 'typeorm';

// Entities
import { Book } from '../../entities/book/book.entity';
import { Collection } from '../../entities/collection/collection.entity';

// Utilities
// import Encryption from '../../utilities/encryption.utility';
// import ApiUtility from '../../utilities/api.utility';
// import DateTimeUtility from '../../utilities/date-time.utility';

// Interfaces

import {
  ICreateBook,
  IDeleteBook,
  IListBook,
  IUpdateBook
  // IDeleteBook,
  // IListBook
} from '../../interfaces/book.interface';
//import { IDeleteById, IDetailById } from '../../interfaces/common.interface';

// Errors
//import { StringError } from '../../errors/string.error';

const create = async (params: ICreateBook) => {
  const item = new Book();
  item.title = params.title;
  item.authors = params.authors;
  item.publishedYear = params.publishedYear;
  item.description = params.description;
  item.edition = params.edition;
  item.isbn = params.isbn;
  item.pageCount = params.pageCount;
  item.categories = params.categories;
  item.read = params.read;
  item.collection = params.collection;
  
  const bookData = await getRepository(Book).save(item);
  return bookData;
};

const list = async (params: IListBook) => {
  const collectionRepo = getRepository(Collection).createQueryBuilder('collection');

  collectionRepo.where('collection.userId = :userId', { userId: params.userId });

  const collections = await collectionRepo.getMany();

 
  const collectionIds = collections.map(x => x.id);

  const books = await getRepository(Book)
  .createQueryBuilder('book')
  .innerJoin('book.collection', 'collection')
  .where('collection.id IN (:...collectionIds)', { collectionIds })
  .getMany();

  return books;
};

const update = async (params: IUpdateBook) => {
  const existingBook = await getRepository(Book).findOne(params.id);

  if (!existingBook) {
    throw new Error('Livro não encontrado.');
  }

  existingBook.title = params.title;
  existingBook.authors = params.authors;
  existingBook.publishedYear = params.publishedYear;
  existingBook.description = params.description;
  existingBook.edition = params.edition;
  existingBook.isbn = params.isbn;
  existingBook.pageCount = params.pageCount;
  existingBook.categories = params.categories;
  existingBook.read = params.read;
  existingBook.collection = params.collection;

  const updatedBook = await getRepository(Book).save(existingBook);

  return updatedBook;
};


const remove = async (params: IDeleteBook) => {
  const existingBook = await getRepository(Book).findOne(params.id);

  if (!existingBook) {
    throw new Error('Coleção não encontrada.');
  }

  const deletionResult = await getRepository(Book).delete(params.id);

  return deletionResult;
}

export default {
  create,
  update,
  list,
  remove
}
