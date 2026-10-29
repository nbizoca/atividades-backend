
const express = require("express");
const jogosRoutes = require("./routes/jogos");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/jogos", jogosRoutes);

app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
