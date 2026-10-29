const express = require("express");
const router = express.Router();

let jogos = [
    {
        id: 1,
        titulo: "Minecraft",
        plataforma: "PC",
        genero: "Sandbox",
        anoLancamento: 2011
    },
    {
        id: 2,
        titulo: "The Sims 4",
        plataforma: "PC",
        genero: "Simulação",
        anoLancamento: 2014
    }
];

let proximoId = 3;

router.get("/", (req, res) => {
    res.json(jogos);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    res.json(jogo);
});

router.post("/", (req, res) => {
    const { titulo, plataforma, genero, anoLancamento } = req.body;

    if (
        !titulo ||
        !plataforma ||
        !genero ||
        anoLancamento === undefined ||
        anoLancamento === null ||
        anoLancamento === ""
    ) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    const novoJogo = {
        id: proximoId++,
        titulo,
        plataforma,
        genero,
        anoLancamento
    };

    jogos.push(novoJogo);

    res.status(201).json(novoJogo);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    const { titulo, plataforma, genero, anoLancamento } = req.body;

    if (
        !titulo ||
        !plataforma ||
        !genero ||
        anoLancamento === undefined ||
        anoLancamento === null ||
        anoLancamento === ""
    ) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    jogo.titulo = titulo;
    jogo.plataforma = plataforma;
    jogo.genero = genero;
    jogo.anoLancamento = anoLancamento;

    res.json(jogo);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = jogos.findIndex(j => j.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    jogos.splice(indice, 1);

    res.json({
        mensagem: "Jogo removido com sucesso"
    });
});

module.exports = router;
