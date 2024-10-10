<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import type { Comment } from '$lib/types';

	export let songId: string;

	let comments: Comment[] = [];
	let newComment = '';

	onMount(async () => {
		await fetchComments();
	});

	async function fetchComments() {
		const { data, error } = await supabase
			.from('comments')
			.select('*')
			.eq('song_id', songId)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching comments:', error);
		} else {
			comments = data;
		}
	}

	async function addComment() {
		if (!newComment.trim()) return;

		const { data: userData } = await supabase.auth.getUser();
		const user = userData?.user;

		if (!user) {
			console.error('User not authenticated');
			return;
		}

		const { data, error } = await supabase
			.from('comments')
			.insert({
				song_id: songId,
				user_id: user.id,
				content: newComment.trim()
			})
			.select()
			.single();

		if (error) {
			console.error('Error adding comment:', error);
		} else {
			comments = [data, ...comments];
			newComment = '';
		}
	}
</script>

<div class="mt-4 space-y-4">
	<form on:submit|preventDefault={addComment} class="flex">
		<input
			type="text"
			bind:value={newComment}
			placeholder="Add a comment..."
			class="flex-grow p-2 bg-gray-700 rounded-l"
		/>
		<button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
			Post
		</button>
	</form>
	{#each comments as comment (comment.id)}
		<div class="bg-gray-700 p-2 rounded">
			<p class="text-sm text-gray-300">{comment.user_id}</p>
			<p>{comment.content}</p>
		</div>
	{/each}
</div>