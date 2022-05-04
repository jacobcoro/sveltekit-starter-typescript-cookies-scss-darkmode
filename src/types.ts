export interface User {
	email: string;
}

export interface ServerUser extends User {
	passwordHash: string;
}

export interface ServerSession {
	id: string;
	email: User['email'];
}
