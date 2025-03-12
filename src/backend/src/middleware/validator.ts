import { Request, Response, NextFunction } from 'express';
import { createError } from './errorHandler';

/**
 * Interface para regras de validação
 */
interface ValidationRules {
  [key: string]: {
    required?: boolean;
    type?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
    message?: string;
  };
}

/**
 * Middleware de validação de dados
 * @param rules Regras de validação para os campos
 * @returns Middleware de validação
 */
export const validate = (rules: ValidationRules) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];
    
    // Verifica cada campo de acordo com as regras
    Object.entries(rules).forEach(([field, rule]) => {
      const value = req.body[field];
      
      // Verifica se o campo é obrigatório
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(rule.message || `O campo '${field}' é obrigatório`);
        return;
      }
      
      // Se o valor não existe e não é obrigatório, pula as validações
      if (value === undefined || value === null || value === '') {
        return;
      }
      
      // Verifica o tipo
      if (rule.type && typeof value !== rule.type) {
        errors.push(rule.message || `O campo '${field}' deve ser do tipo ${rule.type}`);
      }
      
      // Verifica comprimento mínimo
      if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
        errors.push(rule.message || `O campo '${field}' deve ter pelo menos ${rule.minLength} caracteres`);
      }
      
      // Verifica comprimento máximo
      if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
        errors.push(rule.message || `O campo '${field}' deve ter no máximo ${rule.maxLength} caracteres`);
      }
      
      // Verifica padrão (regex)
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        errors.push(rule.message || `O campo '${field}' possui formato inválido`);
      }
      
      // Validação personalizada
      if (rule.custom && !rule.custom(value)) {
        errors.push(rule.message || `O campo '${field}' é inválido`);
      }
    });
    
    // Se houver erros, retorna 400 Bad Request
    if (errors.length > 0) {
      next(createError(errors.join('. '), 400));
      return;
    }
    
    next();
  };
};

/**
 * Validações comuns pré-definidas
 */
export const commonValidations = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email inválido'
  },
  
  // Adicione mais validações comuns conforme necessário
}; 