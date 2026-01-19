import type { PageServerLoad } from './$types';
import { searchAgents, getAllAgents, getFilterOptions } from '$lib/server/search';
import type { SearchFilters } from '$lib/types';

export const prerender = false; // Search uses dynamic query params

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q') || '';
	const tier = url.searchParams.get('tier') as SearchFilters['tier'] | null;
	const model = url.searchParams.get('model') as SearchFilters['model'] | null;
	const category = url.searchParams.get('category') || null;

	const filters: SearchFilters = {};
	if (tier) filters.tier = tier;
	if (model) filters.model = model;
	if (category) filters.category = category;

	let results;
	if (query) {
		const searchResults = await searchAgents(query, filters);
		results = searchResults.map((r) => r.agent);
	} else {
		results = await getAllAgents(filters);
	}

	const filterOptions = await getFilterOptions();

	return {
		query,
		filters,
		results,
		filterOptions,
		totalResults: results.length
	};
};
