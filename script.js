const txtUser = document.querySelector('#text-user');
const txtExample = document.querySelector("#text-example");
const spanTimer = document.querySelector("#span-timer");
const btnRestart = document.querySelector("#btn-restart");

const gabaritos = [
  "A chuva cai suavemente, tocando a terra com carinho, trazendo vida e renovação a cada gota que desce do céu.",
  "Em dias chuvosos, a natureza canta uma melodia serena, convidando-nos a refletir e apreciar sua beleza.",
  "Cada pingo de chuva conta uma história, unindo-se para criar rios, alimentar florestas e abraçar a terra."
];

const getRandomInt = (valMax) => Math.floor(Math.random() * valMax);
const maxGabaritos = gabaritos.length;

var interval;
var timerRunning = false;
var hundredths = 0;
var indexCurrentGabarito = 0;
var totalWordsCurrentGabarito = 0;
var totalCharsCurrentGabarito = 0;
var currentGabarito = "";
var txtTyped = "";

const startTimer = () => {
  timerRunning = true;
  hundredths = 0;
  interval = setInterval(timerClock, 10);
};

const stopTimer = () => {
  clearInterval(interval);
  timerRunning = false;
};

const leadingZero = (num = 0) => {
  if (num <= 9) {
    num = "0" + num;
  }

  return num;
}

const timerClock = () => {
  updateTimer();
  hundredths ++;
};

const updateTimer = () => {
  const cents = hundredths/100;
  const min = Math.floor(cents/60);
  const mili_min = min * 60;

  const sec = Math.floor(cents - mili_min);
  const hand_sec = sec * 100;
  const hand_mili_sec = mili_min * 100;

  const msc = Math.floor(hundredths - hand_sec - hand_mili_sec);

  spanTimer.innerText = leadingZero(min) + ":" + leadingZero(sec) + "." + leadingZero(msc);
};

const getGabarito = () => {
  indexCurrentGabarito = getRandomInt(maxGabaritos);
  return gabaritos[indexCurrentGabarito];
};

const loadStatistics = () => {
  totalCharsCurrentGabarito = currentGabarito.length;
  totalWordsCurrentGabarito = currentGabarito.split(' ').length;
};

const startGame = () => {
  const txtTyped = txtUser.value;
  const charsTyped = txtTyped.length;

  txtUser.setAttribute('maxlength', totalCharsCurrentGabarito);

  if (charsTyped === 0 && !timerRunning) {
    startTimer();
  }
};

const resetGame = () => {
  stopTimer();
  hundredths = 0;
  updateTimer();
  currentGabarito = getGabarito();
  loadStatistics();
  txtExample.innerText = currentGabarito;
  txtUser.value = '';
  txtUser.removeAttribute('disabled');
};

const resultCheck = () => {
  txtTyped = txtUser.value;
  const qtdCharsTyped = txtTyped.length;

  if (txtTyped == currentGabarito) {
    stopTimer();
    txtUser.setAttribute('disabled', 'disabled');
  }
};

window.addEventListener('load', function () {
  btnRestart.addEventListener('click', resetGame);
  txtUser.addEventListener('keyup', resultCheck);
  txtUser.addEventListener('keypress', startGame);

  resetGame();
});
