<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Search } from 'lucide-svelte';
	import { searchTracks } from '$lib/spotifyApi';

	const dispatch = createEventDispatcher();

	let title = '';
	let artist = '';
	let searchQuery = '';
	let searchResults: any[] = [];

	async function handleSubmit() {
		if (title && artist) {
			dispatch('addSong', { title, artist });
			title = '';
			artist = '';
		}
	}

	async function handleSearch() {
		if (searchQuery) {
			searchResults = await searchTracks(searchQuery);
		}
	}

	function selectTrack(track: any) {
		title = track.name;
		artist = track.artists[0].name;
		searchQuery = '';
		searchResults = [];
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="mb-6 space-y-4">
	<div>
		<label for="search" class="block mb-1">Search Spotify</label>
		<div class="flex">
			<input
				type="text"
				id="search"
				bind:value={searchQuery}
				placeholder="Search for a song..."
				class="flex-grow p-2 bg-gray-700 rounded-l"
			/>
			<button
				type="button"
				on:click={handleSearch}
				class="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700"
			>
				<Search size={18} />
			</button>
		</div>
	</div>
	{#if searchResults.length > 0}
		<ul class="bg-gray-800 rounded p-2 max-h-40 overflow-y-auto">
			{#each searchResults as track}
				<li
					class="cursor-pointer hover:bg-gray-700 p-2 rounded"
					on:click={() => selectTrack(track)}
				>
					{track.name} - {track.artists[0].name}
				</li>
			{/each}
		</ul>
	{/if}
	<div>
		<label for="title" class="block mb-1">Song Title</label>
		<input
			type="text"
			id="title"
			bind:value={title}
			required
			class="w-full p-2 bg-gray-700 rounded"
		/>
	</div>
	<div>
		<label for="artist" class="block mb-1">Artist</label>
		<input
			type="text"
			id="artist"
			bind:value={artist}
			required
			class="w-full p-2 bg-gray-700 rounded"
		/>
	</div>
	<button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
		Add Song
	</button>
</form>