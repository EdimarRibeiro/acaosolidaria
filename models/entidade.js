'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('entidade', {
    identidade  : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    nome  : {type: DataTypes.STRING(150), allowNull: false, unique: false},
    cnpj  : {type: DataTypes.STRING(14), allowNull: false, unique: false},
    email : DataTypes.STRING(150),
    telef : DataTypes.STRING(9),
    lougra: {type: DataTypes.STRING(200), allowNull: false, unique: false},
    numero: DataTypes.STRING(10),
    compl : DataTypes.STRING(150),
    cidade: {type: DataTypes.STRING(100), allowNull: false, unique: false},
    bairro: {type: DataTypes.STRING(100), allowNull: false, unique: false},
    cep   : {type: DataTypes.STRING(8), allowNull: false, unique: false},
    estado: DataTypes.STRING(2),
    data  : {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
});

//Model.associate = function(models){
//  this.entidadeusuarios = this.belongsToMany(models.entidadeusuario, {through: 'usuarioentidade'});
//};

Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};