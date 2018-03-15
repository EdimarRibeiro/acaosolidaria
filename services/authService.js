const Usuario     = require('./../models').usuario;
const validator   = require('validator');

const getUniqueKeyFromBody = function(body){// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined'){
            unique_key = body.email
        }else{
            unique_key = null;
        }
    }
    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createusuario = async function(usuarioInfo){
    let unique_key, auth_info, err;

    auth_info={}
    auth_info.status='create';
    unique_key = getUniqueKeyFromBody(usuarioInfo);

    if(!unique_key) 
      TE('Obrigatório informar o email.');

    if(validator.isEmail(unique_key)){
        auth_info.method = 'email';
        usuarioInfo.email = unique_key;

        [err, usuario] = await to(Usuario.create(usuarioInfo));

        if(err) TE('Já existe um usuario com esse email');

        return usuario;

   /* }else if(validator.isMobilePhone(unique_key, 'any')){
        auth_info.method = 'phone';
        usuarioInfo.phone = unique_key;

        [err, usuario] = await to(usuario.create(usuarioInfo));
        if(err) TE('usuario already exists with that phone number');

        return usuario;*/
    }else{
        TE('O email informado não é válido.');
    }
}
module.exports.createusuario = createusuario;

const authusuario = async function(usuarioInfo){//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(usuarioInfo);

    if(!unique_key) TE('Informe email para entrar');
     
    if(!usuarioInfo.senha) TE('Informe uma senha para entrar');

    let usuario;
    if(validator.isEmail(unique_key)){
        auth_info.method='email';
    
        [err, usuario] = await to(Usuario.findOne({where:{email:unique_key}}));
        
        if(err) TE(err.message);
    }else{
        TE('O email informado não é válido.');
    }
    
    if(!usuario) TE('Usuário não registrado');

    [err, usuario] = await to(usuario.comparePassword(usuarioInfo.senha));

    if(err) TE(err.message);

    return usuario;

}
module.exports.authusuario = authusuario;