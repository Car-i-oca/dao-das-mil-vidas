export class AudioManager {
  private bgmAudio: HTMLAudioElement | null = null;
  private bgmVolume: number = 0.5;

  constructor(defaultVolume: number = 0.5) {
    this.bgmVolume = Math.min(1, Math.max(0, defaultVolume));
  }

  public playBGM(url: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
    }

    this.bgmAudio = new Audio(url);
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = this.bgmVolume;

    const playPromise = this.bgmAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err: unknown) => {
        console.warn('Reprodução de áudio bloqueada ou falhou:', err);
      });
    }
  }

  public stopBGM(): void {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
      this.bgmAudio = null;
    }
  }

  public setBGMVolume(volume: number): void {
    this.bgmVolume = Math.min(1, Math.max(0, volume));
    if (this.bgmAudio) {
      this.bgmAudio.volume = this.bgmVolume;
    }
  }

  public getBGMVolume(): number {
    return this.bgmVolume;
  }
}

export const audioManager = new AudioManager(0.5);
