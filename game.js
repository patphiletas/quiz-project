
// On récupère le tableau 'questions' depuis le fichier questions.js
import { quiz_musique } from "./questions.js";
// Déclaration des variables
let score = 0
let currentQuestionIndex =0;

// Récupération des éléments du DOM
const textQuestion = document.getElementById("question-text");
const reponsePossible = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const replayButton = document.getElementById("replay-button");



function loadQuestion(){
reponsePossible.innerHTML = '';
const currentQuestion = quiz_musique.questions[currentQuestionIndex];
textQuestion.innerText = currentQuestion.question
replayButton.style.display = 'none'

// Boucle pour créer les boutons de réponses possibles 
// et vérifier la réponse donnée via la fonction checkAnswer
currentQuestion.options.forEach(option => {
  // On a créé pour réponse possible un bouton
  const option_btn = document.createElement('button');
  // Injecter le texte des réponses possibles dans chaque bouton
  option_btn.innerText = option;
  // événement clic du bouton entrainant début de la fonction checkAnswer
option_btn.addEventListener('click', () =>{checkAnswer(option_btn, currentQuestion)});
// réglage de l'appenchild pour l'affichage 
reponsePossible.appendChild(option_btn);
})
nextButton.disabled = true; // on désactive le bouton “Suivant” tant qu’aucune réponse n’est choisie
// événement du bouton suivant
nextButton.addEventListener('click', ()=> {
 // Vérifier s'il reste des questions
 if (currentQuestionIndex === quiz_musique.questions.length){
  // Si plus de question, on attaque la fin du quiz
     reponsePossible.innerHTML ='';  // Effacer les options
  //  On affiche une phrase de fin avec le score récupéré de la fonction checkAnswer et le total du tableau
     textQuestion.innerText = `La Partie est terminée 🥳 ${score} / ${quiz_musique.questions.length}`;  // Si plus de questions, indiquer la fin du quiz
//  Cacher le bouton suivant
nextButton.style.display = 'none' 
//  Afficher le bouton Rejouer
replayButton.style.display = 'inline-block'
  // événement clic du bouton entrainant début de la fonction Rejouer
replayButton.addEventListener('click', () =>{Rejouer()});
} else {
// Si le quiz n'est pas fini, la fonction loadQuestion reprend
  loadQuestion()
}
})}


function checkAnswer(option_btn, currentQuestion){
  const allButtons = reponsePossible.querySelectorAll("button");
  //  onne peut peut cliquer sur d’autres options,
  allButtons.forEach((btn) => (btn.disabled = true))
      //  comparer le texte cliqué avec d'autre option  si condition est vria on change la color
    if(option_btn.innerText === currentQuestion.bonne_reponse){
      option_btn.style.backgroundColor = "green";
      score++
    }else{
      option_btn.style.backgroundColor ='red' 
    }
  // Réactiver le bouton "Suivant" après le choix
  nextButton.disabled = false; 
  currentQuestionIndex++ 
  // on a recuperer tous les button est desactiver aussi,
  
}

function Rejouer (){
// Fonction pour réinitialiser le quiz
currentQuestionIndex = 0;
score = 0
// replayButton.addEventListener('click', () =>{
nextButton.style.display = 'inline-block'
// replayButton.style.display = 'none'
loadQuestion()
}
// Rejouer ()
loadQuestion();
