const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Rotas
const maeRoutes = require('./routes/maeRoutes');
const filhoRoutes = require('./routes/filhoRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');

app.use('/api', maeRoutes);
app.use('/api', filhoRoutes);
app.use('/api', tarefaRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});