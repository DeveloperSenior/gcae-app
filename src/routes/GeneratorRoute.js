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
 *     properties:
 *       appName:
 *         type: string
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
 *       - application/json
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


module.exports = router;