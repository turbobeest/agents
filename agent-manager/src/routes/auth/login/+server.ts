import { redirect } from '@sveltejs/kit';
export const prerender = false;
import type { RequestHandler } from './$types';
import { GITHUB_CLIENT_ID, ORIGIN } from '$env/static/private';

export const GET: RequestHandler = async () => {
	if (!GITHUB_CLIENT_ID) {
		throw redirect(302, '/?error=github_not_configured');
	}

	const params = new URLSearchParams({
		client_id: GITHUB_CLIENT_ID,
		redirect_uri: `${ORIGIN || 'http://localhost:5173'}/auth/callback`,
		scope: 'repo'
	});

	throw redirect(302, `https://github.com/login/oauth/authorize?${params}`);
};
