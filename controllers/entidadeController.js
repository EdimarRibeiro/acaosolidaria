const Entidade = require('../models').entidade;
const Usuario  = require('../models').usuario;
const Entidadeusuario = require('../models').entidadeusuario;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, entidade;
    let entidade_info = req.body;

    [err, entidade] = await to(Entidade.create(entidade_info));

    if(err) 
      return ReE(res, err, 422);

    [err, entidade] = await to(entidade.save());

    if(err) 
       return ReE(res, err, 422);


    if (entidade.identidade){        
        let errs, usuario, tmpusuario;
        tmpusuario = {identidade:'',nome:'',email:'',senha:''};

        tmpusuario.identidade = entidade.identidade; 
        tmpusuario.nome       = entidade_info.nome;
        tmpusuario.email      = entidade_info.email;
        tmpusuario.senha      = entidade_info.senha;

        [errs, usuario] = await to(Usuario.create(tmpusuario));

        if(errs) 
           return ReE(res, errs, 422);
        
        if (usuario){    
            let errs, entidadeusuario, entidadeusuariotmp;
           entidadeusuariotmp = {identidade:'',idusuario:'',ativo:''};
           
           entidadeusuariotmp.identidade = usuario.identidade;
           entidadeusuariotmp.idusuario  = usuario.idusuario;
           entidadeusuariotmp.ativo      = 1;
   
           [errs, entidadeusuario] = await to(Entidadeusuario.create(entidadeusuariotmp));
   
           if(errs)
              return ReE(res, errs, 422);   
        }
    }
   
    return ReS(res,{entidade:entidade.toWeb()}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let usuario = req.user;
    let err, entidades;

    [err, entidades] = await to(Entidade.findAll());

    let entidades_json =[]
    for( let i in entidades){
        let entidade = entidades[i];
        let entidade_info = entidade.toWeb();
        
        entidades_json.push(entidade_info);
    }

    return ReS(res, {entidades:entidades_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, entidades;
    let identidade =req.params.identidade;

    [err, entidades] = await to(Entidade.findOne({where:{identidade:identidade}}));

    if (!entidades) 
       return ReS(res,"{}",200);

    if(err) 
      return ReE(res, err, 422);

    return ReS(res, {entidade:entidades.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, entidade, data;
    data = req.body;
    let identidade =req.params.identidade;
    [err, entidade] = await to(Entidade.findOne({where:{identidade:identidade}}));

    if(entidade) {
        entidade.set(data);
        [err, entidade] = await to(entidade.save());
        if(err){
           return ReE(res, err);
        }
    }  
    else   
       return ReS(res, {}, 200);

    return ReS(res, {entidade:entidade.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let entidade, err;
    let identidade =req.params.identidade;
    [err, entidade] = await to(Entidade.findOne({where:{identidade:identidade}}));

    if(entidade)
       [err, entidade] = await to(entidade.destroy());
    else
       return ReS(res, {}, 200);

    if(err) 
       return ReE(res, 'Ocorreu um erro ao apagar a entidade');

    return ReS(res, {message:'Entidade apagada'}, 204);
}
module.exports.remove = remove;