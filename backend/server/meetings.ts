"use server";

interface Meeting {
    duration: string;
    title: string;
    id: string;
}

export const get = async (): Promise<Meeting []> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meetings`) 
    const json = await data.json();
    return json.data;
};