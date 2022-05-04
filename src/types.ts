export interface User {
	email: string;
}

export interface ServerUser extends User {
	password: string;
}

export interface ServerSession {
	id: string;
	email: User['email'];
}
