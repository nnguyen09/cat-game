"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Cat, RefreshCcw, Hand, Search, Lightbulb } from 'lucide-react';

const LEVEL_1_CATS = [
  { id: 1, x: 10, y: 72, scale: 0.9, rotation: -4, color: 'orange', revealedBy: 'none' },
  { id: 2, x: 17, y: 68, scale: 0.82, rotation: 6, color: 'gray', revealedBy: 'none' },
  { id: 3, x: 80, y: 71, scale: 0.92, rotation: -3, color: 'white', revealedBy: 'none' },
  { id: 4, x: 89, y: 67, scale: 0.84, rotation: 4, color: 'black', revealedBy: 'none' },
  { id: 5, x: 28, y: 59, scale: 0.8, rotation: -8, color: 'orange', revealedBy: 'none' },
  { id: 6, x: 66, y: 58, scale: 0.8, rotation: 8, color: 'gray', revealedBy: 'none' },
  { id: 7, x: 49, y: 35, scale: 0.72, rotation: 0, color: 'white', revealedBy: 'none' },
  { id: 8, x: 12, y: 33, scale: 0.78, rotation: -10, color: 'black', revealedBy: 'none' },
  { id: 9, x: 89, y: 30, scale: 0.72, rotation: 10, color: 'orange', revealedBy: 'none' },
  { id: 10, x: 43, y: 79, scale: 0.86, rotation: 2, color: 'gray', revealedBy: 'none' },
  { id: 11, x: 22, y: 46, scale: 0.78, rotation: -6, color: 'white', revealedBy: 'none' },
  { id: 12, x: 75, y: 47, scale: 0.76, rotation: 7, color: 'orange', revealedBy: 'none' },
  { id: 13, x: 62, y: 20, scale: 0.74, rotation: -2, color: 'gray', revealedBy: 'none' },
  { id: 14, x: 16, y: 53, scale: 0.8, rotation: 0, color: 'black', revealedBy: 'none' },
  { id: 15, x: 52, y: 56, scale: 0.76, rotation: -4, color: 'white', revealedBy: 'none' },
  { id: 16, x: 71, y: 83, scale: 0.78, rotation: 5, color: 'orange', revealedBy: 'none' },
  { id: 17, x: 32, y: 83, scale: 0.76, rotation: -5, color: 'gray', revealedBy: 'none' },
  { id: 18, x: 58, y: 71, scale: 0.82, rotation: 6, color: 'black', revealedBy: 'none' },
  { id: 19, x: 84, y: 58, scale: 0.78, rotation: 0, color: 'white', revealedBy: 'none' },
  { id: 20, x: 35, y: 21, scale: 0.7, rotation: -6, color: 'orange', revealedBy: 'none' },
];

const LEVEL_2_CATS = [
  { id: 1, x: 10, y: 72, scale: 0.9, rotation: -4, color: 'orange', revealedBy: 'none' },
  { id: 2, x: 17, y: 70, scale: 0.82, rotation: 6, color: 'gray', revealedBy: 'none' },
  { id: 3, x: 80, y: 70, scale: 0.92, rotation: -3, color: 'white', revealedBy: 'none' },
  { id: 4, x: 88, y: 70, scale: 0.84, rotation: 4, color: 'black', revealedBy: 'none' },
  { id: 5, x: 30, y: 58, scale: 0.8, rotation: -8, color: 'orange', revealedBy: 'none' },
  { id: 6, x: 64, y: 58, scale: 0.8, rotation: 8, color: 'gray', revealedBy: 'none' },
  { id: 7, x: 50, y: 32, scale: 0.72, rotation: 0, color: 'white', revealedBy: 'none' },
  { id: 8, x: 7, y: 30, scale: 0.78, rotation: -10, color: 'black', revealedBy: 'none' },
  { id: 9, x: 92, y: 28, scale: 0.72, rotation: 10, color: 'orange', revealedBy: 'none' },
  { id: 10, x: 43, y: 76, scale: 0.86, rotation: 2, color: 'gray', revealedBy: 'none' },
  { id: 11, x: 22, y: 41, scale: 0.78, rotation: -6, color: 'white', revealedBy: 'fridge' },
  { id: 12, x: 76, y: 44, scale: 0.76, rotation: 7, color: 'orange', revealedBy: 'cabinetLeft' },
  { id: 13, x: 61, y: 22, scale: 0.74, rotation: -2, color: 'gray', revealedBy: 'window' },
  { id: 14, x: 12, y: 49, scale: 0.8, rotation: 0, color: 'black', revealedBy: 'curtain' },
  { id: 15, x: 49, y: 52, scale: 0.76, rotation: -4, color: 'white', revealedBy: 'drawer' },
  { id: 16, x: 72, y: 78, scale: 0.78, rotation: 5, color: 'orange', revealedBy: 'rug' },
  { id: 17, x: 35, y: 82, scale: 0.76, rotation: -5, color: 'gray', revealedBy: 'plant' },
  { id: 18, x: 56, y: 69, scale: 0.82, rotation: 6, color: 'black', revealedBy: 'chair' },
  { id: 19, x: 88, y: 58, scale: 0.78, rotation: 0, color: 'white', revealedBy: 'cabinetRight' },
  { id: 20, x: 35, y: 22, scale: 0.7, rotation: -6, color: 'orange', revealedBy: 'clock' },
];

const confetti = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + i * 5}%`,
  delay: i * 0.06,
  duration: 1.8 + (i % 4) * 0.3,
}));

const initialPanels = {
  fridge: false,
  cabinetLeft: false,
  cabinetRight: false,
  window: false,
  curtain: false,
  drawer: false,
  rug: false,
  plant: false,
  chair: false,
  clock: false,
};

function CatSprite({ color = 'orange', found = false }) {
  const palette = {
    orange: {
      fur: '#d88a43',
      furDark: '#a95f21',
      belly: '#f2d2b4',
      nose: '#d88fa0',
      eye: '#2f241d',
      stripe: '#8b4b1e',
    },
    gray: {
      fur: '#9ba3ad',
      furDark: '#6f7782',
      belly: '#d8dde2',
      nose: '#c88ea0',
      eye: '#2a2f35',
      stripe: '#6c737d',
    },
    white: {
      fur: '#f4f1ec',
      furDark: '#d7d1ca',
      belly: '#fffaf5',
      nose: '#d59baa',
      eye: '#423a33',
      stripe: '#d8d2cb',
    },
    black: {
      fur: '#3d4046',
      furDark: '#1f2328',
      belly: '#575c63',
      nose: '#b47b8e',
      eye: '#f2d783',
      stripe: '#23272c',
    },
  };

  const theme = palette[color] ?? palette.orange;

  if (found) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-full border border-emerald-300/80 bg-white/95 text-lg shadow-lg">
        ✅
      </div>
    );
  }

  return (
    <svg viewBox="0 0 120 90" className="h-full w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)]">
      <defs>
        <linearGradient id={`body-${color}`} x1="0" x2="1">
          <stop offset="0%" stopColor={theme.furDark} />
          <stop offset="45%" stopColor={theme.fur} />
          <stop offset="100%" stopColor={theme.furDark} />
        </linearGradient>
        <radialGradient id={`belly-${color}`}>
          <stop offset="0%" stopColor={theme.belly} />
          <stop offset="100%" stopColor={theme.fur} />
        </radialGradient>
      </defs>

      <ellipse cx="48" cy="52" rx="28" ry="18" fill={`url(#body-${color})`} />
      <ellipse cx="47" cy="57" rx="14" ry="9" fill={`url(#belly-${color})`} opacity="0.95" />
      <path d="M22 50 C12 45, 11 34, 20 30 C28 26, 31 38, 29 47" fill="none" stroke={theme.furDark} strokeWidth="7" strokeLinecap="round" />
      <path d="M22 50 C12 45, 11 34, 20 30 C28 26, 31 38, 29 47" fill="none" stroke={theme.fur} strokeWidth="4" strokeLinecap="round" />

      <ellipse cx="74" cy="39" rx="15" ry="13" fill={`url(#body-${color})`} />
      <path d="M64 30 L69 15 L77 27 Z" fill={theme.furDark} />
      <path d="M81 28 L88 15 L88 31 Z" fill={theme.furDark} />
      <path d="M66 29 L69.5 19 L75 27 Z" fill="#f7c1cb" opacity="0.8" />
      <path d="M79 28 L85 19 L86 29 Z" fill="#f7c1cb" opacity="0.8" />

      <ellipse cx="70" cy="52" rx="4.5" ry="16" fill={theme.furDark} />
      <ellipse cx="84" cy="52" rx="4.5" ry="16" fill={theme.furDark} />
      <ellipse cx="70" cy="54" rx="3.5" ry="15" fill={theme.fur} />
      <ellipse cx="84" cy="54" rx="3.5" ry="15" fill={theme.fur} />

      <circle cx="69" cy="37" r="2.2" fill={theme.eye} />
      <circle cx="79" cy="37" r="2.2" fill={theme.eye} />
      <path d="M74 41 L71 44 H77 Z" fill={theme.nose} />
      <path d="M74 44 C72 46, 71 47, 70 48" stroke={theme.eye} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M74 44 C76 46, 77 47, 78 48" stroke={theme.eye} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M66 42 H56" stroke={theme.eye} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M66 45 H55" stroke={theme.eye} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M82 42 H92" stroke={theme.eye} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M82 45 H93" stroke={theme.eye} strokeWidth="1.2" strokeLinecap="round" />

      <path d="M38 44 C42 39, 47 39, 51 44" stroke={theme.stripe} strokeWidth="2.2" fill="none" opacity="0.55" />
      <path d="M44 40 C48 35, 54 35, 58 40" stroke={theme.stripe} strokeWidth="2.2" fill="none" opacity="0.45" />
      <path d="M71 31 C73 29, 76 29, 78 31" stroke={theme.stripe} strokeWidth="1.8" fill="none" opacity="0.4" />
    </svg>
  );
}

function LivingRoomScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#d7d0cb_0%,#d7d0cb_20%,#c5b7ac_20%,#c5b7ac_74%,#8b5f43_74%,#8b5f43_100%)]">
      <div className="absolute inset-x-0 top-0 h-[18%] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]" />
      <div className="absolute left-[8%] top-[16%] h-[30%] w-[26%] rounded-[1.75rem] bg-[#f4f3f0] shadow-[0_12px_24px_rgba(0,0,0,0.15)]">
        <div className="absolute inset-[7%] rounded-[1.2rem] border-[8px] border-white bg-[linear-gradient(180deg,#98c5df,#d9eef8)]" />
        <div className="absolute left-1/2 top-[7%] h-[86%] w-[4px] -translate-x-1/2 rounded-full bg-white/80" />
      </div>
      <div className="absolute left-[40%] top-[10%] h-[18%] w-[20%] rounded-full border-[10px] border-[#d8cfc8] bg-[radial-gradient(circle_at_40%_40%,#fbf4f1,#e7d9d1)] shadow-[0_10px_20px_rgba(0,0,0,0.14)]" />
      <div className="absolute right-[9%] top-[18%] h-[25%] w-[14%]">
        <div className="absolute bottom-0 left-[44%] h-[48%] w-[12%] rounded-full bg-[#7b563f]" />
        <div className="absolute left-[8%] top-[10%] h-[54%] w-[38%] rounded-full bg-[#7fa46f] blur-[1px]" />
        <div className="absolute left-[28%] top-[0%] h-[58%] w-[42%] rounded-full bg-[#98b984]" />
        <div className="absolute right-[6%] top-[16%] h-[52%] w-[34%] rounded-full bg-[#6f9960]" />
      </div>

      <div className="absolute left-[7%] bottom-[18%] h-[34%] w-[33%] rounded-[2.5rem] bg-[linear-gradient(180deg,#a96551,#85503f)] shadow-[0_18px_30px_rgba(0,0,0,0.22)]">
        <div className="absolute left-[7%] right-[7%] top-[12%] h-[45%] rounded-[2rem] bg-[linear-gradient(180deg,#d7c7bc,#bfa99b)]" />
        <div className="absolute left-[10%] bottom-[8%] h-[14%] w-[16%] rounded-full bg-[#6c4333]" />
        <div className="absolute right-[10%] bottom-[8%] h-[14%] w-[16%] rounded-full bg-[#6c4333]" />
      </div>

      <div className="absolute left-[44%] bottom-[18%] h-[17%] w-[18%] rounded-[1.2rem] bg-[linear-gradient(180deg,#bb8f6d,#8c6148)] shadow-[0_12px_24px_rgba(0,0,0,0.2)]" />
      <div className="absolute left-[50%] bottom-[32%] h-[12%] w-[6%] -translate-x-1/2 rounded-full bg-[#835b43]" />
      <div className="absolute right-[9%] bottom-[18%] h-[31%] w-[20%] rounded-[2rem] bg-[linear-gradient(180deg,#c9b9b2,#ab9387)] shadow-[0_18px_30px_rgba(0,0,0,0.22)]" />
      <div className="absolute left-[31%] bottom-[5%] h-[16%] w-[40%] rounded-full border-[6px] border-[#d8c1bd] bg-[radial-gradient(circle_at_50%_50%,#f0ded9,#d9c1ba)] shadow-[0_10px_22px_rgba(0,0,0,0.16)]" />
      <div className="absolute inset-x-0 bottom-[18%] h-[2px] bg-black/10" />
    </div>
  );
}

function KitchenScene({ openPanels, toggleObject }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#d8d2cb_0%,#d8d2cb_20%,#cbb8a6_20%,#cbb8a6_44%,#b18f73_44%,#b18f73_80%,#7c553c_80%,#7c553c_100%)]">
      <div className="absolute inset-x-0 top-0 h-[16%] bg-[linear-gradient(180deg,rgba(255,255,255,0.3),transparent)]" />
      <div className="absolute left-[0%] top-[43%] h-[4%] w-full bg-[#8a6348] shadow-inner" />
      <div className="absolute left-[0%] bottom-[20%] h-[4%] w-full bg-[#6f4a32]" />

      <div className="absolute left-[14%] top-[15%] h-[31%] w-[22%] rounded-t-[1rem] bg-[#f3f0ec] shadow-[0_10px_18px_rgba(0,0,0,0.12)]">
        <div className="absolute inset-[6%] rounded-md bg-[linear-gradient(180deg,#92c0d5,#d9edf7)]" />
        <motion.div
          animate={{ x: openPanels.window ? 38 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="absolute inset-y-[5%] left-[4%] w-[44%] rounded-l-md border-4 border-white/90 bg-white/15 backdrop-blur-[1px]"
        />
        <motion.div
          animate={{ x: openPanels.window ? -38 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="absolute inset-y-[5%] right-[4%] w-[44%] rounded-r-md border-4 border-white/90 bg-white/15 backdrop-blur-[1px]"
        />
        <button onClick={() => toggleObject('window')} className="absolute inset-0 z-20 rounded-t-[1rem]" aria-label="Open window" />
      </div>

      <motion.button
        onClick={() => toggleObject('curtain')}
        animate={{ x: openPanels.curtain ? -34 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="absolute left-[11%] top-[13%] z-10 h-[37%] w-[12%] rounded-b-[2rem] bg-[linear-gradient(180deg,#b57765,#8e5447)] shadow-[0_12px_22px_rgba(0,0,0,0.18)]"
        aria-label="Move curtain"
      />

      <button onClick={() => toggleObject('cabinetLeft')} className="absolute left-[4%] top-[48%] z-20 h-[22%] w-[18%] rounded-lg bg-[#b4815e] shadow-md" aria-label="Open left cabinet">
        <motion.div
          animate={{ rotateY: openPanels.cabinetLeft ? -70 : 0 }}
          style={{ transformOrigin: 'left center' }}
          className="absolute inset-0 rounded-lg border-4 border-[#8e6243] bg-[linear-gradient(180deg,#c99673,#a97452)]"
        >
          <div className="absolute right-[10%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#6b432e]" />
        </motion.div>
      </button>

      <button onClick={() => toggleObject('cabinetRight')} className="absolute right-[4%] top-[48%] z-20 h-[22%] w-[18%] rounded-lg bg-[#b4815e] shadow-md" aria-label="Open right cabinet">
        <motion.div
          animate={{ rotateY: openPanels.cabinetRight ? 70 : 0 }}
          style={{ transformOrigin: 'right center' }}
          className="absolute inset-0 rounded-lg border-4 border-[#8e6243] bg-[linear-gradient(180deg,#c99673,#a97452)]"
        >
          <div className="absolute left-[10%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#6b432e]" />
        </motion.div>
      </button>

      <button onClick={() => toggleObject('drawer')} className="absolute left-[39%] top-[57%] z-20 h-[10%] w-[22%] rounded-md border-4 border-[#85583d] bg-[#b57c56] shadow-md" aria-label="Open drawer">
        <motion.div
          animate={{ y: openPanels.drawer ? 18 : 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          className="absolute inset-0 rounded-md border-4 border-[#85583d] bg-[linear-gradient(180deg,#c58f67,#aa724d)]"
        >
          <div className="absolute left-1/2 top-1/2 h-2.5 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6b432e]" />
        </motion.div>
      </button>

      <button onClick={() => toggleObject('fridge')} className="absolute right-[0%] top-[14%] z-20 h-[56%] w-[14%] rounded-l-[1rem] bg-[#d8d8d8] shadow-[0_16px_26px_rgba(0,0,0,0.18)]" aria-label="Open fridge">
        <motion.div
          animate={{ rotateY: openPanels.fridge ? -72 : 0 }}
          style={{ transformOrigin: 'right center' }}
          className="absolute inset-0 rounded-l-[1rem] border-4 border-slate-400 bg-[linear-gradient(180deg,#f5f5f5,#d7d7d7)]"
        >
          <div className="absolute left-[12%] top-[30%] h-[18%] w-2 rounded-full bg-slate-500" />
        </motion.div>
      </button>

      <button onClick={() => toggleObject('clock')} className="absolute left-[44%] top-[8%] z-20 h-14 w-14 rounded-full border-4 border-[#d9d4cf] bg-[radial-gradient(circle_at_40%_35%,#ffffff,#ece8e3)] shadow-md" aria-label="Move clock">
        <motion.div animate={{ rotate: openPanels.clock ? 18 : 0, y: openPanels.clock ? -4 : 0 }} className="absolute inset-0 rounded-full">
          <div className="absolute left-1/2 top-[20%] h-4 w-1 -translate-x-1/2 rounded-full bg-slate-600" />
          <div className="absolute left-[48%] top-[48%] h-1 w-4 rounded-full bg-slate-600" />
        </motion.div>
      </button>

      <button onClick={() => toggleObject('plant')} className="absolute left-[24%] bottom-[18%] z-20 h-[20%] w-[12%]" aria-label="Move plant">
        <motion.div animate={{ x: openPanels.plant ? -26 : 0 }} className="absolute inset-0">
          <div className="absolute bottom-0 left-[18%] h-[38%] w-[64%] rounded-b-[1rem] rounded-t-md bg-[linear-gradient(180deg,#8f6a56,#70503f)] shadow-md" />
          <div className="absolute left-[10%] top-[12%] h-[42%] w-[26%] rounded-full bg-[#88a56f]" />
          <div className="absolute left-[34%] top-[0%] h-[46%] w-[30%] rounded-full bg-[#72935d]" />
          <div className="absolute right-[6%] top-[16%] h-[40%] w-[26%] rounded-full bg-[#93b27b]" />
        </motion.div>
      </button>

      <button onClick={() => toggleObject('chair')} className="absolute left-[52%] bottom-[17%] z-20 h-[22%] w-[16%]" aria-label="Move chair">
        <motion.div animate={{ x: openPanels.chair ? 32 : 0 }} className="absolute inset-0">
          <div className="absolute left-[18%] top-[0%] h-[38%] w-[64%] rounded-t-[1rem] bg-[linear-gradient(180deg,#a96757,#804b3f)] shadow-md" />
          <div className="absolute left-[20%] top-[30%] h-[22%] w-[60%] rounded-md bg-[linear-gradient(180deg,#bd7b69,#9a5c4c)]" />
          <div className="absolute left-[22%] top-[46%] h-[46%] w-[8%] rounded-full bg-[#6c4936]" />
          <div className="absolute right-[22%] top-[46%] h-[46%] w-[8%] rounded-full bg-[#6c4936]" />
        </motion.div>
      </button>

      <button onClick={() => toggleObject('rug')} className="absolute left-[62%] bottom-[3%] z-20 h-[12%] w-[24%]" aria-label="Lift rug">
        <motion.div
          animate={{ rotate: openPanels.rug ? -10 : 0, x: openPanels.rug ? 10 : 0, y: openPanels.rug ? -10 : 0 }}
          className="absolute inset-0 rounded-full border-4 border-[#d9c2b3] bg-[radial-gradient(circle_at_50%_50%,#b98f7b,#916555)] shadow-md"
        >
          <div className="absolute inset-[20%] rounded-full border-2 border-[#e6d5cb]" />
        </motion.div>
      </button>
    </div>
  );
}

export default function Find20CatsGame() {
  const [level, setLevel] = useState(1);
  const [foundCats, setFoundCats] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [openPanels, setOpenPanels] = useState(initialPanels);
  const [hintCatId, setHintCatId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Find all 20 cats before time runs out.');
  const audioContextRef = useRef(null);

  const cats = level === 1 ? LEVEL_1_CATS : LEVEL_2_CATS;
  const isHiddenLevel = level === 2;
  const allFound = foundCats.length === cats.length;
  const gameEnded = allFound || gameOver;

  const remaining = useMemo(
    () => cats.filter((cat) => !foundCats.includes(cat.id)).length,
    [cats, foundCats]
  );

  const playClickSound = (type = 'cat') => {
    if (typeof window === 'undefined') return;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioCtx();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const makeTone = (freqStart, freqEnd, duration, gainPeak = 0.06, typeWave = 'sine', startTime = ctx.currentTime) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = typeWave;
      osc.frequency.setValueAtTime(freqStart, startTime);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, startTime + duration);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    if (type === 'success') {
      const t = ctx.currentTime;
      // "Tadaaa" style: quick ascending notes + sustained chord
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        makeTone(freq * 0.9, freq, 0.18, 0.06, 'triangle', t + i * 0.12);
      });

      // final sustained chord (feels like TADA 🎉)
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + 0.5);
        gain.gain.setValueAtTime(0.0001, t + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.08, t + 0.55);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + 0.5);
        osc.stop(t + 1.25);
      });

      return;
    }

    if (type === 'lose') {
      const t = ctx.currentTime;
      makeTone(440, 320, 0.18, 0.05, 'sawtooth', t);
      makeTone(330, 220, 0.22, 0.045, 'sawtooth', t + 0.14);
      makeTone(220, 160, 0.3, 0.04, 'triangle', t + 0.3);
      return;
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type === 'cat' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(type === 'cat' ? 880 : 520, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(type === 'cat' ? 660 : 420, ctx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(type === 'cat' ? 0.06 : 0.035, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.13);
  };

  const handleFind = (id) => {
    if (foundCats.includes(id) || gameEnded) return;
    playClickSound('cat');
    setHintCatId((current) => (current === id ? null : current));
    const updated = [...foundCats, id];
    setStatusMessage(`Cat found. ${cats.length - updated.length} left.`);
    setFoundCats(updated);
    if (updated.length === cats.length) {
      setTimeout(() => setShowNext(true), 900);
    }
  };

  const toggleObject = (key) => {
    if (gameEnded) return;
    playClickSound('object');
    setStatusMessage(`Opened ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
    setOpenPanels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const giveHint = () => {
    if (gameEnded) return;
    const remainingCats = cats.filter((cat) => !foundCats.includes(cat.id));
    if (!remainingCats.length) return;

    if (isHiddenLevel) {
      const hiddenCat = remainingCats.find((cat) => cat.revealedBy !== 'none' && !openPanels[cat.revealedBy]);
      if (hiddenCat) {
        setOpenPanels((prev) => ({ ...prev, [hiddenCat.revealedBy]: true }));
        setHintCatId(hiddenCat.id);
        setStatusMessage('Hint used. A hidden cat was revealed.');
        return;
      }
    }

    setHintCatId(remainingCats[0].id);
    setStatusMessage('Hint used. A cat is highlighted.');
  };

  const startLevel = (nextLevel) => {
    setLevel(nextLevel);
    setFoundCats([]);
    setShowNext(false);
    setHintCatId(null);
    setTimeLeft(nextLevel === 1 ? (isMobile ? 75 : 60) : (isMobile ? 90 : 60));
    setGameOver(false);
    setStatusMessage(nextLevel === 1 ? 'Level 1 started. All cats are visible.' : 'Level 2 started. Some cats are hidden.');
    setOpenPanels(initialPanels);
  };

  const resetGame = () => {
    startLevel(level);
  };

  const isCatVisible = (cat) => !isHiddenLevel || cat.revealedBy === 'none' || openPanels[cat.revealedBy];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDeviceMode = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };

    updateDeviceMode();
    window.addEventListener('resize', updateDeviceMode);
    return () => window.removeEventListener('resize', updateDeviceMode);
  }, []);

  useEffect(() => {
    if (allFound) {
      setStatusMessage('Congratulations. You found every cat.');
      playClickSound('success');
    }
  }, [allFound]);

  useEffect(() => {
    const desiredTime = level === 1 ? (isMobile ? 75 : 60) : (isMobile ? 90 : 60);
    setTimeLeft((prev) => (foundCats.length === 0 && !gameOver ? desiredTime : prev));
  }, [isMobile, level]);

  useEffect(() => {
    if (gameEnded || showNext) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setGameOver(true);
          setStatusMessage('Time is up. You lost this round.');
          playClickSound('lose');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [gameEnded, showNext, level]);

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,#ece7e1,#d7ccc1)] px-3 py-4 text-slate-800 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div aria-live="polite" className="sr-only">{statusMessage}</div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 grid gap-3 md:mb-6 md:gap-4 md:grid-cols-[1.2fr_0.8fr]"
        >
          <Card className="rounded-3xl border-stone-300 bg-white/90 shadow-xl backdrop-blur">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-stone-100 p-3 text-stone-700">
                  <Cat className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
                    {level === 1 ? 'Level 1: Living Room Cats' : 'Level 2: Hidden Kitchen Cats'}
                  </h1>
                  <p className="text-sm text-stone-600">
                    {level === 1
                      ? 'Easy mode: all 20 whole cats are visible in the living room.'
                      : 'Harder mode: search the kitchen and interact with objects to reveal hidden cats.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-stone-300 bg-white/90 shadow-xl backdrop-blur">
            <CardContent className="p-4 sm:p-6">
              <div className="mb-3 flex items-center justify-between text-sm font-medium">
                <span>Progress</span>
                <span>{foundCats.length}/{cats.length} found</span>
              </div>
              <div className="mb-3 flex items-center justify-between text-sm font-medium text-stone-700">
                <span>Timer</span>
                <span className={timeLeft <= 10 ? 'text-red-600' : ''}>{timeLeft}s</span>
              </div>
              <Progress value={(foundCats.length / cats.length) * 100} className="h-3" />
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                <span>{remaining} left</span>
                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <Button onClick={giveHint} variant="outline" className="min-h-12 rounded-2xl px-4 text-sm sm:min-h-10">
                    <Lightbulb className="mr-2 h-4 w-4" /> Hint
                  </Button>
                  <Button onClick={resetGame} variant="outline" className="min-h-12 rounded-2xl px-4 text-sm sm:min-h-10">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr_340px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="rounded-[1.5rem] bg-gradient-to-br from-amber-700 via-yellow-700 to-amber-900 p-2 shadow-2xl sm:rounded-[2rem] sm:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] border-[6px] border-amber-200 bg-[#f6d4c0] sm:rounded-[1.5rem] sm:border-[10px]">
                {level === 1 ? (
                  <LivingRoomScene />
                ) : (
                  <KitchenScene openPanels={openPanels} toggleObject={toggleObject} />
                )}

                {cats.map((cat) => {
                  const found = foundCats.includes(cat.id);
                  const visible = isCatVisible(cat);
                  return (
                    <motion.button
                      key={`${level}-${cat.id}`}
                      onClick={() => visible && !gameEnded && handleFind(cat.id)}
                      animate={{ opacity: visible || found ? 1 : 0, scale: found ? 1.08 : visible ? 1 : 0.7 }}
                      className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-transform ${
                        found
                          ? 'cursor-default'
                          : visible
                            ? hintCatId === cat.id
                              ? 'rounded-2xl ring-4 ring-yellow-300 ring-offset-2 ring-offset-stone-100 hover:scale-105 active:scale-95'
                              : 'hover:scale-105 active:scale-95'
                            : 'pointer-events-none'
                      }`}
                      style={{
                        left: `${cat.x}%`,
                        top: `${cat.y}%`,
                        width: `${Math.max((isMobile ? 82 : 72) * cat.scale, isMobile ? 56 : 44)}px`,
                        height: `${Math.max((isMobile ? 62 : 54) * cat.scale, isMobile ? 56 : 44)}px`,
                        transform: `translate(-50%, -50%) rotate(${cat.rotation}deg)`,
                        touchAction: 'manipulation',
                      }}
                      aria-label={`Cat ${cat.id}`}
                      disabled={found || !visible || gameEnded}
                    >
                      <CatSprite color={cat.color} found={found} />
                    </motion.button>
                  );
                })}

                {gameOver && !allFound && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                  >
                    <div className="relative rounded-[2rem] border border-red-200 bg-white/95 px-8 py-10 text-center shadow-2xl">
                      <div className="mb-3 inline-flex rounded-full bg-red-100 p-3 text-red-700">
                        ⏰
                      </div>
                      <h2 className="text-3xl font-bold text-stone-800">Time’s up!</h2>
                      <p className="mt-2 text-slate-600">
                        You didn’t find all 20 cats before the timer ended.
                      </p>
                      <div className="mt-5 flex justify-center gap-3">
                        <Button className="rounded-2xl bg-stone-700 hover:bg-stone-800" onClick={resetGame}>
                          Try Again
                        </Button>
                        {level === 2 && (
                          <Button variant="outline" className="rounded-2xl" onClick={() => startLevel(1)}>
                            Back to Level 1
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {allFound && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-40 flex items-center justify-center bg-white/35 backdrop-blur-sm"
                  >
                    <div className="relative rounded-[2rem] border border-pink-200 bg-white/92 px-8 py-10 text-center shadow-2xl">
                      {confetti.map((piece) => (
                        <motion.div
                          key={piece.id}
                          initial={{ y: -30, opacity: 0 }}
                          animate={{ y: 140, opacity: [0, 1, 1, 0] }}
                          transition={{ duration: piece.duration, delay: piece.delay, repeat: Infinity }}
                          className="absolute top-0 text-xl"
                          style={{ left: piece.left }}
                        >
                          ✨
                        </motion.div>
                      ))}
                      <div className="mb-3 inline-flex rounded-full bg-stone-100 p-3 text-stone-700">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h2 className="text-3xl font-bold text-stone-800">Congrats!</h2>
                      <p className="mt-2 text-slate-600">
                        {level === 1
                          ? 'You cleared the easy living room round.'
                          : 'You found all 20 hidden cats in the kitchen.'}
                      </p>
                      {level === 1 ? (
                        <Button className="mt-5 rounded-2xl bg-stone-700 hover:bg-stone-800" onClick={() => startLevel(2)}>
                          Go to Level 2
                        </Button>
                      ) : (
                        <Button className="mt-5 rounded-2xl bg-stone-700 hover:bg-stone-800" onClick={() => startLevel(1)}>
                          Play Again
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <Card className="rounded-3xl border-stone-300 bg-white/90 shadow-xl backdrop-blur">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold">How to play</h3>
                <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                  <div className="flex items-start gap-3">
                    <Search className="mt-0.5 h-4 w-4 shrink-0 text-stone-600" />
                    <p>
                      {level === 1
                        ? 'Level 1 is easy: every cat is already visible in the living room.'
                        : 'Level 2 is harder: some cats are hidden in the kitchen.'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Hand className="mt-0.5 h-4 w-4 shrink-0 text-stone-600" />
                    <p>
                      {level === 1
                        ? 'Tap or click each cat you spot. The hit area is larger on phones so it is easier to play.'
                        : 'Tap or click the fridge, window, chair, rug, and other objects to reveal hidden cats.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-stone-300 bg-white/90 shadow-xl backdrop-blur">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold">Hints</h3>
                <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="mt-0.5 h-4 w-4 text-yellow-500" />
                    <p>
                      {level === 1
                        ? 'Tap Hint to highlight one cat you have not found yet. The round is a little longer on phones.'
                        : 'Tap Hint to highlight a cat. If it is hidden, the game also reveals the object hiding it. The round is a little longer on phones.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-stone-300 bg-white/90 shadow-xl backdrop-blur">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold">Next game preview</h3>
                {level === 1 ? (
                  <div className="mt-3 rounded-[1.5rem] border border-fuchsia-200 bg-gradient-to-br from-fuchsia-100 to-pink-100 p-5">
                    <div className="text-3xl">🍳 🪟 🐱</div>
                    <h4 className="mt-3 text-base font-semibold text-fuchsia-700">Level 2: Hidden Kitchen Cats</h4>
                    <p className="mt-2 text-sm text-slate-600">
                      After the easy living room round, the next game switches to the hidden-cat version in the kitchen.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 rounded-[1.5rem] border border-fuchsia-200 bg-gradient-to-br from-fuchsia-100 to-pink-100 p-5">
                    <div className="text-3xl">🛋️ 🌸 🐱</div>
                    <h4 className="mt-3 text-base font-semibold text-fuchsia-700">Level 1: Living Room Cats</h4>
                    <p className="mt-2 text-sm text-slate-600">
                      Want an easier replay? Restart and enjoy the simple living room round again.
                    </p>
                    <Button variant="outline" className="mt-4 rounded-2xl" onClick={() => startLevel(1)}>
                      Back to Level 1
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
