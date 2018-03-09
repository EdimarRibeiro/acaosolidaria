'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('entidadeusuario', {
    identidade: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, references: {model: 'entidades', key: 'identidade' }, onUpdate: 'cascade', onDelete: 'restrict'},
    idusuario : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, references: {model: 'usuarios', key: 'idusuario' }, onUpdate: 'cascade', onDelete: 'restrict'},
    ativo: DataTypes.INTEGER,
});

//Model.associate = function(models){
//  this.usuarios = this.belongsToMany(models.usuario, {through: 'usuarioenti'});
//};

Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Model;
};