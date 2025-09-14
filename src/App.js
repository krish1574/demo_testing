import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Heart, Cake, Sparkles, PartyPopper, Camera, Volume2, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Constants
const SECTIONS = [
  { id: 'welcome', icon: '🏠', label: 'Home' },
  { id: 'memories', icon: '💭', label: 'Memories' },
  { id: 'cake', icon: '🎂', label: 'Cake' },
  { id: 'wishes', icon: '💌', label: 'Wishes' },
  { id: 'gallery', icon: '📸', label: 'Photos' }
];

const BIRTHDAY_WISHES = [
  "🌟 Happy Birthday to the most wonderful Khushii! May your day be filled with endless joy and laughter! 🎉",
  "✨ Dear Khushii, another year of beautiful memories begins today! Shine bright like the star you are! 🌟",
  "🎂 Sweet Khushii, may this new year bring you all the happiness your heart can hold! 💕",
  "🎈 Happy Birthday Khushii! Your smile lights up everyone's day - keep spreading that joy! 😊",
  "🌸 Happy Birthday to Khushi - your adorable rounded specs frame the sweetest smile we know!",
  "🎊 Khushii, you deserve all the love and happiness in the world! Have the most amazing day! 💖",
  "🌺To the fearless Khushi on her special day - keep shining with that unstoppable spirit of yours! ✨ "
];

const MEMORIES = [
  {
    title: "Sweet Moments",
    description: "All the beautiful memories we've shared together",
    emoji: "💕",
    image: "/1000004649.jpg",
    gradient: "bg-gradient-to-r from-rose-400 via-pink-500 to-red-500"
  },
  {
    title: "cutee", 
    description: "Amazing times and unforgettable experiences",
    emoji: "🌟",
    image: "/20240830_131049.jpg",
    gradient: "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500"
  },
  {
    title: "Laughter & Joy",
    description: "The way you light up every room you enter",
    emoji: "😄",
    image: "IMG-20241008-WA0076.jpg",
    gradient: "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"
  },
  {
    title: "Special Smile ",
    description: "Khushi's radiant smile has the power to brighten even the cloudiest days",
    emoji: "💝",
    image: "/20240830_131052.jpg",
    gradient: "bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500"
  }
];

const PHOTO_GALLERY = [
  {
    src: "/20240830_131049.jpg",
    caption: "Beautiful Khushii ✨"
  },
  {
    src: "1000066996.jpg",
    caption: "Sweet smile 😊"
  },
  {
    src: "1000002023.jpg",
    caption: "Happy moments 🌟"
  },
  {
    src: "20240830_131052.jpg",
    caption: "Celebrating you! 🎉"
  }
];

const CONFETTI_EMOJIS = ['🎉', '🎊', '🌟', '💖', '🎈', '✨', '🦋', '🌸', '💕', '⭐'];
const FLOAT_EMOJIS = ['🎈', '🌟', '💕', '🦋', '🌸', '✨', '💖'];
const SNOW_EMOJIS = ['❄️', '⭐', '✨', '💎', '🔮', '💫'];
const PARTICLE_EMOJIS = ['✨', '⭐', '💫', '🌟', '💎'];

// Floating Element Component
const FloatingElement = React.memo(({ emoji, style, className = "" }) => (
  <div 
    className={`absolute pointer-events-none select-none ${className}`}
    style={style}
    aria-hidden="true"
  >
    {emoji}
  </div>
));

// Enhanced Effects Components
const ConfettiEffect = React.memo(({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {Array.from({ length: 80 }, (_, i) => (
        <FloatingElement
          key={i}
          emoji={CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)]}
          className="animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            fontSize: `${Math.random() * 35 + 25}px`,
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
          }}
        />
      ))}
    </div>
  );
});

const FireworksEffect = React.memo(({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {Array.from({ length: 50 }, (_, i) => (
        <FloatingElement
          key={i}
          emoji="🎆"
          className="animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            fontSize: '60px',
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))'
          }}
        />
      ))}
    </div>
  );
});

const SnowEffect = React.memo(({ show }) => {
  if (!show) return null;
  
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-30" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 12}px`,
              animation: `gentleFloat ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))'
            }}
          >
            {SNOW_EMOJIS[Math.floor(Math.random() * SNOW_EMOJIS.length)]}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-20px) rotate(180deg) scale(1.1); }
          }
        `
      }} />
    </>
  );
});

const ParticleTrail = React.memo(({ particles }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-35" aria-hidden="true">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute animate-ping opacity-80"
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: '20px',
            animationDuration: '0.6s',
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
            transition: 'all 0.3s ease-out'
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
});

const Rotating3DCake = React.memo(() => (
  <div className="relative inline-block mb-10">
    <div 
      className="text-9xl drop-shadow-2xl hover:scale-110 transition-all duration-500"
      style={{
        animation: 'rotate3d 8s linear infinite',
        transformStyle: 'preserve-3d',
        filter: 'drop-shadow(0 10px 30px rgba(255,182,193,0.6))'
      }}
    >
      🎂
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 blur-2xl opacity-40 animate-pulse rounded-full"></div>
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes rotate3d {
          0% { transform: rotateY(0deg) rotateX(5deg); }
          100% { transform: rotateY(360deg) rotateX(5deg); }
        }
      `
    }} />
  </div>
));

const PulsatingHeart = React.memo(() => (
  <div className="relative inline-block">
    <div 
      className="text-6xl hover:scale-125 transition-all duration-300 cursor-pointer"
      style={{
        filter: 'drop-shadow(0 0 20px rgba(255,105,180,0.8))',
        animation: 'heartbeat 1.5s ease-in-out infinite'
      }}
    >
      💖
    </div>
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `
    }} />
  </div>
));

const FloatingBalloons = React.memo(({ count = 4 }) => {
  const balloons = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: ['🎈', '🎀', '🎁'][Math.floor(Math.random() * 3)],
      left: Math.random() * 90,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 4
    })), [count]
  );

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-20" aria-hidden="true">
        {balloons.map(balloon => (
          <div
            key={balloon.id}
            className="absolute opacity-50"
            style={{
              left: `${balloon.left}%`,
              top: '60%',
              fontSize: '45px',
              animation: `gentleSway ${balloon.duration}s ease-in-out infinite`,
              animationDelay: `${balloon.delay}s`,
              filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.2))'
            }}
          >
            {balloon.emoji}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gentleSway {
            0%, 100% { transform: translateY(0px) rotate(-2deg); }
            50% { transform: translateY(-30px) rotate(2deg); }
          }
        `
      }} />
    </>
  );
});

const GlowingStars = React.memo(({ count = 20 }) => {
  const stars = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 30 + 20
    })), [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-25" aria-hidden="true">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            fontSize: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: '2s',
            filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.8))'
          }}
        >
          ⭐
        </div>
      ))}
    </div>
  );
});

// Navigation Component
const Navigation = React.memo(({ currentSection, setCurrentSection }) => (
  <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50" role="navigation" aria-label="Section navigation">
    <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border border-white border-opacity-20">
      <div className="flex items-center gap-3">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 hover:scale-105 select-none ${
              currentSection === section.id 
                ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg ring-2 ring-white ring-opacity-20' 
                : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10'
            }`}
            aria-current={currentSection === section.id ? 'page' : undefined}
          >
            <span className="mr-2 text-base" aria-hidden="true">{section.icon}</span>
            <span className="hidden sm:inline">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  </nav>
));

// Music Control Component with Snow Toggle
const MusicControl = React.memo(({ musicPlaying, setMusicPlaying, showSnow, toggleSnow }) => (
  <div className="fixed top-8 right-8 z-50 flex flex-col gap-3">
    <button
      onClick={() => setMusicPlaying(!musicPlaying)}
      className={`relative p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 select-none ${
        musicPlaying 
          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' 
          : 'bg-white bg-opacity-10 backdrop-blur-xl text-white text-opacity-80 hover:text-white border border-white border-opacity-20'
      }`}
      aria-label={musicPlaying ? "Pause music" : "Play music"}
    >
      {musicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
    </button>
    
    <button
      onClick={toggleSnow}
      className={`relative p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 select-none ${
        showSnow 
          ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white' 
          : 'bg-white bg-opacity-10 backdrop-blur-xl text-white text-opacity-80 hover:text-white border border-white border-opacity-20'
      }`}
      aria-label={showSnow ? "Hide snow effect" : "Show snow effect"}
    >
      <span className="text-xl">❄️</span>
    </button>
    {musicPlaying && (
  <div className="text-center">
    <audio autoPlay loop>
      <source src="/happy-birthday-357371.mp3" type="audio/mpeg" />
      {/* You can replace this mp3 URL with any royalty-free birthday track */}
    </audio>
    <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-full px-4 py-2 text-white text-sm font-medium border border-white border-opacity-20">
      🎵 Birthday Melody
    </div>
  </div>
)}

  </div>
));

// Main App Component
const KhushiiBirthdayApp = () => {
  const [currentSection, setCurrentSection] = useState('welcome');
  const [showConfetti, setShowConfetti] = useState(false);
  const [candles, setCandles] = useState(() => Array(7).fill(true));
    const [musicPlaying, setMusicPlaying] = useState(true);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [hoveredMemory, setHoveredMemory] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showSnow, setShowSnow] = useState(true);
  const [particles, setParticles] = useState([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particleTimeoutRef = useRef(null);

  // Memoized floating elements
  const floatingElements = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: FLOAT_EMOJIS[Math.floor(Math.random() * FLOAT_EMOJIS.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 3,
      size: Math.random() * 50 + 40
    })), []
  );

  // Enhanced effects callbacks
  const addParticle = useCallback((x, y) => {
    const newParticle = {
      x: x - 10,
      y: y - 10,
      emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]
    };
    
    setParticles(prev => [...prev.slice(-8), newParticle]);
    
    if (particleTimeoutRef.current) {
      clearTimeout(particleTimeoutRef.current);
    }
    
    particleTimeoutRef.current = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 600);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    const distance = Math.sqrt(
      Math.pow(newX - mouseRef.current.x, 2) + Math.pow(newY - mouseRef.current.y, 2)
    );
    
    if (distance > 30) {
      addParticle(newX, newY);
      mouseRef.current = { x: newX, y: newY };
    }
  }, [addParticle]);

  const toggleSnow = useCallback(() => {
    setShowSnow(prev => !prev);
  }, []);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  const blowCandle = useCallback((index) => {
    setCandles(prev => {
      const newCandles = [...prev];
      newCandles[index] = false;
      
      if (newCandles.every(candle => !candle)) {
        setShowFireworks(true);
        setTimeout(() => {
          setShowFireworks(false);
          triggerConfetti();
        }, 3000);
      }
      
      return newCandles;
    });
  }, [triggerConfetti]);

  const resetCandles = useCallback(() => {
    setCandles(Array(7).fill(true));
  }, []);

  const nextWish = useCallback(() => {
    setCurrentWishIndex(prev => (prev + 1) % BIRTHDAY_WISHES.length);
  }, []);

  const prevWish = useCallback(() => {
    setCurrentWishIndex(prev => (prev - 1 + BIRTHDAY_WISHES.length) % BIRTHDAY_WISHES.length);
  }, []);

  const closePhotoModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const selectPhoto = useCallback((index) => {
    setSelectedPhoto(index);
    triggerConfetti();
  }, [triggerConfetti]);

  // Effects
  useEffect(() => {
    triggerConfetti();
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (particleTimeoutRef.current) {
        clearTimeout(particleTimeoutRef.current);
      }
    };
  }, [triggerConfetti, handleMouseMove]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedPhoto !== null) {
        closePhotoModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, closePhotoModal]);

  // Welcome Section
  if (currentSection === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-500 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-white from-opacity-10 via-transparent to-transparent"></div>
        
        <ConfettiEffect show={showConfetti} />
        <FireworksEffect show={showFireworks} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <FloatingBalloons />
        <GlowingStars />
        <MusicControl 
          musicPlaying={musicPlaying} 
          setMusicPlaying={setMusicPlaying}
          showSnow={showSnow}
          toggleSnow={toggleSnow}
        />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        {/* Floating elements */}
        <div aria-hidden="true">
          {floatingElements.map(el => (
            <FloatingElement
              key={el.id}
              emoji={el.emoji}
              className="animate-bounce opacity-60"
              style={{
                left: `${el.left}%`,
                top: `${el.top}%`,
                animationDelay: `${el.delay}s`,
                animationDuration: `${el.duration}s`,
                fontSize: `${el.size}px`,
                filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.3))'
              }}
            />
          ))}
        </div>

        <main className="flex flex-col items-center justify-center min-h-screen p-8 relative z-10 pt-32">
          <header className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 animate-pulse drop-shadow-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Happy Birthday
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text mb-12 animate-bounce drop-shadow-2xl">
              Khushii! 🎂
            </h2>
            <div className="relative">
              <Rotating3DCake />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-3xl opacity-30 animate-pulse"></div>
            </div>
          </header>

          <section className="bg-white bg-opacity-5 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white border-opacity-10 max-w-4xl text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 from-opacity-10 via-purple-500 via-opacity-10 to-indigo-500 to-opacity-10 rounded-3xl"></div>
            <div className="relative z-10">
              <p className="text-2xl md:text-4xl text-white font-light leading-relaxed mb-8">
                Today is all about celebrating <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">YOU</span>, beautiful Khushii! 
                <br />Let's make this day absolutely <span className="font-bold text-yellow-300">magical!</span> ✨
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={triggerConfetti}
                  className="group relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-pink-500 hover:shadow-opacity-25 transform hover:scale-110 transition-all duration-500 flex items-center gap-3 ring-2 ring-white ring-opacity-20 select-none"
                >
                  <PartyPopper className="w-6 h-6 group-hover:animate-spin" />
                  <span className="text-lg">Celebrate! 🎉</span>
                </button>
                <button
                  onClick={() => setCurrentSection('cake')}
                  className="group relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-orange-500 hover:shadow-opacity-25 transform hover:scale-110 transition-all duration-500 flex items-center gap-3 ring-2 ring-white ring-opacity-20 select-none"
                >
                  <Cake className="w-6 h-6 group-hover:animate-bounce" />
                  <span className="text-lg">Blow Candles! 🕯️</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Memories Section
  if (currentSection === 'memories') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white from-opacity-5 via-transparent to-transparent"></div>
        
        <ConfettiEffect show={showConfetti} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <MusicControl 
          musicPlaying={musicPlaying} 
          setMusicPlaying={setMusicPlaying}
          showSnow={showSnow}
          toggleSnow={toggleSnow}
        />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        {/* Sparkles */}
        <div aria-hidden="true">
          {Array.from({ length:25 }, (_, i) => (
            <FloatingElement
              key={i}
              emoji="✨"
              className="text-pink-300 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 30 + 20}px`,
                animationDelay: `${Math.random() * 4}s`,
                filter: 'drop-shadow(0 0 10px rgba(255,192,203,0.5))'
              }}
            />
          ))}
        </div>

        <main className="max-w-7xl mx-auto pt-32">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-center mb-16 animate-pulse drop-shadow-2xl">
            Beautiful Memories with Khushii 💕
          </h1>

          <section className="grid md:grid-cols-2 gap-8 mb-16">
            {MEMORIES.map((memory, index) => (
              <article
                key={index}
                className={`group relative bg-white bg-opacity-5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white border-opacity-10 hover:scale-105 transition-all duration-700 cursor-pointer select-none ${
                  hoveredMemory === index ? 'bg-opacity-10' : ''
                }`}
                onClick={triggerConfetti}
                onMouseEnter={() => setHoveredMemory(index)}
                onMouseLeave={() => setHoveredMemory(null)}
              >
                <div className={`absolute inset-0 ${memory.gradient} opacity-10 rounded-3xl transition-opacity duration-500 ${
                  hoveredMemory === index ? 'opacity-20' : ''
                }`}></div>
                
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-4">
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-65 object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ aspectRatio: '3/4' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-40 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4 text-4xl group-hover:animate-bounce transition-all duration-500 drop-shadow-lg">
                        {memory.emoji}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {memory.title}
                  </h3>
                  <p className="text-white text-opacity-90 text-lg text-center leading-relaxed font-light">
                    {memory.description}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <div className="text-center">
            <button
              onClick={() => setCurrentSection('gallery')}
              className="group relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-emerald-500 hover:shadow-opacity-25 transform hover:scale-110 transition-all duration-500 flex items-center gap-3 mx-auto ring-2 ring-white ring-opacity-20 select-none"
            >
              <Camera className="w-6 h-6 group-hover:animate-pulse" />
              <span className="text-lg">View Photo Gallery 📸</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Cake Section
  if (currentSection === 'cake') {
    const litCandles = candles.filter(c => c).length;
    const allBlown = litCandles === 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white from-opacity-10 via-transparent to-transparent"></div>
        
        <ConfettiEffect show={showConfetti} />
        <FireworksEffect show={showFireworks} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <GlowingStars count={15} />
        <MusicControl 
          musicPlaying={musicPlaying} 
          setMusicPlaying={setMusicPlaying}
          showSnow={showSnow}
          toggleSnow={toggleSnow}
        />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        <main className="flex flex-col items-center justify-center min-h-screen p-8 relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-center mb-12 animate-pulse drop-shadow-2xl">
            Make a Wish, Khushii! 🌟
          </h1>

          <section className="bg-white bg-opacity-5 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white border-opacity-10 text-center max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 from-opacity-10 via-purple-500 via-opacity-10 to-indigo-500 to-opacity-10 rounded-3xl"></div>
            
            <div className="relative z-10">
              <Rotating3DCake />
              
              <div className="flex justify-center gap-4 mb-10" role="group" aria-label="Birthday candles">
                {candles.map((lit, index) => (
                  <button
                    key={index}
                    onClick={() => blowCandle(index)}
                    className={`text-6xl transform hover:scale-125 transition-all duration-500 select-none ${
                      lit 
                        ? 'animate-pulse cursor-pointer hover:drop-shadow-2xl' 
                        : 'opacity-20 cursor-not-allowed grayscale'
                    }`}
                    disabled={!lit}
                    aria-label={`Candle ${index + 1}: ${lit ? 'Click to blow out' : 'Already blown out'}`}
                    style={{
                      filter: lit ? 'drop-shadow(0 0 20px rgba(255,165,0,0.8))' : 'none'
                    }}
                  >
                    🕯️
                  </button>
                ))}
              </div>

              <p className="text-white text-2xl mb-10 font-light">
                {!allBlown ? (
                  <span>
                    Click the candles to blow them out! 
                    <br />
                    <span className="text-yellow-300 font-bold">({litCandles} candles left)</span>
                  </span>
                ) : (
                  <span className="text-yellow-300 font-bold text-3xl animate-pulse">
                    All candles blown! Your wish will come true! 🌟
                  </span>
                )}
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={resetCandles}
                  className="group relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-orange-500 hover:shadow-opacity-25 transform hover:scale-110 transition-all duration-500 ring-2 ring-white ring-opacity-20 select-none"
                >
                  <span className="text-lg">🔥 Light Candles Again</span>
                </button>
                <button
                  onClick={() => setCurrentSection('wishes')}
                  className="group relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-teal-500 hover:shadow-opacity-25 transform hover:scale-110 transition-all duration-500 ring-2 ring-white ring-opacity-20 select-none"
                >
                  <span className="text-lg">💌 Read Birthday Wishes</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Wishes Section
  if (currentSection === 'wishes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white from-opacity-5 via-transparent to-transparent"></div>
        
        <ConfettiEffect show={showConfetti} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <GlowingStars count={15} />
        <MusicControl 
          musicPlaying={musicPlaying} 
          setMusicPlaying={setMusicPlaying}
          showSnow={showSnow}
          toggleSnow={toggleSnow}
        />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        {/* Hearts */}
        <div aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <FloatingElement
              key={i}
              emoji="💕"
              className="text-pink-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 40 + 30}px`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'drop-shadow(0 0 15px rgba(255,182,193,0.6))'
              }}
            />
          ))}
        </div>

        <main className="max-w-6xl mx-auto pt-32">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-center mb-16 animate-pulse drop-shadow-2xl">
            Special Wishes for Khushii 💌
          </h1>

          <section className="bg-white bg-opacity-5 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white border-opacity-10 mb-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 from-opacity-10 via-purple-500 via-opacity-10 to-indigo-500 to-opacity-10 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-8xl animate-bounce drop-shadow-2xl">🎁</div>
                <PulsatingHeart />
              </div>
              <p className="text-white text-xl md:text-3xl leading-relaxed mb-12 font-light max-w-4xl mx-auto">
                {BIRTHDAY_WISHES[currentWishIndex]}
              </p>
              
              <nav className="flex flex-wrap justify-center gap-6 mb-8" aria-label="Birthday wishes navigation">
                <button
                  onClick={prevWish}
                  className="group bg-white bg-opacity-10 backdrop-blur-xl text-white px-8 py-4 rounded-full hover:bg-opacity-20 transform hover:scale-110 transition-all duration-500 flex items-center gap-3 border border-white border-opacity-20 select-none"
                  aria-label="Previous wish"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">Previous</span>
                </button>
                
                <button
                  onClick={triggerConfetti}
                  className="group relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:shadow-pink-500 hover:shadow-opacity-25 transform hover:scale-110 transition-all duration-500 flex items-center gap-3 ring-2 ring-white ring-opacity-20 select-none"
                >
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                  <span className="text-lg">Celebrate This Wish!</span>
                </button>
                
                <button
                  onClick={nextWish}
                  className="group bg-white bg-opacity-10 backdrop-blur-xl text-white px-8 py-4 rounded-full hover:bg-opacity-20 transform hover:scale-110 transition-all duration-500 flex items-center gap-3 border border-white border-opacity-20 select-none"
                  aria-label="Next wish"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>

              <div className="text-white text-opacity-60 text-lg">
                <span className="font-semibold text-white">Wish {currentWishIndex + 1}</span> of {BIRTHDAY_WISHES.length} 💫
              </div>
            </div>
          </section>

          <div className="text-center">
            <div className="max-w-2xl mx-auto bg-white bg-opacity-5 backdrop-blur-xl border border-white border-opacity-20 text-white rounded-3xl p-6">
              <div className="flex items-center gap-3 justify-center">
                <Heart className="h-5 w-5 text-pink-400" />
                <p className="text-lg font-light">
                  Each wish is crafted with love just for you, sweet Khushii! 💖
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Gallery Section
  if (currentSection === 'gallery') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-teal-800 to-cyan-900 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white from-opacity-5 via-transparent to-transparent"></div>
        
        <ConfettiEffect show={showConfetti} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <FloatingBalloons count={6} />
        <MusicControl 
          musicPlaying={musicPlaying} 
          setMusicPlaying={setMusicPlaying}
          showSnow={showSnow}
          toggleSnow={toggleSnow}
        />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        {/* Butterflies */}
        <div aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <FloatingElement
              key={i}
              emoji="🦋"
              className="text-pink-300 animate-bounce opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: '50px',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: '8s',
                filter: 'drop-shadow(0 0 15px rgba(255,182,193,0.4))'
              }}
            />
          ))}
        </div>

        <main className="max-w-7xl mx-auto pt-32">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-center mb-16 animate-pulse drop-shadow-2xl">
            Beautiful Khushii Gallery 📸
          </h1>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {PHOTO_GALLERY.map((photo, index) => (
              <article
                key={index}
                className="group relative bg-white bg-opacity-5 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white border-opacity-10 hover:scale-110 transition-all duration-700 cursor-pointer select-none"
                onClick={() => selectPhoto(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-10 rounded-3xl group-hover:opacity-20 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="relative overflow-hidden rounded-2xl mb-6 shadow-2xl">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="text-white text-center font-medium text-xl group-hover:text-pink-300 transition-colors duration-300">
                    {photo.caption}
                  </p>
                </div>
              </article>
            ))}
          </section>

          {selectedPhoto !== null && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-xl z-50 flex items-center justify-center p-8" 
              onClick={closePhotoModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="photo-title"
            >
              <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                <img
                  src={PHOTO_GALLERY[selectedPhoto].src}
                  alt={PHOTO_GALLERY[selectedPhoto].caption}
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-4 text-center">
                    <p id="photo-title" className="text-white text-2xl font-medium">
                      {PHOTO_GALLERY[selectedPhoto].caption}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closePhotoModal}
                  className="absolute top-6 right-6 bg-white bg-opacity-20 backdrop-blur-xl rounded-full p-3 text-white hover:bg-opacity-30 transition-all duration-300 select-none"
                  aria-label="Close photo"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          <div className="text-center">
            <div className="bg-white bg-opacity-5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white border-opacity-10 max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 from-opacity-10 via-teal-500 via-opacity-10 to-cyan-500 to-opacity-10 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6">🎂</div>
                <button
                  onClick={triggerConfetti}
                  className="group relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-pink-500 hover:shadow-opacity-25 transform hover:scale-110 transition-all duration-500 ring-2 ring-white ring-opacity-20 select-none"
                >
                  <span className="text-lg">🎉 Celebrate Khushii!</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default KhushiiBirthdayApp;