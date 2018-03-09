const Usuario       = require('../models').usuario;
const Entidade      = require('../models').entidade;
const Entidadeusuario = require('../models').entidadeusuario;
const authService   = require('./../services/authService');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    
    if(!body.unique_key && !body.email){
        return ReE(res, 'Informe um E-mail válido para registrar.');
    } else if(!body.senha){
        return ReE(res, 'Informar uma Senha para registrar.');
    }else{
        let err, usuario;

        [err, usuario] = await to(authService.createusuario(body));

        if(err) 
           return ReE(res, err, 422);

        if (!body.identidade){
            let errs, entidade,entidadeusuario;
            entidadeusuariotmp = Entidadeusuario;

            [errs, entidade] = await to(Entidade.create(body));

            if(errs) 
               return ReE(res, errs, 422);
          
            entidadeusuariotmp.identidade = entidade.identidade;
            entidadeusuariotmp.idusuario  = usuario.idusuario;
            entidadeusuariotmp.ativo      = 1;

            [errs, entidadeusuario] = await to(Entidadeusuario.create(entidadeusuariotmp));

            if(errs)
               return ReE(res, errs, 422);
        }
        else
        {
           let  errs,entidadeusuario, entidadeusuariotmp;

           console.log( usuario.idusuario,body.identidade);

           entidadeusuariotmp = Entidadeusuario;
           entidadeusuariotmp.identidade = body.identidade;
           entidadeusuariotmp.idusuario = usuario.idusuario;

           [errs, entidadeusuario] = await to(Entidadeusuario.create(entidadeusuariotmp));
           if(errs) 
              return ReE(res, errs, 422);
        }             

        return ReS(res, {message:'Successfully created new usuario.', usuario:usuario.toWeb(), token:usuario.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, usuarios;
    let idusuario =req.params.idusuario;

    if (!idusuario)
      idusuario = req.user.idusuario;

    [err, usuarios] = await to(Usuario.findOne({where:{idusuario:idusuario}}));

    if(err) 
      return ReE(res, err, 422);

    return ReS(res, {usuario:usuarios.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, usuario, data
    data = req.body;
    let idusuario =req.params.idusuario;
    [err, usuario] = await to(Usuario.findOne({where:{idusuario:idusuario}}));

    if(usuario) {
        usuario.set(data);
        [err, usuario] = await to(usuario.save());
        if(err){
            if(err.message=='Validation error') err = 'O Email informado já foi usado!';
               return ReE(res, err);
        }
    }  
    else   
       return ReS(res, {}, 200);
   
    return ReS(res, {message :'Updated usuario: '+usuario.email});
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let usuario, err;
    let idusuario =req.params.idusuario;
    [err, usuario] = await to(Usuario.findOne({where:{idusuario:idusuario}}));

    if(usuario) {
        [err, usuario] = await to(usuario.destroy());
        if(err) 
           return ReE(res, 'Falha ao apagar o usuario, ele está associado com alguma empresa!');
    }
    else   
        return ReS(res, {}, 200);
        
    return ReS(res, {message:'Usuário foi apagado!'}, 204);
}
module.exports.remove = remove;

const login = async function(req, res){
    const body = req.body;
    let err, usuario;

    [err, usuario] = await to(authService.authusuario(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:usuario.getJWT(), usuario:usuario.toWeb()});
}
module.exports.login = login;