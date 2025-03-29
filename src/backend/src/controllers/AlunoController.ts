import { Request, Response } from 'express';
import AlunoService from '../services/AlunoService';

class AlunoController {
    // List all institutions
    async getInstitutions(req: Request, res: Response) {
        try {
            const institutions = await AlunoService.getInstitutions();
            res.json(institutions);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // Get institution details
    async getInstitutionById(req: Request, res: Response) {
        try {
            const institution = await AlunoService.getInstitutionById(req.params.id);
            res.json(institution);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // List students by institution
    async getStudentsByInstitution(req: Request, res: Response) {
        try {
            const students = await AlunoService.getStudentsByInstitution(req.params.id);
            res.json(students);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // Get student details
    async getStudentById(req: Request, res: Response) {
        try {
            const student = await AlunoService.getStudentById(req.params.id);
            res.json(student);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // List enrollments of a student
    async getEnrollmentsByStudent(req: Request, res: Response) {
        try {
            const enrollments = await AlunoService.getEnrollmentsByStudent(req.params.id);
            res.json(enrollments);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // List all courses
    async getCourses(req: Request, res: Response) {
        try {
            const courses = await AlunoService.getCourses();
            res.json(courses);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // Get course details
    async getCourseById(req: Request, res: Response) {
        try {
            const course = await AlunoService.getCourseById(req.params.id);
            res.json(course);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // List students in a specific course
    async getStudentsByCourse(req: Request, res: Response) {
        try {
            const students = await AlunoService.getStudentsByCourse(req.params.id);
            res.json(students);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // Centralized error handling
    private handleError(error: unknown, res: Response) {
        if (error instanceof Error) {
            console.error('Erro no controlador:', error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error('Erro desconhecido:', error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

export default new AlunoController();
