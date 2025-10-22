'use server';

import {connectToDatabase} from "@/database/mongoose";

export const getAllUsersForNewsEmail = async (): Promise<User[]> => {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Mongoose connection not established');

        // Better Auth stores users in the "user" collection
        const users = await db.collection('user').find(
            { email: { $exists: true, $ne: null } },
            { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } }
        ).toArray();

        type RawUserDoc = { _id?: { toString(): string }; id?: string; email?: string; name?: string };

        const typedUsers = users as RawUserDoc[];

        return typedUsers
            .filter((u) => Boolean(u.email) && Boolean(u.name) && (u.id || u._id))
            .map((u) => ({
                id: u.id || u._id?.toString() || '',
                email: u.email as string,
                name: u.name as string,
            }));

    } catch (e) {
        console.log('Error fetching users for news email', e);
        return [];
    }
};