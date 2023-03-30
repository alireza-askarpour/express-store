/**
 * @swagger
 *    components:
 *       schemas:
 *          Signup:
 *             type: object
 *             required:
 *                -  fullname
 *                -  email
 *                -  password
 *             properties:
 *                fullname:
 *                   type: string
 *                   description: the fullname for signup
 *                email:
 *                   type: string
 *                   description: the email for signup
 *                password:
 *                   type: string
 *                   description: the password for signup
 *          Login:
 *             type: object
 *             required:
 *                -  email
 *                -  password
 *             properties:
 *                email:
 *                   type: string
 *                   description: the email for login
 *                password:
 *                   type: string
 *                   description: the password for login
 */

/**
 * @swagger
 *    /accounts/signup:
 *       post:
 *          tags: [User-Authentication]
 *          summary: signup user with fullname, email and password
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/Signup'
 *          responses:
 *             201:
 *                description: success
 *             400:
 *                description: bad request
 *             500:
 *                description: internal server error
 */

/**
 * @swagger
 *    /accounts/login:
 *       post:
 *          tags: [User-Authentication]
 *          summary: login user with email and password
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/Login'
 *          responses:
 *             201:
 *                description: success
 *             400:
 *                description: bad request
 *             500:
 *                description: internal server error
 */
