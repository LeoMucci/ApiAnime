module.exports = (sequelize, DataTypes) => {
    const Anime = sequelize.define('Anime', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capa: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estudio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: 'Animes',
        timestamps: true,
        createdAt: 'dataCriacao',
        updatedAt: 'dataAtualizacao',
        version: 'versao'
    }
    );
    return Anime;
};