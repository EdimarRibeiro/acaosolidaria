const Usuario       = require('../models').usuario;
const authService   = require('./../services/authService');
const Entidadeusuario = require('../models').entidadeusuario;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    
    if(!body.unique_key && !body.email){
        return ReE(res, 'Informe um E-mail válido para registrar.');
    } else if(!body.senha){
        return ReE(res, 'Informar uma Senha para registrar.');
    }else{
        let err, usuario;

        console.log('1');
        [err, usuario] = await to(authService.createusuario(body));

        console.log('2');

        if(err) 
           return ReE(res, err, 422);

        console.log('3');
        [err, usuario] = await to(usuario.save());

        console.log('4');

        if(err) 
           return ReE(res, err, 422);    
           
           console.log('5',usuario);

        if (usuario){       
            console.log('6');     
           let errs, entidadeusuario, entidadeusuariotmp;
           entidadeusuariotmp = {identidade:'',idusuario:'',ativo:''};
           
           entidadeusuariotmp.identidade = usuario.identidade;
           entidadeusuariotmp.idusuario  = usuario.idusuario;
           entidadeusuariotmp.ativo      = 1;

           console.log(usuario,entidadeusuario);
   
           [errs, entidadeusuario] = await to(Entidadeusuario.create(entidadeusuariotmp));
   
           if(errs)
              return ReE(res, errs, 422);   
        }

        console.log('7');

        return ReS(res, {message:'Successfully created new usuario.', usuario:usuario.toWeb(), token:usuario.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, usuarios;
    let identidade =req.params.identidade;

    [err, usuarios] = await to(Usuario.findAll({where:{identidade:identidade}}));

    if(err) 
      return ReE(res, err, 422);

    let usuarios_json =[]
    for( let i in usuarios){
        let usuario = usuarios[i];
        let usuario_info = usuario.toWeb();
          
        usuarios_json.push(usuario_info);
    }

    return ReS(res, {usuario:usuarios_json});
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