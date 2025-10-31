
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Enable sending cookies and auth headers
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Changed from 'access_token' to 'token'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear invalid token
            localStorage.removeItem('token'); // Changed from 'access_token' to 'token'
            localStorage.removeItem('user');
            // Redirect to login if needed
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

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
    event_title: string;
    description: string | null;
    type: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    is_virtual: boolean;
    meeting_link?: string;
    attendees?: string;
    is_recurring: boolean;
    recurrence_pattern?: string;
    recurrence_end?: string;
    reminder: string;
    is_private: boolean;
    user_id: number;
    user?: User;
}

export interface Meeting {
    id: number;
    title: string;
    description: string | null;
    start_time: string;
    end_time: string;
    meeting_link: string | null;
    is_virtual: boolean;
    password: string;
    max_participants: number;
    enable_chat: boolean;
    enable_video: boolean;
    enable_audio: boolean;
    enable_screenshare: boolean;
    ai_assistant_enabled: boolean;
    user_id: number;
    user: User;
}

export const login = (credentials: { email: string; password: string; device_name: string }) =>
    api.post<{ access_token: string; token_type: string; user: User }>('/login', credentials);

export const register = (userData: { name: string; email: string; password: string; password_confirmation: string }) =>
    api.post<{ access_token: string; token_type: string; user: User }>('/register', userData);

export const logout = () => api.post('/logout');

export const getMe = () => api.get<User>('/me');

export const getClasses = () => api.get<Class[]>('/classes');
export const createClass = (data: Omit<Class, 'id' | 'user_id' | 'user'>) => api.post<Class>('/classes', data);
export const updateClass = (id: number, data: Partial<Omit<Class, 'id' | 'user_id' | 'user'>>) => api.put<Class>(`/classes/${id}`, data);
export const deleteClass = (id: number) => api.delete(`/classes/${id}`);

export const getSchedules = () => api.get<Schedule[]>('/schedules');
export const createSchedule = async (data: Omit<Schedule, 'id' | 'user_id' | 'user'>) => {
    try {
        const response = await api.post<Schedule>('/schedules', data);
        return response;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            console.error('Validation errors:', error.response.data.errors);
            throw new Error(Object.values(error.response.data.errors).flat().join(', '));
        }
        throw error;
    }
};

export const updateSchedule = async (id: number, data: Partial<Omit<Schedule, 'id' | 'user_id' | 'user'>>) => {
    try {
        const response = await api.put<Schedule>(`/schedules/${id}`, data);
        return response;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            console.error('Validation errors:', error.response.data.errors);
            throw new Error(Object.values(error.response.data.errors).flat().join(', '));
        }
        throw error;
    }
};

export const deleteSchedule = (id: number) => api.delete(`/schedules/${id}`);

export const getMeetings = () => api.get<Meeting[]>('/meetings');
export const createMeeting = (data: Omit<Meeting, 'id' | 'user_id' | 'user'>) => api.post<Meeting>('/meetings', data);
export const updateMeeting = (id: number, data: Partial<Omit<Meeting, 'id' | 'user_id' | 'user'>>) => api.put<Meeting>(`/meetings/${id}`, data);
export const deleteMeeting = (id: number) => api.delete(`/meetings/${id}`);