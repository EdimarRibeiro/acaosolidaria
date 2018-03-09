const Dependente = require('../models').dependente;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, dependente;
    let dependente_info = req.body;

    [err, dependente] = await to(Dependente.create(dependente_info));
    if(err) return ReE(res, err, 422);

    [err, dependente] = await to(dependente.save());
    if(err) return ReE(res, err, 422);


    let dependente_json = dependente.toWeb();

    return ReS(res,{dependente:dependente_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, dependentes;

    [err, dependentes] = await to(Dependente.findAll());

    let dependentes_json =[]
    for( let i in dependentes){
        let dependente = dependentes[i];
        let dependente_info = dependente.toWeb();
        dependentes_json.push(dependente_info);
    }

    return ReS(res, {dependentes:dependentes_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, dependentes;
    let iddependente =req.params.iddependente;

    [err, dependentes] = await to(Dependente.findOne({where:{iddependente:iddependente}}));

    if (!dependentes) 
       return ReS(res,"{}",200);

    if(err) 
      return ReE(res, err, 422);

    return ReS(res, {dependente:dependentes.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, dependente, data;
    data = req.body;
    let iddependente =req.params.iddependente;
    [err, dependente] = await to(Dependente.findOne({where:{iddependente:iddependente}}));

    if(dependente) {
        dependente.set(data);
        [err, dependente] = await to(dependente.save());
        if(err){
           return ReE(res, err);
        }
    }  
    else   
       return ReS(res, {}, 200);

    return ReS(res, {dependente:dependente.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let dependente, err;

    let iddependente =req.params.iddependente;
    [err, dependente] = await to(Dependente.findOne({where:{iddependente:iddependente}}));

    if(dependente)
       [err, dependente] = await to(dependente.destroy());
    else 
       return ReS(res, {}, 200);
       
    if(err) return ReE(res, 'Falha ao apagar o dependente');

    return ReS(res, {message:'dependente apagado!'}, 204);
}
module.exports.remove = remove;