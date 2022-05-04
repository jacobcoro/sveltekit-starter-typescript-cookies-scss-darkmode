import { hashPassword } from '$lib/helpers/crypto';
import type { ServerSession, ServerUser } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

const users: ServerUser[] = [];
let sessions: ServerSession[] = [];

export const getUserByEmail: (email: string) => Promise<ServerUser | null> = async (email) => {
	const existingUser = users.find((user) => user.email === email);
	if (!existingUser) return Promise.resolve(null);
	return Promise.resolve(existingUser);
};

export const registerUser = (user: ServerUser) => {
	const existingUser = users.find((u) => u.email === user.email);
	if (existingUser) return Promise.reject(new Error('User already exists'));
	// Yes I know we have ssl etc. But this double hashing means the original password never even leaves the frontend.
	const doubleHashedPassword = hashPassword(user.passwordHash);
	users.push({ email: user.email, passwordHash: doubleHashedPassword });
	return Promise.resolve(user);
};

export const createSession = (email: string) => {
	const session: ServerSession = {
		id: uuidv4(),
		email
	};
	sessions.push(session);
	return Promise.resolve(session);
};

export const getSession = (id: string) => {
	const session = sessions.find((session) => session.id === id);
	if (!session) return Promise.resolve(null);
	return Promise.resolve(session);
};

export const removeSession = (id: string) => {
	const session = sessions.find((session) => session.id === id);
	if (!session) return Promise.reject(new Error('Session not found'));
	sessions = sessions.filter((session) => session.id !== id);
	return Promise.resolve(session);
};
