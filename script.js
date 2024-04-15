// Obtém o elemento HTML com o id "search"
let search = document.getElementById("search");

// Obtém o elemento HTML com o id "auto-complete"
const ul = document.getElementById("auto-complete");

// Cria um array vazio chamado "hero"
let hero = [];

// Evento que é acionado quando uma tecla é pressionada no campo de busca
search.onkeyup = function () {
  // Obtém o valor atual do campo de busca
  var searchname = search.value;
  // Verifica se o campo de busca não está vazio
  if (searchname !== "") {
    // Faz uma solicitação à API do Superhero para buscar super-heróis com base no nome digitado
    fetch(
      "https://superheroapi.com/api.php/ 3328323083897178/search/" +
        searchname.trim()
    )
      // Converte a resposta para JSON
      .then((response) => response.json())
      // Manipula os dados recebidos
      .then((data) => {
        console.log(data);
        // Função para exibir os heróis encontrados
        function showhero() {
          var heronames = data.results;
          console.log(data.results);
          // Limpa a lista de sugestões
          ul.innerText = " ";
          // Itera sobre os heróis encontrados
          for (var i of heronames) {
            var li = document.createElement("li");
            // Define o nome do herói como conteúdo do elemento de lista
            li.innerHTML = i.name;
            // Define o ID do herói como ID do elemento de lista
            li.id = i.id;

            // Adiciona um evento de clique para carregar os detalhes do herói ao clicar no elemento de lista
            li.addEventListener("click", function () {
              heroid = this.id;
              console.log(heroid + "this is id");
              // Chama a função para carregar os detalhes do herói
              loadDetails(heroid);
              // Limpa a lista de sugestões após o clique
              ul.innerText = " ";
            });
            // Define o estilo de exibição do elemento de lista
            li.setAttribute("style", "display: block;");
            // Adiciona o elemento de lista à lista de sugestões
            ul.appendChild(li);
          }
        }

        // Chama a função para exibir os heróis encontrados
        showhero();
      })
      // Manipula erros
      .catch((err) => console.log(err));
  }
};

// Função para carregar os detalhes de um herói
function loadDetails(heroid) {
  // Faz uma solicitação à API do Superhero para obter os detalhes do herói com base no ID
  fetch(`https://superheroapi.com/api.php/ 3328323083897178/${heroid}`)
    // Converte a resposta para JSON
    .then((response) => response.json())
    // Manipula os dados recebidos
    .then((data) => {
      console.log(data);

      // Obtém o elemento HTML com o id "details"
      var details = document.getElementById('details');
      // Define o estilo de fundo do elemento de detalhes
      details.setAttribute("style","background-color:rgba(0,0,0,0.8);")

      // Obtém o elemento HTML com o id "img"
      var img = document.getElementById("img");
      // Define o atributo src da imagem com a URL da imagem do herói
      img.setAttribute("src", data.image.url);

      // Obtém o elemento HTML com o id "name"
      var name = document.getElementById("name");
      // Define o nome do herói como conteúdo do elemento
      name.innerHTML = data.name;

      // Obtém o elemento HTML com o id "bio"
      var bio = document.getElementById("bio");
      // Define a biografia do herói como conteúdo do elemento
      bio.innerHTML =   " Relatives :" +  data.connections.relatives ;

      // Obtém o elemento HTML com o id "good"
      var good = document.getElementById("good");
      // Define a natureza do herói como conteúdo do elemento
      good.innerText = "Nature :" + data.biography.alignment;

      // Obtém o elemento HTML com o id "base"
      var base = document.getElementById("base");
      // Define o local de trabalho do herói como conteúdo do elemento
      base.innerHTML = "Work :" + data.work.base;

      // Obtém o elemento HTML com o id "occupation"
      var occ = document.getElementById("occupation");
      // Define a ocupação do herói como conteúdo do elemento
      occ.innerHTML = "Occupation :" + data.work.occupation;

      // Obtém o elemento HTML com o id "powerstats"
      var powestat = document.getElementById("powerstats");
      // Define as estatísticas de poder do herói como conteúdo do elemento
      powestat.innerHTML =
        "Intelligence : " +
        data.powerstats.intelligence +
        ", Combat : " +
        data.powerstats.combat +
        ", Power : " +
        data.powerstats.power +
        ", Speed : " +
        data.powerstats.speed +
        ", Strength : " +
        data.powerstats.strength;

    })
    // Manipula erros
    .catch((error) => console.log(error));
}
