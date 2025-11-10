export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

export interface GiftItem {
  id: string;
  title: string;
  description: string;
  price: number;
  isReserved: boolean;
  reservedBy?: number;
  allowMultipleReservations: boolean;
  createdAt: Date;
}

export interface Wishlist {
  id: string;
  title: string;
  description: string;
  ownerId: number;
  gifts: GiftItem[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}