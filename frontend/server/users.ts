"use server";

interface User {
    email: string;
    id: string;
}

export const get = async (): Promise<User []> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`) 
    const json = await data.json();
    return json.data;
};