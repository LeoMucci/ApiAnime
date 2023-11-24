const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const config = require('./config');


const app = express();
const port = 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const banco = new Sequelize(config.development);

const Anime = require('./Models/Anime')(banco, Sequelize);

banco.sync().then(() => {
    console.log("Modelo sincronizado com o banco de dados.")
});


app.get('/aanime', async (req, res) => {
    const anime = await Anime.findAll();
    res.json(anime);
});

app.get('/aanime/:id', async (req, res) => {
    const {id} = req.params;
    const anime = await Anime.findByPk(id)
    res.json(anime);
});

app.post('/aanime', async (req, res) => {
    const {nome, capa, estudio, status, descricao} = req.body;
    const anime = await Anime.create({nome, capa, estudio, status, descricao});
    res.json(anime);
});

app.put('/aanime/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, capa, estudio, status, descricao} = req.body;
    
    await Anime.update({nome, capa, estudio, status, descricao}, {where: {id} });
    const anime = await anime.findByPk(id);

    res.json(anime);
});

app.delete('/aanime/:id', async (req, res) => {
    const {id} = req.params;

    await Anime.destroy({where: {id} });
    res.json({message: 'Produto deletado com sucesso!'})
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});