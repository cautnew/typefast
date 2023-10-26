const txtUser = document.querySelector('#text-user');
const txtExample = document.querySelector("#text-example");
const btnRestart = document.querySelector("#btn-restart");
const spanTimer = document.querySelector("#span-timer");

const gabaritos = [
  "A chuva cai suavemente, tocando a terra com carinho, trazendo vida e renovação a cada gota que desce do céu.",
  "Em dias chuvosos, a natureza canta uma melodia serena, convidando-nos a refletir e apreciar sua beleza.",
  "Cada pingo de chuva conta uma história, unindo-se para criar rios, alimentar florestas e abraçar a terra."
];

const getRandomInt = (valMax) => Math.floor(Math.random() * valMax);
const maxGabaritos = gabaritos.length;
const indexCurrentGabarito = getRandomInt(maxGabaritos);
const currentGabarito = gabaritos[indexCurrentGabarito];
const totalCharsCurrentGabarito = currentGabarito.length;
const totalWordsCurrentGabarito = currentGabarito.split(' ').length;

var interval;
var timerRunning = false;
var hundredths;

const startTimer = () => {
  timerRunning = true;
  hundredths = 0;
  interval = setInterval(timerClock, 10);
};

const timerClock = () => {
  const cents = hundredths/100;
  const min = Math.floor(cents/60);
  const sec = Math.floor(cents - min * 60);
  const msc = Math.floor(hundredths - sec * 100 - min * 6000);
  const currentTime = min + ":" + sec + "." + msc;

  spanTimer.innerText = currentTime;

  hundredths ++;
};

window.addEventListener('load', function () {
  txtExample.innerText = currentGabarito;
  startTimer();
});
