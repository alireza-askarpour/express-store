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
 *          RefreshToken:
 *             type: object
 *             required:
 *                -  refreshToken
 *             properties:
 *                refreshToken:
 *                   type: string
 *                   description: enter refresh-token for get refresh token and refresh-token
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

/**
 * @swagger
 *    /accounts/refresh-token:
 *       post:
 *          tags: [User-Authentication]
 *          summary: refresh token route for get new access token and refresh token
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *             200:
 *                description: success
 *             400:
 *                description: bad request
 *             500:
 *                description: internal server error
 */
