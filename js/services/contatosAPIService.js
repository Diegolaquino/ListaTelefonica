angular.module("listaTelefonica").factory("contatosAPI", function ($http) {
    const mainUrl = "http://localhost:3000/contatos";
    
    var _getContatos = function (){
        return $http.get(mainUrl);
    };

    var _saveContatos = function (contato){
        return $http.post(mainUrl, contato);
    };

    return {
        getContatos: _getContatos,
        saveContatos:_saveContatos
    };
});