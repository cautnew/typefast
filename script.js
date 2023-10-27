const txtUser = document.querySelector('#text-user');
const txtExample = document.querySelector("#text-example");
const spanTimer = document.querySelector("#span-timer");
const btnRestart = document.querySelector("#btn-restart");
const spcProgress = document.querySelector(".progress");
const progressBar = spcProgress.querySelector(".progress-bar");
const tableStatistics = document.querySelector('#table-statistics');
const celValTime = document.querySelector("#val-time");
const celValWordCount = document.querySelector("#val-word-count");
const celValCharCount = document.querySelector("#val-char-count");
const celEvgWordCount = document.querySelector("#evg-word-count");
const celEvgCharCount = document.querySelector("#evg-char-count");

var interval;
var timerRunning = false;
var hundredths = 0;
var cents = 0;
var min = 0;
var sec = 0;
var msc = 0;
var totalSec = 0;
var indexCurrentGabarito = 0;
var totalWordsCurrentGabarito = 0;
var totalCharsCurrentGabarito = 0;
var currentGabarito = "";
var txtTyped = "";

const gabaritos = [
  "A chuva cai suavemente, tocando a terra com carinho, trazendo vida e renovação a cada gota que desce do céu.",
  "Em dias chuvosos, a natureza canta uma melodia serena, convidando-nos a refletir e apreciar sua beleza.",
  "Cada pingo de chuva conta uma história, unindo-se para criar rios, alimentar florestas e abraçar a terra."
];

const maxGabaritos = gabaritos.length;

const getRandomInt = (valMax) => Math.floor(Math.random() * valMax);

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

const startTimer = () => {
  timerRunning = true;
  hundredths = 0;
  interval = setInterval(timerClock, 10);
};

const stopTimer = () => {
  clearInterval(interval);
  timerRunning = false;
};

const updateProgressBar = (percent) => {
  spcProgress.setAttribute('aria-valuenow', percent);
  progressBar.style.width = percent + "%";
};

const getGabarito = () => {
  indexCurrentGabarito = getRandomInt(maxGabaritos);
  return gabaritos[indexCurrentGabarito];
};

const loadStatistics = () => {
  totalCharsCurrentGabarito = currentGabarito.length;
  totalWordsCurrentGabarito = currentGabarito.split(' ').length;
};

const updateTimer = () => {
  cents = hundredths/100;
  const val_min = cents/60;
  min = Math.floor(val_min);

  const mili_min = min * 60;
  const val_sec = cents - mili_min;
  sec = Math.floor(val_sec);

  const hand_sec = sec * 100;
  const hand_mili_sec = mili_min * 100;
  const val_msc = hundredths - hand_sec - hand_mili_sec
  msc = Math.floor(val_msc);

  totalSec = mili_min + Math.round(val_sec);

  spanTimer.innerText = leadingZero(min) + ":" + leadingZero(sec) + "." + leadingZero(msc);
};

const startGame = () => {
  txtTyped = txtUser.value;
  const charsTyped = txtTyped.length;

  btnRestart.innerText = "Reiniciar jogo";
  txtUser.setAttribute('maxlength', totalCharsCurrentGabarito);

  if (charsTyped === 0 && !timerRunning) {
    startTimer();
  }
};

const endGame = () => {
  stopTimer();
  txtUser.setAttribute('disabled', 'disabled');
  const evgWordCount = totalWordsCurrentGabarito / totalSec;
  const evgCharCount = totalCharsCurrentGabarito / totalSec;

  celValTime.innerText = totalSec + "s";
  celValWordCount.innerText = totalWordsCurrentGabarito;
  celValCharCount.innerText = totalCharsCurrentGabarito;
  celEvgWordCount.innerText = evgWordCount.toFixed(2) + "w/s";
  celEvgCharCount.innerText = evgCharCount.toFixed(2) + "c/s";

  tableStatistics.style.display = 'block';
};

const resetGame = () => {
  stopTimer();
  hundredths = 0;
  updateTimer();
  currentGabarito = getGabarito();
  loadStatistics();
  txtExample.innerText = currentGabarito;
  btnRestart.innerText = "Carregar de novo";
  txtUser.value = '';
  tableStatistics.style.display = 'none';
  txtUser.removeAttribute('disabled');
  updateProgressBar(0);
};

const resultCheck = () => {
  txtTyped = txtUser.value;
  const qtdCharsTyped = txtTyped.length;
  const percentTyped = Math.round(qtdCharsTyped / totalCharsCurrentGabarito * 100);

  updateProgressBar(percentTyped);

  if (txtTyped == currentGabarito) {
    progressBar.classList.add('bg-primary');
    progressBar.classList.remove('bg-danger');
    endGame();
  } else {
    progressBar.classList.add('bg-danger');
    progressBar.classList.remove('bg-primary');
  }
};

window.addEventListener('load', function () {
  btnRestart.addEventListener('click', resetGame);
  txtUser.addEventListener('keyup', resultCheck);
  txtUser.addEventListener('keypress', startGame);
  tableStatistics.style.display = 'none';

  resetGame();
});
