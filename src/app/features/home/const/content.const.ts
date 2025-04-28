import { Role } from '../../login/models/credentials.model';

export const CONTENT_BY_ROLE = new Map<Role, string>([
	[
		Role.PUBLIC,
		'Explore o dashboard interativo com dados públicos sobre a Universidade Federal de Uberlândia. Acompanhe informações relevantes sobre o impacto da UFU na sociedade e mantenha-se atualizado sobre as atividades e contribuições da instituição.',
	],
	[
		Role.STUDENT,
		'Mantenha viva a conexão com a Universidade Federal de Uberlândia. Acesse oportunidades de networking, desenvolvimento profissional, e acompanhe as novidades da UFU. Este é o espaço ideal para fortalecer laços e se manter conectado com a comunidade acadêmica que fez parte da sua trajetória.',
	],
	[
		Role.COORDINATOR,
		'Gerencie e fortaleça a rede de ex-alunos da Universidade Federal de Uberlândia. Acesse informações atualizadas sobre nossos egressos e promova iniciativas que aproximem a UFU de seus antigos alunos. Facilite o desenvolvimento de parcerias e mantenha a relevância da instituição no mercado de trabalho.',
	],
]);
