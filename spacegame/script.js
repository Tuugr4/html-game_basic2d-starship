const ugemi = document.getElementById('ugemi');
const metor = document.getElementById('metor');
const mermiler = document.getElementById('mermiler');
const puan = document.getElementById('skor');

let skorSayac = 0;

function sdf(event) {
  const x = event.clientX;
  ugemi.style.left = x + 'px';
}
function oyunBitti() {
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

function MeteorHareketi(meteor) {
  let ustp = 0;
  let animıd;

  function MeteorAnim() {
    ustp += 5; 
    meteor.style.top = ustp + 'px';

    const metorHr = meteor.getBoundingClientRect();
    const çrp = ugemi.getBoundingClientRect();

    if (ustp < window.innerHeight) {
      animıd = requestAnimationFrame(MeteorAnim);


      if (
        metorHr.left < çrp.right &&
        metorHr.right > çrp.left &&
        metorHr.bottom > çrp.top &&
        metorHr.top < çrp.bottom
      ) {
        clearInterval(oyunDongusu);
        oyunAktif = false;
        document.body.innerHTML = '<div id="oyunBitti"><h1>You Died</h1><p>Score: ' + skorSayac + '</p></div>';
        
      }
    } else {
      metor.removeChild(meteor);
    }
  }

  MeteorAnim();
}
function meteorOlustur() {
  const meteor = document.createElement('div');
  meteor.classList.add('metor');
  meteor.style.left = Math.random() * (window.innerWidth - 50) + 'px';
  metor.appendChild(meteor);

  MeteorHareketi(meteor);
}
function mermiAt() {
  const mermi = document.createElement('div');
  mermi.classList.add('mermiler');
  const ugemiLeft = parseInt(getComputedStyle(ugemi).left);
  mermi.style.left = ugemiLeft + 'px';
  mermiler.appendChild(mermi);

  mermiHareket(mermi);
}

function mermiHareket(mermi) {
  let ustp = window.innerHeight - 70;
  let animıd;

  function mermiAnim() {
    ustp -= 10;
    mermi.style.top = ustp + 'px';

    const meteor = metor.firstElementChild;
    if (meteor) {
      const metorHr = meteor.getBoundingClientRect();
      const mermiRect = mermi.getBoundingClientRect();

      if (
        metorHr.left < mermiRect.right &&
        metorHr.right > mermiRect.left &&
        metorHr.bottom > mermiRect.top &&
        metorHr.top < mermiRect.bottom
      ) {
        metor.removeChild(meteor);
        mermiler.removeChild(mermi);
        skorSayac += 1;
        skor.innerText = 'Score: ' + skorSayac;
        return;
      }
    }

    if (ustp > 0) {
      animıd = requestAnimationFrame(mermiAnim);
    } else {
      mermiler.removeChild(mermi);
    }
  }

  mermiAnim();
}
window.addEventListener('mousemove', sdf);
window.addEventListener('click', mermiAt);

const oyunDongusu = setInterval(meteorOlustur, 1000);

