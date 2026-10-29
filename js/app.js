(() => {
  'use strict';
  const config = window.CAM_CONFIG;
  const $ = id => document.getElementById(id);
  const total = config.shots.length * config.shotDuration;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let position = 0;
  let previous = null;
  let selected = -1;
  let lastSecond = -1;
  let ready = false;
  const images = config.shots.map((shot, i) => {
    const img = new Image();
    img.alt = shot.title;
    img.className = 'photo';
    img.style.objectPosition = shot.position;
    $('photos').appendChild(img);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'preset';
    button.setAttribute('aria-label', `Seleziona ${shot.short}`);
    button.innerHTML = `<span class="preset-image" style="background-image:url('${shot.src}')"></span><span class="preset-copy"><small>0${i + 1}</small><strong>${shot.short}</strong></span><span class="preset-dot"></span>`;
    button.addEventListener('click', () => { position = i * config.shotDuration; previous = null; render(); });
    $('presets').appendChild(button);
    return img;
  });
  const buttons = [...$('presets').children];
  function updateControls() {
    $('pause').innerHTML = paused ? '▶ <span>Riprendi</span>' : 'Ⅱ <span>Pausa</span>';
    $('pause').setAttribute('aria-pressed', String(paused));
    $('play-state').textContent = paused ? 'Tour in pausa' : 'Tour automatico';
    $('motion-status').textContent = paused ? 'PAUSA' : 'AUTO PAN';
  }
  function transform(index, progress) {
    const shot = config.shots[index];
    const p = Math.max(0, Math.min(1, progress));
    const values = shot.from.map((v, i) => v + (shot.to[i] - v) * p);
    images[index].style.transform = `translate(${values[0]}%, ${values[1]}%) scale(${values[2]})`;
  }
  function render() {
    const index = Math.floor(position / config.shotDuration);
    const local = position % config.shotDuration;
    const next = (index + 1) % images.length;
    const fade = Math.max(0, (local - config.shotDuration + config.crossfade) / config.crossfade);
    const smooth = fade * fade * (3 - 2 * fade);
    images.forEach(img => { img.style.opacity = '0'; img.style.zIndex = '0'; });
    images[index].style.opacity = '1'; images[index].style.zIndex = '1';
    images[next].style.opacity = String(smooth); images[next].style.zIndex = '2';
    transform(index, (local + config.crossfade) / (config.shotDuration + config.crossfade));
    transform(next, (local - config.shotDuration + config.crossfade) / (config.shotDuration + config.crossfade));
    if (selected !== index) {
      selected = index;
      $('shot-title').textContent = config.shots[index].title;
      $('shot-number').textContent = `${String(index + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    }
    $('progress').style.width = `${position / total * 100}%`;
    const second = Math.floor(position / 1000);
    if (second !== lastSecond) {
      lastSecond = second;
      $('elapsed').textContent = String(second).padStart(2, '0');
      document.querySelector('.timeline').setAttribute('aria-valuenow', String(second));
    }
  }
  function frame(now) {
    if (previous !== null && !paused && ready && !document.hidden) position = (position + now - previous) % total;
    previous = now;
    render();
    requestAnimationFrame(frame);
  }
  function clock() {
    const date = new Date();
    const time = $('datetime');
    time.textContent = new Intl.DateTimeFormat('it-IT', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(date).replace(',', '');
    time.dateTime = date.toISOString();
    $('timezone').textContent = `ORA LOCALE · ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  }
  $('pause').addEventListener('click', () => { paused = !paused; previous = null; updateControls(); });
  reduced.addEventListener('change', e => { if (e.matches) { paused = true; updateControls(); } });
  document.addEventListener('visibilitychange', () => { previous = null; clock(); });
  const fullscreen = $('fullscreen');
  if (!document.fullscreenEnabled) { fullscreen.disabled = true; fullscreen.title = 'Schermo intero non disponibile in questo browser'; }
  fullscreen.addEventListener('click', async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.querySelector('.console').requestFullscreen(); }
    catch { fullscreen.title = 'Usa F11 per ingrandire il browser'; }
  });
  document.addEventListener('fullscreenchange', () => { fullscreen.innerHTML = document.fullscreenElement ? '⛶ <span>Esci da schermo intero</span>' : '⛶ <span>Schermo intero</span>'; });
  Promise.all(images.map((img, i) => new Promise(resolve => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = config.shots[i].src;
  }))).then(results => { ready = results.every(Boolean); $('asset-error').hidden = ready; if (!ready) { paused = true; updateControls(); } });
  updateControls(); clock(); setInterval(clock, 1000); requestAnimationFrame(frame);
})();
