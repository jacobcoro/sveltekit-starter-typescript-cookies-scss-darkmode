import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import { getSession as getSessionFromApi } from './routes/api/_db';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');

	if (cookies.session_id) {
		const session = await getSessionFromApi(cookies.session_id);
		if (session) {
			event.locals.user = { email: session.email };
			return resolve(event);
		}
	}

	event.locals.user = null;
	return resolve(event);
};

export const getSession: GetSession = (event) => {
	return event?.locals?.user
		? {
				user: {
					email: event.locals.user.email
				}
		  }
		: {};
};
