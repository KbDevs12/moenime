"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EpisodeInterfaces } from "@/types/types";
import { GetStreamFrame } from "@/libs/GetStreamFrame";

interface EpisodeProps {
  slug: string;
}

export default function Episode(props: EpisodeProps) {
  const router = useRouter();
  const [episodeData, setEpisodeData] = useState<EpisodeInterfaces | null>(
    null
  );
  const [currentStream, setCurrentStream] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string>(props.slug);

  const fetchEpisodeData = async () => {
    try {
      const response = await axios.get(`/api/anime/episode?slug=${props.slug}`);
      setEpisodeData(response.data.data);
      setCurrentStream(response.data.data.defaultStream);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load episode data:", error);
      setError("Failed to load episode data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.slug) {
      fetchEpisodeData();
    }
  }, [props.slug]);

  const changeStream = async (contentBase64: string) => {
    try {
      setLoading(true);
      const newStream = await GetStreamFrame(contentBase64);
      console.log(newStream);
      const iframeSrcMatch = newStream?.match(/src="([^"]+)"/);
      const extractedSrc = iframeSrcMatch ? iframeSrcMatch[1] : null;

      if (extractedSrc) {
        setCurrentStream(extractedSrc);
      } else {
        throw new Error("Could not extract stream URL");
      }
    } catch (error) {
      console.error("Error changing stream:", error);
      setError("Failed to change stream. Please try another source.");
    } finally {
      setLoading(false);
    }
  };

  const changeDefaultStream = () => {
    try {
      setLoading(true);
      if (!episodeData?.defaultStream) return;
      setCurrentStream(episodeData?.defaultStream);
    } catch (error) {
      console.error("Error changing stream:", error);
      setError("Failed to change stream. Please try another source.");
    } finally {
      setLoading(false);
    }
  };

  const resolutionMap = useMemo(
    () => ({
      tigaEnam: "360p",
      empatLapan: "480p",
      tujuhDua: "720p",
    }),
    []
  );

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault;
    setSelectedEpisode(event.target.value);
    router.push(`/episode/${selectedEpisode}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-violet-300 p-4">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading Episode...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">😔 Oops!</p>
          <p className="text-xl">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!episodeData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-violet-400 p-4">
        <p className="text-2xl">Episode not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-violet-300 p-6">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        {/* Thumbnail and Title */}
        <div className="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={episodeData.info.thumbnail || "/placeholder-thumbnail.png"}
            alt={episodeData.title || "Episode Thumbnail"}
            className="rounded-lg w-full md:w-1/3 max-w-md shadow-lg"
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.src = "/placeholder-thumbnail.png";
            }}
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-violet-200 mb-2">
              {episodeData.title}
            </h1>
            <div className="bg-violet-800/50 p-4 rounded-lg">
              <p className="mb-2">
                <strong>Type:</strong> {episodeData.info.type || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Genres:</strong> {episodeData.info.genres || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Duration:</strong> {episodeData.info.duration || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Credit:</strong> {episodeData.info.credit || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Encoder:</strong> {episodeData.info.encoder || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-8 bg-violet-900/50 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 text-violet-200">
            Streaming Video
          </h2>
          {currentStream ? (
            <div className="relative pt-[56.25%]">
              <iframe
                src={currentStream}
                className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-violet-700"
                allowFullScreen
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
          ) : (
            <p className="text-red-400">No stream available.</p>
          )}
        </div>

        {/* Mirror Links / Stream Sources */}
        <div className="mb-8 bg-violet-900/50 rounded-lg p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4 text-violet-200">
              Stream Sources
            </h2>
            <button
              onClick={changeDefaultStream}
              className="hover:opacity-50 transition-opacity duration-300"
            >
              Ganti ke Default
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              Object.keys(episodeData.mirrorStream) as Array<
                keyof typeof episodeData.mirrorStream
              >
            ).map((res) => (
              <div
                key={res}
                className="bg-violet-800/50 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-3 text-violet-300">
                  {resolutionMap[res]}
                </h3>
                <div className="flex flex-col space-y-2">
                  {episodeData.mirrorStream[res].mega && (
                    <button
                      onClick={() =>
                        changeStream(episodeData.mirrorStream[res].mega!)
                      }
                      className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition flex items-center justify-center"
                    >
                      <span>Mega Source</span>
                    </button>
                  )}
                  {episodeData.mirrorStream[res].odstream && (
                    <button
                      onClick={() =>
                        changeStream(episodeData.mirrorStream[res].odstream!)
                      }
                      className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition flex items-center justify-center"
                    >
                      <span>Odstream Source</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="episodeSelect" className="text-violet-200 mb-2 block">
            Select Episode
          </label>
          <select
            id="episodeSelect"
            value={selectedEpisode}
            onChange={handleEpisodeChange}
            className="w-full p-3 rounded-lg bg-violet-800/50 text-violet-200 border-2 border-violet-600"
          >
            {episodeData.anyEps.map((episode, index) => (
              <option key={index} value={episode.slug}>
                {episode.title}
              </option>
            ))}
          </select>
        </div>

        {/* Episode Navigation */}
        <div className="flex justify-between items-center bg-violet-900/50 p-4 rounded-lg">
          {episodeData.prevEps && (
            <button
              onClick={() => router.push(`/episode/${episodeData.prevEps}`)}
              className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Previous Episode
            </button>
          )}
          {episodeData.nextPrev && (
            <button
              onClick={() => router.push(`/episode/${episodeData.nextPrev}`)}
              className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition flex items-center ml-auto"
            >
              Next Episode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
