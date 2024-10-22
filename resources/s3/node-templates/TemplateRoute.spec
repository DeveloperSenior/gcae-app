/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const express = require('express');
const controller = require('../controllers/@EntityName@Controller');
const router = express.Router();
const verifyTokenSession = require('../middleware/AuthMiddleware');

/**
 * @swagger
 * components:
 *  schemas:
 *   @EntityName@PagerModel:
 *     type: object
 *     properties:
 *       actualPage:
 *         type: integer
 *       totalPage: 
 *         type: integer
 *       prevPage:
 *         type: integer
 *       nextPage:
 *         type: integer
 *       data:
 *         type: array
 *         items:
 *           type: object
 *           $ref: '#/components/schemas/@EntityName@Model'
 * 
 *   @EntityName@Model:
 *     type: object
 *     required:
@swaggerRequireds@
 *     properties:
@swaggerProperties@
 */

/**
 * @swagger
 * @appApiPath@/create@EntityName@:
 *   put:
 *     security:
 *      - Authorization: []
 *     description: Create a @EntityName@
 *     tags:
 *       - @EntityName@
 *     produces:
 *       - application/json
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/@EntityName@Model'
 *     responses:
 *       '201':
 *         description: @EntityName@ created
 *         content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/@EntityName@Model'
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
router.put('/create@EntityName@',verifyTokenSession, controller.create@EntityName@);

/**
 * @swagger
 * @appApiPath@/get@EntityName@/{_id}:
 *   get:
 *     security:
 *      - Authorization: []
 *     description: Retrieve @EntityName@ filter by _id param
 *     tags:
 *       - @EntityName@
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: _id
 *         type: string
 *         required: false
 *         description: _id to find @EntityName@.
 *     responses:
 *       '200':
 *         description: @EntityName@ found
 *         content:
 *          application/json:
 *            schema:
 *             items:
 *              $ref: '#/components/schemas/@EntityName@Model'
 *             type: array
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
router.get('/get@EntityName@/:_id',verifyTokenSession, controller.get@EntityName@);

/**
 * @swagger
 * @appApiPath@/getAll@EntityName@:
 *   get:
 *     security:
 *      - Authorization: []
 *     description: Retrieve all @EntityName@
 *     tags:
 *       - @EntityName@
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Retrieve all @EntityName@
 *         content:
 *          application/json:
 *            schema:
 *             items:
 *              $ref: '#/components/schemas/@EntityName@Model'
 *             type: array
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
router.get('/getAll@EntityName@',verifyTokenSession, controller.getAll@EntityName@);

/**
 * @swagger
 * @appApiPath@/get@EntityName@/{pageSize}/{pageNumber}:
 *   post:
 *     security:
 *      - Authorization: []
 *     description: Retrieve all @EntityName@ pagination
 *     tags:
 *       - @EntityName@
 *     parameters:
 *       - in: path
 *         name: pageSize
 *         type: integer
 *         required: true
 *         description: Numeric page size of the @EntityName@ to get.
 *       - in: path
 *         name: pageNumber
 *         type: integer
 *         required: true
 *         description: Numeric page number of the @EntityName@ to get.
 *     requestBody:
 *         required: false
 *         content:
 *             application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/@EntityName@Model'
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Retrieve @EntityName@
 *         content:
 *          application/json:
 *            schema:
 *             items:
 *              $ref: '#/components/schemas/@EntityName@PagerModel'
 *             type: array
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
router.post('/get@EntityName@/:pageSize/:pageNumber', controller.get@EntityName@Pager);

/**
 * @swagger
 * @appApiPath@/@entityName@/{_id}:
 *   patch:
 *     security:
 *      - Authorization: []
 *     description: update @EntityName@ by _id param
 *     tags:
 *       - @EntityName@
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/@EntityName@Model'
 *     parameters:
 *       - in: path
 *         name: _id
 *         type: string
 *         required: true
 *         description: _Id of the @EntityName@ to update.
 *     produces:
 *       - application/json
 *     responses:
 *       '201':
 *         description: @EntityName@ edited
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/@EntityName@Model'
 *            type: object
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
router.patch('/@entityName@/:_id',verifyTokenSession, controller.update@EntityName@);

/**
 * @swagger
 * @appApiPath@/@entityName@/{_id}:
 *   delete:
 *     security:
 *      - Authorization: []
 *     description: Delete @EntityName@ by _id param
 *     tags:
 *       - @EntityName@
 *     parameters:
 *       - in: path
 *         name: _id
 *         type: string
 *         required: true
 *         description: _Id of the @EntityName@ to delete.
 *     produces:
 *       - application/json
 *     responses:
 *       '201':
 *         description: @EntityName@ removed
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
router.delete('/@entityName@/:_id',verifyTokenSession, controller.delete@EntityName@);

module.exports = router;