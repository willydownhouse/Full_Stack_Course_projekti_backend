import ITrip from '../interfaces/trip';

export type newTrip = Omit<ITrip, 'id'>;
