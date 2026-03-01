class Filho {
    constructor(id, nome, email, senha, maeId) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.maeId = maeId;
        this.tarefasConcluidas = [];
    }
}

module.exports = Filho;