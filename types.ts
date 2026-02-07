
export enum VehicleType {
  BIKE = 'Bike',
  CAR = 'Car'
}

export enum UserRole {
  DRIVER = 'Driver',
  PASSENGER = 'Passenger'
}

export interface RideMatch {
  id: string;
  name: string;
  avatar: string;
  vehicle: VehicleType;
  vehicleModel: string;
  rating: number;
  points: number;
  distance: string;
  startTime: string;
  route: string;
}

export interface NavState {
  currentPage: 'splash' | 'location-permission' | 'login' | 'onboarding' | 'home' | 'search' | 'offer' | 'rewards' | 'profile' | 'ride-details' | 'free-trips' | 'ride-history' | 'help' | 'frnd-circles' | 'account';
}
