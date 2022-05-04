import * as bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

export function hash(content: string) {
	return CryptoJS.SHA256(content).toString();
}

export const hashPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const validPasswordHash = function (providedPassword: string, storedPasswordHash: string) {
	try {
		return bcrypt.compareSync(providedPassword, storedPasswordHash);
	} catch (error) {
		return false;
	}
};
