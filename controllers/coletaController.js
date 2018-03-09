const Coleta = require('../models').coleta;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, coleta;
    let idusuario = req.user.idusuario;
    let coleta_info = req.body;
    
    coleta_info.idusuario = idusuario;

    [err, coleta] = await to(Coleta.create(coleta_info));
    if(err) return ReE(res, err, 422);

    [err, coleta] = await to(coleta.save());
    if(err) return ReE(res, err, 422);

    let coleta_json = coleta.toWeb();

    return ReS(res,{coleta:coleta_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, coletas;

    [err, coletas] = await to(Coleta.findAll());

    let coletas_json =[]
    for( let i in coletas){
        let coleta = coletas[i];
        let coleta_info = coleta.toWeb();
        coletas_json.push(coleta_info);
    }

    return ReS(res, {coletas:coletas_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, coletas;
    let idcoleta =req.params.idcoleta;

    [err, coletas] = await to(Coleta.findOne({where:{idcoleta:idcoleta}}));

    if (!coletas) 
       return ReS(res,"{}",200);

    if(err) 
       return ReE(res, err, 422);

    return ReS(res, {coleta:coletas.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, coleta, data;
    data = req.body;
    let idcoleta =req.params.idcoleta;
    [err, coleta] = await to(Coleta.findOne({where:{idcoleta:idcoleta}}));

    if(coleta) {
        coleta.set(data);
        [err, coleta] = await to(coleta.save());
        if(err){
           return ReE(res, err);
        }
    }  
    else   
       return ReS(res, {}, 200);

    return ReS(res, {coleta:coleta.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let coleta, err;
    let idcoleta =req.params.idcoleta;
    [err, coleta] = await to(Coleta.findOne({where:{idcoleta:idcoleta}}));

    if(coleta)
       [err, coleta] = await to(coleta.destroy());
    else   
       return ReS(res, {}, 200);

    if(err) return ReE(res, 'Falha ao apagar o coleta');

    return ReS(res, {message:'Coleta apagado!'}, 204);
}
module.exports.remove = remove;