import SpotifyWebApi from 'spotify-web-api-node';
import { PUBLIC_SPOTIFY_CLIENT_ID, PUBLIC_SPOTIFY_CLIENT_SECRET } from '$env/static/public';

const spotifyApi = new SpotifyWebApi({
  clientId: PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: PUBLIC_SPOTIFY_CLIENT_SECRET
});

let tokenExpirationTime = 0;

async function getAccessToken() {
  if (Date.now() > tokenExpirationTime) {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    tokenExpirationTime = Date.now() + data.body['expires_in'] * 1000;
  }
}

export async function searchTracks(query: string) {
  await getAccessToken();
  const data = await spotifyApi.searchTracks(query);
  return data.body.tracks?.items || [];
}