'use strict';
const bcrypt    = require('bcrypt');
const bcrypt_p  = require('bcrypt-promise');
const jwt       = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('usuario', {
        idusuario : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        identidade: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'entidades', key: 'identidade' }, onUpdate: 'cascade', onDelete: 'restrict'},
        nome      : DataTypes.STRING(150),
        email     : {type: DataTypes.STRING(200), allowNull: false, unique: true, validate: { isEmail: {msg: "Email inválido."} }},
        senha     : DataTypes.STRING(100),
    });

    Model.beforeSave(async (usuario, options) => {
        let err;
        if (usuario.changed('senha')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(usuario.senha, salt));
            if(err) TE(err.message, true);

            usuario.senha = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.senha) TE('Senha não informada');

        [err, pass] = await to(bcrypt_p.compare(pw, this.senha));
        if(err) TE(err);

        if(!pass) TE('Senha inválida');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({idusuario:this.idusuario}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};