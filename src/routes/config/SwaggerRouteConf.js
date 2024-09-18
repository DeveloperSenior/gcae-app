/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */
'use strict';

const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   DefaultException:
 *     type: object
 *     required:
 *       - code
 *       - type
 *       - message
 *       - exception
 *     properties:
 *       code:
 *         type: string
 *       type:
 *         type: string
 *       message:
 *         type: string
 *       exception:
 *         type: string
 *   ResponseMessageModel:
 *     type: object
 *     required:
 *       - message
 *     properties:
 *       message:
 *         type: string
 *            
 */

const options = {
  failOnErrors: true,
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'REST - Swagger',
      version: `${process.env.VERSION || '1.0.0'} - ${process.env.ENV}`,
      description: 'GCAE REST API with Swagger doc: <br><br> [Download JSON from sample application](https://github.com/DeveloperSenior/gcae-app/blob/main/GCAE.spec.json)',
      contact: {
        email: 'aescoba7@correo.tdea.edu.co',
      },
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          description: 'Enter the token without the `Bearer: ` prefix, e.g. "abcde12345".'
        }
      }
    },
    security: {
      Authorization: []
    },
    tags: [
      {
        name: 'GCAE API',
        description: 'software that automates the process of generating base code with standard architectures within the framework of SOLID principles focused on the Back-end.',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/routes/config/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = router