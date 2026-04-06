export const artists = [
  { id: 1, name: "Aurora Waves", genre: "Electronic", followers: "2.4M", image: "https://picsum.photos/seed/artist1/300/300", verified: true, songs: [1,2,5,9] },
  { id: 2, name: "Nova Pulse", genre: "Pop / R&B", followers: "1.8M", image: "https://picsum.photos/seed/artist2/300/300", verified: true, songs: [3,4,7,11] },
  { id: 3, name: "Celestial Echo", genre: "Indie / Alt", followers: "980K", image: "https://picsum.photos/seed/artist3/300/300", verified: false, songs: [6,8,12] },
  { id: 4, name: "Midnight Bloom", genre: "Lo-Fi / Chill", followers: "3.1M", image: "https://picsum.photos/seed/artist4/300/300", verified: true, songs: [10,13,14] },
  { id: 5, name: "Violet Storm", genre: "Rock / Metal", followers: "560K", image: "https://picsum.photos/seed/artist5/300/300", verified: false, songs: [15,16] },
  { id: 6, name: "Prism Sky", genre: "Ambient", followers: "1.2M", image: "https://picsum.photos/seed/artist6/300/300", verified: true, songs: [17,18,19] },
];

export const songs = [
  { id: 1, title: "Neon Dreams", artist: "Aurora Waves", artistId: 1, album: "Electric Night", duration: "3:42", image: "https://picsum.photos/seed/song1/300/300", liked: true, plays: "12.4M" },
  { id: 2, title: "Starfall", artist: "Aurora Waves", artistId: 1, album: "Electric Night", duration: "4:15", image: "https://picsum.photos/seed/song2/300/300", liked: false, plays: "8.7M" },
  { id: 3, title: "Cloud Nine", artist: "Nova Pulse", artistId: 2, album: "Elevation", duration: "3:28", image: "https://picsum.photos/seed/song3/300/300", liked: true, plays: "15.2M" },
  { id: 4, title: "Purple Rain", artist: "Nova Pulse", artistId: 2, album: "Elevation", duration: "5:01", image: "https://picsum.photos/seed/song4/300/300", liked: false, plays: "22.1M" },
  { id: 5, title: "Pixel Sunset", artist: "Aurora Waves", artistId: 1, album: "Digital Horizon", duration: "3:55", image: "https://picsum.photos/seed/song5/300/300", liked: true, plays: "6.3M" },
  { id: 6, title: "Glass Hearts", artist: "Celestial Echo", artistId: 3, album: "Fragments", duration: "4:33", image: "https://picsum.photos/seed/song6/300/300", liked: false, plays: "4.1M" },
  { id: 7, title: "Midnight Run", artist: "Nova Pulse", artistId: 2, album: "Night Drive", duration: "3:19", image: "https://picsum.photos/seed/song7/300/300", liked: true, plays: "18.9M" },
  { id: 8, title: "Echo Chamber", artist: "Celestial Echo", artistId: 3, album: "Fragments", duration: "4:47", image: "https://picsum.photos/seed/song8/300/300", liked: false, plays: "2.8M" },
  { id: 9, title: "Voltage", artist: "Aurora Waves", artistId: 1, album: "Electric Night", duration: "3:12", image: "https://picsum.photos/seed/song9/300/300", liked: true, plays: "9.4M" },
  { id: 10, title: "Lavender Haze", artist: "Midnight Bloom", artistId: 4, album: "Bloom", duration: "3:38", image: "https://picsum.photos/seed/song10/300/300", liked: false, plays: "31.2M" },
  { id: 11, title: "Solar Wind", artist: "Nova Pulse", artistId: 2, album: "Elevation", duration: "4:02", image: "https://picsum.photos/seed/song11/300/300", liked: true, plays: "7.6M" },
  { id: 12, title: "Whisper Wave", artist: "Celestial Echo", artistId: 3, album: "Quiet Storm", duration: "5:14", image: "https://picsum.photos/seed/song12/300/300", liked: false, plays: "3.2M" },
  { id: 13, title: "Dreamer", artist: "Midnight Bloom", artistId: 4, album: "Bloom", duration: "3:52", image: "https://picsum.photos/seed/song13/300/300", liked: true, plays: "14.7M" },
  { id: 14, title: "Soft Signal", artist: "Midnight Bloom", artistId: 4, album: "Lo-Fi Sessions", duration: "2:58", image: "https://picsum.photos/seed/song14/300/300", liked: false, plays: "19.3M" },
  { id: 15, title: "Thunder Road", artist: "Violet Storm", artistId: 5, album: "Electric Eye", duration: "4:28", image: "https://picsum.photos/seed/song15/300/300", liked: true, plays: "5.1M" },
  { id: 16, title: "Iron Wings", artist: "Violet Storm", artistId: 5, album: "Electric Eye", duration: "3:44", image: "https://picsum.photos/seed/song16/300/300", liked: false, plays: "4.4M" },
  { id: 17, title: "Prism Light", artist: "Prism Sky", artistId: 6, album: "Spectrum", duration: "6:02", image: "https://picsum.photos/seed/song17/300/300", liked: true, plays: "8.8M" },
  { id: 18, title: "Arctic Blue", artist: "Prism Sky", artistId: 6, album: "Spectrum", duration: "4:19", image: "https://picsum.photos/seed/song18/300/300", liked: false, plays: "6.1M" },
  { id: 19, title: "Crystal Shore", artist: "Prism Sky", artistId: 6, album: "Horizon", duration: "5:33", image: "https://picsum.photos/seed/song19/300/300", liked: true, plays: "3.9M" },
];

export const playlists = [
  { id: 1, name: "Chill Vibes", description: "Perfect for late night sessions", image: "https://picsum.photos/seed/pl1/300/300", songs: [1, 10, 13, 14, 17], createdBy: "You" },
  { id: 2, name: "Workout Mix", description: "High energy beats to keep you moving", image: "https://picsum.photos/seed/pl2/300/300", songs: [4, 7, 9, 15, 16], createdBy: "You" },
  { id: 3, name: "Study Focus", description: "Ambient tracks for deep focus", image: "https://picsum.photos/seed/pl3/300/300", songs: [6, 8, 12, 17, 18, 19], createdBy: "You" },
  { id: 4, name: "Morning Boost", description: "Start your day with energy", image: "https://picsum.photos/seed/pl4/300/300", songs: [3, 5, 11, 2, 7], createdBy: "You" },
];

export const recentSongs = [19, 1, 7, 13, 4, 10, 3, 17].map(id => songs.find(s => s.id === id));
export const favoriteSongs = songs.filter(s => s.liked);
export const trendingSongs = [4, 10, 7, 14, 13, 3, 1, 11, 9, 17].map(id => songs.find(s => s.id === id));
export const topCharts = [10, 4, 14, 13, 7, 17, 3, 2, 9, 11, 18, 1].map(id => songs.find(s => s.id === id));
