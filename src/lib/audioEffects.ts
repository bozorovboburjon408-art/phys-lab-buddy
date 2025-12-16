// Web Audio API based sound effects generator

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Sci-fi whoosh/sweep sound
export const playWhoosh = (duration = 0.8) => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(200, now);
  oscillator.frequency.exponentialRampToValueAtTime(800, now + duration * 0.3);
  oscillator.frequency.exponentialRampToValueAtTime(100, now + duration);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, now);
  filter.frequency.exponentialRampToValueAtTime(500, now + duration);

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
};

// Electron orbit hum
export const playElectronHum = (duration = 3) => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Base drone
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(80, now);

  osc2.type = "sine";
  osc2.frequency.setValueAtTime(120, now);

  // LFO for pulsing effect
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(2, now);
  lfoGain.gain.setValueAtTime(0.05, now);

  lfo.connect(lfoGain);
  lfoGain.connect(gainNode.gain);

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.1, now + 0.5);
  gainNode.gain.setValueAtTime(0.1, now + duration - 0.5);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(ctx.destination);

  lfo.start(now);
  osc1.start(now);
  osc2.start(now);

  lfo.stop(now + duration);
  osc1.stop(now + duration);
  osc2.stop(now + duration);
};

// Energy charge up sound
export const playChargeUp = (duration = 1.5) => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(100, now);
  oscillator.frequency.exponentialRampToValueAtTime(600, now + duration);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.exponentialRampToValueAtTime(2000, now + duration);
  filter.Q.setValueAtTime(5, now);

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.12, now + duration * 0.7);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
};

// Sparkle/shimmer effect
export const playSparkle = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  for (let i = 0; i < 5; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = i * 0.08;

    osc.type = "sine";
    osc.frequency.setValueAtTime(800 + i * 200, now + delay);
    osc.frequency.exponentialRampToValueAtTime(2000 + i * 300, now + delay + 0.15);

    gain.gain.setValueAtTime(0, now + delay);
    gain.gain.linearRampToValueAtTime(0.05, now + delay + 0.02);
    gain.gain.linearRampToValueAtTime(0, now + delay + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + 0.2);
  }
};

// Complete splash screen audio sequence
export const playSplashAudio = async () => {
  try {
    // Resume audio context (required for autoplay policy)
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    // Start with whoosh
    playWhoosh(1);

    // Electron hum starts after whoosh
    setTimeout(() => playElectronHum(3.5), 500);

    // Charge up when logo appears
    setTimeout(() => playChargeUp(1.2), 2000);

    // Sparkle at the end
    setTimeout(() => playSparkle(), 3800);

  } catch (error) {
    console.log("Audio playback failed:", error);
  }
};
