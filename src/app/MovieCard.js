import Link from "next/link";

export default function MovieCard({movie}){
    const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png';
  return (
    <Link href={`/movie/${movie.id}`}>
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={imageUrl} alt={movie.title} className="w-full h-72 object-cover" />
      <div className="p-2">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
      </div>
    </div>
    </Link>
  );

}