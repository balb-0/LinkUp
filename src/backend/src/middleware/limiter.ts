import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de 100 requisições por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Muitas requisições deste IP, tente novamente após 15 minutos'
  });

export default limiter;