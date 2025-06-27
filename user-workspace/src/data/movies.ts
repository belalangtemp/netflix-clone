export const movies = [
  {
    id: 1,
    title: "Stranger Things",
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&h=450&q=80",
  },
  {
    id: 2,
    title: "The Witcher",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&h=450&q=80",
  },
  {
    id: 3,
    title: "Wednesday",
    imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&h=450&q=80",
  },
  {
    id: 4,
    title: "Bridgerton",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&h=450&q=80",
  },
  {
    id: 5,
    title: "Money Heist",
    imageUrl: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=800&h=450&q=80",
  },
  {
    id: 6,
    title: "Dark",
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&h=450&q=80",
  }
];

export const categories = [
  {
    id: 1,
    title: "Populer di Netflix",
    movies: movies
  },
  {
    id: 2,
    title: "Trending Sekarang",
    movies: [...movies].reverse()
  },
  {
    id: 3,
    title: "Film Aksi",
    movies: movies.slice(2)
  },
  {
    id: 4,
    title: "Serial TV",
    movies: movies.slice(1, 5)
  }
];
