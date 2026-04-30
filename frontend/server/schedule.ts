"use server";

export interface Schedule {
    id: number;
    user_id: number;
    event_title: string;
    date: string;  // Required in database
    start_time: string;
    end_time: string;
    type: string;  // Has default in database
    location?: string;
    description?: string;
    is_virtual: boolean;
    meeting_link?: string;
    attendees?: string;
    is_recurring: boolean;
    recurrence_pattern?: string;
    recurrence_end?: string;
    reminder?: string;  // Should be optional
    is_private: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const create = async (formData: Partial<Schedule>): Promise<Schedule | null> => {
    try {
        const res = await fetch(`${API_URL}/api/schedules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create schedule');
        }
        const json = await res.json();
        return json.data;
    } catch (error: any) {
        console.error("Error creating schedule:", error);
        return null;
    }
};

export const getAll = async (): Promise<Schedule[]> => {
    try {
        const res = await fetch(`${API_URL}/api/schedules`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch schedules');
        }
        const json = await res.json();
        return json.data;
    } catch (error: any) {
        console.error("Error fetching schedules:", error);
        return [];
    }
};

export const getById = async (id: number): Promise<Schedule | null> => {
    try {
        const res = await fetch(`${API_URL}/api/schedules/${id}`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch schedule');
        }
        const json = await res.json();
        return json.data;
    } catch (error: any) {
        console.error(`Error fetching schedule ${id}:`, error);
        return null;
    }
};

export const update = async (id: number, formData: Partial<Schedule>): Promise<Schedule | null> => {
    try {
        const res = await fetch(`${API_URL}/api/schedules/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to update schedule');
        }
        const json = await res.json();
        return json.data;
    } catch (error: any) {
        console.error("Error updating schedule:", error);
        return null;
    }
};

export const remove = async (id: number): Promise<boolean> => {
    if (!confirm('Are you sure you want to delete this schedule?')) return false;
    try {
        const res = await fetch(`${API_URL}/api/schedules/${id}`, {
            method: 'DELETE',
        });
        return res.ok;
    } catch (error: any) {
        console.error("Error deleting schedule:", error);
        return false;
    }
};