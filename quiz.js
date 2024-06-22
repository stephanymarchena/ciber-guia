const $buttonStartQuest = document.querySelector(".start-quiz") // pegando elemento já existente no html -- Variavel para identificar essse elemento.
const $containerPerguntas = document.querySelector(".container-perguntas")
const $respostasContainer = document.querySelector(".respostas-container")
const $perguntaDescricao = document.querySelector(".perguntas")
const $btProxPergunta = document.querySelector(".prox-pergunta")



$buttonStartQuest.addEventListener("click", startQuest ) // aciona o evento de comerçar o quiz
$btProxPergunta.addEventListener("click", $mostrarProxPergunta) // aciona envento de próxima pergunta



let perguntaAtual = 0 // Variável auxilar para marcar a pergunta atual
let totalCorrect = 0 // veriável para contablizar as respostas corretas


function startQuest(){
    $buttonStartQuest.classList.add("esconde-elemento") // adicionando a classe esconde elemento no botão começar quiz para esconde-lo 
    $containerPerguntas.classList.remove("esconde-elemento") // removendo a classe esconde-elemento para que classe container (div) perguntas volte aparecer (está escondida por padrão)
    document.body.classList.add("quiz-iniciado")
    $mostrarProxPergunta()

}

function $mostrarProxPergunta(){
   resetaQuiz()

   if (perguntas.length == perguntaAtual){

      return terminaQuiz()

   } // se o tamanho das perguntas tiver o mesmo tamanho da variavel perguntaAtual significa que o quiz chegou ao fim 


    $perguntaDescricao.textContent = perguntas[perguntaAtual].pergunta // Definindo conteudo que o elemento terá + acessando a variavel que guarda as perguntas
    perguntas[perguntaAtual].respostas.forEach(respostas => {
        const novaResposta = document.createElement("button") 
        novaResposta.classList.add("button-quiz", "resposta")
        novaResposta.textContent = respostas.text
        if(respostas.correct){
            novaResposta.dataset.correct  = respostas.correct
        } 

        $respostasContainer.appendChild(novaResposta) 
        novaResposta.addEventListener("click", respSelecionada)
    })  
    
    }   // Descrição do bloco de código:
       // Acessando cada uma das respostas pelo for each. 
      // Criando um elemento button para cada resposta
     // classes button-quiz" e "resposta adicionadas elemento button criado
    // acessando o texto do novo botão pelo text
   // usando o if para validar a resposta
  // criando uma variável com valor (data attribute) no elemento html para acessar posteriormente no js
 // obtendo a resposta com o contéudo
// adicionando o envento para saber se clicou na resposta certa ou não


    function resetaQuiz(){
      while($respostasContainer.firstChild){
        $respostasContainer.removeChild($respostasContainer.firstChild)
     }  // Realiza verificação se o elemento pai "respostas-container" tem filhos 
        // Enquanto o elemento pai respostas-container tiver um first-child ele será removido, enquanto tiver será removido.
        
     document.body.removeAttribute("class") // removendo as classes do body, afim de resetar ao padrão assim removendo as cores de fundo etc...
     $btProxPergunta.classList.add("esconde-elemento") // escondendo o botão para não ficar visivel após carregar a próxima pergunta

    }


    function respSelecionada(event){
        const respEscolhida = event.target 

        if(respEscolhida.dataset.correct){
            document.body.classList.add("correct")
            totalCorrect++
        }

        else{
            document.body.classList.add("incorrect")
        }

        document.querySelectorAll(".resposta").forEach(button =>{
         
          if(button.dataset.correct){
            
            button.classList.add("correct")
          
          } 
          
          else{
            
            button.classList.add("incorrect")
          
          }
          
          button.disabled = true
        })

        $btProxPergunta.classList.remove("esconde-elemento")
        perguntaAtual++


    }  // verificar se o usuario escolheu ou não a resposta correta (Saber em qual botão foi clicado)
      // event.target = elemento que o usuario clicou 
     // armazenando o elemento clicado na const respostaEscolhida
    // validar se o botão foi clicado foi a resposta correta ou não, pelo dataset 
   // selecionando todos os elementos que tenham a classe "resposta"
  // será analisado um botão de cada vez pelo for each 
 // removendo a classe "esconde-elemento" para o botão de próxima pergunta ficar visivel
// realizando incremento na variável perguntaAtual


function terminaQuiz(){
   const totalPerguntas = perguntas.length // tamanho da lista de perguntas 
   const desempenho = Math.floor(totalCorrect * 100 / totalPerguntas) // variavel e calculo para avaliar o desempenho do usuário 

   let mensagem = ""

   switch(true) {
      case(desempenho >= 90):
      mensagem = "Você foi Excelente, parabéns!"
      break
     
      case(desempenho >= 70):
      mensagem = "Muito bom!"
      break

      case(desempenho >= 50):
      mensagem = "Bom!"
      break

      default:
        mensagem = "Você pode melhorar..."

   }

   $containerPerguntas.innerHTML = 
   `
   <p class = "mensagem-final"> 

   Você acertou ${totalCorrect} de ${totalPerguntas} perguntas!
   <span>Resultado: ${mensagem} </span>
   
   </p>

   <button onclick = window.location.reload() class="button-quiz"> Refazer Quiz </button>
   
   
`
  } // Realizando a validação do quiz + recarregando a página para o usuario tentar novamente 



// Perguntas e respostas: 

const perguntas = [
    {
      pergunta: "01 - Qual a melhor maneira de se proteger contra malware?",
      respostas: [
        { text: "Instalar um software antivírus e antispyware confiável.", correct: false},
        { text: "Evitar baixar arquivos de sites desconhecidos.", correct: false},
        { text: "Manter o sistema operacional e os softwares atualizados.", correct: false},
        { text: "Todas as alternativas acima.", correct: true}

      ]
    }, 

    {
        pergunta: "02 - O que é phishing?",
        respostas: [
          { text: "Um tipo de malware que criptografa seus arquivos e exige um resgate para liberá-los.", correct: false},
          { text: "Uma técnica que tenta induzir você a fornecer informações confidenciais para golpistas.", correct: true},
          { text: "É um tipo de vírus que se replica automaticamente e infecta outros arquivos.", correct: false},
          { text: "Uma rede de computadores que são controlados remotamente por hackers.", correct: false}
  
        ]  
    },


    {
        pergunta: "03 - O que fazer se você receber um email suspeito?",
        respostas: [
          { text: "Abra o email e clique em todos os links.", correct: false},
          { text: "Responda ao email com suas informações confidenciais.", correct: false},
          { text: "Exclua o email imediatamente sem abri-lo.", correct: true},
          { text: "Encaminhe o email para um amigo para que ele também possa clicar nos links.", correct: false}
  
        ]  
    }, 


    {
        pergunta: "04 - Qual é um exemplo de engenharia social?",
        respostas: [
          { text: "Receber um email de um amigo pedindo dinheiro emprestado.", correct: false},
          { text: "Clicar em um link em um email que parece ser do seu banco.", correct: false},
          { text: "Abrir um email suspeito solicitando urgência.", correct: false},
          { text: "Todas as alternativas acima.", correct: true}
  
        ]  
    },


    {
        pergunta: "05 - O que fazer se você receber uma mensagem suspeita pedindo suas informações confidenciais?",
        respostas: [
          { text: "Responda à mensagem com suas informações confidenciais.", correct: false},
          { text: "Ligue para a empresa ou órgão em questão para confirmar a autenticidade da solicitação.", correct: false},
          { text: "Ignora a mensagem e exclua-a imediatamente.", correct: true},
          { text: "Encaminhe a mensagem para um amigo para que ele também possa fornecer suas informações.", correct: false}
  
        ]  
    },


    {
        pergunta: "06 - Quais os principais riscos de ter o celular roubado?",
        respostas: [
          { text: "Perda de dados pessoais, como fotos, contatos e mensagens.", correct: false},
          { text: "Realização de compras online em seu nome.", correct: false},
          { text: "Acesso a contas bancárias e envio de mensagens fraudulentas.", correct: false},
          { text: "Todas as alternativas acima.", correct: true}
  
        ]  
    },


    {
        pergunta: "07 - Qual a melhor forma de proteger seus dados de cartão de crédito ao fazer compras online?",
        respostas: [
          { text: "Deixando seus dados do cartão de crédito salvos apenas em sites que confia", correct: false},
          { text: "Utilizando cartões de crédito virtuais ou serviços de pagamento seguros.", correct: true},
          { text: "Compartilhar a senha do cartão apenas com pessoas que você conhece", correct: false},
          { text: "Todas as alternativas acima.", correct: false}
  
        ]  
    },


    {
        pergunta: "08 - Quais são os principais riscos de usar redes Wi-Fi públicas não protegidas?",
        respostas: [
          { text: "Seus dados podem ser interceptados por cibercriminosos.", correct: true},
          { text: "Risco de navegar de forma anonima pela internet", correct: false},
          { text: "Risco nenhum, pois não é possivel obter informações do meu dispositivo via rede pública", correct: false},
          { text: "Todas as alternativas acima.", correct: false}
  
        ]  
    },


    {
        pergunta: "09 - O que você deve fazer se notar uma transação suspeita em sua conta bancária?",
        respostas: [
          { text: "Aguardar o banco realizar o estorno da transação suspeita", correct: false},
          { text: "Entrar em contato com o banco imediatamente relatando a transação, assim como realizar alteração da senha bancária. ", correct: true},
          { text: "Atualizar o aplicativo bancário", correct: false},
          { text: "Todas as alternativas acima.", correct: false}
  
        ]  
    },


    {
        pergunta: " 10 - Qual a importância crucial de manter o software do seu dispositivo atualizado?",
        respostas: [
          { text: "Para corrigir falhas de segurança e proteger seu dispositivo contra vulnerabilidades.", correct: true},
          { text: "Para melhorar o desempenho do seu dispositivo, como por exemplo espaço na memória.", correct: false},
          { text: "Para ter acesso a novos recursos, funcionalidades e novos aplicativos lançados.", correct: false},
          { text: "Para garantir a compatibilidade com outros softwares e hardwares.", correct: false}
  
        ]  
    },


]