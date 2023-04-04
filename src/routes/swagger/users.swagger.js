/**
 * @swagger
 *    /users:
 *       get:
 *          tags: [Users(Admin-Panel)]
 *          summary: get all users
 *          parameters:
 *             -  in: query
 *                name: search
 *                type: string
 *          responses:
 *             200:
 *                description: success
 *             401:
 *                description: unauthorized
 *             500:
 *                description: internal server error
 */

/**
 * @swagger
 *    /users/{id}:
 *       get:
 *          tags: [Users(Admin-Panel)]
 *          summary: get a user by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: success
 *             401:
 *                description: unauthorized
 *             500:
 *                description: internal server error
 */

/**
 * @swagger
 *    /users/{id}:
 *       delete:
 *          tags: [Users(Admin-Panel)]
 *          summary: remove a user by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: success
 *             401:
 *                description: unauthorized
 *             500:
 *                description: internal server error
 */
