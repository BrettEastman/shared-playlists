<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Music } from 'lucide-svelte';

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (event === 'SIGNED_IN') {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="min-h-screen bg-gray-900">
	<header class="bg-gray-800 text-white p-4">
		<div class="container mx-auto flex items-center justify-between">
			<div class="flex items-center">
				<Music size={32} class="mr-2" />
				<h1 class="text-2xl font-bold">Team Music App</h1>
			</div>
			<nav>
				<a href="/" class="mr-4 hover:text-blue-400">Home</a>
				<a href="/playlists" class="mr-4 hover:text-blue-400">Playlists</a>
				<a href="/profile" class="hover:text-blue-400">Profile</a>
			</nav>
		</div>
	</header>
	<main class="container mx-auto p-4">
		<slot />
	</main>
</div>