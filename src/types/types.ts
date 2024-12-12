export type animeData = {
  title: string | undefined;
  image: string | undefined;
  eps: string | undefined;
  uploadDate: string | undefined;
  type: string | undefined;
  slug: string | undefined;
};

export interface HomeData {
  data: {
    title: string | undefined;
    image: string | undefined;
    eps: string | undefined;
    uploadDate: string | undefined;
    type: string | undefined;
    slug: string | undefined;
  }[];
  compeletedData: {
    title: string | undefined;
    image: string | undefined;
    eps: string | undefined;
    uploadDate: string | undefined;
    type: string | undefined;
    slug: string | undefined;
  }[];
}

export interface AnimeEpsData {
  thumbnail: string | undefined;
  title: string | undefined;
  japaneseTitle: string | undefined;
  score: string | undefined;
  producer: string | undefined;
  type: string | undefined;
  status: string | undefined;
  totalEps: string | undefined;
  duration: string | undefined;
  releaseDate: string | undefined;
  studio: string | undefined;
  genre: string | undefined;
  synopsis: string | undefined;
  eps: {
    epsTitle: string | undefined;
    epsSlug: string | undefined;
    epsDate: string | undefined;
  }[];
  recommendedAnime: {
    recommendedImage: string | undefined;
    recommendedSlug: string | undefined;
    recommendedTitle: string | undefined;
  }[];
}
[];

export interface searchInteface {
  title: string | undefined;
  genre: string | undefined;
  status: string | undefined;
  rating: string | undefined;
  thumbnail: string | undefined;
  slug: string | undefined;
}
[];

export interface EpisodeInterfaces {
  title: string | undefined;
  anyEps: {
    title: string | undefined;
    slug: string | undefined;
  }[];
  prevEps: string | undefined;
  allEps: string | undefined;
  nextPrev: string | undefined;
  defaultStream: string | undefined;
  mirrorStream: {
    tigaEnam: {
      mega: string | undefined;
      odstream: string | undefined;
    };
    empatLapan: {
      mega: string | undefined;
      odstream: string | undefined;
    };
    tujuhDua: {
      mega: string | undefined;
      odstream: string | undefined;
    };
  };
  info: {
    thumbnail: string | undefined;
    credit: string | undefined;
    encoder: string | undefined;
    genres: string | undefined;
    duration: string | undefined;
    type: string | undefined;
  };
}
[];
