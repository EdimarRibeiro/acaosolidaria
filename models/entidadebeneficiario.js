'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('entidadebeneficiario', {
    identidade    : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, references: {model: 'entidades', key: 'identidade' }, onUpdate: 'cascade', onDelete: 'restrict'},
    idbeneficiario: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, references: {model: 'beneficiarios', key: 'idbeneficiario' }, onUpdate: 'cascade', onDelete: 'restrict'},
    ativo: DataTypes.INTEGER,
});

Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};