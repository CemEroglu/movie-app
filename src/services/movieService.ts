export const getMovies = async (searchParameters: string, page: number) => {
  let url = `https://www.omdbapi.com/?${searchParameters}&page=${page}&apikey=50084941`;

  try {
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();

      if (data.Response === "False") {
          throw new Error(data.Error || "Failed to fetch data.");
      }

      const searchResults = data.Search;
      const totalResults = parseInt(data.totalResults, 10);
      const numberOfPages = Math.ceil(totalResults / 10);

      // Fetch detailed information for each movie/series
      const detailedResults = await Promise.all(searchResults.map(async (item: any) => {
          const detailUrl = `https://www.omdbapi.com/?i=${item.imdbID}&apikey=50084941`;
          const detailResponse = await fetch(detailUrl, { method: 'GET' });
          const detailData = await detailResponse.json();

          return {
              title: item.Title,
              year: item.Year,
              imdbID: item.imdbID,
              type: item.Type,
              plot: detailData.Plot,
              released: detailData.Released,
              genre: detailData.Genre,
              director: detailData.Director,
              actors: detailData.Actors,
              imdbRating: detailData.imdbRating,
              awards: detailData.Awards,
              runtime: detailData.Runtime,
              ratings: detailData.Ratings,
              poster: detailData.Poster,
          };
      }));

      return { detailedResults, numberOfPages };
  } catch (error: any) {
      console.error("Error fetching movies:", error.message);
      return { error: error.message, detailedResults: [], numberOfPages: 0 };
  }
};
