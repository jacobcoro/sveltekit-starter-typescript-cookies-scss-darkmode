export interface User {
	email: string;
	password: string;
}

export interface UserSession {
	id: string;
	email: User['email'];
}
