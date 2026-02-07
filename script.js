(function () {
  "use strict";

  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const buttonsWrapper = document.getElementById("buttonsWrapper");
  const successMessage = document.getElementById("successMessage");
  const confettiContainer = document.getElementById("confettiContainer");
  const floatingHearts = document.querySelector(".floating-hearts");

  const RUN_AWAY_RADIUS = 140;
  const RUN_AWAY_SPEED = 28;
  const HEARTS = ["❤️", "💕", "💗", "💖", "💝", "♥"];

  let noButtonX = 0;
  let noButtonY = 0;
  let wrapperRect = { left: 0, top: 0, width: 0, height: 0 };

  function updateWrapperRect() {
    const r = buttonsWrapper.getBoundingClientRect();
    wrapperRect = { left: r.left, top: r.top, width: r.width, height: r.height };
  }

  function initNoButtonPosition() {
    updateWrapperRect();
    noButtonX = wrapperRect.width / 2 + 70;
    noButtonY = wrapperRect.height / 2;
    setNoButtonPosition();
  }

  function setNoButtonPosition() {
    btnNo.style.left = noButtonX + "px";
    btnNo.style.top = noButtonY + "px";
    btnNo.style.transform = "translate(-50%, -50%)";
  }

  function handleMouseMove(e) {
    updateWrapperRect();
    const mx = e.clientX - wrapperRect.left;
    const my = e.clientY - wrapperRect.top;
    const bx = noButtonX;
    const by = noButtonY;
    const dist = Math.hypot(mx - bx, my - by);

    if (dist < RUN_AWAY_RADIUS && dist > 0) {
      const dx = (bx - mx) / dist;
      const dy = (by - my) / dist;
      noButtonX += dx * RUN_AWAY_SPEED;
      noButtonY += dy * RUN_AWAY_SPEED;

      const padding = 60;
      const maxX = wrapperRect.width - padding;
      const maxY = wrapperRect.height - padding;
      noButtonX = Math.max(padding, Math.min(maxX, noButtonX));
      noButtonY = Math.max(padding, Math.min(maxY, noButtonY));
      setNoButtonPosition();
    }
  }

  function onYesClick() {
    buttonsWrapper.classList.add("hidden");
    successMessage.classList.remove("hidden");
    spawnConfetti();
  }

  function spawnConfetti() {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "confetti-piece";
      el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      el.style.left = Math.random() * 100 - 10 + "%";
      el.style.animationDelay = Math.random() * 0.5 + "s";
      el.style.animationDuration = 2 + Math.random() * 1.5 + "s";
      confettiContainer.appendChild(el);
      setTimeout(function () {
        el.remove();
      }, 4000);
    }
  }

  function addFloatingHearts() {
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement("span");
      heart.className = "heart-float";
      heart.textContent = ["♥", "❤", "💕"][i % 3];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 100 + "%";
      heart.style.fontSize = (0.8 + Math.random() * 0.8) + "rem";
      heart.style.animationDuration = 5 + Math.random() * 6 + "s";
      heart.style.animationDelay = -Math.random() * 8 + "s";
      floatingHearts.appendChild(heart);
    }
  }

  btnYes.addEventListener("click", onYesClick);
  document.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", initNoButtonPosition);

  addFloatingHearts();
  initNoButtonPosition();
})();
