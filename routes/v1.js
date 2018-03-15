const express         = require('express');
const router          = express.Router();

const beneficiarioController         = require('./../controllers/beneficiarioController');
const coletaController               = require('./../controllers/coletaController');
const dependenteController           = require('./../controllers/dependenteController');
const entidadebeneficiarioController = require('./../controllers/entidadebeneficiarioController');
const entidadeController             = require('./../controllers/entidadeController');
const entidadeusuarioController      = require('./../controllers/entidadeusuarioController');
const produtoController              = require('./../controllers/produtoController');
const usuarioController              = require('./../controllers/usuarioController');

const custom            = require('./../middleware/custom');
const passport          = require('passport');
const path              = require('path');

router.post(  '/usuario',passport.authenticate('jwt', {session:false}), usuarioController.create); //create                                               
router.get(   '/usuario',passport.authenticate('jwt', {session:false}), usuarioController.get);  //read     
router.get(   '/usuario/:identidade',passport.authenticate('jwt', {session:false}), usuarioController.getAll);  //read    
router.get(   '/usuario/:identidade/:idusuario',passport.authenticate('jwt', {session:false}), usuarioController.get);  //read   
router.put(   '/usuario/:idusuario' ,passport.authenticate('jwt', {session:false}), usuarioController.update); //update   
router.delete('/usuario/:idusuario' ,passport.authenticate('jwt', {session:false}), usuarioController.remove); //delete
router.post(  '/usuario/login', usuarioController.login);

router.post(  '/entidade', entidadeController.create);
router.get(   '/entidade', passport.authenticate('jwt', {session:false}), entidadeController.getAll);
//Incluir dados no json
//router.get(   '/entidade/:identidade', passport.authenticate('jwt', {session:false}), entidadeController.get);
//router.put(   '/entidade/:identidade', passport.authenticate('jwt', {session:false}), entidadeController.update);
//router.delete('/entidade/:identidade', passport.authenticate('jwt', {session:false}), entidadeController.remove);

router.get(   '/entidade/:identidade', passport.authenticate('jwt', {session:false}), entidadeController.get);
router.put(   '/entidade/:identidade', passport.authenticate('jwt', {session:false}), entidadeController.update);
router.delete('/entidade/:identidade', passport.authenticate('jwt', {session:false}), entidadeController.remove);

router.post(  '/beneficiario', passport.authenticate('jwt', {session:false}), beneficiarioController.create);
router.get(   '/beneficiario', passport.authenticate('jwt', {session:false}), beneficiarioController.getAll);
router.get(   '/beneficiario/:idbeneficiario', passport.authenticate('jwt', {session:false}), beneficiarioController.get);
router.put(   '/beneficiario/:idbeneficiario', passport.authenticate('jwt', {session:false}), beneficiarioController.update);
router.delete('/beneficiario/:idbeneficiario', passport.authenticate('jwt', {session:false}), beneficiarioController.remove);

router.post(  '/coleta', passport.authenticate('jwt', {session:false}), coletaController.create);
router.get(   '/coleta', passport.authenticate('jwt', {session:false}), coletaController.getAll);
router.get(   '/coleta/:idcoleta', passport.authenticate('jwt', {session:false}),  coletaController.get);
router.put(   '/coleta/:idcoleta', passport.authenticate('jwt', {session:false}),  coletaController.update);
router.delete('/coleta/:idcoleta', passport.authenticate('jwt', {session:false}),  coletaController.remove);

router.post(  '/dependente', passport.authenticate('jwt', {session:false}), dependenteController.create);
router.get(   '/dependente', passport.authenticate('jwt', {session:false}), dependenteController.getAll);
router.get(   '/dependente/:iddependente', passport.authenticate('jwt', {session:false}),  dependenteController.get);
router.put(   '/dependente/:iddependente', passport.authenticate('jwt', {session:false}),  dependenteController.update);
router.delete('/dependente/:iddependente', passport.authenticate('jwt', {session:false}),  dependenteController.remove);

router.post(  '/entidadebeneficiario', passport.authenticate('jwt', {session:false}), entidadebeneficiarioController.create);
router.get(   '/entidadebeneficiario/:identidade', passport.authenticate('jwt', {session:false}),  entidadebeneficiarioController.getAll);
router.get(   '/entidadebeneficiario/:identidade/:idbeneficiario', passport.authenticate('jwt', {session:false}),  entidadebeneficiarioController.get);
router.put(   '/entidadebeneficiario/:identidade/:idbeneficiario', passport.authenticate('jwt', {session:false}),  entidadebeneficiarioController.update);
router.delete('/entidadebeneficiario/:identidade/:idbeneficiario', passport.authenticate('jwt', {session:false}),  entidadebeneficiarioController.remove);

router.post(  '/entidadeusuario', passport.authenticate('jwt', {session:false}), entidadeusuarioController.create);
router.get(   '/entidadeusuario', passport.authenticate('jwt', {session:false}), entidadeusuarioController.getAll);
router.get(   '/entidadeusuario/:identidade', passport.authenticate('jwt', {session:false}),  entidadeusuarioController.get);
router.get(   '/entidadeusuario/:identidade/:idusuario', passport.authenticate('jwt', {session:false}),  entidadeusuarioController.get);
router.put(   '/entidadeusuario/:identidade/:idusuario', passport.authenticate('jwt', {session:false}),  entidadeusuarioController.update);
router.delete('/entidadeusuario/:identidade/:idusuario', passport.authenticate('jwt', {session:false}),  entidadeusuarioController.remove);

router.post(  '/produto', passport.authenticate('jwt', {session:false}), produtoController.create);
router.get(   '/produto', passport.authenticate('jwt', {session:false}), produtoController.getAll);
router.get(   '/produto/:idproduto', passport.authenticate('jwt', {session:false}),  produtoController.get);
router.put(   '/produto/:idproduto', passport.authenticate('jwt', {session:false}),  produtoController.update);
router.delete('/produto/:idproduto', passport.authenticate('jwt', {session:false}),  produtoController.remove);

module.exports = router;
require('./../middleware/passport')(passport)