const initialScreen = document.getElementById('initialScreen');
const celebrationScreen = document.getElementById('celebrationScreen');
const pixelCake = document.getElementById('pixelCake');
const candleFlame = document.getElementById('candleFlame');
const volumeHud = document.getElementById('volumeHud');
const volumeFill = document.getElementById('volumeFill');
const volumeText = document.getElementById('volumeText');
const errorMessage = document.getElementById('errorMessage');
const backgroundMusic = document.getElementById('backgroundMusic');

// Act II Elements
const handwrittenLetter = document.getElementById('handwrittenLetter');
const giftBox = document.getElementById('giftBox');
const wishMessage = document.getElementById('wishMessage');
const partyCat = document.getElementById('partyCat');
const memoryAlbum = document.getElementById('memoryAlbum');

// Decoupled Modals
const letterModal = document.getElementById('letterMessage');
const albumModal = document.getElementById('albumWrapper');
const albumPages = document.getElementById('albumPages');
const overlay = document.getElementById('overlayBackdrop');

const closeLetter = document.getElementById('closeLetter');
const closeAlbum = document.getElementById('closeAlbum');
const closeGiftBtn = document.getElementById('closeGiftBtn');

const albumPhotos = Array.from({length: 40}, (_, i) => `${i + 1}.jpeg`);

let audioContext;
let analyser;
let microphone;
let animationFrame;
let hasCelebrated = false;
let stream = null;
let candleLit = false;
let holdTimer = null;
let rainTimer = null;
const BLOW_THRESHOLD = 0.07;
const HOLD_DURATION = 180;

document.addEventListener('DOMContentLoaded', () => {
  if (pixelCake) {
    pixelCake.addEventListener('click', handleCakeClick);
    pixelCake.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleCakeClick();
      }
    });
  }

  // --- ACT II MODAL LOGIC (DECOUPLED) --- //
  
  function closeAllPopups() {
    if(letterModal) letterModal.hidden = true;
    if(albumModal) {
        albumModal.hidden = true;
        setTimeout(() => { albumPages.style.display = 'none'; }, 300);
    }
    
    // Close Gift Box Locally
    if(giftBox) {
        giftBox.classList.remove('open');
        const cluster = giftBox.closest('.aes-basket-cluster');
        if(cluster) cluster.classList.remove('gift-open');
        document.getElementById('pixelChicken').hidden = true;
    }

    if(overlay) overlay.classList.remove('active');
  }

  // Open Letter Modal
  if (handwrittenLetter) {
    handwrittenLetter.addEventListener('click', (e) => {
      if (e.target.closest('.close-btn')) return;
      if (letterModal.hidden) {
        letterModal.hidden = false;
        if(overlay) overlay.classList.add('active');
      }
    });
  }

  // Open Gift Box Locally (White Pop Up)
  if (giftBox) {
    giftBox.addEventListener('click', (e) => {
      if (!giftBox.classList.contains('open')) {
        giftBox.classList.add('open');
        const cluster = giftBox.closest('.aes-basket-cluster');
        if(cluster) cluster.classList.add('gift-open'); 
        document.getElementById('pixelChicken').hidden = false;
        if(overlay) overlay.classList.add('active');
      }
    });
  }

  // Open Album Modal
  if (memoryAlbum && albumPages) {
    albumPages.innerHTML = albumPhotos.map((photo) => `
      <div class="photo-wrap">
        <img src="${encodeURI(`photo/${photo}`)}" onerror="this.src='photo/fi.png'" alt="Memory" loading="lazy">
      </div>
    `).join('');
    
    memoryAlbum.addEventListener('click', (e) => {
      if (e.target.closest('.close-btn')) return; 
      if (albumModal.hidden) {
        albumModal.hidden = false;
        albumPages.style.display = 'grid';
        if(overlay) overlay.classList.add('active');
      }
    });
  }

  // Close Events for all "X" buttons and overlay background
  [overlay, closeLetter, closeAlbum, closeGiftBtn].forEach(btn => {
    if(btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stops gift box from instantly re-opening
            closeAllPopups();
        });
    }
  });

});

// --- CAKE INTERACTION LOGIC --- //
function handleCakeClick() {
  if (!candleLit) {
    candleFlame.classList.add('active');
    candleLit = true;
    initialScreen.classList.add('celebration-active'); 
    if (partyCat) partyCat.classList.add('party-cat--visible');
    if (wishMessage) wishMessage.hidden = false;
    
    if (backgroundMusic) {
      backgroundMusic.volume = 0.5;
      backgroundMusic.play().catch(e => console.log('Autoplay blocked by browser'));
    }
    
    fireConfetti(240);
    startConfettiRain();
    startMicSequence();
  }
}

async function startMicSequence() {
  const success = await requestMicrophone();
  volumeHud.hidden = false;

  if (!success) {
    volumeText.innerHTML = 'Mic access denied.<br><b>Please refresh and allow mic access to blow out the candle!</b>';
    volumeFill.style.width = '0%';
    volumeFill.style.background = '#f43f5e';
    return;
  }

  hasCelebrated = false;
  listenForBlow();
}

async function requestMicrophone() {
  try {
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (location.protocol !== 'https:' && !isLocal) {
      throw new Error('HTTPS_REQUIRED');
    }

    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    microphone = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.05;
    microphone.connect(analyser);
    
    errorMessage.hidden = true;
    return true;
  } catch (error) {
    console.warn('Microphone error:', error);
    errorMessage.textContent = "Mic disabled. Please allow mic access!";
    errorMessage.hidden = false;
    return false;
  }
}

function computeVolume() {
  if (!analyser) return 0;
  const data = new Uint8Array(analyser.fftSize);
  analyser.getByteTimeDomainData(data);
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const sample = data[i] / 128 - 1;
    sum += sample * sample;
  }
  const rms = Math.sqrt(sum / data.length);
  return Math.min(rms * 4.5, 1);
}

function listenForBlow() {
  if (!analyser || hasCelebrated) return;

  const volume = computeVolume();
  const isBlowing = volume > BLOW_THRESHOLD;
  const volumePercent = Math.min(volume * 100, 100);
  
  volumeFill.style.width = `${volumePercent}%`;

  if (volumePercent < 20) {
    volumeText.textContent = 'Blow gently toward your microphone... 💨';
  } else if (volumePercent < 60) {
    volumeText.textContent = 'Keep blowing! 🔥';
  } else {
    volumeText.textContent = 'Great! Hold it... 🎂';
  }

  if (isBlowing && !holdTimer) {
    holdTimer = setTimeout(triggerCelebration, HOLD_DURATION);
  } else if (!isBlowing && holdTimer) {
    clearTimeout(holdTimer);
    holdTimer = null;
  }

  animationFrame = requestAnimationFrame(listenForBlow);
}

function triggerCelebration() {
  if (hasCelebrated) return;
  hasCelebrated = true;

  if (animationFrame) cancelAnimationFrame(animationFrame);
  if (stream) stream.getTracks().forEach(track => track.stop());
  if (rainTimer) {
    clearInterval(rainTimer);
    rainTimer = null;
  }
  confettiParticles = [];
  const confettiCanvas = document.getElementById('confettiCanvas');
  if (confettiCanvas) confettiCanvas.getContext('2d').clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  candleFlame.classList.remove('active');
  volumeHud.style.opacity = '0';

  setTimeout(() => {
    initialScreen.style.opacity = '0';
    setTimeout(() => {
      initialScreen.hidden = true;
      celebrationScreen.hidden = false;
      
      void celebrationScreen.offsetWidth;
      celebrationScreen.style.opacity = '1';

      if (backgroundMusic) backgroundMusic.volume = 0.7;
      
    }, 800);
  }, 500);
}

let confettiParticles = [];
let isConfettiRunning = false;

function startConfettiRain() {
  if (rainTimer) return;
  rainTimer = setInterval(() => addConfettiRain(12), 260);
  addConfettiRain(36);
}

function addConfettiRain(amount) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const colors = ['#f6d365', '#fda085', '#f472b6', '#c084fc', '#4ade80', '#fbbf24', '#ffffff'];
  for (let i = 0; i < amount; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height,
      r: Math.random() * 4 + 3,
      dx: Math.random() * 1.4 - .7,
      dy: Math.random() * 1.5 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleInc: (Math.random() * 0.06) + 0.03,
      tiltAngle: Math.random() * Math.PI,
      isRain: true
    });
  }
  if (!isConfettiRunning) {
    isConfettiRunning = true;
    renderConfetti(canvas.getContext('2d'), canvas);
  }
}

function fireConfetti(amount = 150) {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#f6d365', '#fda085', '#f472b6', '#c084fc', '#4ade80', '#fbbf24', '#ffffff'];

  for (let i = 0; i < amount; i++) {
    confettiParticles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + 50,
      r: Math.random() * 6 + 4,
      dx: Math.random() * 26 - 13,
      dy: Math.random() * -28 - 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleInc: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }

  if (!isConfettiRunning) {
    isConfettiRunning = true;
    renderConfetti(ctx, canvas);
  }
}

function renderConfetti(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    let p = confettiParticles[i];
    
    p.tiltAngle += p.tiltAngleInc;
    p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
    p.x += Math.sin(p.tiltAngle) * 2;
    if (!p.isRain) p.dy += 0.35;
    p.y += p.dy;
    p.x += p.dx + (p.isRain ? Math.sin(p.tiltAngle) * .4 : 0);

    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
    ctx.stroke();

    if (p.y > canvas.height + 20) {
      confettiParticles.splice(i, 1);
    }
  }

  if (confettiParticles.length > 0) {
    requestAnimationFrame(() => renderConfetti(ctx, canvas));
  } else {
    isConfettiRunning = false;
  }
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("confettiCanvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});