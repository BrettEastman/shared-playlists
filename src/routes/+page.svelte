<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	let email = '';
	let password = '';
	let error = '';

	async function handleLogin() {
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error('Error logging in:', error.message);
			this.error = error.message;
		} else {
			goto('/playlists');
		}
	}

	async function handleSignUp() {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error('Error signing up:', error.message);
			this.error = error.message;
		} else {
			alert('Check your email for the confirmation link!');
		}
	}
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
	<h2 class="text-2xl font-bold mb-6 text-center">Login or Sign Up</h2>
	<form on:submit|preventDefault={handleLogin} class="space-y-4">
		<div>
			<label for="email" class="block mb-1">Email</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				required
				class="w-full p-2 bg-gray-700 rounded"
			/>
		</div>
		<div>
			<label for="password" class="block mb-1">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				class="w-full p-2 bg-gray-700 rounded"
			/>
		</div>
		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}
		<div class="flex justify-between">
			<button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
				Login
			</button>
			<button
				type="button"
				on:click={handleSignUp}
				class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
			>
				Sign Up
			</button>
		</div>
	</form>
</div>