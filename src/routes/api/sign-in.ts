import { createSession, getUserByEmail } from './_db';
import { serialize } from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';
import { validPasswordHash } from '$lib/helpers/crypto';
import type { ServerUser } from 'src/types';

export const post: RequestHandler = async ({ request }) => {
	const { email, passwordHash }: ServerUser = await request.json();
	const user = await getUserByEmail(email);
	if (!user || !validPasswordHash(passwordHash, user.passwordHash)) {
		return {
			status: 401,
			body: {
				message: 'Incorrect user or password'
			}
		};
	}

	const { id } = await createSession(email);
	const clientUser: User = { email };
	return {
		status: 200,
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
			user: { ...clientUser }
		}
	};
};
