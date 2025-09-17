import Image from "next/image";

async function getMovie(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 60 } }
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
    <main className="min-h-screen bg-gray-100 flex justify-center items-start p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center max-w-md w-full">
        {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={400}
              height={600}
              className="rounded mx-auto"
            />
        )}
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-700 mb-4">{movie.overview}</p>
        <p className="text-sm text-gray-500 mb-2">
          Release Date: {movie.release_date}
        </p>
        <p className="text-sm text-gray-500">
          Rating: {movie.vote_average} / 10
        </p>
      </div>
    </main>
  );
}
