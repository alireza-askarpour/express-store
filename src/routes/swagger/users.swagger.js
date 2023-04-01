/**
 * @swagger
 *    /users/list:
 *       get:
 *          tags: [Users(Admin-Panel)]
 *          summary: get all users
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
