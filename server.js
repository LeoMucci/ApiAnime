const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const config = require('./config');
const Anime = require('./Models/Anime');

const app = express();
const port = 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const banco = new Sequelize(config.development);

const Jogo = require('./Models/Anime')(banco, Sequelize);

banco.sync().then(() => {
    console.log("Modelo sincronizado com o banco de dados.")
});

//rotas
app.get('/anime', async (req, res) => {
    const anime = await Anime.findAll();
    res.json(anime);
});

app.get('/anime/:id', async (req, res) => {
    const {id} = req.params;
    const anime = await Anime.findByPk(id)
    res.json(anime);
});

app.post('/anime', async (req, res) => {
    const {nome, capa, estudio, status, descricao} = req.body;
    const anime = await Jogo.create({nome, capa, estudio, status, descricao});
    res.json(anime);
});

app.put('/anime/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, capa, estudio, status, descricao} = req.body;
    
    await Anime.update({nome, capa, estudio, status, descricao}, {where: {id} });
    const anime = await anime.findByPk(id);

    res.json(anime);
});

app.delete('/anime/:id', async (req, res) => {
    const {id} = req.params;

    await Anime.destroy({where: {id} });
    res.json({message: 'Produto deletado com sucesso!'})
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});