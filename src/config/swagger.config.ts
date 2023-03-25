import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

export const swaggerSetup = swaggerUI.setup(
  swaggerJSDoc({
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'NodejsStore',
        version: '1.0.0',
        description: 'The e-commerce website.',
        contact: {
          name: 'Alireza Askarpour',
          email: 'askarpourdev@gmail.com',
        },
      },
      server: [
        {
          url: process.env.BASE_URL,
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ BearerAuth: [] }],
    },
    apis: ['./src/routes/swagger/*.js'],
  })
)
