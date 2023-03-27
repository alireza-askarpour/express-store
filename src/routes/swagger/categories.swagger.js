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
 *          EditCategory:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                   description: the name of category
 *                value:
 *                   type: string
 *                   description: the value of category
 *          AddSubcategory:
 *             type: object
 *             required:
 *                -  name
 *                -  value
 *                -  disabled
 *             properties:
 *                name:
 *                   type: string
 *                   description: the name of subcategory
 *                value:
 *                   type: string
 *                   description: the value of subcategory
 *                disabled:
 *                   type: boolean
 *                   description: the disabled of subcategory
 *          EditSubcategory:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                   description: the name of subcategory
 *                value:
 *                   type: string
 *                   description: the value of subcategory
 *                disabled:
 *                   type: boolean
 *                   description: the disabled of subcategory
 */

/**
 * @swagger
 *    /categories/list:
 *       get:
 *          tags: [Categories(Admin-Panel)]
 *          summary: get categories list
 *          responses:
 *             201:
 *                description: Success
 *             400:
 *                description: Bad request
 *             500:
 *                description: Internal server error
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

/**
 * @swagger
 *    /categories/update/{id}:
 *       patch:
 *          tags: [Categories(Admin-Panel)]
 *          summary: update a category by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/EditCategory'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/EditCategory'
 *          responses:
 *             201:
 *                description: Created category successfully
 *             400:
 *                description: Bad request
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /categories/remove/{id}:
 *       delete:
 *          tags: [Categories(Admin-Panel)]
 *          summary: remove category by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *             200:
 *                description: Success
 *             400:
 *                description: Bad request
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /categories/subcategories/create/{categoryId}:
 *       patch:
 *          tags: [Categories(Admin-Panel)]
 *          summary: create a subcategory by categoryID
 *          parameters:
 *             -  in: path
 *                name: categoryId
 *                type: string
 *                required: true
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/AddSubcategory'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/AddSubcategory'
 *          responses:
 *             201:
 *                description: Created subcategory successfully
 *             400:
 *                description: Bad request
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /categories/subcategories/update/{id}:
 *       patch:
 *          tags: [Categories(Admin-Panel)]
 *          summary: update a subcategory by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/EditSubcategory'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/EditSubcategory'
 *          responses:
 *             201:
 *                description: Update subsubcategory successfully
 *             400:
 *                description: Bad request
 *             500:
 *                description: Internal server error
 */
