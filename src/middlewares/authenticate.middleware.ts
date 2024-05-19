import express from 'express';
import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
// Services
import userService from '../services/user/user.service';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
import Encryption from '../utilities/encryption.utility';
import ApiUtility from '../utilities/api.utility';

// Constants
import constants from '../constants';

export default async (
  req: IRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (constants.APPLICATION.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
    const authorizationHeader = ApiUtility.getCookieFromRequest(req, constants.COOKIE.COOKIE_USER);

    if (authorizationHeader) {
      const decoded = await Encryption.verifyCookie(authorizationHeader);
      console.log(decoded)
      if (decoded) {
        const user = await userService.getById({ id: decoded.data[constants.COOKIE.KEY_USER_ID] });

        if (user) {
          // @ts-ignore
          req.user = user;
        } else {
          return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        }
      } else {
        return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      }
    } else {
      return ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
    }
  }

  next();
};

// export default async (
//   req: IRequest,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   if (constants.APPLICATION.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
//     const authorizationHeader = ApiUtility.getCookieFromRequest(req, constants.COOKIE.COOKIE_USER);

//     if (authorizationHeader) {
//       const decoded = await Encryption.verifyCookie(authorizationHeader);

//       if (decoded) {
//         const user = await userService.getById({ id: decoded.data[constants.COOKIE.KEY_USER_ID] });
//         console.log(user)
//         if (user) {
//           // @ts-ignore
//           req.user = user;
//         } else {
//           return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
//         }
//       } else {
//         let token = req.headers.authorization;
//         if (token && token.startsWith('Bearer ')) {
//         token = token.slice(7, token.length);
//           try {
//             let decodedToken = jwt.verify(token, constants.APPLICATION.env.authSecret);
//             decodedToken = JSON.stringify(decodedToken);
//             let decodedObject = JSON.parse(decodedToken);

//             console.log(decodedToken);
//             const user = decodedObject.data.userId;
            
//             if (!user) {
//             return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Usuário não encontrado.' });
//             }
    
//             req.user = user;
//             next();
//           } catch (err) {
//             return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Token inválido ou expirado.' });
//           }

//         } else {
//           return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
//         }
//         const decoded = await Encryption.verifyCookie(authorizationHeader);
//         return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
//       }
//     } else {
//       return ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
//     }
//   }

//   next();
// };
// export default async (
//   req: IRequest,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   if (constants.APPLICATION.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
//     const authorizationHeader = ApiUtility.getCookieFromRequest(req, constants.COOKIE.COOKIE_USER);
//     console.log("01")
//     console.log(authorizationHeader)
//     if (authorizationHeader !== null) {
//       const decoded = await Encryption.verifyCookie(authorizationHeader);
//       console.log("02")
//       if (decoded) {
//         const user = await userService.getById({ id: decoded.data[constants.COOKIE.KEY_USER_ID] });
//         if (user) {
//           // @ts-ignore
//           req.user = user;
//           next(); // Avançar para o próximo middleware
//         } else {
//           console.log("07")
//           return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
//         }
//       } else {
//         console.log("6")
//         return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
//       }
//     } else {
//       let token = req.headers.authorization;
//       if (token && token.startsWith('Bearer ')) {
//         console.log("03")
//         token = token.slice(7); 
//         let decodedToken = jwt.verify(token, constants.APPLICATION.env.authSecret);
//         decodedToken = JSON.stringify(decodedToken);
//         let decodedObject = JSON.parse(decodedToken);
//         const user = decodedObject.data.userId;
//         if (user) {
//           // @ts-ignore
//           req.user = user;
//           next(); // Avançar para o próximo middleware
//         } else {
//           console.log("4")
//           return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
//         }
//       }  else {
//         console.log("5")
//         return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
//       }}
//   } else {
//     next(); // Avançar para o próximo middleware
//   }
// };