import MovieCard from './MovieCard';

async function fetchMovies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 60 } } // incremental site regeneration
  );
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const movies = await fetchMovies();

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Movie Explorer</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
