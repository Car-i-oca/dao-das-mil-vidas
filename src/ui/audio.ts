type Sound = 'tap' | 'toast' | 'rare';

let context: AudioContext | undefined;
let bgm: HTMLAudioElement | undefined;

function audio(): AudioContext | null {
  if (!('AudioContext' in window)) return null;
  context ??= new AudioContext();
  if (context.state === 'suspended') void context.resume();
  return context;
}

function tone(ctx: AudioContext, frequency: number, delay: number, duration: number, volume: number, wave: OscillatorType = 'sine') {
  const start = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export function playSfx(sound: Sound) {
  const ctx = audio();
  if (!ctx) return;
  if (sound === 'tap') tone(ctx, 400, 0, 0.05, 0.018, 'sine');
  else if (sound === 'rare') {
    tone(ctx, 740, 0, 0.16, 0.05);
    tone(ctx, 990, 0.09, 0.22, 0.04);
    tone(ctx, 1480, 0.2, 0.28, 0.025);
  } else {
    tone(ctx, 640, 0, 0.09, 0.035);
    tone(ctx, 880, 0.07, 0.13, 0.025);
  }
}

function ambientWav(): string {
  const rate = 8000;
  const samples = rate * 3;
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);
  const text = (offset: number, value: string) => { for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i)); };
  text(0, 'RIFF'); view.setUint32(4, 36 + samples * 2, true); text(8, 'WAVE');
  text(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  text(36, 'data'); view.setUint32(40, samples * 2, true);
  for (let i = 0; i < samples; i++) {
    const t = i / rate;
    const fade = Math.min(1, i / 300, (samples - i) / 300);
    const wave = (Math.sin(2 * Math.PI * 110 * t) + Math.sin(2 * Math.PI * 164.81 * t) * 0.55 + Math.sin(2 * Math.PI * 220 * t) * 0.25) * 0.035 * fade;
    view.setInt16(44 + i * 2, Math.round(wave * 32767), true);
  }
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return `data:audio/wav;base64,${btoa(binary)}`;
}

export function startAudioExperience(): Promise<void> {
  const ctx = audio();
  if (!ctx) return Promise.reject(new Error('Este navegador não oferece suporte a Web Audio.'));
  const resumed = ctx.state === 'suspended' ? ctx.resume() : Promise.resolve();
  if (!bgm) {
    bgm = document.createElement('audio');
    bgm.id = 'adventure-bgm';
    bgm.loop = true;
    bgm.volume = 0.16;
    bgm.preload = 'auto';
    bgm.src = ambientWav();
    document.body.appendChild(bgm);
  }
  const playing = bgm.play();
  return Promise.all([resumed, playing]).then(() => undefined);
}
