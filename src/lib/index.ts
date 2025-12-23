
export interface Users{
      id: number;
      name: string;
      email: string;
      password: string;
      phone: string;
      role?: 'admin' | 'user';
      created_at?: Date;   
}