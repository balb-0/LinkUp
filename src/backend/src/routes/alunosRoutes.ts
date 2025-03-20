import express from 'express';
import AlunoController from '../controllers/AlunoController';

const router = express.Router();

// List all institutions
router.get('/institutions', AlunoController.getInstitutions);

// Get institution details by ID
router.get('/institutions/:id', AlunoController.getInstitutionById);

// List students by institution ID
router.get('/institutions/:id/students', AlunoController.getStudentsByInstitution);

// Get student details by ID
router.get('/students/:id', AlunoController.getStudentById);

// List enrollments by student ID
router.get('/students/:id/enrollments', AlunoController.getEnrollmentsByStudent);

// List all courses
router.get('/courses', AlunoController.getCourses);

// Get course details by ID
router.get('/courses/:id', AlunoController.getCourseById);

// List students by course ID
router.get('/courses/:id/students', AlunoController.getStudentsByCourse);

export default router;
