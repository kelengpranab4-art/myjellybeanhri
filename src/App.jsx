import React from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DigitalBouquet } from './components/bouquet/DigitalBouquet';
import { LittleNotes } from './components/LittleNotes';
import { MemoryGallery } from './components/MemoryGallery';
import { SecretLetter } from './components/SecretLetter';
import { DatePlanner } from './components/DatePlanner';
import { FinalQuestion } from './components/FinalQuestion';
import { MusicPlayer } from './components/MusicPlayer';
import { Heart } from 'lucide-react';

export default function App() {
  const [plannedActivity, setPlannedActivity] = React.useState('Coffee and Conversations');

  const scrollToBouquet = () => {
    document.getElementById('the-bouquet')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNotes = () => {
    document.getElementById('little-notes')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDatePlanner = () => {
    document.getElementById('date-planner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFinalDate = (activity) => {
    if (activity) {
      setPlannedActivity(activity);
    }
    document.getElementById('final-date')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-twilight-950 text-slate-100 overflow-x-hidden selection:bg-dustypink-400 selection:text-white">
      {/* Dynamic Animated Particles Layer */}
      <BackgroundParticles />

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Main Flow of Romantic Experiences */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Section */}
        <Hero onEnter={scrollToBouquet} />

        {/* 2. Interactive Digital Flower Bouquet (The Signature Feature) */}
        <DigitalBouquet onNavigateNext={scrollToNotes} />

        {/* 3. Little Notes Section */}
        <LittleNotes />

        {/* 4. Our Moments Polaroid Gallery */}
        <MemoryGallery />

        {/* 5. The Secret Letter */}
        <SecretLetter onProceedToDate={scrollToDatePlanner} />

        {/* 6. The Date Planner */}
        <DatePlanner onProceedToFinal={scrollToFinalDate} />

        {/* 7. The Final Date Invitation */}
        <FinalQuestion initialActivity={plannedActivity} />
      </main>

      {/* Persistent Ambient Romantic Music Player */}
      <MusicPlayer />

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-white/5 text-center text-xs text-stone-500 font-serif">
        <div className="flex items-center justify-center gap-1.5 mb-2 text-stone-400">
          <span>Crafted with all my heart</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          <span>especially for you</span>
        </div>
        <p className="text-[11px] text-stone-600">
          A Little Something For You ♡ &bull; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
