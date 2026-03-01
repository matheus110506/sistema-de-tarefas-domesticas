class Tarefa {
    constructor(id, titulo, descricao, maeId) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.maeId = maeId;
        this.concluidaPor = [];
    }
}

module.exports = Tarefa;