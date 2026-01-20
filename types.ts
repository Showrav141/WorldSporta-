
export enum SportCategory {
  FOOTBALL = 'Football',
  CRICKET = 'Cricket',
  BASKETBALL = 'Basketball',
  TENNIS = 'Tennis',
  OTHER = 'Other'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  category: SportCategory;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  date: string;
}

export interface MatchStats {
  possessionA: number;
  possessionB: number;
  shotsA: number;
  shotsB: number;
}

export interface MatchScore {
  id: string;
  teamA: string;
  teamB: string;
  teamALogo?: string;
  teamBLogo?: string;
  scoreA: number;
  scoreB: number;
  status: 'Live' | 'Finished' | 'Upcoming';
  sport: SportCategory;
  startTime: string;
  venue: string;
  stats?: MatchStats;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  category: SportCategory;
  stock: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}
