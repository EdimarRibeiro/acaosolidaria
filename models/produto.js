'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('produto', {
    idproduto  : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    nome       : {type: DataTypes.STRING(200), allowNull: false, unique: false},
});

Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};