(($) => {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  var app = (function () {
    return {
      init:function init(){
        this.companyInfo();
        this.getDate();
        this.initEvents();
        this.getInServer();
      },

      getInServer: function getInServer() {
        var get = new XMLHttpRequest();
        get.open('GET', 'http://localhost:3000/car')
        get.send()

        get.onreadystatechange = function(e) {
          if(this.readyState === 4) {
          var parseData = JSON.parse(get.responseText)
          console.log(parseData.length)
          console.log(parseData)
          for (var i = 0 ; i < parseData.length; i++) {
            var $tabelaCarro = $('[data-js="tabela-carro"]').get()
            console.log($tabelaCarro)
            var $renderTableRow = document.createElement('tr')
            var $renderTableData = document.createElement('td')
            var $renderTableData2 = document.createElement('td')
            var $renderTableData3 = document.createElement('td')
            var $renderTableData4 = document.createElement('td')
            var $renderTableData5 = document.createElement('td')
            var $renderImage = document.createElement('img')
            
            $renderImage.setAttribute('src', parseData[i].image)
            $renderTableData.appendChild($renderImage)

              $renderTableData2.textContent = parseData[i].brandModel
              $renderTableData3.textContent = parseData[i].year
              $renderTableData4.textContent = parseData[i].plate
              $renderTableData5.textContent = parseData[i].color
              
              $tabelaCarro.appendChild($renderTableRow)
        
              $renderTableRow.appendChild($renderTableData)
              $renderTableRow.appendChild($renderTableData2)
              $renderTableRow.appendChild($renderTableData3)
              $renderTableRow.appendChild($renderTableData4)
              $renderTableRow.appendChild($renderTableData5)
            }
          }
          
          }
        

      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(event) {
        event.preventDefault()
        var $tabelaCarro = $('[data-js="tabela-carro"]').get()
        console.log($tabelaCarro)
        $tabelaCarro.appendChild(app.createNewcar())
        var post = new XMLHttpRequest();
        post.open('POST', 'http://localhost:3000/car')
        post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        post.send(`image=${$('[data-js="imagem"]').get().value}&brandModel=${$('[data-js="marca-modelo"]').get().value}&year=${$('[data-js="ano"]').get().value}&plate=${$('[data-js="placa"]').get().value}&color=${$('[data-js="cor"]').get().value}`)
    
        post.onreadystatechange = function(e) {
          console.log(post.responseText, post.status)
        }
    },
    
    createNewcar: function createNewcar() {
      var $fragment = document.createDocumentFragment();
      var $tr = document.createElement('tr');
      var $tdImagem = document.createElement('td');
      var $imagem = document.createElement('img')
      var $tdMarcaModelo = document.createElement('td');
      var $tdAno = document.createElement('td');
      var $tdPlaca = document.createElement('td');
      var $tdCor = document.createElement('td');
      var $btnDelete = document.createElement('button')



        $imagem.setAttribute('src', $('[data-js="imagem"]').get().value);
        $tdImagem.appendChild($imagem)

        
        $tdMarcaModelo.textContent = $('[data-js="marca-modelo"]').get().value
        $tdAno.textContent = $('[data-js="ano"]').get().value
        $tdPlaca.textContent = $('[data-js="placa"]').get().value
        $tdCor.textContent = $('[data-js="cor"]').get().value
        $btnDelete.textContent = 'Deletar'
        $btnDelete.setAttribute('class','btn btn-danger')
        
        $tr.appendChild($tdImagem)
        $tr.appendChild($tdMarcaModelo)
        $tr.appendChild($tdAno)
        $tr.appendChild($tdPlaca)
        $tr.appendChild($tdCor)
        $tr.appendChild($btnDelete)
        

        $btnDelete.addEventListener('click', deleteElement, false)

        function deleteElement() {
          $tr.removeChild($tdAno)
          $tr.removeChild($tdCor)
          $tr.removeChild($tdPlaca)
          $tr.removeChild($tdImagem)
          $tr.removeChild($tdMarcaModelo)
          $tr.removeChild($btnDelete)
        }
        
        return $fragment.appendChild($tr)
      },

      companyInfo: function companyInfo(){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo:function getCompanyInfo() {
        if(!app.isReady.call(this))
          return;
        var data = JSON.parse(this.responseText)
        var $nomeEmpresa = $('[data-js="nomeEmpresa"]').get()
        var $telefoneEmpresa = $('[data-js="telefone"]').get()
        $nomeEmpresa.textContent = data.name
        $telefoneEmpresa.textContent = data.phone
      },

       getDate: function getDate() {
        var spanHora = document.querySelector('[data-js="hora"]');
        var spanData = document.querySelector('[data-js="date"]')
        var diaSemana = ['Domingo', 'Segunda','Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        var mesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        function realTime () {
        var date = new Date()
        var mostraData = `${diaSemana[date.getDay()]}, ${date.getDate()} ${mesAno[date.getMonth()]} ${date.getFullYear()}`
        var zeroFill = function (n) { return ('0' + n ).slice(-2)}
        var h = zeroFill(date.getHours())
        var min = zeroFill(date.getMinutes())
        var sec = zeroFill(date.getSeconds())
        var horaCompleta = `${h}:${min}:${sec}`
        spanHora.textContent = horaCompleta
        spanData.textContent = mostraData
        }
        realTime()
        setInterval(realTime, 500)
      },
      
      isReady: function isReady(){
        return this.readyState === 4 && this.status === 200;
      }
    };
  })()

  app.init()

})(window.DOM);
