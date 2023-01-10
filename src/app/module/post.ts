export interface Post {
  user: {
    id: number;
    username: string;
    image: string;
  }
  id: number;
  title: string;
  body: string;
  timestamp?: any;
}