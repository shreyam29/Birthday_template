import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const photos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', note: 'Remember this day? Pure magic.' },
  { id: 2, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', note: 'All the late night conversations...' },
  { id: 3, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', note: '' },
  { id: 4, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', note: 'We laughed until we cried here.' },
  { id: 5, url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', note: 'An unforgettable adventure.' },
  { id: 6, url: 'https://images.unsplash.com/photo-1464375117522-1314d6c469e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', note: '' },
  { id: 7, url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', note: 'To many more memories like this.' },
];

// ─── GIFT BOX ────────────────────────────────────────────────────────────────
function GiftBox({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'shake' | 'burst' | 'done'

  const handleClick = () => {
    if (phase !== 'idle') return;

    // Phase 1: shake
    setPhase('shake');

    // Phase 2: burst + fly away
    setTimeout(() => setPhase('burst'), 600);

    // Phase 3: hide box, trigger timeline
    setTimeout(() => {
      setPhase('done');
      onOpen();
    }, 1400);
  };

  const boxVariants = {
    idle: {
      y: [0, -20, 0],
      transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
    },
    shake: {
      x: [-12, 12, -12, 12, -8, 8, 0],
      rotate: [-8, 8, -8, 8, -5, 5, 0],
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
    burst: {
      scale: [1, 1.4, 0],
      opacity: [1, 1, 0],
      transition: { duration: 0.8, ease: 'easeIn' },
    },
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="box-screen"
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#111111] z-50 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-[#E50914] opacity-[0.06] rounded-full blur-[140px]" />
          </div>

          {/* Gift box — the whole area is clickable */}
          <motion.div
            onClick={handleClick}
            variants={boxVariants}
            animate={phase === 'idle' ? 'idle' : phase === 'shake' ? 'shake' : 'burst'}
            className="cursor-pointer relative z-10 select-none"
            style={{ touchAction: 'manipulation' }}
          >
            {/* Box body */}
            <div className="relative w-52 h-52 select-none">
              {/* Shadow glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-[#E50914] blur-2xl opacity-30 scale-90" />

              {/* Box base */}
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-[#E50914] to-[#9b0a12] rounded-b-2xl border-2 border-[#c0101a]" />

              {/* Box lid */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#c0101a] to-[#9b0a12] rounded-t-2xl border-2 border-[#c0101a] shadow-xl" />

              {/* Vertical ribbon */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 z-10" />

              {/* Horizontal ribbon on lid */}
              <div className="absolute top-8 left-0 right-0 h-10 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 z-10" />

              {/* Bow left loop */}
              <div className="absolute -top-5 left-1/2 -translate-x-[120%] w-12 h-10 bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full z-20 rotate-[-30deg] border border-yellow-500/50" />
              {/* Bow right loop */}
              <div className="absolute -top-5 left-1/2 translate-x-[20%] w-12 h-10 bg-gradient-to-tl from-yellow-400 to-yellow-200 rounded-full z-20 rotate-[30deg] border border-yellow-500/50" />
              {/* Bow center knot */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 bg-yellow-300 rounded-full z-30 border-2 border-yellow-500 shadow-[0_0_10px_rgba(253,224,71,0.6)]" />

              {/* Star glints */}
              <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60 z-30 animate-pulse" />
              <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-white rounded-full opacity-40 z-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </motion.div>

          {/* Instruction text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase === 'idle' ? 1 : 0, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16 text-2xl md:text-3xl tracking-[0.2em] text-gray-400 italic font-light text-center pointer-events-none"
          >
            For Tofu&nbsp;✨ &nbsp;Click to open.
          </motion.p>

          {/* Small hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'idle' ? 0.4 : 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className="mt-4 text-sm tracking-widest text-gray-600 uppercase pointer-events-none"
          >
            ( tap anywhere on the box )
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────
function Timeline() {
  return (
    <motion.div
      className="min-h-screen py-32 px-6 md:px-12 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Header */}
      <div className="text-center mb-40">
        <motion.h1
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 mb-8 tracking-tight"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          Our Journey
        </motion.h1>
        <motion.div
          className="w-32 h-1 bg-[#E50914] mx-auto rounded-full shadow-[0_0_20px_rgba(229,9,20,0.8)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </div>

      {/* Photo cards */}
      <div className="space-y-48">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Photo */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E50914] to-gray-900 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
                <img
                  src={photo.url}
                  alt={`Memory ${photo.id}`}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-1000" />
              </div>
            </div>

            {/* Note */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-4">
              {photo.note ? (
                <p className="text-3xl md:text-4xl font-light text-gray-200 italic leading-relaxed text-center md:text-left">
                  &ldquo;{photo.note}&rdquo;
                </p>
              ) : (
                <div className="w-24 h-px bg-gray-700 hidden md:block" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── FINAL MESSAGE SPACE ── */}
      <motion.div
        className="mt-64 min-h-[90vh] flex flex-col items-center justify-center relative text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 2 }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-full max-w-4xl h-[600px] bg-[#E50914] opacity-[0.04] rounded-[100%] blur-[160px]" />
        </div>

        <motion.div
          className="w-24 h-px bg-[#E50914] mx-auto mb-20 shadow-[0_0_15px_rgba(229,9,20,0.8)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        <h2 className="text-5xl md:text-7xl font-light mb-20 text-white tracking-wide">
          To Tofu...
        </h2>

        {/* ──────────────────────────────────────────────────────────────────
            ✏️  YOUR PERSONAL MESSAGE GOES BELOW THIS LINE
            Replace the placeholder text in the <p> tags with your own words.
        ─────────────────────────────────────────────────────────────────── */}
        <div className="max-w-3xl w-full space-y-10 text-gray-300 font-light leading-relaxed">
          <p className="text-2xl md:text-3xl">
            [Write your first paragraph here — a memory, a feeling, an inside joke.]
          </p>
          <p className="text-2xl md:text-3xl">
            [Write your second paragraph — maybe something you've always wanted to say but never did.]
          </p>
          <p className="text-2xl md:text-3xl">
            [Write your third paragraph — why this friendship means the world to you.]
          </p>
          <p className="text-xl md:text-2xl text-gray-500 pt-12">
            — [Your name], with love 💛
          </p>
        </div>

        <motion.div
          className="mt-32 w-14 h-14 bg-[#E50914] rounded-full mx-auto shadow-[0_0_40px_rgba(229,9,20,0.5)]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [stage, setStage] = useState('box'); // 'box' | 'timeline'
  const audioRef = useRef(null);

  const handleOpen = () => {
    // ─── AUDIO: drop your .mp3 into the public/ folder and update src below ───
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }

    // ─── CONFETTI BURST ───────────────────────────────────────────────────────
    confetti({
      particleCount: 250,
      spread: 130,
      origin: { y: 0.5 },
      colors: ['#E50914', '#FF4D4D', '#FFFFFF', '#FFD700'],
      startVelocity: 55,
      zIndex: 9999,
    });

    // Side bursts
    const end = Date.now() + 2200;
    const sides = () => {
      confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: ['#E50914', '#fff', '#FFD700'] });
      confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: ['#E50914', '#fff', '#FFD700'] });
      if (Date.now() < end) requestAnimationFrame(sides);
    };
    sides();

    // ─── TRANSITION TO TIMELINE ───────────────────────────────────────────────
    setTimeout(() => setStage('timeline'), 1500);
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen font-sans overflow-x-hidden">
      {/*
        ════════════════════════════════════════════════════════════════════════
        🎵  AUDIO SETUP (IMPORTANT)
        1. Put your .mp3 file inside the  public/  folder.
        2. Change  src="/music.mp3"  below to match your file name.
           Example: if your file is  public/happy-birthday.mp3
                    change to       src="/happy-birthday.mp3"
        ════════════════════════════════════════════════════════════════════════
      */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Gift Box overlay — always rendered so the audio element mounts early */}
      <GiftBox onOpen={handleOpen} />

      {/* Timeline fades in after box disappears */}
      <AnimatePresence>
        {stage === 'timeline' && <Timeline key="timeline" />}
      </AnimatePresence>
    </div>
  );
}
