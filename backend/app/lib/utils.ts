// frontend/libs/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- ADD THIS FUNCTION ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- The rest of your existing file remains the same ---
import axios from 'axios';

// ... all your existing axios and API code ...

// --- Axios Instance Setup ---
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Your Laravel API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor to add the auth token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- Type Definitions ---
export interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

export interface Role {
    id: number;
    name: string;
}

export interface Class {
    id: number;
    name: string;
    description: string | null;
    instructor: string;
    schedule: string;
    user_id: number;
    user: User;
}

export interface Schedule {
    id: number;
    title: string;
    description: string | null;
    date: string; // 'YYYY-MM-DD'
    time: string; // 'HH:MM'
    user_id: number;
    user: User;
}

export interface Meeting {
    id: number;
    title: string;
    description: string | null;
    start_time: string; // ISO 8601 datetime string
    end_time: string;   // ISO 8601 datetime string
    meeting_link: string | null;
    user_id: number;
    user: User;
}

// --- Authentication API ---
export const login = (credentials: { email: string; password: string; device_name: string }) =>
    api.post<{ access_token: string; token_type: string; user: User }>('/login', credentials);

export const register = (userData: { name: string; email: string; password: string; password_confirmation: string }) =>
    api.post<{ access_token: string; token_type: string; user: User }>('/register', userData);

export const logout = () => api.post('/logout');

export const getMe = () => api.get<User>('/me');

// --- Classes API ---
export const getClasses = () => api.get<Class[]>('/classes');
export const createClass = (data: Omit<Class, 'id' | 'user_id' | 'user'>) => api.post<Class>('/classes', data);
export const updateClass = (id: number, data: Partial<Omit<Class, 'id' | 'user_id' | 'user'>>) => api.put<Class>(`/classes/${id}`, data);
export const deleteClass = (id: number) => api.delete(`/classes/${id}`);

// --- Schedules API ---
export const getSchedules = () => api.get<Schedule[]>('/schedules');
export const createSchedule = (data: Omit<Schedule, 'id' | 'user_id' | 'user'>) => api.post<Schedule>('/schedules', data);
export const updateSchedule = (id: number, data: Partial<Omit<Schedule, 'id' | 'user_id' | 'user'>>) => api.put<Schedule>(`/schedules/${id}`, data);
export const deleteSchedule = (id: number) => api.delete(`/schedules/${id}`);

// --- Meetings API ---
export const getMeetings = () => api.get<Meeting[]>('/meetings');
export const createMeeting = (data: Omit<Meeting, 'id' | 'user_id' | 'user'>) => api.post<Meeting>('/meetings', data);
export const updateMeeting = (id: number, data: Partial<Omit<Meeting, 'id' | 'user_id' | 'user'>>) => api.put<Meeting>(`/meetings/${id}`, data);
export const deleteMeeting = (id: number) => api.delete(`/meetings/${id}`);