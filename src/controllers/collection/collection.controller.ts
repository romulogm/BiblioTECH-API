import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import {
  ICreateCollection,
  IUpdateCollection,
  IListCollection,
  IDeleteCollection
} from '../../interfaces/collection.interface';
//import { IDeleteById, IDetailById } from '../../interfaces/common.interface';

// // Errors
// import { StringError } from '../../errors/string.error';

// Services
import collectionService from '../../services/collection/collection.service';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';
// import Encryption from '../../utilities/encryption.utility';
// import ApiUtility from '../../utilities/api.utility';

// Constants
import constants from '../../constants';

const create: IController = async (req, res) => {
  // FIX: O usuário deve ser capaz de alterar apenas o seu userId
  try {
    const params: ICreateCollection = {
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
    }
    const user = await collectionService.create(params);
    return ApiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Email already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};


const update: IController = async (req, res) => {
  try {
    const params: IUpdateCollection = {
      title: req.body.title,
      description: req.body.description,
      id: req.body.id,
    }
    await collectionService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const params: IListCollection = {
      userId: req.body.userId,
    }
    const list = await collectionService.list(params);
    return ApiResponse.result(res, list, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  try {
    const params: IDeleteCollection = {
      id: req.body.id,
    }
    await collectionService.remove(params);
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
