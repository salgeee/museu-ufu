import { Observable } from 'rxjs';
import { Credentials, Role } from '../models/credentials.model';

export const users: Array<Credentials> = [
	{
		username: 'aluno',
		role: Role.STUDENT,
		accessToken: 'bearer token',
		fullName: 'Aluno',
		document: '98765432100',
	},
	{
		username: 'publico',
		role: Role.PUBLIC,
		accessToken: '',
		fullName: 'Publico',
		document: '202819678900',
	},
];

export const getUserMock = (username: string, password: string): Observable<Credentials> => {
	const user = users.find(user => user.username === username);
	if (user) {
		return new Observable(subscriber => {
			subscriber.next(user);
			subscriber.complete();
		});
	} else {
		return new Observable(subscriber => {
			subscriber.error('Usuário ou senha inválidos');
			subscriber.complete();
		});
	}
};
