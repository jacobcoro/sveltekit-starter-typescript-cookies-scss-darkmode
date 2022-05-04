import { createSession, getUserByEmail, registerUser } from './_db';
import { serialize } from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';
import type { ServerUser } from 'src/types';

export const post: RequestHandler = async ({ request }) => {
	const { email, passwordHash }: ServerUser = await request.json();
	const user = await getUserByEmail(email);
	if (user) {
		return {
			status: 409,
			body: {
				message: 'User already exists'
			}
		};
	}

	await registerUser({
		email,
		passwordHash
	});

	const { id } = await createSession(email);
	return {
		status: 201,
		headers: {
			'Set-Cookie': serialize('session_id', id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // one week
			})
		},
		body: {
			user: {
				email
			}
		}
	};
};
