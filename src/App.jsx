import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const photos = [
  // Photos 1-6 (with notes)
  { id: 1, url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: 'Remember this day? Pure magic.' },
  { id: 2, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: 'All the late night conversations...' },
  { id: 3, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: 'So many laughs.' },
  { id: 4, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: 'We laughed until we cried here.' },
  { id: 5, url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: 'An unforgettable adventure.' },
  { id: 6, url: 'https://images.unsplash.com/photo-1464375117522-1314d6c469e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: 'Can\'t wait for more moments like this.' },
  
  // Photos 7-10 (no notes, auto-advance)
  { id: 7, url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: '' },
  { id: 8, url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: '' },
  { id: 9, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: '' },
  { id: 10, url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', note: '' },
];

// ─── GIFT BOX ────────────────────────────────────────────────────────────────
function GiftBox({ onOpen }) {
  const [phase, setPhase] = useState('idle');

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('shake');
    setTimeout(() => setPhase('burst'), 600);
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
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-[#E50914] opacity-[0.06] rounded-full blur-[140px]" />
          </div>

          <motion.div
            onClick={handleClick}
            variants={boxVariants}
            animate={phase === 'idle' ? 'idle' : phase === 'shake' ? 'shake' : 'burst'}
            className="cursor-pointer relative z-10 select-none"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="relative w-52 h-52 select-none">
              <div className="absolute inset-0 rounded-2xl bg-[#E50914] blur-2xl opacity-30 scale-90" />
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-[#E50914] to-[#9b0a12] rounded-b-2xl border-2 border-[#c0101a]" />
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#c0101a] to-[#9b0a12] rounded-t-2xl border-2 border-[#c0101a] shadow-xl" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 z-10" />
              <div className="absolute top-8 left-0 right-0 h-10 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 z-10" />
              <div className="absolute -top-5 left-1/2 -translate-x-[120%] w-12 h-10 bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full z-20 rotate-[-30deg] border border-yellow-500/50" />
              <div className="absolute -top-5 left-1/2 translate-x-[20%] w-12 h-10 bg-gradient-to-tl from-yellow-400 to-yellow-200 rounded-full z-20 rotate-[30deg] border border-yellow-500/50" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 bg-yellow-300 rounded-full z-30 border-2 border-yellow-500 shadow-[0_0_10px_rgba(253,224,71,0.6)]" />
              <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60 z-30 animate-pulse" />
              <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-white rounded-full opacity-40 z-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase === 'idle' ? 1 : 0, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16 text-2xl md:text-3xl tracking-[0.2em] text-gray-400 italic font-light text-center pointer-events-none"
          >
            For Tofu&nbsp;✨ &nbsp;Click to open.
          </motion.p>
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

// ─── WELCOME SCREEN ──────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }) {
  return (
    <motion.div
      key="welcome"
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#111111] z-40 p-6 md:p-12 cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      onClick={onNext}
    >
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-light text-white leading-tight">
          Happy birthday Koshali 🐰
        </h1>
        <p className="text-xl md:text-3xl font-light text-gray-300 leading-relaxed">
          Hope you had an amazing birthday celebration today. 
          Here is a small gift from my side to make your day end well.
        </p>
        <motion.p
          className="mt-16 text-sm md:text-base text-gray-500 tracking-widest uppercase animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Tap anywhere to begin
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── SLIDESHOW SCREEN ────────────────────────────────────────────────────────
function Slideshow({ photo, onNext }) {
  const isAutoAdvance = !photo.note;

  // Handle auto-advance
  useEffect(() => {
    if (isAutoAdvance) {
      const timer = setTimeout(() => {
        onNext();
      }, 3000); // Wait 3 seconds then go to next
      return () => clearTimeout(timer);
    }
  }, [isAutoAdvance, onNext]);

  return (
    <motion.div
      key={photo.id}
      className="fixed inset-0 flex items-center justify-center bg-black z-30 cursor-pointer overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={() => {
        // Allow tapping to skip even if it's auto-advance
        onNext();
      }}
    >
      <img 
        src={photo.url} 
        alt="Memory" 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      
      {photo.note && (
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col items-center">
          <div className="max-w-4xl text-center backdrop-blur-md bg-black/30 p-6 md:p-10 rounded-2xl border border-white/10">
            <p className="text-3xl md:text-5xl font-light text-white italic drop-shadow-lg leading-tight">
              "{photo.note}"
            </p>
          </div>
          <p className="text-gray-400 tracking-widest uppercase text-sm mt-8 animate-pulse">
            Tap to continue
          </p>
        </div>
      )}
      
      {isAutoAdvance && (
        <div className="absolute bottom-10 right-10 flex space-x-2">
          {/* Subtle loading bar for auto-advance */}
          <motion.div 
            className="h-1 bg-white/50 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 3, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  );
}

// ─── FINAL SCREEN ────────────────────────────────────────────────────────────
function FinalScreen() {
  return (
    <motion.div
      key="final"
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#111111] z-40 p-6 md:p-12 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="max-w-3xl text-center space-y-12 my-auto">
        <h2 className="text-4xl md:text-6xl font-light text-white">
          The Perfect Soundtrack
        </h2>
        
        <div className="space-y-8 text-xl md:text-3xl font-light text-gray-300 leading-relaxed">
          <p>
            You know, I have to admit something... your music library back in 12th grade was absolutely amazing.
          </p>
          <p>
            I actually still listen to those same songs today. Every time they play, it brings back all the best memories.
          </p>
          
          <div className="w-16 h-px bg-[#E50914] mx-auto my-12" />

          {/* ──────────────────────────────────────────────────────────────────
              ✏️  YOUR FINAL MESSAGE GOES BELOW THIS LINE
          ─────────────────────────────────────────────────────────────────── */}
          <p>
            [Your final message goes here. Replace this with any concluding thoughts you have.]
          </p>
          <p className="pt-8 text-white font-medium">
            Happy Birthday once again, Koshali.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [stage, setStage] = useState('box'); // 'box' | 'welcome' | 'slideshow' | 'end'
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const audio1Ref = useRef(null);
  const audio2Ref = useRef(null);
  const audio3Ref = useRef(null);

  // Audio Manager Logic
  useEffect(() => {
    let activeTrack = 0; // 0 = none, 1 = track1, 2 = track2, 3 = track3

    if (stage === 'welcome') {
      activeTrack = 1;
    } else if (stage === 'slideshow') {
      if (currentSlide < 4) activeTrack = 1;      // Photos 1-4 (indices 0, 1, 2, 3)
      else if (currentSlide < 9) activeTrack = 2; // Photos 5-9 (indices 4, 5, 6, 7, 8)
      else activeTrack = 3;                       // Photo 10 (index 9)
    } else if (stage === 'end') {
      activeTrack = 3;                            // Final Screen
    }

    const tracks = [null, audio1Ref.current, audio2Ref.current, audio3Ref.current];

    tracks.forEach((track, idx) => {
      if (!track) return;
      if (idx === activeTrack) {
        track.volume = 0.6;
        const playPromise = track.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { /* Auto-play blocked gracefully */ });
        }
      } else {
        // Pause inactive tracks smoothly if possible, but basic pause works.
        track.pause();
      }
    });
  }, [stage, currentSlide]);

  const handleOpenBox = () => {
    // ─── CONFETTI BURST ───
    confetti({
      particleCount: 250,
      spread: 130,
      origin: { y: 0.5 },
      colors: ['#E50914', '#FF4D4D', '#FFFFFF', '#FFD700'],
      startVelocity: 55,
      zIndex: 9999,
    });

    const end = Date.now() + 2200;
    const sides = () => {
      confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: ['#E50914', '#fff', '#FFD700'] });
      confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: ['#E50914', '#fff', '#FFD700'] });
      if (Date.now() < end) requestAnimationFrame(sides);
    };
    sides();

    // The user tapped, so we are allowed to start audio now!
    // Initialize all audios to satisfy the browser "user interaction" requirement
    if (audio1Ref.current) audio1Ref.current.play().then(() => audio1Ref.current.pause()).catch(()=>{});
    if (audio2Ref.current) audio2Ref.current.play().then(() => audio2Ref.current.pause()).catch(()=>{});
    if (audio3Ref.current) audio3Ref.current.play().then(() => audio3Ref.current.pause()).catch(()=>{});

    setStage('welcome');
  };

  const handleNextSlide = () => {
    if (currentSlide < photos.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setStage('end');
    }
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen font-sans overflow-x-hidden">
      {/*
        ════════════════════════════════════════════════════════════════════════
        🎵  AUDIO SETUP
        Place 3 mp3 files in your `public/` folder named:
        - music1.mp3  (Plays at start and photos 1-4)
        - music2.mp3  (Plays from photo 5 to 9)
        - music3.mp3  (Plays at photo 10 and final screen)
        ════════════════════════════════════════════════════════════════════════
      */}
      <audio ref={audio1Ref} src="/music1.mp3" loop preload="auto" />
      <audio ref={audio2Ref} src="/music2.mp3" loop preload="auto" />
      <audio ref={audio3Ref} src="/music3.mp3" loop preload="auto" />

      <AnimatePresence mode="wait">
        {stage === 'box' && (
          <GiftBox key="box" onOpen={handleOpenBox} />
        )}
        
        {stage === 'welcome' && (
          <WelcomeScreen key="welcome" onNext={() => setStage('slideshow')} />
        )}

        {stage === 'slideshow' && (
          <Slideshow 
            key={`slide-${currentSlide}`} 
            photo={photos[currentSlide]} 
            onNext={handleNextSlide} 
          />
        )}

        {stage === 'end' && (
          <FinalScreen key="end" />
        )}
      </AnimatePresence>
    </div>
  );
}
