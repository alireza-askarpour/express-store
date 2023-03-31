/**
 * @swagger
 *    components:
 *       schemas:
 *          Color:
 *             type: array
 *             items:
 *                type: string
 *                enum:
 *                   -  black
 *                   -  white
 *                   -  gray
 *                   -  red
 *                   -  blue
 *                   -  green
 *                   -  orange
 *                   -  purple
 *          AddProduct:
 *             type: object
 *             required:
 *                -  title
 *                -  description
 *                -  tags
 *                -  category
 *                -  price
 *                -  discount
 *                -  count
 *                -  images
 *             properties:
 *                title:
 *                   type: string
 *                   description: the title of product
 *                   example: Macbook Air M2
 *                description:
 *                   type: string
 *                   description: the description of product
 *                   example: This is test message for description
 *                tags:
 *                   type: array
 *                   description: the tags of product
 *                colors:
 *                   $ref: '#/components/schemas/Color'
 *                category:
 *                   type: string
 *                   description: the category of product
 *                   example: 642198c3f21d33422acb8507
 *                price:
 *                   type: number
 *                   description: the price of product
 *                   example: 49000
 *                discount:
 *                   type: number
 *                   description: the discount of product
 *                   example: 3
 *                count:
 *                   type: number
 *                   description: the count of product
 *                   example: 18
 *                images:
 *                   type: array
 *                   items:
 *                      type: string
 *                      format: binary
 *                   description: the images of product
 *                width:
 *                   type: number
 *                   description: the width of product
 *                height:
 *                   type: number
 *                   description: the height of product
 *                length:
 *                   type: number
 *                   description: the length of product
 *                weight:
 *                   type: number
 *                   description: the weight of product
 *                model:
 *                   type: string
 *                   description: the model of product
 *                madein:
 *                   type: string
 *                   description: the madein of product
 *          EditProduct:
 *             type: object
 *             properties:
 *                title:
 *                   type: string
 *                   description: the title of product
 *                   example: Macbook Air M2
 *                description:
 *                   type: string
 *                   description: the description of product
 *                   example: This is test message for description
 *                tags:
 *                   type: array
 *                   description: the tags of product
 *                colors:
 *                   $ref: '#/components/schemas/Color'
 *                category:
 *                   type: string
 *                   description: the category of product
 *                   example: 642198c3f21d33422acb8507
 *                price:
 *                   type: number
 *                   description: the price of product
 *                   example: 49000
 *                discount:
 *                   type: number
 *                   description: the discount of product
 *                   example: 3
 *                count:
 *                   type: number
 *                   description: the count of product
 *                   example: 18
 *                images:
 *                   type: array
 *                   items:
 *                      type: string
 *                      format: binary
 *                   description: the images of product
 *                width:
 *                   type: number
 *                   description: the width of product
 *                height:
 *                   type: number
 *                   description: the height of product
 *                length:
 *                   type: number
 *                   description: the length of product
 *                weight:
 *                   type: number
 *                   description: the weight of product
 *                model:
 *                   type: string
 *                   description: the model of product
 *                madein:
 *                   type: string
 *                   description: the madein of product
 */

/**
 * @swagger
 *    /products/list:
 *       get:
 *          tags: [Products(Admin-Panel)]
 *          summary: get all products
 *          parameters:
 *             -  in: query
 *                name: search
 *                type: string
 *          responses:
 *             200:
 *                description: Products list resived successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /products/create:
 *       post:
 *          tags: [Products(Admin-Panel)]
 *          summary: create a product
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/AddProduct'
 *          responses:
 *             201:
 *                description: Product created successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /products/update/{id}:
 *       patch:
 *          tags: [Products(Admin-Panel)]
 *          summary: update product by ID
 *          parameters:
 *             -  in: path
 *                name: id
 *                type: string
 *                required: true
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/EditProduct'
 *          responses:
 *             201:
 *                description: Product created successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 */
