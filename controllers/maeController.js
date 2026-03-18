const db = require('../db');
const bcrypt = require('bcrypt');

exports.criarMae = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        const [result] = await db.query(
            'INSERT INTO maes (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaHash]
        );

        res.json({ id: result.insertId, nome, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar mãe' });
    }
};

exports.loginMae = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [maes] = await db.query(
            'SELECT * FROM maes WHERE email = ?',
            [email]
        );

        if (maes.length === 0)
            return res.status(401).json({ error: 'Credenciais inválidas' });

        const mae = maes[0];

        if (mae.banido) {
            return res.status(403).json({ error: "Conta banida" });
        }

        const senhaValida = await bcrypt.compare(senha, mae.senha);

        if (!senhaValida)
            return res.status(401).json({ error: 'Credenciais inválidas' });

        // LOG
    await db.query(
        "INSERT INTO logs (acao, ip) VALUES (?,?)",
        [`login da mãe ${mae.nome} (id ${mae.id})`, req.ip]
    );

        res.json({
            id: mae.id,
            nome: mae.nome,
            email: mae.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no login' });
    }
};

exports.listarMaes = async (req, res) => {
    try {
        const [maes] = await db.query('SELECT id, nome, email FROM maes');
        res.json(maes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar mães' });
    }
};

exports.encontrarMaePorId = async (id) => {
    const [rows] = await db.query('SELECT * FROM maes WHERE id = ?', [id]);
    return rows[0];
};

exports.banirMae = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(
            'UPDATE maes SET banido = 1 WHERE id = ?',
            [id]
        );

        await db.query(
            "INSERT INTO logs (acao, ip) VALUES (?,?)",
            [`admin baniu mãe (id ${id})`, req.ip]
        );

        res.json({ message: 'Mãe banida com sucesso' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao banir mãe' });
    }
};

exports.desbanirMae = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(
            'UPDATE maes SET banido = 0 WHERE id = ?',
            [id]
        );

        await db.query(
            "INSERT INTO logs (acao, ip) VALUES (?,?)",
            [`admin desbaniu mãe (id ${id})`, req.ip]
        );

        res.json({ message: 'Mãe desbanida com sucesso' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao desbanir mãe' });
    }
};
