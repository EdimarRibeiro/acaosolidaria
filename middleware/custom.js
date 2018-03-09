const EntidadeUsuario = require('./../models').entidadeusuario;
const Usuario = require('./../models').usuario;

let entidadeusuario = async function (req, res, next) {
    let identidade, err, entidadeusuario;
    identidade = req.params.identidade;

    [err, entidadeusuario] = await to(EntidadeUsuario.findOne({where:{identidade:identidade}}));
    if(err) return ReE(res, "Falha ao pesquisar a Entidade");

    if(!entidadeusuario) return ReE(res, "Entidade nâo encontrada id: "+identidade);

    let usuario, usuarios_array, usuarios;
    usuario = req.user;
    [err, usuarios] = await to(Usuario.getusuarios());

    usuarios_array = usuarios.map(obj=>String(obj.usuario));

    if(!usuarios_array.includes(String(usuario.idusuario))) return ReE(res, "usuario does not have permission to read app with id: "+app_id);

    req.entidadeusuario = entidadeusuario;
    next();
}

module.exports.entidadeusuario = entidadeusuario;