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
      title: 'GCAE Technical Documentation',
      version: `${process.env.VERSION || '1.0.0'} - ${process.env.ENV}`,
      description: `<html><p>The technical documentation for the developed <b>GCAE</b> APIs has been created using Swagger, a tool that facilitates the visualization and consumption of RESTful services. This documentation provides a detailed description of the available endpoints, the HTTP methods used <b>(GET, POST, PUT, DELETE)</b>, the required and optional parameters, as well as the expected responses in different formats <b>(JSON, XML, Stream)</b></p> 
        <br><br> [See application demo](https://vimeo.com/1022598928?share=copy)
        <br><br> [Download PDF application user manual](https://github.com/DeveloperSenior/gcae-app/blob/main/MANUAL_USO_GCAE.pdf)
        <br><br> [Download JSON from the sample application for MONGO](https://github.com/DeveloperSenior/gcae-app/blob/main/GCAE_MONGO.spec.json)
        <br><br> [Download JSON from the sample application for POSTGRES](https://github.com/DeveloperSenior/gcae-app/blob/main/GCAE_POSTGRES.spec.json)
        <br><br> To view the JSON more clearly, use the JSON-Viewer tool [here](https://jsonformatter.org/json-viewer#google_vignette)
        <br><br> Remember to open your generated application from any development IDE, we recommend [Visual Studio Code](https://code.visualstudio.com/download)
      </html>`,
      contact: {
        name:'Andres Felipe Escobar Lopez',
        email: 'aescoba7@correo.tdea.edu.co',
        url: 'https://github.com/DeveloperSenior/gcae-app'
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
        name: "GCAE API's",
        description: "Software for the automation of a company's development process, helps in the generation of base code with standard architectures within the framework of SOLID principles focused on the Back-end.",
      },
    ],
  },
  apis: [ './src/routes/config/*.js', './src/routes/*.js',],
};

const swaggerSpec = swaggerJSDoc(options);

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = router