export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface AdminCredentials {
  email: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}