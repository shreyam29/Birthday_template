import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// ══════════════════════════════════════════════════════════════════════════════
// 📸  CUSTOMIZATION SECTION: PHOTOS & TEXT
// Change the URLs and the notes here. Keep 8 photos exactly as requested.
// ══════════════════════════════════════════════════════════════════════════════
const photos = [
  // ✏️  PHOTOS 1 to 6: These wait for a tap to continue.
  { id: 1, url: '/1.jpeg', note: 'Remember this day? It was pure magic, I still have it embarked in my memory' },
  { id: 2, url: '/2.jpeg', note: 'All those jumpscares in Stree-2 made me realise that you do also get scared ' },
  { id: 3, url: '/3.jpeg', note: 'Well I was mad at you at beginning when we met here, but you do know how to make me smile. And yeah you look abosulely ethereal in traditional tho...' },
  { id: 4, url: '/9.jpeg', note: 'Sunflower a day keep\'s  sadness away.' },
  { id: 5, url: '/6.jpeg', note: 'Well this was an eveining to remember. You still had a sore leg, doing assignments, I just hoped that you would smile and be happy with a flower, well...' },
  { id: 6, url: '/8.jpeg', note: 'One of the most beautiful moments that is etched in my memory, Hopefully we will find the brightest stars in melody under the sky, One day...' },
  
  // ✏️  PHOTOS 7 & 8: No notes, these automatically advance after 3 seconds.
  { id: 7, url: '/4.jpeg', note: '' },
  { id: 8, url: '/7.jpeg', note: '' },
];
// ══════════════════════════════════════════════════════════════════════════════

// ─── GIFT BOX SCREEN ─────────────────────────────────────────────────────────
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
      y: [0, -15, 0],
      transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
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
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#111111] z-50 select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-[#E50914] opacity-[0.06] rounded-full blur-[140px]" />
          </div>

          {/* Simple tap instruction on the front */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase === 'idle' ? 1 : 0, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mb-12 text-lg md:text-2xl tracking-[0.2em] text-gray-400 italic font-light text-center pointer-events-none"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Click or tap to open ✨
          </motion.p>

          {/* The Gift Box */}
          <motion.div
            onClick={handleClick}
            variants={boxVariants}
            animate={phase === 'idle' ? 'idle' : phase === 'shake' ? 'shake' : 'burst'}
            className="cursor-pointer relative z-10 select-none"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 select-none">
              <div className="absolute inset-0 rounded-2xl bg-[#E50914] blur-2xl opacity-40 scale-90" />
              <div className="absolute bottom-0 left-0 right-0 h-32 md:h-36 bg-gradient-to-b from-[#E50914] to-[#9b0a12] rounded-b-2xl border-2 border-[#c0101a]" />
              <div className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-b from-[#c0101a] to-[#9b0a12] rounded-t-2xl border-2 border-[#c0101a] shadow-xl" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 md:w-10 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 z-10" />
              <div className="absolute top-6 md:top-8 left-0 right-0 h-8 md:h-10 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 z-10" />
              <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-[120%] w-10 md:w-12 h-8 md:h-10 bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full z-20 rotate-[-30deg] border border-yellow-500/50" />
              <div className="absolute -top-4 md:-top-5 left-1/2 translate-x-[20%] w-10 md:w-12 h-8 md:h-10 bg-gradient-to-tl from-yellow-400 to-yellow-200 rounded-full z-20 rotate-[30deg] border border-yellow-500/50" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 md:w-7 md:h-7 bg-yellow-300 rounded-full z-30 border-2 border-yellow-500 shadow-[0_0_10px_rgba(253,224,71,0.6)]" />
              <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60 z-30 animate-pulse" />
              <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-white rounded-full opacity-40 z-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── WELCOME SCREEN (AFTER BOX BURSTS) ────────────────────────────────────────
function WelcomeScreen({ onNext }) {
  return (
    <motion.div
      key="welcome"
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#111111] z-40 p-6 md:p-12 cursor-pointer overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onClick={onNext}
    >
      <div className="px-6 md:px-12 max-w-4xl text-center flex flex-col items-center relative z-10">
        <motion.h1 
          className="text-5xl md:text-7xl mb-8 font-bold leading-tight"
          style={{ fontFamily: "'Dancing Script', cursive" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          {/* ✏️ CUSTOMIZE TEXT BELOW */}
          <span className="bg-gradient-to-r from-[#ff758c] via-[#ff7eb3] to-[#FFD700] bg-clip-text text-transparent">
            Happy Birthday Koshali 🐰✨
          </span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl text-gray-200 leading-relaxed font-light drop-shadow-md"
          style={{ fontFamily: "'Outfit', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          {/* ✏️ CUSTOMIZE TEXT BELOW */}
          I hope you had the most amazing celebration today. Since we've shared so many great times together, I wanted to build something special just for you to make sure your day ends perfectly. Here is a little gift from my side... tap the box, turn up your volume, and enjoy the trip down memory lane. 🌻
        </motion.p>
        
        <motion.p
          className="mt-16 text-sm md:text-base text-gray-500 tracking-widest uppercase animate-pulse"
          style={{ fontFamily: "'Outfit', sans-serif" }}
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

// ─── SLIDESHOW SCREEN (POLAROID) ─────────────────────────────────────────────
function Slideshow({ photo, onNext }) {
  const isAutoAdvance = !photo.note;

  // Handle auto-advance
  useEffect(() => {
    if (isAutoAdvance) {
      const timer = setTimeout(() => {
        onNext();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [isAutoAdvance, onNext]);

  return (
    <motion.div
      key={photo.id}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-30 cursor-pointer overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={() => {
        onNext();
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src={photo.url} 
          alt="" 
          className="w-full h-full object-cover opacity-20 blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <motion.div 
        className="relative z-10 bg-white p-4 pb-16 md:p-5 md:pb-20 shadow-2xl rounded-sm flex flex-col items-center justify-center max-w-[90vw] max-h-[70vh]"
        initial={{ y: 50, opacity: 0, rotate: -3 }}
        animate={{ y: 0, opacity: 1, rotate: photo.id % 2 === 0 ? 2 : -2 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className={`relative bg-black overflow-hidden shadow-inner ${
          photo.id === 1 
            ? "w-[300px] h-[170px] md:w-[600px] md:h-[340px]" 
            : "w-[260px] h-[360px] md:w-[320px] md:h-[440px]"
        }`}>
          <img 
            src={photo.url} 
            alt="Memory" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
      
      {photo.note && (
        <div className="absolute bottom-6 left-0 right-0 px-6 flex flex-col items-center z-20">
          <div className="max-w-2xl w-full text-center backdrop-blur-md bg-black/40 p-4 md:p-6 rounded-2xl border border-white/10 shadow-xl">
            <p className="text-xl md:text-3xl font-light text-white italic drop-shadow-md leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
              "{photo.note}"
            </p>
          </div>
          <p className="text-gray-400 tracking-widest uppercase text-xs md:text-sm mt-4 animate-pulse">
            Tap to continue
          </p>
        </div>
      )}
      
      {isAutoAdvance && (
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex space-x-2 z-20">
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

// ─── FINAL SCREEN 1 (The Music Note) ─────────────────────────────────────────
function FinalScreen1({ onNext }) {
  return (
    <motion.div
      key="final1"
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#111111] z-40 p-6 md:p-12 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      onClick={onNext}
    >
      <div className="max-w-3xl text-center space-y-12 my-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="flex flex-col items-center">
          <h2 
            className="text-4xl md:text-6xl text-[#FFD700] mb-4 tracking-wider drop-shadow-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Playlists & Memories
          </h2>
          <p
            className="text-xl md:text-3xl text-gray-300 italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            To the Brightest Sunflower - a little note.
          </p>
        </div>
        
        <div className="space-y-8 text-xl md:text-3xl font-light text-gray-300 leading-relaxed">
          {/* ✏️ CUSTOMIZE TEXT HERE */}
          <p>
             You know, I have to admit something... your music library back in 12th grade was absolutely amazing, I remember us sharing our favorite songs.
             Do you remember the songs you shared me in class 11 ?
          </p>
          <p>
              Yep!! Happier and Bad blood running in the background are one of those songs you shared with me, You did had a great taste in music back then.
              I actually still listen to those same songs today. Every time they play, it brings back all the best memories.
          </p>
        </div>

        <motion.p
          className="mt-24 text-sm md:text-base text-gray-500 tracking-widest uppercase animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Tap anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── FINAL SCREEN 2 (The Conclusion) ─────────────────────────────────────────
function FinalScreen2() {
  return (
    <motion.div
      key="final2"
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#111111] z-40 p-6 md:p-12 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="max-w-4xl text-center flex flex-col items-center justify-center space-y-12 my-auto">
        <div className="space-y-8 text-xl md:text-3xl font-light text-gray-200 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
          
          {/* ✏️ CUSTOMIZE FINAL CONCLUSION HERE */}
          <p>
              I know I mentioned this earlier, but it’s worth saying again, whenever I see the radiance of a sunflower 🌻, it instantly reminds me of your vibrant smile.

            Looking back at our Nalanda days, it’s amazing to see how much we've both grown. Your bravery and sheer drive have always inspired me to push further. As we both grind toward our own goals over these next couple of years, I am really looking forward to seeing our connection grow even stronger.

            Your childish heart and genuine kindness never cease to amaze me, I love to see that we have reached a place where we truly understand and just look out for one another. Congratulations on your victory on securing the job position as well, you had worked very hard for this and you deserve the victory which comes as present for you this birthday.
            
            I'm excited for whatever the next chapter holds for us, and I hope we are in it together under the glimmering stars. ✨
          </p>

          <div className="w-16 h-px bg-[#E50914] mx-auto my-12 opacity-50" />

          {/* FINAL BIRTHDAY WISH */}
          <div className="flex flex-col items-center">
            <p className="pt-4 text-white font-medium" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '3.5rem', lineHeight: '1.2' }}>
              Happy Birthday once again, Koshali.
            </p>
            <p className="pt-6 text-gray-300" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem' }}>
              — Chandra
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [stage, setStage] = useState('box'); // 'box' | 'welcome' | 'slideshow' | 'end1' | 'end2'
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const audio1Ref = useRef(null);
  const audio2Ref = useRef(null);

  // Audio Manager Logic
  useEffect(() => {
    let activeTrack = 0; // 0 = none, 1 = track1, 2 = track2

    if (stage === 'welcome') {
      activeTrack = 1;
    } else if (stage === 'slideshow') {
      if (currentSlide < 6) activeTrack = 1;      // Photos 1-6 (indices 0 to 5) -> track 1
      else activeTrack = 2;                       // Photos 7-8 (indices 6 to 7) -> track 2
    } else if (stage === 'end1' || stage === 'end2') {
      activeTrack = 2;                            // Final Screens -> track 2
    }

    const tracks = [null, audio1Ref.current, audio2Ref.current];

    tracks.forEach((track, idx) => {
      if (!track) return;
      if (idx === activeTrack) {
        track.volume = 0.6;
        const playPromise = track.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { /* Auto-play blocked gracefully */ });
        }
      } else {
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

    // Initialize all audios to satisfy browser interaction requirement
    if (audio1Ref.current) audio1Ref.current.play().then(() => audio1Ref.current.pause()).catch(()=>{});
    if (audio2Ref.current) audio2Ref.current.play().then(() => audio2Ref.current.pause()).catch(()=>{});

    setStage('welcome');
  };

  const handleNextSlide = () => {
    if (currentSlide < photos.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setStage('end1');
    }
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen font-sans overflow-x-hidden">
      {/*
        ════════════════════════════════════════════════════════════════════════
        🎵  CUSTOMIZATION SECTION: AUDIO SETUP
        Place 2 mp3 files in your `public/` folder named:
        - music1.mp3  (Plays at start and photos 1 to 6)
        - music2.mp3  (Plays at photo 7, 8 and final screens)
        ════════════════════════════════════════════════════════════════════════
      */}
      <audio ref={audio1Ref} src="/music1.mp3" loop preload="auto" />
      <audio ref={audio2Ref} src="/music2.mp3" loop preload="auto" />

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

        {stage === 'end1' && (
          <FinalScreen1 key="end1" onNext={() => setStage('end2')} />
        )}

        {stage === 'end2' && (
          <FinalScreen2 key="end2" />
        )}
      </AnimatePresence>
    </div>
  );
}
