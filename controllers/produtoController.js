const Produto = require('../models').produto;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, produto;
    let produto_info = req.body;

    [err, produto] = await to(Produto.create(produto_info));
    if(err) return ReE(res, err, 422);

    [err, produto] = await to(produto.save());
    if(err) return ReE(res, err, 422);

    let produto_json = produto.toWeb();

    return ReS(res,{produto:produto_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, produtos;

    [err, produtos] = await to(Produto.findAll());

    let produtos_json =[]
    for( let i in produtos){
        let produto = produtos[i];
        let produto_info = produto.toWeb();
        produtos_json.push(produto_info);
    }

    return ReS(res, {produtos:produtos_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, produtos;
    let idproduto =req.params.idproduto;

    [err, produtos] = await to(Produto.findOne({where:{idproduto:idproduto}}));

    if (!produtos) 
      return ReS(res,"{}",200);

    if(err) 
      return ReE(res, err, 422);

    return ReS(res, {produto:produtos.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, produto, data;
    data = req.body;

    let idproduto =req.params.idproduto;
    [err, produto] = await to(Produto.findOne({where:{idproduto:idproduto}}));

    if(produto) {
        produto.set(data);
        [err, produto] = await to(produto.save());
        if(err){
           return ReE(res, err);
        }
    }  
    else   
       return ReS(res, {}, 200);

    return ReS(res, {produto:produto.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let produto, err;
    let idproduto =req.params.idproduto;
    [err, produto] = await to(Produto.findOne({where:{idproduto:idproduto}}));

    if(produto) 
       [err, produto] = await to(produto.destroy());
    else   
      return ReS(res, {}, 200);

    if(err) return ReE(res, 'Falha ao apagar o produto');

    return ReS(res, {message:'produto apagado!'}, 204);
}
module.exports.remove = remove;