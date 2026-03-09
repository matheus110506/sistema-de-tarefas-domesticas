const db = require('../db');

exports.loginAdmin = async (req, res) => {

    const { email, senha } = req.body;

    console.log("Email recebido:", email);
    console.log("Senha recebida:", senha);

    if (email === "admin@gmail.com" && senha === "sAs45678") {

        await db.query(
            "INSERT INTO logs (acao, ip) VALUES (?,?)",
            ["login do admin", req.ip]
        );

        return res.json({
            nome: "Admin",
            tipo: "admin"
        });
    }

    return res.status(401).json({
        erro: "Login inválido"
    });
};

exports.listarLogs = async (req, res) => {

    try {

        const [logs] = await db.query(
            "SELECT * FROM logs ORDER BY data DESC"
        );

        res.json(logs);

    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar logs" });
    }

};


exports.banirIP = async (req, res) => {

    try {

        const { ip } = req.body;

        await db.query(
            "INSERT INTO ips_banidos (ip) VALUES (?)",
            [ip]
        );

        res.json({ message: "IP banido" });

    } catch (erro) {
        res.status(500).json({ erro: "Erro ao banir IP" });
    }

};

exports.banirMae = async (req, res) => {
    const { id } = req.body;

    try {

        await db.query(
            "UPDATE maes SET banido = true WHERE id = ?",
            [id]
        );

        await db.query(
            "UPDATE filhos SET banido = true WHERE mae_id = ?",
            [id]
        );

        await db.query(
            "INSERT INTO logs (acao, ip) VALUES (?,?)",
            ["admin baniu mãe", req.ip]
        );

        res.json({ mensagem: "Mãe e filhos banidos com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao banir mãe" });
    }
};

exports.banirFilho = async (req, res) => {
    const { id } = req.body;

    await db.query(
        "UPDATE filhos SET banido = true WHERE id = ?",
        [id]
    );

    await db.query(
        "INSERT INTO logs (acao, ip) VALUES (?,?)",
        ["admin baniu filho", req.ip]
    );

    res.json({ mensagem: "Filho banido com sucesso" });
};
