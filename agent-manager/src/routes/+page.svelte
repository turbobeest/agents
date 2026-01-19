<script lang="ts">
	import { base } from '$app/paths';
	let { data } = $props();

	// Get all agents flat for stats
	let allAgents = $derived(
		data.navigation.flatMap((cat) =>
			cat.subcategories.flatMap((sub) =>
				sub.agents.map((agent) => ({
					...agent,
					category: cat.id,
					categoryTitle: cat.title
				}))
			)
		)
	);

	// Stats by tier
	let tierStats = $derived({
		phd: allAgents.filter((a) => a.tier === 'phd').length,
		expert: allAgents.filter((a) => a.tier === 'expert').length,
		focused: allAgents.filter((a) => a.tier === 'focused').length
	});

	// Stats by model
	let modelStats = $derived({
		opus: allAgents.filter((a) => a.model === 'opus').length,
		sonnet: allAgents.filter((a) => a.model === 'sonnet').length,
		haiku: allAgents.filter((a) => a.model === 'haiku').length
	});

	let totalAgents = $derived(allAgents.length);

	// Search functionality
	let searchQuery = $state('');

	function handleSearch(e: Event) {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `${base}/search?q=${encodeURIComponent(searchQuery)}`;
		}
	}
</script>

<div class="space-y-6">
	<!-- Quick Actions Hub -->
	<section class="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl border border-gray-700 p-6">
		<div class="flex items-center justify-between gap-8">
			<!-- Search -->
			<form class="flex-1 max-w-xl" onsubmit={handleSearch}>
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search agents by name, description, or capability..."
						class="w-full pl-12 pr-4 py-3 bg-gray-800/80 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
			</form>

			<!-- Quick Stats -->
			<div class="flex items-center gap-6 text-center">
				<div>
					<div class="text-2xl font-bold text-blue-400">{totalAgents}</div>
					<div class="text-xs text-gray-400">Agents</div>
				</div>
				<div>
					<div class="text-2xl font-bold text-purple-400">{data.navigation.length}</div>
					<div class="text-xs text-gray-400">Categories</div>
				</div>
			</div>

			<!-- Create Button -->
			<a
				href="{base}/create"
				class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Create Agent
			</a>
		</div>
	</section>

	<!-- Dashboard Grid -->
	<div class="grid grid-cols-3 gap-6">
		<!-- Tier Distribution -->
		<section class="bg-gray-800 rounded-xl border border-gray-700 p-5">
			<h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">By Tier</h3>
			<div class="space-y-3">
				<div class="flex items-center gap-3">
					<div class="w-16 text-sm text-purple-300 font-medium">PhD</div>
					<div class="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all"
							style="width: {totalAgents ? (tierStats.phd / totalAgents) * 100 : 0}%"
						></div>
					</div>
					<div class="w-10 text-right text-sm text-gray-300">{tierStats.phd}</div>
				</div>
				<div class="flex items-center gap-3">
					<div class="w-16 text-sm text-blue-300 font-medium">Expert</div>
					<div class="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all"
							style="width: {totalAgents ? (tierStats.expert / totalAgents) * 100 : 0}%"
						></div>
					</div>
					<div class="w-10 text-right text-sm text-gray-300">{tierStats.expert}</div>
				</div>
				<div class="flex items-center gap-3">
					<div class="w-16 text-sm text-green-300 font-medium">Focused</div>
					<div class="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all"
							style="width: {totalAgents ? (tierStats.focused / totalAgents) * 100 : 0}%"
						></div>
					</div>
					<div class="w-10 text-right text-sm text-gray-300">{tierStats.focused}</div>
				</div>
			</div>
		</section>

		<!-- Model Distribution -->
		<section class="bg-gray-800 rounded-xl border border-gray-700 p-5">
			<h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">By Model</h3>
			<div class="space-y-3">
				<div class="flex items-center gap-3">
					<div class="w-16 text-sm text-orange-300 font-medium">Opus</div>
					<div class="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all"
							style="width: {totalAgents ? (modelStats.opus / totalAgents) * 100 : 0}%"
						></div>
					</div>
					<div class="w-10 text-right text-sm text-gray-300">{modelStats.opus}</div>
				</div>
				<div class="flex items-center gap-3">
					<div class="w-16 text-sm text-indigo-300 font-medium">Sonnet</div>
					<div class="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all"
							style="width: {totalAgents ? (modelStats.sonnet / totalAgents) * 100 : 0}%"
						></div>
					</div>
					<div class="w-10 text-right text-sm text-gray-300">{modelStats.sonnet}</div>
				</div>
				<div class="flex items-center gap-3">
					<div class="w-16 text-sm text-teal-300 font-medium">Haiku</div>
					<div class="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all"
							style="width: {totalAgents ? (modelStats.haiku / totalAgents) * 100 : 0}%"
						></div>
					</div>
					<div class="w-10 text-right text-sm text-gray-300">{modelStats.haiku}</div>
				</div>
			</div>
		</section>

		<!-- Tier Guide -->
		<section class="bg-gray-800 rounded-xl border border-gray-700 p-5">
			<h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Tier Guide</h3>
			<div class="space-y-3">
				<div class="flex items-start gap-3">
					<div class="w-8 h-8 bg-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
						<span class="text-sm font-bold text-purple-400">P</span>
					</div>
					<div>
						<div class="text-sm font-medium text-gray-200">PhD</div>
						<div class="text-xs text-gray-400">Research-grade depth</div>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<div class="w-8 h-8 bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
						<span class="text-sm font-bold text-blue-400">E</span>
					</div>
					<div>
						<div class="text-sm font-medium text-gray-200">Expert</div>
						<div class="text-xs text-gray-400">Deep domain knowledge</div>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<div class="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
						<span class="text-sm font-bold text-green-400">F</span>
					</div>
					<div>
						<div class="text-sm font-medium text-gray-200">Focused</div>
						<div class="text-xs text-gray-400">Single-purpose specialist</div>
					</div>
				</div>
			</div>
		</section>
	</div>

	<!-- Educational Introduction -->
	<section class="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
		<div class="p-8">
			<div class="flex items-start gap-6 mb-8">
				<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<div>
					<h2 class="text-2xl font-bold text-gray-100 mb-2">Supercharge Claude Code with Specialized Agents</h2>
					<p class="text-gray-400 text-lg">
						Agents are precision-engineered system prompts that transform Claude into domain experts.
						Each agent carries specialized knowledge, calibrated vocabulary, and battle-tested instructions.
					</p>
				</div>
			</div>

			<!-- The Key Insight -->
			<div class="bg-blue-900/20 border border-blue-700/50 rounded-xl p-6 mb-8">
				<div class="flex items-start gap-4">
					<div class="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
						<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
						</svg>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-blue-300 mb-2">The Context Precision Principle</h3>
						<p class="text-gray-300">
							Claude's base system prompt uses ~50 of the ~150-200 instructions a model can reliably follow.
							<span class="text-blue-300 font-medium">Every irrelevant instruction degrades adherence to ALL instructions.</span>
						</p>
						<p class="text-gray-400 mt-2">
							A 3000-token PhD agent with 35 highly-relevant instructions will outperform a 1000-token generic prompt with 20 mixed-relevance instructions every time.
						</p>
					</div>
				</div>
			</div>

			<!-- Three Pillars -->
			<h3 class="text-lg font-semibold text-gray-200 mb-4">What Makes Agents Powerful</h3>
			<div class="grid grid-cols-3 gap-6 mb-8">
				<div class="bg-gray-900/50 rounded-xl p-5 border border-gray-700/50">
					<div class="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
						</svg>
					</div>
					<h4 class="text-base font-semibold text-gray-200 mb-2">Identity & Lens</h4>
					<p class="text-sm text-gray-400">
						Each agent has a persona and interpretive lens that shapes how it views problems.
						A security auditor assumes all inputs are hostile. An architect thinks in systems and contracts.
					</p>
				</div>

				<div class="bg-gray-900/50 rounded-xl p-5 border border-gray-700/50">
					<div class="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
					</div>
					<h4 class="text-base font-semibold text-gray-200 mb-2">Knowledge Grounding</h4>
					<p class="text-sm text-gray-400">
						Agents reference authoritative sources: official docs, RFCs, OWASP guidelines, academic papers.
						This grounding ensures responses are accurate and up-to-date.
					</p>
				</div>

				<div class="bg-gray-900/50 rounded-xl p-5 border border-gray-700/50">
					<div class="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</div>
					<h4 class="text-base font-semibold text-gray-200 mb-2">Tool Modes</h4>
					<p class="text-sm text-gray-400">
						Agents operate in different modes: <code class="text-green-400">audit</code> for read-only analysis,
						<code class="text-green-400">solution</code> for implementation, <code class="text-green-400">research</code> for web access.
					</p>
				</div>
			</div>

			<!-- How to Use -->
			<h3 class="text-lg font-semibold text-gray-200 mb-4">Optimizing Your Workflow</h3>
			<div class="grid grid-cols-2 gap-6">
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-6 h-6 bg-orange-600/30 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
							<span class="text-xs font-bold text-orange-400">1</span>
						</div>
						<div>
							<h4 class="text-sm font-semibold text-gray-200">Match Model to Task</h4>
							<p class="text-sm text-gray-400">
								Use <span class="text-orange-300 font-medium">Opus</span> for architecture decisions that cascade.
								<span class="text-indigo-300 font-medium">Sonnet</span> for implementation.
								<span class="text-teal-300 font-medium">Haiku</span> for exploration and mechanical work.
							</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-6 h-6 bg-orange-600/30 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
							<span class="text-xs font-bold text-orange-400">2</span>
						</div>
						<div>
							<h4 class="text-sm font-semibold text-gray-200">Pick the Right Tier</h4>
							<p class="text-sm text-gray-400">
								<span class="text-purple-300 font-medium">PhD</span> for novel problems requiring first-principles reasoning.
								<span class="text-blue-300 font-medium">Expert</span> for domain-specific work.
								<span class="text-green-300 font-medium">Focused</span> for bounded tasks.
							</p>
						</div>
					</div>
				</div>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-6 h-6 bg-orange-600/30 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
							<span class="text-xs font-bold text-orange-400">3</span>
						</div>
						<div>
							<h4 class="text-sm font-semibold text-gray-200">Leverage Parallelization</h4>
							<p class="text-sm text-gray-400">
								8 Sonnet agents outpace 1 Opus agent on divisible work. Use Opus for the 20% of decisions that determine 80% of outcomes.
							</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-6 h-6 bg-orange-600/30 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
							<span class="text-xs font-bold text-orange-400">4</span>
						</div>
						<div>
							<h4 class="text-sm font-semibold text-gray-200">Use Cognitive Modes</h4>
							<p class="text-sm text-gray-400">
								<span class="text-blue-300 font-medium">Generative</span> for solutions,
								<span class="text-red-300 font-medium">Critical</span> for review,
								<span class="text-yellow-300 font-medium">Evaluative</span> for decisions.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Compounding Effect Footer -->
		<div class="bg-gray-900/50 border-t border-gray-700 px-8 py-5">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
					<p class="text-sm text-gray-300">
						<span class="font-semibold text-gray-200">The Compounding Effect:</span>
						Persona × Tools × Knowledge × Output Format = Qualitatively different output
					</p>
				</div>
				<a href="{base}/create" class="text-sm text-blue-400 hover:text-blue-300 font-medium">
					Create your first agent →
				</a>
			</div>
		</div>
	</section>
</div>
