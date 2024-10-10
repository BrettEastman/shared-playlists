<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import type { Playlist } from '$lib/types';
	import PlaylistView from '$lib/components/PlaylistView.svelte';
	import AddSongForm from '$lib/components/AddSongForm.svelte';

	let playlists: Playlist[] = [];
	let currentPlaylist: Playlist | null = null;

	onMount(async () => {
		const { data, error } = await supabase
			.from('playlists')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching playlists:', error);
		} else {
			playlists = data;
			if (playlists.length > 0) {
				currentPlaylist = playlists[0];
			}
		}
	});

	async function handleAddSong(event: CustomEvent<{ title: string; artist: string }>) {
		if (!currentPlaylist) return;

		const { title, artist } = event.detail;
		const { data: userData } = await supabase.auth.getUser();
		const user = userData?.user;

		if (!user) {
			console.error('User not authenticated');
			return;
		}

		const { data, error } = await supabase
			.from('songs')
			.insert({
				title,
				artist,
				playlist_id: currentPlaylist.id,
				added_by: user.id
			})
			.select()
			.single();

		if (error) {
			console.error('Error adding song:', error);
		} else {
			currentPlaylist.songs = [...currentPlaylist.songs, data];
		}
	}
</script>

<div class="space-y-8">
	{#if currentPlaylist}
		<h2 class="text-2xl font-bold">{currentPlaylist.name}</h2>
		<AddSongForm on:addSong={handleAddSong} />
		<PlaylistView playlist={currentPlaylist} />
	{:else}
		<p>No playlists available. Create one to get started!</p>
	{/if}
</div>