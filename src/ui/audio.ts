type Sound = 'tap' | 'toast' | 'rare' | 'roll' | 'impact' | 'victory' | 'defeat';

let context: AudioContext | undefined;
let music: HTMLAudioElement | undefined;

function tone(ctx: AudioContext, frequency: number, delay: number, duration: number, volume: number, wave: OscillatorType = 'sine') {
  const start = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.025, duration / 4));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export function playSfx(sound: Sound) {
  const ctx = context;
  if (!ctx || ctx.state !== 'running') return;
  if (sound === 'tap') tone(ctx, 400, 0, 0.07, 0.09, 'triangle');
  else if (sound === 'rare') {
    tone(ctx, 740, 0, 0.16, 0.11);
    tone(ctx, 990, 0.09, 0.22, 0.09);
    tone(ctx, 1480, 0.2, 0.28, 0.06);
  } else if (sound === 'toast') {
    tone(ctx, 640, 0, 0.09, 0.085);
    tone(ctx, 880, 0.07, 0.13, 0.065);
  } else if (sound === 'roll') {
    for (let i = 0; i < 7; i++) tone(ctx, 240 + (i % 3) * 70, i * 0.09, 0.055, 0.075);
  } else if (sound === 'impact') {
    tone(ctx, 105, 0, 0.24, 0.18, 'triangle');
    tone(ctx, 62, 0.035, 0.28, 0.12, 'sine');
  } else if (sound === 'victory') {
    tone(ctx, 523.25, 0, 0.2, 0.09);
    tone(ctx, 659.25, 0.13, 0.24, 0.085);
    tone(ctx, 783.99, 0.28, 0.35, 0.075);
  } else {
    tone(ctx, 392, 0, 0.25, 0.085);
    tone(ctx, 311, 0.2, 0.32, 0.075);
    tone(ctx, 233, 0.45, 0.42, 0.065);
  }
}

export async function startAudioExperience(): Promise<void> {
  if (!music) {
    music = new Audio(`${import.meta.env.BASE_URL}audio/murim-wuxia.ogg`);
    music.addEventListener('playing', () => { document.documentElement.dataset.musicState = 'playing'; });
    music.addEventListener('pause', () => { document.documentElement.dataset.musicState = 'paused'; });
    music.addEventListener('error', () => { document.documentElement.dataset.musicState = 'error'; });
    music.addEventListener('timeupdate', () => { document.documentElement.dataset.musicTime = String(music?.currentTime ?? 0); });
  }
  music.loop = true;
  music.preload = 'auto';
  music.volume = 0.42;
  // Invoke play synchronously in the click's user-activation window (especially important in Android WebView).
  const musicPlayback = music.play();
  if ('AudioContext' in window) {
    try {
      context ??= new AudioContext();
      if (context.state === 'suspended') await context.resume();
      playSfx('rare');
    } catch { /* A música local continua mesmo se Web Audio estiver indisponível. */ }
  }
  try {
    await musicPlayback;
  } catch {
    document.documentElement.dataset.musicState = 'error';
    throw new Error('A trilha não pôde ser reproduzida. Confira o volume do dispositivo e toque para tentar novamente.');
  }
  document.documentElement.dataset.audioReady = 'true';
}

export function setAudioForeground(foreground: boolean): Promise<void> {
  if (!foreground) {
    music?.pause();
    return context?.state === 'running' ? context.suspend() : Promise.resolve();
  }
  if (music?.paused) void music.play().catch(() => { document.documentElement.dataset.musicState = 'error'; });
  return context?.state === 'suspended' ? context.resume() : Promise.resolve();
}
