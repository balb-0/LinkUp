import { Request, Response } from 'express';
import AlunoService from '../services/AlunoService';
import { ResponseHandler } from '../utils/responseHandler';
import { asyncHandler } from '../utils/asyncHandler';

class AlunoController {
    // List all institutions
    getInstitutions = asyncHandler(async (req: Request, res: Response) => {
        const institutions = await AlunoService.getInstitutions();
        return ResponseHandler.sucesso(res, institutions, "Instituições listadas com sucesso");
    });

    // Get institution details
    getInstitutionById = asyncHandler(async (req: Request, res: Response) => {
        const institution = await AlunoService.getInstitutionById(req.params.id);
        if (!institution) {
            return ResponseHandler.naoEncontrado(res, "Instituição não encontrada");
        }
        return ResponseHandler.sucesso(res, institution, "Instituição encontrada com sucesso");
    });

    // List students by institution
    getStudentsByInstitution = asyncHandler(async (req: Request, res: Response) => {
        const students = await AlunoService.getStudentsByInstitution(req.params.id);
        return ResponseHandler.sucesso(res, students, "Alunos listados com sucesso");
    });

    // Get student details
    getStudentById = asyncHandler(async (req: Request, res: Response) => {
        const student = await AlunoService.getStudentById(req.params.id);
        if (!student) {
            return ResponseHandler.naoEncontrado(res, "Aluno não encontrado");
        }
        return ResponseHandler.sucesso(res, student, "Aluno encontrado com sucesso");
    });

    // List enrollments of a student
    getEnrollmentsByStudent = asyncHandler(async (req: Request, res: Response) => {
        const enrollments = await AlunoService.getEnrollmentsByStudent(req.params.id);
        return ResponseHandler.sucesso(res, enrollments, "Matrículas listadas com sucesso");
    });

    // List all courses
    getCourses = asyncHandler(async (req: Request, res: Response) => {
        const courses = await AlunoService.getCourses();
        return ResponseHandler.sucesso(res, courses, "Cursos listados com sucesso");
    });

    // Get course details
    getCourseById = asyncHandler(async (req: Request, res: Response) => {
        const course = await AlunoService.getCourseById(req.params.id);
        if (!course) {
            return ResponseHandler.naoEncontrado(res, "Curso não encontrado");
        }
        return ResponseHandler.sucesso(res, course, "Curso encontrado com sucesso");
    });

    // List students in a specific course
    getStudentsByCourse = asyncHandler(async (req: Request, res: Response) => {
        const students = await AlunoService.getStudentsByCourse(req.params.id);
        return ResponseHandler.sucesso(res, students, "Alunos do curso listados com sucesso");
    });

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
