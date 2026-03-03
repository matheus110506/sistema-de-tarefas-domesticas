const db = require('../db');

exports.criarTarefa = async (req, res) => {
    const { titulo, descricao, maeId, filhoId } = req.body;

    try {
        const [mae] = await db.query('SELECT * FROM maes WHERE id = ?', [maeId]);
        if (mae.length === 0) return res.status(404).json({ error: 'Mãe não encontrada' });

        const [filhos] = await db.query(
            'SELECT * FROM filhos WHERE id = ? AND mae_id = ?',
            [filhoId, maeId]
        );

        if (filhos.length === 0) {
            return res.status(404).json({ error: 'Filho inválido para esta mãe' });
        }

        const [result] = await db.query(
            'INSERT INTO tarefas (titulo, descricao, mae_id, filho_id) VALUES (?, ?, ?, ?)',
            [titulo, descricao, maeId, filhoId]
        );

        res.json({ id: result.insertId, titulo, descricao, maeId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
};

exports.listarTarefasPorMae = async (req, res) => {
    const { maeId } = req.params;

    try {
        const [tarefas] = await db.query(`
            SELECT 
                t.id,
                t.titulo,
                t.descricao,
                f.nome AS nome_filho,
                CASE 
                    WHEN tc.tarefa_id IS NOT NULL THEN 1
                    ELSE 0
                END AS concluida
            FROM tarefas t
            JOIN filhos f ON t.filho_id = f.id
            LEFT JOIN tarefas_concluidas tc 
                ON t.id = tc.tarefa_id
            WHERE t.mae_id = ?
        `, [maeId]);

        res.json(tarefas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
};

exports.marcarConcluida = async (req, res) => {
    const { tarefaId, filhoId } = req.body;

    try {
        const [tarefas] = await db.query(
            'SELECT * FROM tarefas WHERE id = ? AND filho_id = ?',
            [tarefaId, filhoId]
        );

        if (tarefas.length === 0) {
            return res.status(403).json({ error: 'Tarefa não pertence a este filho' });
        }

        await db.query(
            'INSERT IGNORE INTO tarefas_concluidas (filho_id, tarefa_id) VALUES (?, ?)',
            [filhoId, tarefaId]
        );

        res.json({ message: 'Tarefa marcada como concluída' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao marcar tarefa' });
    }
};

exports.listarTarefasPorFilho = async (req, res) => {
    const { filhoId } = req.params;

    try {
        const [tarefas] = await db.query(`
            SELECT 
                t.id,
                t.titulo,
                t.descricao,
                CASE 
                    WHEN tc.tarefa_id IS NOT NULL THEN 1
                    ELSE 0
                END AS concluida
            FROM tarefas t
            LEFT JOIN tarefas_concluidas tc 
                ON t.id = tc.tarefa_id
            WHERE t.filho_id = ?
        `, [filhoId]);

        res.json(tarefas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar tarefas do filho' });
    }
};

exports.excluirTarefa = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(
            'DELETE FROM tarefas_concluidas WHERE tarefa_id = ?',
            [id]
        );

        await db.query(
            'DELETE FROM tarefas WHERE id = ?',
            [id]
        );

        res.json({ message: 'Tarefa excluída com sucesso' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
};
