/**
 * @swagger
 *    components:
 *       schemas:
 *          AddCategory:
 *             type: object
 *             required:
 *                -  name
 *                -  value
 *             properties:
 *                name:
 *                   type: string
 *                   description: the name of category
 *                value:
 *                   type: string
 *                   description: the value of category
 */

/**
 * @swagger
 *    /categories/create:
 *       post:
 *          tags: [Categories(Admin-Panel)]
 *          summary: create a category
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/AddCategory'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/AddCategory'
 *          responses:
 *             201:
 *                description: Created category successfully
 *             400:
 *                description: Bad request
 *             500:
 *                description: Internal server error
 */
