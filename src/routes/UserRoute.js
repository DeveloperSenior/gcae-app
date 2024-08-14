/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const express = require('express')
const controller = require('../controllers/UserController');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   UserModel:
 *     type: object
 *     required:
 *       - userName
 *       - bio
 *       - avatar
 *       - email
 *       - password
 *     properties:
 *       userName:
 *         type: string
 *       bio:
 *         type: string
 *       avatar:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 *   AuthModel:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       tokenId:
 *         type: string
 *
 *   LoginModel:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string  
 */

/**
 * @swagger
 * /auth/signin:
 *   put:
 *     security:
 *      - Authorization: []
 *     description: create user
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/UserModel'
 *     responses:
 *       '201':
 *         description: user created
 *         content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/AuthModel'
 *            type: object
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
router.put('/auth/signin', controller.signin);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     security:
 *      - Authorization: []
 *     description: login user
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginModel'
 *     responses:
 *       '200':
 *         description: user created
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/AuthModel'
 *           type: object
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
 *           schema:
 *            items:
 *              $ref: '#/components/schemas/ResponseMessageModel'
 *            type: array
 *       '500':
 *         description: internal server error
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/DefaultException'
 *           type: object
 */
router.post('/auth/login', controller.login);

module.exports = router
