type Sound = 'tap' | 'toast' | 'rare' | 'roll' | 'impact' | 'victory' | 'defeat';

let context: AudioContext | undefined;
let musicGain: GainNode | undefined;
let musicStarted = false;

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

function startMusic(ctx: AudioContext) {
  if (musicStarted) return;
  musicStarted = true;
  musicGain = ctx.createGain();
  musicGain.gain.setValueAtTime(0.0001, ctx.currentTime);
  musicGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 2.5);
  musicGain.connect(ctx.destination);
  for (const [frequency, wave, volume] of [[110, 'sine', 0.55], [164.81, 'triangle', 0.18], [220, 'sine', 0.1]] as const) {
    const oscillator = ctx.createOscillator();
    const level = ctx.createGain();
    oscillator.type = wave;
    oscillator.frequency.value = frequency;
    level.gain.value = volume;
    oscillator.connect(level);
    level.connect(musicGain);
    oscillator.start();
  }
}

export function playSfx(sound: Sound) {
  const ctx = context;
  if (!ctx || ctx.state !== 'running') return;
  if (sound === 'tap') tone(ctx, 400, 0, 0.05, 0.018, 'sine');
  else if (sound === 'rare') {
    tone(ctx, 740, 0, 0.16, 0.05);
    tone(ctx, 990, 0.09, 0.22, 0.04);
    tone(ctx, 1480, 0.2, 0.28, 0.025);
  } else if (sound === 'toast') {
    tone(ctx, 640, 0, 0.09, 0.035);
    tone(ctx, 880, 0.07, 0.13, 0.025);
  } else if (sound === 'roll') {
    for (let i = 0; i < 7; i++) tone(ctx, 240 + (i % 3) * 70, i * 0.09, 0.055, 0.018);
  } else if (sound === 'impact') {
    tone(ctx, 105, 0, 0.24, 0.09, 'triangle');
    tone(ctx, 62, 0.035, 0.28, 0.06, 'sine');
  } else if (sound === 'victory') {
    tone(ctx, 523.25, 0, 0.2, 0.04);
    tone(ctx, 659.25, 0.13, 0.24, 0.04);
    tone(ctx, 783.99, 0.28, 0.35, 0.035);
  } else {
    tone(ctx, 392, 0, 0.25, 0.04);
    tone(ctx, 311, 0.2, 0.32, 0.035);
    tone(ctx, 233, 0.45, 0.42, 0.03);
  }
}

export function startAudioExperience(): Promise<void> {
  if (!('AudioContext' in window)) return Promise.reject(new Error('Este navegador não oferece suporte a Web Audio.'));
  context ??= new AudioContext();
  return (context.state === 'suspended' ? context.resume() : Promise.resolve()).then(() => {
    if (!context) throw new Error('Não foi possível inicializar o áudio.');
    startMusic(context);
    document.documentElement.dataset.audioReady = 'true';
  });
}
