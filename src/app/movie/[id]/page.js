import Image from "next/image";
async function getMovie(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 60 } } // we use concept of incremental site regeneration in next.js
    );
    return res.json();
  } catch (ex) {
    if (!res.ok) {
      throw new Error("Failed to fetch movie details");
    }
  }
}

export default async function MovieInfo({ params }) {
  const movie = await getMovie(params.id);
  return (
      <main className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
          {movie.poster_path && (
            <div className="relative w-full md:w-72 aspect-[2/3] flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="w-72 rounded mb-6"
            />
            </div>
          )}
           <div className="flex-1">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-700 mb-4">{movie.overview}</p>
          <p className="text-sm text-gray-500 mb-2">
            Release Date: {movie.release_date}
          </p>
          <p className="text-sm text-gray-500">
            Rating: {movie.vote_average} / 10
          </p>
        </div>
           </div>
      </main>
  );
}
