import swaggerJSDoc from 'swagger-jsdoc';


const swaggerDefinition = {
 info: {
    title: 'Teamwork REST API', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'Back-End API for Teamwork App', // short description of the app
  },
  host: 'localhost:8000', // the host or url of the app
  basePath: '/api/v1/', // the basepath of your endpoint
};
 
if (process.env.NODE_ENV === 'production') {
  swaggerDefinition.host = 'obateamwork.herokuapp.com';
}
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


export default swaggerSpec;
