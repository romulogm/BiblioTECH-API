import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import {
  ICreateBook,
  IListBook,
  IUpdateBook,
  IDeleteBook
} from '../../interfaces/book.interface';
//import { IDeleteById, IDetailById } from '../../interfaces/common.interface';

// // Errors
// import { StringError } from '../../errors/string.error';

// Services
import bookService from '../../services/book/book.service';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';
// import Encryption from '../../utilities/encryption.utility';
// import ApiUtility from '../../utilities/api.utility';

// Constants
import constants from '../../constants';

const create: IController = async (req, res) => {
  try {
    const params: ICreateBook = {
      title: req.body.title,
      authors: req.body.authors,
      publishedYear: req.body.publishedYear,
      description: req.body.description,
      edition: req.body.edition,
      isbn: req.body.isbn,
      pageCount: req.body.pageCount,
      categories: req.body.categories,
      read: req.body.read,
      collection: req.body.collection,
    }
    const book = await bookService.create(params);
    return ApiResponse.result(res, book, httpStatusCodes.CREATED);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const list: IController = async (req, res) => {
  try {
    const params: IListBook = {
      userId: req.body.userId,
    }
    const list = await bookService.list(params);
    return ApiResponse.result(res, list, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateBook = {
      id: req.body.id,
      title: req.body.title,
      authors: req.body.authors,
      publishedYear: req.body.publishedYear,
      description: req.body.description,
      edition: req.body.edition,
      isbn: req.body.isbn,
      pageCount: req.body.pageCount,
      categories: req.body.categories,
      read: req.body.read,
      collection: req.body.collection,
    }
    await bookService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};


const remove: IController = async (req, res) => {
  try {
    const params: IDeleteBook = {
      id: req.body.id,
    }
    await bookService.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};


export default {
  create,
  list,
  update,
  remove
};
