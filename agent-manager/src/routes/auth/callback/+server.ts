import { redirect } from '@sveltejs/kit';
export const prerender = false;
import type { RequestHandler } from './$types';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ORIGIN } from '$env/static/private';
import { exchangeCodeForToken } from '$lib/server/github';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const error = url.searchParams.get('error');

	if (error) {
		throw redirect(302, `/?error=${error}`);
	}

	if (!code) {
		throw redirect(302, '/?error=no_code');
	}

	if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
		throw redirect(302, '/?error=github_not_configured');
	}

	const accessToken = await exchangeCodeForToken(code, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

	if (!accessToken) {
		throw redirect(302, '/?error=token_exchange_failed');
	}

	// Store token in HTTP-only cookie
	cookies.set('github_token', accessToken, {
		path: '/',
		httpOnly: true,
		secure: (ORIGIN || '').startsWith('https'),
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});

	throw redirect(302, '/');
};
