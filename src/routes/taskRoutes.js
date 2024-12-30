const express = require("express");
const { body } = require("express-validator");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea
 *                 example: "Nueva tarea"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *                 example: "Descripción de la nueva tarea"
 *               completed:
 *                 type: boolean
 *                 description: Estado de la tarea
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/",
  [body("title").notEmpty().withMessage("El título es obligatorio")],
  createTask
);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *           enum: [true, false]
 *           description: Filtrar tareas por estado de completado
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error en el servidor
 */
router.get("/", getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea
 *                 example: "Tarea actualizada"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *                 example: "Descripción de la tarea actualizada"
 *               completed:
 *                 type: boolean
 *                 description: Estado de la tarea
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", deleteTask);

module.exports = router;
