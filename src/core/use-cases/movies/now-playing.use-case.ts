import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { NowplayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mappers";
import type { Movie } from "../../entities/movie.entity";

export const moviesNowPlayingUseCase = async (
  fetcher: HttpAdapter
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<NowplayingResponse>("/now_playing");

    return nowPlaying.results.map((result) =>
      MovieMapper.fromMovieDBResultToEntity(result)
    );
  } catch (error) {
    throw new Error("Error fetching movies - NowPlaying");
  }
};
