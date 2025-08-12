export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  picture?: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  // اضافه کردن فیلدهای جدید از API
  gender?: string;
  location?: {
    street?: {
      number?: number;
      name?: string;
    };
    city?: string;
    state?: string;
    country?: string;
    postcode?: number;
  };
  dob?: {
    date?: string;
    age?: number;
  };
  cell?: string;
}

// تایپ برای پاسخ API
export interface ApiResponse {
  results: ApiUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface ApiUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
