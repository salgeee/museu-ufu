import { IMenu } from '../types/menu.type';
import { Role } from '@app/features/login/models/credentials.model';

export const LIST_MENU_STUDENT: IMenu[] = [
	{
		label: 'Página inicial',
		icon: 'fa-home',
		url: '/home',
	},
	{
		label: 'Dashboard',
		icon: 'fa-chart-bar',
		url: '/dashboard',
	},
	{
		label: 'Informações acadêmicas',
		icon: 'fa-book',
		url: '/informacoes/academicas',
	},
	{
		label: 'Informações profissionais',
		icon: 'fa-briefcase',
		url: '/informacoes/profissionais',
	},
	{
		label: 'Depoimentos',
		icon: 'fa-comments',
		url: '/depoimentos',
	},
	{
		label: 'Publicações',
		icon: 'fa-bars',
		url: '/publicacoes',
	},
	{
		label: 'Perfil',
		icon: 'fa-user',
		url: '/perfil',
	},
];

export const LIST_MENU_COORDINATOR: IMenu[] = [
	{
		label: 'Página inicial',
		icon: 'fa-home',
		url: '/home',
	},
	{
		label: 'Dashboard',
		icon: 'fa-chart-bar',
		url: '/dashboard',
	},
	{
		label: 'Egressos',
		icon: 'fa-user-graduate',
		url: '/egressos',
	},
	{
		label: 'Comunicados',
		icon: 'fa-bullhorn',
		url: '/comunicados',
	},
	{
		label: 'Questionários',
		icon: 'fa-tasks',
		url: 'https://forms.office.com/',
		external: true,
	},
	{
		label: 'Perfil',
		icon: 'fa-user',
		url: '/perfil',
	},
];

export const LIST_MENU_PUBLIC: IMenu[] = [
	{
		label: 'Página inicial',
		icon: 'fa-home',
		url: '/home',
	},
	{
		label: 'Dashboard',
		icon: 'fa-chart-bar',
		url: '/dashboard',
	},
];

export const LIST_MENU_BY_ROLE = new Map<Role, IMenu[]>([
	[Role.STUDENT, LIST_MENU_STUDENT],
	[Role.COORDINATOR, LIST_MENU_COORDINATOR],
	[Role.PUBLIC, LIST_MENU_PUBLIC],
]);
