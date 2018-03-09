'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('coleta', {
    idcoleta      : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    idusuario     : {type: DataTypes.INTEGER, allowNull: false, references: {model: 'usuarios', key: 'idusuario' }, onUpdate: 'cascade', onDelete: 'restrict'},
    idbeneficiario: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'beneficiarios', key: 'idbeneficiario' }, onUpdate: 'cascade', onDelete: 'restrict'},
    idproduto     : {type: DataTypes.INTEGER, allowNull: false, references: {model: 'produtos', key: 'idproduto' }, onUpdate: 'cascade', onDelete: 'restrict'},
    obs  : DataTypes.STRING(200),
    data : {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
});

Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};