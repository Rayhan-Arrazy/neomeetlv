// server/schedules.ts

"use server";

export interface Schedule {
  id: number;
  user_id: number;
  event_title: string;
  start_time: string;
  end_time: string;
  location: string;
  description?: string;
  type?: string;
  is_virtual: boolean;
  meeting_link?: string;
  attendees?: string;
  is_recurring: boolean;
  recurrence_pattern?: string;
  recurrence_end?: string;
  reminder: string;
  is_private: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// CREATE
export const create = async (formData: Partial<Schedule>): Promise<Schedule | null> => {
    try {
        const res = await fetch(`${API_URL}/api/schedules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to create schedule');
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error creating schedule:", error);
        return null;
    }
};

// READ (Get All)
export const getAll = async (): Promise<Schedule[]> => {
    try {
        const res = await fetch(`${API_URL}/api/schedules`);
        if (!res.ok) throw new Error('Failed to fetch schedules');
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching schedules:", error);
        return [];
    }
};

// UPDATE
export const update = async (id: number, formData: Partial<Schedule>): Promise<Schedule | null> => {
    try {
        const res = await fetch(`${API_URL}/api/schedules/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to update schedule');
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error updating schedule:", error);
        return null;
    }
};

// DELETE
export const remove = async (id: number): Promise<boolean> => {
    if (!confirm('Are you sure you want to delete this schedule?')) return false;
    try {
        const res = await fetch(`${API_URL}/api/schedules/${id}`, {
            method: 'DELETE',
        });
        return res.ok;
    } catch (error) {
        console.error("Error deleting schedule:", error);
        return false;
    }
};