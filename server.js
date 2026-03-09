const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const verificarBan = require('./middlewares/verificarBan');

app.use(verificarBan);

const maeRoutes = require('./routes/maeRoutes');
const filhoRoutes = require('./routes/filhoRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api', maeRoutes);
app.use('/api', filhoRoutes);
app.use('/api', tarefaRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
