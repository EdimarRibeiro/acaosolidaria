const Entidadebeneficiario = require('../models').entidadebeneficiario;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, entidadebeneficiario;
    let entidadebeneficiario_info = req.body;

    [err, entidadebeneficiario] = await to(Entidadebeneficiario.create(entidadebeneficiario_info));
    if(err) return ReE(res, err, 422);

    [err, entidadebeneficiario] = await to(entidadebeneficiario.save());
    if(err) return ReE(res, err, 422);

    let entidadebeneficiario_json = entidadebeneficiario.toWeb();

    return ReS(res,{entidadebeneficiario:entidadebeneficiario_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, entidadebeneficiarios;
    let identidade =req.params.identidade;

    [err, entidadebeneficiarios] = await to(Entidadebeneficiario.findAll({where:{identidade:identidade}}));

    let entidadebeneficiarios_json =[]
    for( let i in entidadebeneficiarios){
        let entidadebeneficiario = entidadebeneficiarios[i];
        let entidadebeneficiario_info = entidadebeneficiario.toWeb();
        entidadebeneficiarios_json.push(entidadebeneficiario_info);
    }

    return ReS(res, {entidadebeneficiarios:entidadebeneficiarios_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let condicao;
    let err, entidadebeneficiarios;
    let identidade =req.params.identidade;
    let idbeneficiario =req.params.idbeneficiario;   
    
    if ((identidade)&&(idbeneficiario))
      condicao = {where:{identidade:identidade , idbeneficiario:idbeneficiario}};
    else if (identidade)
      condicao = {where:{identidade:identidade}};
    else if (idbeneficiario)
      condicao = {where:{idbeneficiario:idbeneficiario}};
    else
      return ReE(res, 'Parametros inválidos', 422);
      
    [err, entidadebeneficiarios] = await to(Entidadebeneficiario.findOne(condicao));

    if (!entidadebeneficiarios) 
      return ReS(res,"{}",200);

    if(err) 
      return ReE(res, err, 422);

    return ReS(res, {entidadebeneficiario:entidadebeneficiarios.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let condicao;
    let err, entidadebeneficiario, data;
    let identidade=req.params.identidade;
    let idbeneficiario =req.params.idbeneficiario;
    data = req.body;

    if ((identidade)&&(idbeneficiario))
       condicao = {where:{identidade:identidade , idbeneficiario:idbeneficiario}};
    else if (identidade)
       condicao = {where:{identidade:identidade}};
    else if (idbeneficiario)
       condicao = {where:{idbeneficiario:idbeneficiario}};
    else
       return ReE(res, 'Parametros inválidos', 422);    

    [err, entidadebeneficiario] = await to(Entidadebeneficiario.findOne(condicao));

    if(entidadebeneficiario) {
        entidadebeneficiario.set(data);
        [err, entidadebeneficiario] = await to(entidadebeneficiario.save());
        if(err){
           return ReE(res, err);
        }
    }  
    else   
       return ReS(res, {}, 200);

    return ReS(res, {entidadebeneficiario:entidadebeneficiario.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let condicao;
    let entidadebeneficiario, err;
    let identidade=req.params.identidade;
    let idbeneficiario =req.params.idbeneficiario;

    if ((identidade)&&(idbeneficiario))
       condicao = {where:{identidade:identidade , idbeneficiario:idbeneficiario}};
    else if (identidade)
       condicao = {where:{identidade:identidade}};
    else if (idbeneficiario)
       condicao = {where:{idbeneficiario:idbeneficiario}};
    else
       return ReE(res, 'Parametros inválidos', 422);    

    [err, entidadebeneficiario] = await to(Entidadebeneficiario.findOne(condicao));

    if(entidadebeneficiario)
       [err, entidadebeneficiario] = await to(entidadebeneficiario.destroy());
    else
       return ReS(res, {}, 200);

    if(err) return ReE(res, 'Falha ao apagar o entidadebeneficiario');

    return ReS(res, {message:'entidadebeneficiario apagado!'}, 204);
}
module.exports.remove = remove;