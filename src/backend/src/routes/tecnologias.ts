import express from 'express';
import db from '../utils/db'; // conexão com MySQL

const router = express.Router();

router.get('/tecnologias', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT nome FROM Tecnologia_Assistiva');
    const nomes = (rows as any[]).map(row => row.nome);
    res.json(nomes);
  } catch (err) {
    console.error('Erro ao buscar tecnologias assistivas:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

export default router;