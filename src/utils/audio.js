// Procedural Romantic Ambient Chords & Sound Effects via Web Audio API

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.45;
    this.masterGain = null;
    this.musicTimer = null;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  // Play a soft bell/chime sound (for flower discovery, sparkles)
  playChime(freq = 660, duration = 1.2) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.12 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Soft sparkle flourish (when flower opens or YES clicked)
  playSparkle() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C E G C E
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.4);
      }, idx * 90);
    });
  }

  // Paper rustle sound for letter/notes
  playPaperRustle() {
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 1.8;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
    } catch {
      // Ignored
    }
  }

  // Romantic ambient chord generator (Lofi piano / warm pads)
  startAmbientMusic() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Chord progressions: Fmaj7 -> G6 -> Em7 -> Am7
    const chords = [
      [174.61, 220.00, 261.63, 329.63, 440.00], // Fmaj7 (F3, A3, C4, E4, A4)
      [196.00, 246.94, 293.66, 392.00, 493.88], // G6 (G3, B3, D4, G4, B4)
      [164.81, 196.00, 246.94, 329.63, 392.00], // Em7 (E3, G3, B3, E4, G4)
      [220.00, 261.63, 329.63, 440.00, 523.25]  // Am7 (A3, C4, E4, A4, C5)
    ];

    const playNextChord = () => {
      if (!this.isPlaying || !this.ctx) return;
      const currentChord = chords[this.step % chords.length];
      this.step++;

      currentChord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm triangle and sine combination
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const chordDuration = 4.2;
        const attack = 0.9;
        const noteVolume = (0.05 / currentChord.length) * this.volume;

        gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(noteVolume, this.ctx.currentTime + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + chordDuration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + (idx * 0.08));
        osc.stop(this.ctx.currentTime + chordDuration);
      });

      this.musicTimer = setTimeout(playNextChord, 3800);
    };

    playNextChord();
  }

  stopAmbientMusic() {
    this.isPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }
}

export const soundManager = new SoundManager();
