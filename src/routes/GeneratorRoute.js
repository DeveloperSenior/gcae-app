/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const express = require('express');
const verifyTokenSession = require('../middleware/AuthMiddleware');
const controller = require('../controllers/GeneratorController');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   AppModel:
 *     type: object
 *     required:
 *       - appName
 *       - appDescription
 *       - repository
 *       - auth
 *       - cache
 *       - dataBase
 *       - entities
 *     properties:
 *       appName:
 *         type: string
 *       appPort:
 *         type: number
 *         default: 3000
 *       appApiPath:
 *         type: string
 *       appDescription:
 *         type: string
 *       author:
 *         type: string
 *       company:
 *         type: string
 *       version:
 *         type: string
 *       repository:
 *         type: object
 *         properties:
 *           type:
 *             type: string
 *           url:
 *             type: string
 *       auth:
 *         type: object
 *         properties:
 *           jwtSecretKey:
 *             type: string
 *             default: base64 encrypt
 *       cache:
 *         type: object
 *         properties:
 *           ttl:
 *             type: number
 *             default: 86400
 *       dataBase:
 *         type: object
 *         properties:
 *           type:
 *             enum: 
 *               - MONGO
 *               - POSTGRES
 *             default: MONGO | POSTGRES
 *           serviceName:
 *             type: string
 *           user:
 *             type: string
 *           pass:
 *             type: string
 *             default: base64 encrypt
 *           host:
 *             type: string
 *           port:
 *             type: number
 *             default: null
 *           protocol:
 *             type: string
 *         required:
 *           - type
 *       entities:
 *         type: array
 *         items: 
 *           type: object
 *           properties:
 *             name:
 *              type: string
 *             description:
 *              type: string
 *             fields:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                   name:
 *                     type: string
 *                   type:
 *                     enum: 
 *                       - String
 *                       - Object
 *                       - Array
 *                       - Number
 *                       - Date
 *                       - Relationship
 *                     default: String | Object | Array | Number | Date | Relationship
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                        enum: 
 *                         - String
 *                         - Object
 *                         - Array
 *                         - Number
 *                         - Date
 *                         - Relationship
 *                        default: String | Object | Array | Number | Date | Relationship
 *                       ref:
 *                         type: string
 *                   pk:
 *                     type: boolean
 *                     default: false
 *                   required:
 *                     type: boolean
 *                     default: false
 *                   precision:
 *                     type: number
 *                     default: 3                
 *                required:
 *                  - name
 *                  - type  
 *                  - precision  
 *           required:
 *              - name
 *              - description
 *              - fields
 */
/**
 * @swagger
 * /api/v1/generateApp:
 *   put:
 *     security:
 *      - Authorization: []
 *     description: Generate new App
 *     tags:
 *       - Generate App
 *     produces:
 *       - application/octet-stream
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/AppModel'
 *     responses:
 *       '201':
 *         description: App created and Download Zip file project
 *         content:
 *          application/octet-stream:
 *            schema:
 *              type: string
 *              format: binary
 *       '401':
 *         description: Unauthorized
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/DefaultException'
 *           type: object 
 *       '400':
 *         description: bad request error body
 *         content:
 *          application/json: 
 *            schema:
 *             items:
 *              $ref: '#/components/schemas/ResponseMessageModel'
 *             type: array
 *       '500':
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/DefaultException'
 *             type: object
 */
router.put('/generateApp', verifyTokenSession,controller.main);

/**
 * @swagger
 * /api/v1/getApp/{appName}:
 *   get:
 *     security:
 *      - Authorization: []
 *     description: Get the existing application
 *     tags:
 *       - Generate App
 *     produces:
 *       - application/octet-stream
 *     parameters:
 *       - in: path
 *         name: appName
 *         type: string
 *         required: true
 *         description: App name to get.
 *     responses:
 *       '201':
 *         description: get application existing and Download Zip file project
 *         content:
 *          application/octet-stream:
 *            schema:
 *              type: string
 *              format: binary
 *       '401':
 *         description: Unauthorized
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/DefaultException'
 *           type: object 
 *       '400':
 *         description: bad request error body
 *         content:
 *          application/json: 
 *            schema:
 *             items:
 *              $ref: '#/components/schemas/ResponseMessageModel'
 *             type: array
 *       '500':
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/DefaultException'
 *             type: object
 */
router.get('/getApp/:appName', verifyTokenSession,controller.getApp);


module.exports = router;