import { SportCategory, NewsArticle, MatchScore, Product } from './types';

export const LEAGUE_STANDINGS = [
  { rank: 1, team: 'Madrid Kings', played: 28, points: 64, form: ['W', 'W', 'D', 'W', 'W'] },
  { rank: 2, team: 'Barcelona FC', played: 28, points: 61, form: ['W', 'D', 'W', 'W', 'L'] },
  { rank: 3, team: 'Bavaria Munich', played: 27, points: 58, form: ['W', 'W', 'W', 'L', 'D'] },
  { rank: 4, team: 'London Blues', played: 28, points: 54, form: ['L', 'W', 'D', 'W', 'W'] },
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Continental Glory: The Final Showdown',
    content: 'The atmosphere is electric as the world prepare for the grandest stage in club football. Tactical masterclasses and individual brilliance are expected to define this historic clash at the Zenith Arena. Our analysts suggest a 4-3-3 attacking formation will be key to breaking the mid-block defensive strategy employed by the visitors.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    category: SportCategory.FOOTBALL,
    author: 'Julian Vercetti',
    date: new Date().toISOString(),
    readTime: '8 min read',
    tags: ['Championship', 'Elite', 'Football'],
    comments: []
  },
  {
    id: '2',
    title: 'Precision & Power: The Hard Court Season',
    content: 'The summer swing brings renewed intensity to the tour. With the world number one defending a narrow lead, every baseline exchange becomes a battle of wills. Surface temperature is expected to reach 35°C, testing the metabolic conditioning of even the most elite athletes.',
    image: 'https://images.unsplash.com/photo-1595435063121-657f2084c8a5?auto=format&fit=crop&w=1200&q=80',
    category: SportCategory.TENNIS,
    author: 'Sarah Jenkins',
    date: new Date().toISOString(),
    readTime: '5 min read',
    tags: ['Grand Slam', 'Tennis', 'Analysis'],
    comments: []
  },
  {
    id: '3',
    title: 'Hardwood Legends: The Playoff Push',
    content: 'The race for the post-season has never been tighter. Momentum is the only currency that matters as teams fight for home-court advantage. Statistical trends show a 12% increase in transition scoring this season, redefining the "pace and space" era.',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80',
    category: SportCategory.BASKETBALL,
    author: 'Marcus Sterling',
    date: new Date(Date.now() - 86400000).toISOString(),
    readTime: '6 min read',
    tags: ['Playoffs', 'Basketball', 'Pro'],
    comments: []
  },
  {
    id: '4',
    title: 'The T20 Evolution: Speed & Strategy',
    content: 'Shorter formats are redefining the physics of the game. Innovation in stroke play and defensive bowling is pushing the limits. Bat speeds have increased by an average of 5mph across the top 20 ranked players.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    category: SportCategory.CRICKET,
    author: 'Arun Kumar',
    date: new Date(Date.now() - 172800000).toISOString(),
    readTime: '7 min read',
    tags: ['T20', 'Cricket', 'Modern Era'],
    comments: []
  }
];

export const INITIAL_SCORES: MatchScore[] = [
  {
    id: 's1',
    teamA: 'Madrid Kings',
    teamALogo: 'https://img.icons8.com/color/240/real-madrid.png',
    teamB: 'Barcelona FC',
    teamBLogo: 'https://img.icons8.com/color/240/fc-barcelona.png',
    scoreA: 3,
    scoreB: 2,
    status: 'Live',
    sport: SportCategory.FOOTBALL,
    startTime: new Date().toISOString(),
    venue: 'Bernabéu Stadium',
    stats: {
      possessionA: 52,
      possessionB: 48,
      shotsA: 14,
      shotsB: 11
    }
  },
  {
    id: 's10',
    teamA: 'Bavaria Munich',
    teamALogo: 'https://img.icons8.com/color/240/bayern-munich.png',
    teamB: 'Dortmund United',
    teamBLogo: 'https://img.icons8.com/color/240/borussia-dortmund.png',
    scoreA: 1,
    scoreB: 1,
    status: 'Live',
    sport: SportCategory.FOOTBALL,
    startTime: new Date().toISOString(),
    venue: 'Allianz Arena'
  },
  {
    id: 's11',
    teamA: 'Golden State',
    teamALogo: 'https://img.icons8.com/color/240/golden-state-warriors.png',
    teamB: 'Chicago Bulls',
    teamBLogo: 'https://img.icons8.com/color/240/chicago-bulls.png',
    scoreA: 104,
    scoreB: 98,
    status: 'Live',
    sport: SportCategory.BASKETBALL,
    startTime: new Date().toISOString(),
    venue: 'Chase Center'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Vapor Elite Speed Cleats',
    brand: 'ProDirect',
    price: 245.00,
    rating: 4.9,
    description: 'Engineered for pure speed. A lightweight carbon fiber plate delivers explosive response on the pitch. Features AeroTrak technology for 360-degree traction.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    category: SportCategory.FOOTBALL,
    stock: 12
  },
  {
    id: 'p2',
    name: 'Precision Grip Pro Ball',
    brand: 'HoopCraft',
    price: 85.00,
    rating: 4.8,
    description: 'Advanced moisture-wicking surface for unmatched grip and control. Composite leather meets all professional league standards for bounce and drag coefficients.',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1000&q=80',
    category: SportCategory.BASKETBALL,
    stock: 45
  },
  {
    id: 'p3',
    name: 'Graphite Strike Racket',
    brand: 'AceMaster',
    price: 310.00,
    rating: 5.0,
    description: 'Ultra-stiff graphite construction designed for high-power baseline players. Frame stability technology reduces torsional twist by 15%.',
    image: 'https://images.unsplash.com/photo-1617083277662-843817688487?auto=format&fit=crop&w=1000&q=80',
    category: SportCategory.TENNIS,
    stock: 8
  },
  {
    id: 'p4',
    name: 'Titanium Edge Tracker',
    brand: 'VoltSync',
    price: 450.00,
    rating: 4.7,
    description: 'Real-time biomechanics tracking and cardiovascular insights. Uses medical-grade PPG sensors for 99.2% accuracy in HR variability.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    category: SportCategory.OTHER,
    stock: 15
  }
];