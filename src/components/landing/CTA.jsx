import { motion, useAnimation, useInView } from 'framer-motion';
import {
  BarChart,
  ChevronRight,
  File,
  Globe,
  HeartHandshake,
  Rss,
  Shield,
} from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';
import { Link } from 'react-router-dom';

const tiles = [
  {
    icon: (
      <img
        src="/assets/tools/react.svg"
        className="w-full h-full"
        alt="React js logo svg"
      />
    ),
    bg: (
      <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 blur-[20px]"></div>
    ),
  },

  {
    icon: (
      <img
        src="/assets/tools/tailwind.svg"
        className="w-full h-full"
        alt="Tailwind css logo svg"
      />
    ),
    bg: (
      <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: (
      <img
        src="/assets/tools/shadcn.svg"
        className="w-[90%] h-[90%]"
        alt="shadcn ui logo svg"
      />
    ),
    bg: (
      <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: (
      <img
        src="/assets/tools/firebase.svg"
        className="w-full h-full"
        alt="Firebase logo svg"
      />
    ),
    bg: (
      <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: (
      <img
        src="/assets/tools/lucide.svg"
        className="w-full h-full"
        alt="Lucide logo svg"
      />
    ),
    bg: (
      <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: (
      <img
        src="/assets/tools/javascript.svg"
        className="w-full h-full"
        alt="js logo svg"
      />
    ),
    bg: (
      <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 opacity-70 blur-[20px]"></div>
    ),
  },
];

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function Card(card) {
  const id = useId();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: Math.random() * 2, ease: 'easeOut', duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn(
        'relative w-20 h-20 cursor-pointer overflow-hidden rounded-2xl border p-4',
        // light styles
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles
        'transform-gpu dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
      )}
    >
      {card.icon}
      {card.bg}
    </motion.div>
  );
}

export default function CallToActionSection() {
  const [randomTiles1, setRandomTiles1] = useState([]);
  const [randomTiles2, setRandomTiles2] = useState([]);
  const [randomTiles3, setRandomTiles3] = useState([]);
  const [randomTiles4, setRandomTiles4] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensures this runs client-side
      setRandomTiles1(shuffleArray([...tiles]));
      setRandomTiles2(shuffleArray([...tiles]));
      setRandomTiles3(shuffleArray([...tiles]));
      setRandomTiles4(shuffleArray([...tiles]));
    }
  }, []);

  return (
    <section id="cta">
      <div className="py-14">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee
              reverse
              className="-delay-[200ms] [--duration:10s]"
              repeat={5}
            >
              {randomTiles1.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <Marquee reverse className="[--duration:25s]" repeat={5}>
              {randomTiles2.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              className="-delay-[200ms] [--duration:20s]"
              repeat={5}
            >
              {randomTiles1.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <Marquee reverse className="[--duration:30s]" repeat={5}>
              {randomTiles2.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              className="-delay-[200ms] [--duration:20s]"
              repeat={5}
            >
              {randomTiles3.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <Marquee reverse className="[--duration:30s]" repeat={5}>
              {randomTiles4.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <div className="absolute z-10">
              <div className="flex items-center justify-center mx-auto w-20 h-20 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md lg:w-32 lg:h-32 dark:bg-black/10">
                <img
                  src="/assets/logo-white.svg"
                  className="w-[80%] h-[80%] animate-pulse hidden dark:block"
                />
                <img
                  src="/assets/logo-black.svg"
                  className="w-[80%] h-[80%] animate-pulse block dark:hidden"
                />
              </div>
              <div className="text-primary z-10 mt-4 flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold lg:text-4xl">
                  Stop wasting time on design.
                </h1>
                <p className="mt-2">
                  Start your 7-day free trial. No credit card required.
                </p>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({
                      size: 'lg',
                      variant: 'outline',
                    }),
                    'group mt-4 rounded-[2rem] px-6'
                  )}
                >
                  Get Started
                  <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="bg-backtround dark:bg-background absolute inset-0  -z-10 rounded-full opacity-40 blur-xl" />
            </div>
            <div className="to-backtround dark:to-background absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-70%" />
          </div>
        </div>
      </div>
    </section>
  );
}
