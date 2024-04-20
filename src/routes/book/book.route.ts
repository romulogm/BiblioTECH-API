import express from 'express';
//const schemaValidator = require('express-joi-validator');

// Controller
import bookController from '../../controllers/book/book.controller';

// // Schema
// import userSchema from '../../validations/schemas/user.schema';

// // Middleware
// import { isAdmin } from '../../middlewares/permission-handler.middleware';

const router = express.Router();

router.post(
  '/',
  //schemaValidator(userSchema.login),
  bookController.create,
);

router.put(
  '/',
  //schemaValidator(userSchema.login),
  bookController.update,
);

router.delete(
  '/',
  //schemaValidator(userSchema.login),
  bookController.remove,
);

router.get(
  '/',
  //schemaValidator(userSchema.login),
  bookController.list,
);

export default router;
