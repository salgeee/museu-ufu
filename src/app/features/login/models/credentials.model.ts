export interface Credentials {
	username: string;
	role: Role;
	accessToken: string;
	fullName: string;
	document: string;
}

export enum Role {
	COORDINATOR = 'COORDINATOR',
	STUDENT = 'STUDENT',
	PUBLIC = 'PUBLIC',
}
