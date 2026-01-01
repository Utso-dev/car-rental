
export interface Users{
      id: number;
      name: string;
      email: string;
      password: string;
      phone: string;
      role?: 'admin' | 'user';
      created_at?: Date;   
}

export interface Vehicles {
    id: number;
    vehicle_name: string;
    type: 'car' | 'bike' | 'van' | 'SUV';
    registration_number: string;
    daily_rent_price: number;
    availability_status?: 'available' | 'booked';
}

export interface Bookings {
    id: number;
    customer_id: number;
    vehicle_id: number;
    rent_start_date: Date;
    rent_end_date: Date;
}