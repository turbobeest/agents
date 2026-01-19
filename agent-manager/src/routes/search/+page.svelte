<script lang="ts">
	import AgentCard from '$lib/components/agent/AgentCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { data } = $props();

	let searchInput = $state(data.query);
	let selectedTier = $state(data.filters.tier || '');
	let selectedModel = $state(data.filters.model || '');
	let selectedCategory = $state(data.filters.category || '');

	function updateSearch() {
		const params = new URLSearchParams();
		if (searchInput) params.set('q', searchInput);
		if (selectedTier) params.set('tier', selectedTier);
		if (selectedModel) params.set('model', selectedModel);
		if (selectedCategory) params.set('category', selectedCategory);

		goto(`/search?${params.toString()}`);
	}

	function clearFilters() {
		searchInput = '';
		selectedTier = '';
		selectedModel = '';
		selectedCategory = '';
		goto('/search');
	}

	function getTierColor(tier: string): string {
		switch (tier) {
			case 'phd': return 'bg-purple-900/50 text-purple-300';
			case 'expert': return 'bg-blue-900/50 text-blue-300';
			case 'focused': return 'bg-green-900/50 text-green-300';
			default: return 'bg-gray-700 text-gray-300';
		}
	}

	function getModelColor(model: string): string {
		switch (model) {
			case 'opus': return 'bg-orange-900/50 text-orange-300';
			case 'sonnet': return 'bg-indigo-900/50 text-indigo-300';
			case 'haiku': return 'bg-teal-900/50 text-teal-300';
			default: return 'bg-gray-700 text-gray-300';
		}
	}
</script>

<svelte:head>
	<title>Search Agents | Agent Manager</title>
</svelte:head>

<div>
	<h1 class="text-2xl font-bold text-gray-100 mb-6">Search Agents</h1>

	<!-- Search and Filters -->
	<div class="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6">
		<form onsubmit={updateSearch} class="space-y-4">
			<div class="flex gap-4">
				<div class="flex-1">
					<input
						type="text"
						bind:value={searchInput}
						placeholder="Search by name, description, or vocabulary..."
						class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<button
					type="submit"
					class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
				>
					Search
				</button>
			</div>

			<div class="flex items-center gap-4">
				<div>
					<label for="tier" class="block text-sm font-medium text-gray-300 mb-1">Tier</label>
					<select
						id="tier"
						bind:value={selectedTier}
						onchange={updateSearch}
						class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100"
					>
						<option value="">All tiers</option>
						{#each data.filterOptions.tiers as tier}
							<option value={tier}>{tier}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="model" class="block text-sm font-medium text-gray-300 mb-1">Model</label>
					<select
						id="model"
						bind:value={selectedModel}
						onchange={updateSearch}
						class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100"
					>
						<option value="">All models</option>
						{#each data.filterOptions.models as model}
							<option value={model}>{model}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="category" class="block text-sm font-medium text-gray-300 mb-1">Category</label>
					<select
						id="category"
						bind:value={selectedCategory}
						onchange={updateSearch}
						class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100"
					>
						<option value="">All categories</option>
						{#each data.filterOptions.categories as category}
							<option value={category}>{category.replace(/-/g, ' ')}</option>
						{/each}
					</select>
				</div>

				{#if data.query || data.filters.tier || data.filters.model || data.filters.category}
					<div class="pt-6">
						<button
							type="button"
							onclick={clearFilters}
							class="text-sm text-gray-400 hover:text-gray-300"
						>
							Clear filters
						</button>
					</div>
				{/if}
			</div>
		</form>
	</div>

	<!-- Results -->
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-lg font-semibold text-gray-100">
			{#if data.query}
				Results for "{data.query}"
			{:else}
				All Agents
			{/if}
			<span class="text-gray-400 font-normal">({data.totalResults})</span>
		</h2>
	</div>

	{#if data.results.length > 0}
		<div class="grid grid-cols-2 gap-4">
			{#each data.results as agent}
				<AgentCard {agent} showCategory={true} />
			{/each}
		</div>
	{:else}
		<div class="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
			<svg class="w-12 h-12 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
			<h3 class="text-lg font-medium text-gray-100 mb-2">No agents found</h3>
			<p class="text-gray-400">Try adjusting your search or filters</p>
		</div>
	{/if}
</div>
