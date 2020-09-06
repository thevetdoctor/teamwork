import jwt from 'jsonwebtoken';
import response from '../helpers/response';
import 'dotenv/config';


const checkAuth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    req.token = token;

    jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
      // console.log(err);
      if (err) return response.values(res, 403, 'Error with credentials');
      req.token = decoded.tokenDetails;
      next();
    });
  } else {
    return response.values(res, 403, 'Not authorised');
  }
};


export default checkAuth;
