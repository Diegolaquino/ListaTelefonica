angular.module("listaTelefonica").factory("contatosAPI", function ($http) {
    var _getContatos = function (){
        return $http.get("http://localhost:3000/contatos");
    };

    var _saveContatos = function (contato){
        return $http.post("http://localhost:3000/contatos", contato);
    };

    return {
        getContatos: _getContatos,
        saveContatos:_saveContatos
    };
});