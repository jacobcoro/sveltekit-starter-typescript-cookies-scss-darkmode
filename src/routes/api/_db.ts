import type { UserSession } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [
	{
		email: 'mail@example.com',
		// ⚠️ CAUTION: Do not store a plain password like this. Use proper hashing and salting.
		password: 'thisisnotsecret'
	}
];

let sessions: UserSession[] = [];

export const getUserByEmail = async (email: string) => {
	const existingUser = users.find((user) => user.email === email);
	if (!existingUser) return Promise.resolve(null);
	return Promise.resolve(existingUser);
};

export const registerUser = (user: User) => {
	const existingUser = users.find((u) => u.email === user.email);
	if (existingUser) return Promise.reject(new Error('User already exists'));
	users.push(user);
	return Promise.resolve(user);
};

export const createSession = (email: string) => {
	const session = {
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
