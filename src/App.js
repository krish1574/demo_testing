import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Heart, Cake, Sparkles, PartyPopper, Camera, Volume2, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react';

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

const FloatingElement = React.memo(({ emoji, style, className = "" }) => (
  <div
    className={`absolute pointer-events-none select-none ${className}`}
    style={style}
    aria-hidden="true"
  >
    {emoji}
  </div>
));

const ConfettiEffect = React.memo(({ show, count = 16 }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <FloatingElement
          key={i}
          emoji={CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)]}
          className="animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${Math.random() * 16 + 14}px`,
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
          }}
        />
      ))}
    </div>
  );
});

const SparkleEffect = React.memo(({ show, count = 10 }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-30" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <FloatingElement
          key={i}
          emoji="✨"
          className="animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 16 + 12}px`,
            animationDelay: `${Math.random() * 3}s`,
            filter: 'drop-shadow(0 0 10px rgba(255,192,203,0.3))'
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
      {Array.from({ length: 7 }, (_, i) => (
        <FloatingElement
          key={i}
          emoji="🎆"
          className="animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            fontSize: '32px',
            filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.8))'
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
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 12}px`,
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
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1);}
            50% { transform: translateY(-16px) rotate(180deg) scale(1.07);}
          }
        `
      }} />
    </>
  );
});

const ParticleTrail = React.memo(({ particles }) => (
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
));

const Rotating3DCake = React.memo(() => (
  <div className="relative inline-block mb-4 md:mb-10">
    <div
      className="text-6xl md:text-9xl drop-shadow-2xl hover:scale-110 transition-all duration-500"
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
      className="text-4xl md:text-6xl hover:scale-125 transition-all duration-300 cursor-pointer"
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
          0%, 100% { transform: scale(1);}
          50% { transform: scale(1.1);}
        }
      `
    }} />
  </div>
));

const FloatingBalloons = React.memo(({ count = 2 }) => {
  const balloons = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: ['🎈', '🎀', '🎁'][Math.floor(Math.random() * 3)],
      left: Math.random() * 90,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 2
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
              fontSize: '38px',
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
            0%, 100% { transform: translateY(0px) rotate(-2deg);}
            50% { transform: translateY(-30px) rotate(2deg);}
          }
        `
      }} />
    </>
  );
});

const GlowingStars = React.memo(({ count = 5 }) => {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 16 + 15
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
            filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.7))'
          }}
        >
          ⭐
        </div>
      ))}
    </div>
  );
});

const Navigation = React.memo(({ currentSection, setCurrentSection }) => (
  <nav className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50" role="navigation" aria-label="Section navigation">
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-full px-2 md:px-4 py-1 md:py-2 shadow-xl border border-white border-opacity-20">
      <div className="flex items-center gap-1 md:gap-3">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`relative px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-500 hover:scale-105 select-none ${
              currentSection === section.id
                ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg ring-2 ring-white ring-opacity-20'
                : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10'
            }`}
            aria-current={currentSection === section.id ? 'page' : undefined}
          >
            <span className="mr-1 text-sm" aria-hidden="true">{section.icon}</span>
            <span className="hidden sm:inline">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  </nav>
));

const MusicControl = React.memo(({ musicPlaying, setMusicPlaying, showSnow, toggleSnow }) => (
  <div className="fixed top-3 right-3 z-50 flex flex-col gap-2 md:gap-3">
    <button
      onClick={() => setMusicPlaying(!musicPlaying)}
      className={`w-11 h-11 md:w-14 md:h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-500 hover:scale-110 select-none
        ${musicPlaying
        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
        : 'bg-white bg-opacity-10 backdrop-blur-xl text-white text-opacity-80 hover:text-white border border-white border-opacity-20'
      }`}
      aria-label={musicPlaying ? "Pause music" : "Play music"}
      style={{ minWidth: 0, minHeight: 0, padding: 0, aspectRatio: '1/1' }}
    >
      {musicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
    </button>
    <button
      onClick={toggleSnow}
      className={`w-11 h-11 md:w-14 md:h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-500 hover:scale-110 select-none 
        ${showSnow
        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
        : 'bg-white bg-opacity-10 backdrop-blur-xl text-white text-opacity-80 hover:text-white border border-white border-opacity-20'
      }`}
      aria-label={showSnow ? "Hide snow effect" : "Show snow effect"}
      style={{ minWidth: 0, minHeight: 0, padding: 0, aspectRatio: '1/1' }}
    >
      <span className="text-xl">❄️</span>
    </button>
    {musicPlaying &&
      <audio autoPlay loop style={{ display: "none" }}>
        <source src="/happy-birthday-357371.mp3" type="audio/mpeg" />
      </audio>
    }
  </div>
));

const KhushiiBirthdayApp = () => {
  const [currentSection, setCurrentSection] = useState('welcome');
  const [showConfetti, setShowConfetti] = useState(false);
  const [candles, setCandles] = useState(() => Array(7).fill(true));
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [hoveredMemory, setHoveredMemory] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showSnow, setShowSnow] = useState(false);
  const [particles, setParticles] = useState([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particleTimeoutRef = useRef(null);
  const [welcomeConfetti, setWelcomeConfetti] = useState(false);

  const floatingElements = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      emoji: FLOAT_EMOJIS[Math.floor(Math.random() * FLOAT_EMOJIS.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 1.5,
      size: Math.random() * 22 + 25
    })), []
  );

  const addParticle = useCallback((x, y) => {
    const newParticle = {
      x: x - 10,
      y: y - 10,
      emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]
    };
    setParticles(prev => [...prev.slice(-6), newParticle]);
    if (particleTimeoutRef.current) clearTimeout(particleTimeoutRef.current);
    particleTimeoutRef.current = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 600);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const newX = e.clientX, newY = e.clientY;
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
    setTimeout(() => setShowConfetti(false), 1400);
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
        }, 1200);
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

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (particleTimeoutRef.current) clearTimeout(particleTimeoutRef.current);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedPhoto !== null) closePhotoModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, closePhotoModal]);

  useEffect(() => {
    if (currentSection === 'welcome') {
      setWelcomeConfetti(true);
      setTimeout(() => setWelcomeConfetti(false), 1400);
    }
  }, [currentSection]);

  if (currentSection === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-500 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
        <ConfettiEffect show={welcomeConfetti} count={16} />
        <FireworksEffect show={showFireworks} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <FloatingBalloons count={2} />
        <GlowingStars count={5} />
        <MusicControl musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} showSnow={showSnow} toggleSnow={toggleSnow} />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <main className="flex flex-col items-center justify-center min-h-screen px-1 sm:px-4 md:px-6 py-8 relative z-10 pt-14 sm:pt-20">
          <header className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 animate-pulse drop-shadow-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Happy Birthday</h1>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text mb-8 sm:mb-12 animate-bounce drop-shadow-2xl">Khushii! 🎂</h2>
            <div className="relative flex justify-center">
              <Rotating3DCake />
            </div>
          </header>
          <section className="bg-white bg-opacity-5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl border border-white border-opacity-10 max-w-xs sm:max-w-md md:max-w-2xl text-center mx-auto">
            <p className="text-lg sm:text-2xl md:text-3xl text-white font-light leading-relaxed mb-5 sm:mb-8">
              Today is all about celebrating <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">YOU</span>,
              beautiful Khushii! <br />
              Let's make this day absolutely <span className="font-bold text-yellow-300">magical!</span> ✨
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <button
                onClick={triggerConfetti}
                className="group bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 select-none"
              >
                <PartyPopper className="w-5 h-5 group-hover:animate-spin" />
                <span className="text-base sm:text-lg">Celebrate! 🎉</span>
              </button>
              <button
                onClick={() => setCurrentSection('cake')}
                className="group bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 select-none"
              >
                <Cake className="w-5 h-5 group-hover:animate-bounce" />
                <span className="text-base sm:text-lg">Blow Candles! 🕯️</span>
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (currentSection === 'memories') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800 px-1 sm:px-4 md:px-8 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
        <SparkleEffect show={true} count={10} />
        <ConfettiEffect show={showConfetti} count={10} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <MusicControl musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} showSnow={showSnow} toggleSnow={toggleSnow} />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        <main className="max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto pt-14 sm:pt-20">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-center mb-8 md:mb-16 animate-pulse drop-shadow-2xl">
            Beautiful Memories with Khushii 💕
          </h1>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:gap-8 md:mb-16">
            {MEMORIES.map((memory, index) => (
              <article
                key={index}
                className={`group relative bg-white bg-opacity-5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white border-opacity-10 hover:scale-105 transition-all duration-500 cursor-pointer select-none ${
                  hoveredMemory === index ? 'bg-opacity-10' : ''
                }`}
                onClick={triggerConfetti}
                onMouseEnter={() => setHoveredMemory(index)}
                onMouseLeave={() => setHoveredMemory(null)}
              >
                <div className={`absolute inset-0 ${memory.gradient} opacity-10 rounded-2xl sm:rounded-3xl transition-opacity duration-500 ${
                  hoveredMemory === index ? 'opacity-20' : ''
                }`} />
                <div className="relative z-10">
                  <div className="relative mb-4">
                    <div className="relative overflow-hidden rounded-xl shadow-2xl mb-2">
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full aspect-[3/4] h-72 sm:h-96 md:h-[32rem] object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-2 right-2 text-2xl sm:text-4xl group-hover:animate-bounce transition-all duration-300 drop-shadow-lg">
                        {memory.emoji}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 md:mb-6 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {memory.title}
                  </h3>
                  <p className="text-white text-opacity-90 text-base sm:text-lg text-center leading-relaxed font-light">
                    {memory.description}
                  </p>
                </div>
              </article>
            ))}
          </section>
          <div className="text-center">
            <button
              onClick={() => setCurrentSection('gallery')}
              className="group bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto select-none"
            >
              <Camera className="w-5 h-5 group-hover:animate-pulse" />
              <span className="text-base sm:text-lg">View Photo Gallery 📸</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (currentSection === 'cake') {
    const litCandles = candles.filter(c => c).length;
    const allBlown = litCandles === 0;
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-700 px-1 sm:px-4 md:px-8 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
        <FireworksEffect show={showFireworks} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <GlowingStars count={7} />
        <ConfettiEffect show={showConfetti} count={10} />
        <MusicControl musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} showSnow={showSnow} toggleSnow={toggleSnow} />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        <main className="flex flex-col items-center justify-center min-h-screen p-2 sm:p-4 md:p-8 relative z-10">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-center mb-6 sm:mb-12 animate-pulse drop-shadow-2xl">
            Make a Wish, Khushii! 🌟
          </h1>
          <section className="bg-white bg-opacity-5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl border border-white border-opacity-10 text-center max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            <div className="relative z-10">
              <Rotating3DCake />
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-10" role="group" aria-label="Birthday candles">
                {candles.map((lit, index) => (
                  <button
                    key={index}
                    onClick={() => blowCandle(index)}
                    className={`text-3xl sm:text-5xl md:text-6xl transform hover:scale-125 transition-all duration-300 select-none ${
                      lit
                        ? 'animate-pulse cursor-pointer hover:drop-shadow-2xl'
                        : 'opacity-20 cursor-not-allowed grayscale'
                    }`}
                    disabled={!lit}
                    aria-label={`Candle ${index + 1}: ${lit ? 'Click to blow out' : 'Already blown out'}`}
                  >
                    🕯️
                  </button>
                ))}
              </div>
              <p className="text-white text-lg sm:text-2xl mb-6 font-light">
                {!allBlown ? (
                  <>Click the candles to blow them out! <br />
                    <span className="text-yellow-300 font-bold">({litCandles} candles left)</span>
                  </>
                ) : (
                  <span className="text-yellow-300 font-bold text-xl sm:text-3xl animate-pulse">
                    All candles blown! Your wish will come true! 🌟
                  </span>
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={resetCandles}
                  className="group bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold py-2 px-6 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 select-none"
                >
                  <span className="text-base sm:text-lg">🔥 Light Candles Again</span>
                </button>
                <button
                  onClick={() => setCurrentSection('wishes')}
                  className="group bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 select-none"
                >
                  <span className="text-base sm:text-lg">💌 Read Birthday Wishes</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (currentSection === 'wishes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 px-1 sm:px-4 md:px-8 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
        <SparkleEffect show={true} count={10} />
        <ConfettiEffect show={showConfetti} count={10} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <GlowingStars count={7} />
        <MusicControl musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} showSnow={showSnow} toggleSnow={toggleSnow} />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        <main className="max-w-2xl sm:max-w-4xl md:max-w-6xl mx-auto pt-14 sm:pt-20">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-center mb-8 md:mb-16 animate-pulse drop-shadow-2xl">
            Special Wishes for Khushii 💌
          </h1>
          <section className="bg-white bg-opacity-5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl border border-white border-opacity-10 mb-6 md:mb-12 text-center">
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
                <div className="text-6xl sm:text-8xl animate-bounce drop-shadow-2xl">🎁</div>
                <PulsatingHeart />
              </div>
              <p className="text-white text-base sm:text-xl md:text-2xl leading-relaxed mb-6 sm:mb-12 font-light max-w-xs sm:max-w-2xl mx-auto">
                {BIRTHDAY_WISHES[currentWishIndex]}
              </p>
              <nav className="flex flex-wrap justify-center gap-3 md:gap-6 mb-3 sm:mb-8">
                <button
                  onClick={prevWish}
                  className="group bg-white bg-opacity-10 backdrop-blur-xl text-white px-4 md:px-8 py-2 md:py-4 rounded-full hover:bg-opacity-20 transform hover:scale-110 transition-all duration-300 flex items-center gap-2 border border-white border-opacity-20 select-none"
                  aria-label="Previous wish"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">Previous</span>
                </button>
                <button
                  onClick={triggerConfetti}
                  className="group bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold px-6 md:px-10 py-2 md:py-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 md:gap-3 ring-2 ring-white ring-opacity-20 select-none"
                >
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                  <span className="text-base md:text-lg">Celebrate This Wish!</span>
                </button>
                <button
                  onClick={nextWish}
                  className="group bg-white bg-opacity-10 backdrop-blur-xl text-white px-4 md:px-8 py-2 md:py-4 rounded-full hover:bg-opacity-20 transform hover:scale-110 transition-all duration-300 flex items-center gap-2 border border-white border-opacity-20 select-none"
                  aria-label="Next wish"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
              <div className="text-white text-opacity-60 text-base sm:text-lg">
                <span className="font-semibold text-white">Wish {currentWishIndex + 1}</span> of {BIRTHDAY_WISHES.length} 💫
              </div>
            </div>
          </section>
          <div className="text-center">
            <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto bg-white bg-opacity-5 backdrop-blur-xl border border-white border-opacity-20 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex items-center gap-1 sm:gap-3 justify-center">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
                <p className="text-base sm:text-lg font-light">
                  Each wish is crafted with love just for you, sweet Khushii! 💖
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentSection === 'gallery') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-teal-800 to-cyan-900 px-1 sm:px-4 md:px-8 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
        <ConfettiEffect show={showConfetti} count={8} />
        <SnowEffect show={showSnow} />
        <ParticleTrail particles={particles} />
        <FloatingBalloons count={3} />
        <MusicControl musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} showSnow={showSnow} toggleSnow={toggleSnow} />
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        <main className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-7xl mx-auto pt-14 sm:pt-20">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-center mb-10 md:mb-16 animate-pulse drop-shadow-2xl">
            Beautiful Khushii Gallery 📸
          </h1>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-16">
            {PHOTO_GALLERY.map((photo, index) => (
              <article
                key={index}
                className="group relative bg-white bg-opacity-5 backdrop-blur-2xl rounded-xl sm:rounded-3xl p-3 sm:p-6 shadow-2xl border border-white border-opacity-10 hover:scale-105 transition-all duration-500 cursor-pointer select-none"
                onClick={() => selectPhoto(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-10 rounded-xl sm:rounded-3xl group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="relative overflow-hidden rounded-lg mb-4 shadow-xl">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-56 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div className="absolute top-2 right-2">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-1 sm:p-2">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="text-white text-center font-medium text-base sm:text-xl group-hover:text-pink-300 transition-colors duration-300">
                    {photo.caption}
                  </p>
                </div>
              </article>
            ))}
          </section>
          {selectedPhoto !== null && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-8"
              onClick={closePhotoModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="photo-title"
            >
              <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl" onClick={e => e.stopPropagation()}>
                <img
                  src={PHOTO_GALLERY[selectedPhoto].src}
                  alt={PHOTO_GALLERY[selectedPhoto].caption}
                  className="w-full h-auto rounded-xl sm:rounded-3xl shadow-2xl"
                />
                <div className="absolute bottom-2 sm:bottom-6 left-2 sm:left-6 right-2 sm:right-6">
                  <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-lg sm:rounded-2xl p-2 sm:p-4 text-center">
                    <p id="photo-title" className="text-white text-lg sm:text-2xl font-medium">
                      {PHOTO_GALLERY[selectedPhoto].caption}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closePhotoModal}
                  className="absolute top-2 sm:top-6 right-2 sm:right-6 bg-white bg-opacity-20 backdrop-blur-xl rounded-full p-2 sm:p-3 text-white hover:bg-opacity-30 transition-all duration-300 select-none"
                  aria-label="Close photo"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          )}
          <div className="text-center">
            <div className="bg-white bg-opacity-5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-white border-opacity-10 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
              <div className="relative z-10">
                <div className="text-4xl sm:text-6xl mb-2 sm:mb-6">🎂</div>
                <button
                  onClick={triggerConfetti}
                  className="group bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold py-2 px-6 rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 ring-2 ring-white ring-opacity-20 select-none"
                >
                  <span className="text-base sm:text-lg">🎉 Celebrate Khushii!</span>
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
