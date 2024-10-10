export interface Song {
  id: string;
  title: string;
  artist: string;
  added_by: string;
  likes: number;
  playlist_id: string;
}

export interface Comment {
  id: string;
  song_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Playlist {
  id: string;
  name: string;
  created_by: string;
  songs: Song[];
}