export interface Comentarios {
     id: number;
  user: string;
  userImage: string;
  email: string;
  text: string;
  status: 'pending' | 'answered' | 'reported';
  date: Date;
  response?: {
    text: string;
    date: Date;
  };
}
