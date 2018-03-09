'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('dependente', {
    idbeneficiario: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, references: {model: 'beneficiarios', key: 'idbeneficiario' }, onUpdate: 'cascade', onDelete: 'restrict'},
    item  : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    nome  : {type: DataTypes.STRING(150), allowNull: false, unique: false},
    cpf   : {type: DataTypes.STRING(11), allowNull: false, unique: false},
    datanasc : {type: DataTypes.DATE, allowNull: false, unique: false},
});

Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};