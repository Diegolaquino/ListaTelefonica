       
        angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, $filter, $http, contatosAPI){
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
                // $http.get("http://url.com").sucess((data, status) => {
                //     $scope.contatos = data;
                //     console.log("aqui");
                // });

                $scope.operadoras = [
                {nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
                {nome: "Vivo", codigo: 15, categoria: "Celular", preco: 3},
                {nome: "Tim", codigo: 41, categoria: "Celular", preco: 1},
                {nome: "Claro", codigo: 51, categoria: "Fixo", preco: 1},
                {nome: "GVT", codigo: 25, categoria: "Fixo", preco: 4}
            ];
            }

            $scope.adicionarContato = function(contato){
                contato.data = new Date('1991/02/28');
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