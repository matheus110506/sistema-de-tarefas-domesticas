const db = require('../db');
const bcrypt = require('bcrypt');

exports.criarFilho = async (req, res) => {
    const { nome, email, senha, maeId } = req.body;

    try {
        const [mae] = await db.query('SELECT * FROM maes WHERE id = ?', [maeId]);
        if (mae.length === 0) return res.status(404).json({ error: "Mãe não encontrada" });

        const senhaHash = await bcrypt.hash(senha, 10);

        const [result] = await db.query(
            'INSERT INTO filhos (nome, email, senha, mae_id) VALUES (?, ?, ?, ?)',
            [nome, email, senhaHash, maeId]
        );

        res.json({ id: result.insertId, nome, email, maeId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar filho' });
    }
};

exports.loginFilho = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [filhos] = await db.query('SELECT * FROM filhos WHERE email = ?', [email]);
        if (filhos.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });

        const filho = filhos[0];

        const senhaValida = await bcrypt.compare(senha, filho.senha);
        if (!senhaValida) return res.status(401).json({ error: 'Credenciais inválidas' });

        res.json({ id: filho.id, nome: filho.nome, email: filho.email, maeId: filho.mae_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no login' });
    }
};

exports.listarFilhosPorMae = async (req, res) => {
    const { maeId } = req.params;

    try {
        const [filhos] = await db.query('SELECT id, nome, email, mae_id FROM filhos WHERE mae_id = ?', [maeId]);
        res.json(filhos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar filhos' });
    }
};