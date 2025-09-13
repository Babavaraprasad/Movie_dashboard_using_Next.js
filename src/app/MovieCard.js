import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";
  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
        <Image
          src={imageUrl}
          alt={movie.title}
          width={600}
          height={800}
          //fill
          className="w-full h-72 object-cover"
        />
        <div className="p-2">
          <h2 className="text-lg font-semibold text-center">{movie.title}</h2>
          <p className="text-sm text-gray-500 text-center">
            Rating: {movie.vote_average}
          </p>
        </div>
      </div>
    </Link>
  );
}
