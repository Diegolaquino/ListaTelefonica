       
        angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, $filter, $http, contatosAPI, operadorasAPI, serialGenerator){
            $scope.app = "Lista Telefonica";
            $scope.contatos = [];

            var carregarContatos = () => {
                contatosAPI.getContatos().then(function sucessCallBack(data){
                    $scope.contatos = data.data;
                }, function errorCallBack(data){
                    $scope.message = "Aconteceu um problema: " + data;
                });
                
            }

            var carregarOperadoras = () => {
                operadorasAPI.getOperadoras().then(function sucessCallBack(data){
                    $scope.operadoras = data.data;
                }, function errorCallBack(data){
                    $scope.message = "Aconteceu um problema: " + data;
                });
            }

            $scope.adicionarContato = function(contato){
               
                contato.serial = serialGenerator.generate();
                contato.data = new Date();
                contatosAPI.saveContatos(contato).then(function sucessCallBack(data){
                    delete $scope.contato;
                    $scope.contatoForm.$setPristine();
                    carregarContatos();
                }, function errorCallBack(data){
                    $scope.message = "Aconteceu um problema: " + data;
                });
            }
            $scope.selecionado;
            $scope.apagarContatos = (contatos) => {
                let selecionados = contatos.filter(c => !c.selecionado);
                $scope.contatos = selecionados;
            }
            $scope.isContatoSelecionado = (contatos) => {
                    return contatos.some(function(contato) {
                        return contato.selecionado;
                    });
                
            }
            $scope.ordernarPor = function(campo){
                $scope.criterioDeOrdenacao = campo;
                $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
            }

            $scope.init = function(){
                carregarContatos();
                carregarOperadoras();
            }

            $scope.init();   
        });