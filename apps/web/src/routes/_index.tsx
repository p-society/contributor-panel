import type { Route } from "./+types/_index";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leaderboard" },
    { name: "description", content: "Weekly rankings of our top performers." },
  ];
}

const mockContributors = [
  { rank: 1, github: "ujsquared", pts: 12800 },
  { rank: 2, github: "octocat", pts: 11500 },
  { rank: 3, github: "torvalds", pts: 10900 },
  { rank: 4, github: "userfour", pts: 9850 },
  { rank: 5, github: "you", pts: 9200 },
  { rank: 6, github: "playersix", pts: 8750 },
];

export default function Home() {
  const [contributors, setContributors] = useState<Array<{
    rank: number;
    github: string;
    pts: number;
  }> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/details")
      .then((res) => res.json())
      .then((data) => {
        setContributors(data);
        setLoading(false);
        console.log("Contributors fetched:", data);
      })
      .catch(() => setLoading(false));
  }, []);

  const data = !loading && contributors && contributors.length > 0 ? contributors : mockContributors;

  return (
    <div className="grainy-bg-static relative min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 lg:p-12 bg-[#0a0a0a] text-neutral-300" style={{ fontFamily: "'Lora', serif" }}>
      {/* Background Glow Effects */}
      <div className="glow-effect glow-1 animated-orb orb-ellipse-1"></div>
      <div className="glow-effect glow-2 animated-orb orb-ellipse-2"></div>

      <div className="w-full max-w-2xl mx-auto z-10">
        {/* Header Section */}
        <header className="text-left mb-8 sm:mb-12">
          <h1
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-medium text-neutral-100 leading-tight break-words"
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            Leaderboard
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-neutral-400">Weekly rankings of our top performers.</p>
        </header>

        {/* Leaderboard List */}
        <main>
          <div className="space-y-3 sm:space-y-5 overflow-x-auto">
            {data.map((c, i) => (
              <div
                key={c.rank}
                className={`flex items-center p-2 sm:p-3 border-b ${i === 0 ? 'border-neutral-800' : i === 1 ? 'border-neutral-800' : i === 2 ? 'border-neutral-800' : 'border-neutral-800/60'} transition-all duration-300 min-w-[320px]`}
              >
                <div className={
                  i === 0
                    ? "w-8 sm:w-12 text-center text-lg sm:text-2xl font-medium text-amber-400"
                    : i === 1
                    ? "w-8 sm:w-12 text-center text-lg sm:text-2xl font-medium text-neutral-400"
                    : i === 2
                    ? "w-8 sm:w-12 text-center text-lg sm:text-2xl font-medium text-amber-600"
                    : "w-8 sm:w-12 text-center text-base sm:text-xl font-medium text-neutral-500"
                }>
                  {c.rank}
                </div>
                <img
                  className={
                    i === 0
                      ? "w-8 h-8 sm:w-12 sm:h-12 rounded-full mx-2 sm:mx-4 md:mx-6 border-2 border-amber-400/50"
                      : i === 1
                      ? "w-8 h-8 sm:w-12 sm:h-12 rounded-full mx-2 sm:mx-4 md:mx-6 border-2 border-neutral-500/50"
                      : i === 2
                      ? "w-8 h-8 sm:w-12 sm:h-12 rounded-full mx-2 sm:mx-4 md:mx-6 border-2 border-amber-600/50"
                      : "w-8 h-8 sm:w-12 sm:h-12 rounded-full mx-2 sm:mx-4 md:mx-6"
                  }
                  src={`https://github.com/${c.github}.png`}
                  alt={c.github}
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = 'https://placehold.co/80x80';
                  }}
                />
                <div className="flex-grow min-w-0">
                  <h4 className={
                    i === 0
                      ? "text-base sm:text-lg font-semibold text-neutral-100 truncate"
                      : i === 1
                      ? "text-base sm:text-lg font-semibold text-neutral-200 truncate"
                      : i === 2
                      ? "text-base sm:text-lg font-semibold text-neutral-200 truncate"
                      : "text-base sm:text-lg font-medium text-neutral-300 truncate"
                  }>
                    {c.github}
                  </h4>
                </div>
                <div className={
                  i === 0
                    ? "text-base sm:text-xl font-semibold text-amber-400 text-right min-w-[48px]"
                    : i === 1
                    ? "text-base sm:text-xl font-semibold text-neutral-300 text-right min-w-[48px]"
                    : i === 2
                    ? "text-base sm:text-xl font-semibold text-neutral-300 text-right min-w-[48px]"
                    : "text-sm sm:text-lg font-medium text-neutral-400 text-right min-w-[40px]"
                }>
                  {c.pts}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      {/* Custom Glow and Scrollbar Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
        .grainy-bg-static::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><filter id="a" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.75" stitchTiles="stitch" result="f"/></filter><rect width="100%" height="100%" filter="url(%23a)" opacity=".07"/></svg>');
          pointer-events: none;
        }
        .animated-orb {
          animation: orb-glow 6s ease-in-out infinite alternate;
        }
        @keyframes orb-glow {
          0% { filter: blur(80px) brightness(0.8); opacity: 0.7; }
          50% { filter: blur(100px) brightness(1.2); opacity: 1; }
          100% { filter: blur(80px) brightness(0.8); opacity: 0.7; }
        }
        .orb-ellipse-1 {
          animation: orb-glow 6s ease-in-out infinite alternate, orb-ellipse-1 60s linear infinite;
        }
        .orb-ellipse-2 {
          animation: orb-glow 6s ease-in-out infinite alternate, orb-ellipse-2 75s linear infinite;
        }
        @keyframes orb-ellipse-1 {
          0%   { top: 10%; left: 50%; transform: translate(-50%, -50%) scale(1); }
          25%  { top: 30%; left: 70%; transform: translate(-50%, -50%) scale(1.1); }
          50%  { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.2); }
          75%  { top: 30%; left: 30%; transform: translate(-50%, -50%) scale(1.1); }
          100% { top: 10%; left: 50%; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes orb-ellipse-2 {
          0%   { bottom: 10%; right: 50%; transform: translate(50%, 50%) scale(1); }
          20%  { bottom: 30%; right: 70%; transform: translate(50%, 50%) scale(1.1); }
          50%  { bottom: 50%; right: 50%; transform: translate(50%, 50%) scale(1.2); }
          80%  { bottom: 30%; right: 30%; transform: translate(50%, 50%) scale(1.1); }
          100% { bottom: 10%; right: 50%; transform: translate(50%, 50%) scale(1); }
        }
        .glow-effect {
          position: absolute;
          z-index: 0;
          pointer-events: none;
        }
        .glow-1 {
          width: 50vw;
          height: 50vw;
          max-width: 600px;
          max-height: 600px;
          background: radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, rgba(217, 119, 6, 0) 65%);
        }
        .glow-2 {
          width: 40vw;
          height: 40vw;
          max-width: 450px;
          max-height: 450px;
          background: radial-gradient(circle, rgba(217, 119, 6, 0.25) 0%, rgba(217, 119, 6, 0) 70%);
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #111;
        }
        ::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
