<script lang="ts">
	import type { Playlist } from '$lib/types';
	import SongItem from './SongItem.svelte';

	export let playlist: Playlist;
</script>

<div class="space-y-4">
	{#each playlist.songs as song (song.id)}
		<SongItem {song} />
	{/each}
</div>