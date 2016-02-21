module.exports = function(app) {

  var contato ={
    nome: String
  , email: String
  };

  var usuario = {
      nome: { type: String, required: true }
    , email: { type: String, required: true}
    , contatos: [contato]
  };
  
  return usuario;
};