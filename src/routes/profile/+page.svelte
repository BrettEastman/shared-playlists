<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
    else goto('/');
  }
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
  <h2 class="text-2xl font-bold mb-6 text-center">User Profile</h2>
  <button
    on:click={handleSignOut}
    class="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Sign Out
  </button>
</div>