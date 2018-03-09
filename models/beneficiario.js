'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('beneficiario', {
    idbeneficiario  : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    nome  : {type: DataTypes.STRING(150), allowNull: false, unique: false},
    cpf   : {type: DataTypes.STRING(11), allowNull: false, unique: false},
    lougra: {type: DataTypes.STRING(200), allowNull: false, unique: false},
    email : DataTypes.STRING(150),
    telef : DataTypes.STRING(9),    
    numero: DataTypes.STRING(10),
    compl : DataTypes.STRING(150),
    cidade: {type: DataTypes.STRING(100), allowNull: false, unique: false},
    bairro: {type: DataTypes.STRING(100), allowNull: false, unique: false},
    cep   : {type: DataTypes.STRING(8), allowNull: false, unique: false},
    estado: DataTypes.STRING(2),
    datanasc : {type: DataTypes.DATE, allowNull: false, unique: false},
});

Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};