import { Request, Response } from 'express';
import AlunoController from '../../src/controllers/AlunoController';
import AlunoService from '../../src/services/AlunoService';

jest.mock('../../src/services/AlunoService');

describe('AlunoController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockRequest = {};
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInstitutions', () => {
    it('deve retornar a lista de instituições', async () => {
      const institutions = [{ id: 1, name: 'Instituição 1' }];
      (AlunoService.getInstitutions as jest.Mock).mockResolvedValue(institutions);

      await AlunoController.getInstitutions(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(institutions);
    });

    it('deve retornar erro 500 ao falhar em getInstitutions', async () => {
      (AlunoService.getInstitutions as jest.Mock).mockRejectedValue(new Error('Erro inesperado'));
    
      await AlunoController.getInstitutions(mockRequest as Request, mockResponse as Response);
    
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Erro inesperado' });
    });
    
  });

  describe('getInstitutionById', () => {
    it('deve retornar os detalhes da instituição', async () => {
      const institution = { id: 1, name: 'Instituição 1' };
      (AlunoService.getInstitutionById as jest.Mock).mockResolvedValue(institution);
      mockRequest.params = { id: '1' };

      await AlunoController.getInstitutionById(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(institution);
    });

    it('deve retornar erro 500 ao falhar em getStudentsByInstitution', async () => {
      mockRequest.params = { id: '1' };
      (AlunoService.getStudentsByInstitution as jest.Mock).mockRejectedValue(new Error('Erro ao buscar alunos'));
    
      await AlunoController.getStudentsByInstitution(mockRequest as Request, mockResponse as Response);
    
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Erro ao buscar alunos' });
    });
    
  });

  describe('getStudentsByInstitution', () => {
    it('deve retornar a lista de alunos por instituição', async () => {
      const students = [{ id: 1, name: 'Aluno 1' }];
      (AlunoService.getStudentsByInstitution as jest.Mock).mockResolvedValue(students);
      mockRequest.params = { id: '1' };

      await AlunoController.getStudentsByInstitution(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(students);
    });
  });

  describe('getStudentById', () => {
    it('deve retornar os detalhes do aluno', async () => {
      const student = { id: 1, name: 'Aluno 1' };
      (AlunoService.getStudentById as jest.Mock).mockResolvedValue(student);
      mockRequest.params = { id: '1' };

      await AlunoController.getStudentById(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(student);
    });

    it('deve retornar erro 500 ao falhar em getStudentById', async () => {
      mockRequest.params = { id: '1' };
      (AlunoService.getStudentById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar aluno'));
    
      await AlunoController.getStudentById(mockRequest as Request, mockResponse as Response);
    
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Erro ao buscar aluno' });
    });
    
  });

  describe('getEnrollmentsByStudent', () => {
    it('deve retornar as matrículas do aluno', async () => {
      const enrollments = [{ courseId: 1, studentId: 1 }];
      (AlunoService.getEnrollmentsByStudent as jest.Mock).mockResolvedValue(enrollments);
      mockRequest.params = { id: '1' };

      await AlunoController.getEnrollmentsByStudent(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(enrollments);
    });
  });

  describe('getCourses', () => {
    it('deve retornar a lista de cursos', async () => {
      const courses = [{ id: 1, name: 'Curso 1' }];
      (AlunoService.getCourses as jest.Mock).mockResolvedValue(courses);

      await AlunoController.getCourses(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(courses);
    });
  });

  describe('getCourseById', () => {
    it('deve retornar os detalhes do curso', async () => {
      const course = { id: 1, name: 'Curso 1' };
      (AlunoService.getCourseById as jest.Mock).mockResolvedValue(course);
      mockRequest.params = { id: '1' };

      await AlunoController.getCourseById(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(course);
    });
  });

  describe('getStudentsByCourse', () => {
    it('deve retornar os alunos do curso', async () => {
      const students = [{ id: 1, name: 'Aluno 1' }];
      (AlunoService.getStudentsByCourse as jest.Mock).mockResolvedValue(students);
      mockRequest.params = { id: '1' };

      await AlunoController.getStudentsByCourse(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(students);
    });
  });

  describe('handleError', () => {
    it('deve retornar um erro 500 se ocorrer um erro desconhecido', async () => {
      mockRequest.params = { id: '1' };
      (AlunoService.getInstitutionById as jest.Mock).mockRejectedValue(new Error('Erro inesperado'));

      await AlunoController.getInstitutionById(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Erro inesperado' });
    });
  });
});
