import response from '../helpers/response';

const admin = (req, res, next) => {
  if(!req.token) return response.values(res, 403, 'No credentials');
  if (!req.token.isAdmin) return response.values(res, 403, 'No permissions');
  console.log('Permission granted');
  next();
};
 

export default admin;
