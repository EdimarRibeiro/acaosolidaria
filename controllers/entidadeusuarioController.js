const Entidadeusuario = require('../models').entidadeusuario;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, entidadeusuario;
    let entidadeusuario_info = req.body;

    [err, entidadeusuario] = await to(Entidadeusuario.create(entidadeusuario_info));
    if(err) return ReE(res, err, 422);

    [err, entidadeusuario] = await to(entidadeusuario.save());
    if(err) return ReE(res, err, 422);

    //para adicionar no json outros dados de retorno
    //let entidadeusuario_json = entidadeusuario.toWeb();

    return ReS(res,{entidadeusuario:entidadeusuario.toWeb()}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, entidadeusuarios;

    [err, entidadeusuarios] = await to(Entidadeusuario.findAll());

    let entidadeusuarios_json =[]
    for( let i in entidadeusuarios){
        let entidadeusuario = entidadeusuarios[i];
        let entidadeusuario_info = entidadeusuario.toWeb();
        entidadeusuarios_json.push(entidadeusuario_info);
    }

    return ReS(res, {entidadeusuarios:entidadeusuarios_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let condicao;
    let err, entidadeusuarios;
    let identidade =req.params.identidade;
    let idusuario  =req.params.idusuario;  
    
    if ((identidade)&&(idusuario))
      condicao = {where:{identidade:identidade , idusuario:idusuario}};
    else if (identidade)
      condicao = {where:{identidade:identidade}};
    else if (idusuario)
      condicao = {where:{idusuario:idusuario}};
    else
      return ReE(res, 'Parametros inválidos', 422);
      
    [err, entidadeusuarios] = await to(Entidadeusuario.findOne(condicao));
   
    if (!entidadeusuarios) 
       return ReS(res,"{}",200);
   
    if(err) 
      return ReE(res, err, 422);

    return ReS(res, {entidadeusuario:entidadeusuarios.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, entidadeusuario, data;
    let condicao;
    let identidade=req.params.identidade;
    let idusuario =req.params.idusuario;
    data = req.body;

    if ((identidade)&&(idusuario))
      condicao = {where:{identidade:identidade , idusuario:idusuario}};
    else if (identidade)
      condicao = {where:{identidade:identidade}};
    else if (idusuario)
      condicao = {where:{idusuario:idusuario}};
    else
      return ReE(res, 'Parametros inválidos', 422);    

    [err, entidadeusuario] = await to(Entidadeusuario.findOne(condicao));

    if(entidadeusuario) {
        entidadeusuario.set(data);
        [err, entidadeusuario] = await to(entidadeusuario.save());
        if(err){
           return ReE(res, err);
        }
    }  
    else   
       return ReS(res, {}, 200);

    return ReS(res, {entidadeusuario:entidadeusuario.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let entidadeusuario, err;
    let condicao;
    let identidade=req.params.identidade;
    let idusuario =req.params.idusuario;

    if ((identidade)&&(idusuario))
      condicao = {where:{identidade:identidade , idusuario:idusuario}};
    else if (identidade)
      condicao = {where:{identidade:identidade}};
    else if (idusuario)
      condicao = {where:{idusuario:idusuario}};
    else
      return ReE(res, 'Parametros inválidos', 422);    

    [err, entidadeusuario] = await to(Entidadeusuario.findOne(condicao));

    if(entidadeusuario)
       [err, entidadeusuario] = await to(entidadeusuario.destroy());
    else   
       return ReS(res, {}, 200);

    if(err) 
       return ReE(res, 'Falha ao apagar o entidadeusuario');

    return ReS(res, {message:'entidadeusuario apagado!'}, 204);
}
module.exports.remove = remove;