import BASE_URL from './config';
import axios from 'axios';

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = 'student' | 'instructor' | 'admin';

export interface AuthUser {
  _id: string;
  fullName: string;
  name?: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  university?: string;
  faculty?: string;
  major?: string;
  year?: string;
  country?: string;
  active?: boolean;
}

export interface AuthResponse {
  message: string;
  token?: string;
  data: AuthUser;
}

// ─── Student Auth ─────────────────────────────────────────────────────────────

export interface StudentLoginPayload {
  email: string;
  password: string;
}

export interface StudentSignupPayload {
  fullName: string;
  university: string;
  faculty: string;
  major: string;
  year: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  StudentIdImage?: File | null;
}

export const studentLogin = async (
  payload: StudentLoginPayload
): Promise<AuthResponse> => {
  const res = await axios.post(`${BASE_URL}/auth/students/login`, payload, {
    withCredentials: true,
  });

  if (res.data.message !== "login Student successful") throw new Error(res?.data?.message ?? 'Login failed. Please check your credentials.');
  return res.data;
};

export const studentSignup = async (
  payload: StudentSignupPayload
): Promise<AuthResponse> => {
  // The API expects multipart/form-data (includes file upload)
  const formData = new FormData();
  formData.append('fullName', payload.fullName);
  formData.append('university', payload.university);
  formData.append('faculty', payload.faculty);
  formData.append('major', payload.major);
  formData.append('year', payload.year);
  formData.append('email', payload.email);
  formData.append('password', payload.password);
  formData.append('phoneNumber', payload.phoneNumber);
  formData.append('role', 'student');
  if (payload.country) formData.append('country', payload.country);
  if (payload.StudentIdImage) formData.append('StudentIdImage', payload.StudentIdImage);

  try {
    const res = await axios.post(`${BASE_URL}/auth/students/signup`, formData, {
      withCredentials: true,
    });

    if (res.data.message !== 'Signup Student successful')
      throw new Error(res?.data?.message ?? 'Sign up failed. Please try again.');
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error;
      if (serverMsg) {
        throw new Error(serverMsg);
      }
      if (err.response?.status === 503) {
        throw new Error('Service is temporarily unavailable or Student ID image is required. Please attach your image and try again.');
      }
    }
    throw err;
  }
};

// ─── Instructor Auth ──────────────────────────────────────────────────────────

export interface InstructorLoginPayload {
  email: string;
  password: string;
}

export const instructorLogin = async (
  payload: InstructorLoginPayload
): Promise<AuthResponse> => {
  const res = await axios.post(`${BASE_URL}/auth/instructors/login`, payload, {
    withCredentials: true,
  });
  console.log(res.data);

  if (res.data.message !== "login Instructor successful") throw new Error(res?.data?.message ?? 'Login failed. Please check your credentials.');
  return res.data;
};
