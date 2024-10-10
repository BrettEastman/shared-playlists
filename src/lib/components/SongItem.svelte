<script lang="ts">
	import { ThumbsUp, MessageCircle } from 'lucide-svelte';
	import type { Song } from '$lib/types';
	import { supabase } from '$lib/supabaseClient';
	import CommentSection from './CommentSection.svelte';

	export let song: Song;

	let showComments = false;

	async function handleLike() {
		const { data, error } = await supabase
			.from('songs')
			.update({ likes: song.likes + 1 })
			.eq('id', song.id)
			.select()
			.single();

		if (error) {
			console.error('Error liking song:', error);
		} else {
			song = data;
		}
	}

	function toggleComments() {
		showComments = !showComments;
	}
</script>

<div class="bg-gray-800 p-4 rounded-lg shadow-md">
	<h3 class="text-lg font-semibold">{song.title}</h3>
	<p class="text-gray-400">{song.artist}</p>
	<p class="text-sm text-gray-500">Added by: {song.added_by}</p>
	<div class="mt-2 flex items-center space-x-4">
		<button
			on:click={handleLike}
			class="flex items-center text-blue-400 hover:text-blue-300"
		>
			<ThumbsUp size={18} class="mr-1" />
			<span>{song.likes}</span>
		</button>
		<button
			on:click={toggleComments}
			class="flex items-center text-green-400 hover:text-green-300"
		>
			<MessageCircle size={18} class="mr-1" />
			<span>Comments</span>
		</button>
	</div>
	{#if showComments}
		<CommentSection songId={song.id} />
	{/if}
</div>