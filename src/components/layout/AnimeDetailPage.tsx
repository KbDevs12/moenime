"use client";
import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  Calendar,
  Film,
  Clapperboard,
  ClipboardList,
} from "lucide-react";
import { AnimeEpsData } from "@/types/types";
import EpisodeCard from "../ui/EpisodeCard";

interface AnimeDetailsProps {
  slug: string;
}

function AnimeDetailPage(props: AnimeDetailsProps) {
  const [animeData, setAnimeData] = useState<AnimeEpsData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    function fetchAnimeDetails() {
      try {
        fetch(`/api/anime?slug=${props.slug}`)
          .then(function (response) {
            if (!response.ok) throw new Error("Failed to fetch anime details");
            return response.json();
          })
          .then(function (result) {
            setAnimeData(result.data);
            setLoading(false);
          })
          .catch(function (err) {
            setError(
              err instanceof Error ? err.message : "An unknown error occurred"
            );
            setLoading(false);
          });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    }

    fetchAnimeDetails();
  }, [props.slug]);
  console.log(animeData);
  if (loading)
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-violet-500">
        Loading...
      </div>
    );

  if (error)
    return <div className="min-h-screen text-red-500 p-6">{error}</div>;

  if (!animeData) return null;

  return (
    <div className="text-white min-h-screen p-4 md:mt-0 mt-20">
      {/* Header Section */}
      <div className="grid md:grid-cols-[300px_1fr] gap-6 max-w-6xl mx-auto">
        {/* Thumbnail */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={animeData.thumbnail}
            alt={animeData.title}
            className="w-full h-[450px] object-cover"
          />
        </div>

        {/* Anime Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-violet-500">
            {animeData.title}
          </h1>
          <h2 className="text-xl text-violet-400">{animeData.japaneseTitle}</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="text-violet-500" size={20} />
              <span>
                Score: {animeData.score ? animeData.score : "Not Avaiable"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Film className="text-violet-500" size={20} />
              <span>Type: {animeData.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-violet-500" size={20} />
              <span>Duration: {animeData.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-violet-500" size={20} />
              <span>Release: {animeData.releaseDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClipboardList className="text-violet-500" size={20} />
              <span>Total Eps: {animeData.totalEps}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clapperboard className="text-violet-500" size={20} />
              <span>Studio: {animeData.studio}</span>
            </div>
          </div>

          <div className="bg-violet-900/30 p-4 rounded-lg">
            <h3 className="text-xl text-violet-400 mb-2">Synopsis</h3>
            <p className="text-gray-300">
              {animeData.synopsis ? animeData.synopsis : "Not. Avaiable"}
            </p>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl text-violet-500 mb-4">Episodes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {animeData.eps.map(function (ep, index) {
            return (
              <EpisodeCard
                index={index}
                title={`${ep.epsTitle}`}
                slug={`${ep.epsSlug}`}
                date={`${ep.epsDate}`}
              />
            );
          })}
        </div>
      </div>

      {/* Recommended Anime */}
      <div className="max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl text-violet-500 mb-4">Recommended Anime</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {animeData.recommendedAnime.map(function (anime, index) {
            return (
              <div
                key={index}
                className="bg-violet-900/30 rounded-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <img
                  src={anime.recommendedImage}
                  alt={anime.recommendedTitle}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-violet-400 truncate">
                    {anime.recommendedTitle}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AnimeDetailPage;
