const Beneficiario = require('../models').beneficiario;
const Entidadebeneficiario = require('../models').entidadebeneficiario;
const Entidadeusuario = require('../models').entidadeusuario;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, beneficiario, entidadebeneficiario,entidadebeneficiariotmp,entidadeusuario;
    let beneficiario_info = req.body;
    let idusuario = req.user.idusuario;

    [err, beneficiario] = await to(Beneficiario.create(beneficiario_info));
    if(err) return ReE(res, err, 422);

    [err, beneficiario] = await to(beneficiario.save());
    if(err) return ReE(res, err, 422);

    [err, entidadeusuario] = await to(Entidadeusuario.findOne({where:{idusuario:idusuario}}));

    if (entidadeusuario) {
        entidadebeneficiariotmp = Entidadebeneficiario;
        entidadebeneficiariotmp.idbeneficiario = beneficiario.idbeneficiario;
        entidadebeneficiariotmp.identidade     = entidadeusuario.identidade;
        entidadebeneficiariotmp.ativo          = 1;

        [err, entidadebeneficiario] = await to(Entidadebeneficiario.create(entidadebeneficiariotmp));
        if(err) return ReE(res, err, 422);
    }

    let beneficiario_json = beneficiario.toWeb();

    return ReS(res,{beneficiario:beneficiario_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, beneficiarios;

    [err, beneficiarios] = await to(Beneficiario.findAll());

    let beneficiarios_json =[]
    for( let i in beneficiarios){
        let beneficiario = beneficiarios[i];
        let beneficiario_info = beneficiario.toWeb();
        beneficiarios_json.push(beneficiario_info);
    }

    return ReS(res, {beneficiarios:beneficiarios_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, beneficiarios;
    let idbeneficiario =req.params.idbeneficiario;

    [err, beneficiarios] = await to(Beneficiario.findOne({where:{idbeneficiario:idbeneficiario}}));

    if (!beneficiarios) 
      return ReS(res,"{}",200);

    if(err) 
      return ReE(res, err, 422);

    return ReS(res, {beneficiario:beneficiarios.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, beneficiario, data;
    data = req.body;

    let idbeneficiario =req.params.idbeneficiario;
    [err, beneficiario] = await to(Beneficiario.findOne({where:{idbeneficiario:idbeneficiario}}));

    if(beneficiario) {
        beneficiario.set(data);
        [err, beneficiario] = await to(beneficiario.save());
        if(err){
           return ReE(res, err);
        }
    }  
    else   
       return ReS(res, {}, 200);

    if(err){
        return ReE(res, err);
    }
    return ReS(res, {beneficiario:beneficiario.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let beneficiario, err;
    beneficiario = req.beneficiario;

    let idbeneficiario =req.params.idbeneficiario;
    [err, beneficiario] = await to(Beneficiario.findOne({where:{idbeneficiario:idbeneficiario}}));

    if(beneficiario) 
       [err, beneficiario] = await to(Beneficiario.destroy());
    else
       return ReS(res, {}, 200);

    if(err) return ReE(res, 'Falha ao apagar o beneficiario');

    return ReS(res, {message:'Beneficiario apagado!'}, 204);
}
module.exports.remove = remove;