import EnvManager from '../classes/EnvManager';

class AlunoService {
    private API_URL = EnvManager.getEnvOrThrow('ALUNO_API_URL');
    private API_TOKEN = EnvManager.getEnvOrThrow('ALUNO_API_TOKEN');

    // Helper method to make GET requests
    private async fetchData(url: string) {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${this.API_TOKEN}`,
                },
            });
            return response.json();
        } catch (error) {
            const err = error as Error;
            console.error('Erro ao buscar dados:', err.message);
            throw new Error('Erro ao realizar a requisição.');
        }
    }

    // List all institutions
    async getInstitutions() {
        return this.fetchData(`${this.API_URL}/institutions`);
    }

    // Get details of a specific institution
    async getInstitutionById(id: string) {
        return this.fetchData(`${this.API_URL}/institutions/${id}`);
    }

    // List students in a specific institution
    async getStudentsByInstitution(id: string) {
        return this.fetchData(`${this.API_URL}/institutions/${id}/students`);
    }

    // Get details of a student
    async getStudentById(id: string) {
        return this.fetchData(`${this.API_URL}/students/${id}`);
    }

    // List the enrollments of a specific student
    async getEnrollmentsByStudent(id: string) {
        return this.fetchData(`${this.API_URL}/students/${id}/enrollments`);
    }

    // List all courses
    async getCourses() {
        return this.fetchData(`${this.API_URL}/courses`);
    }

    // Get details of a specific course
    async getCourseById(id: string) {
        return this.fetchData(`${this.API_URL}/courses/${id}`);
    }

    // List students in a specific course
    async getStudentsByCourse(id: string) {
        return this.fetchData(`${this.API_URL}/courses/${id}/students`);
    }
}

export default new AlunoService();
