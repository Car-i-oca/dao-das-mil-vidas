type Sound = 'tap' | 'toast' | 'rare';

let context: AudioContext | undefined;

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
  if (sound === 'tap') tone(ctx, 520, 0, 0.045, 0.025, 'triangle');
  else if (sound === 'rare') {
    tone(ctx, 740, 0, 0.16, 0.05);
    tone(ctx, 990, 0.09, 0.22, 0.04);
    tone(ctx, 1480, 0.2, 0.28, 0.025);
  } else {
    tone(ctx, 640, 0, 0.09, 0.035);
    tone(ctx, 880, 0.07, 0.13, 0.025);
  }
}
