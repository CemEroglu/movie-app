export const getMovies = async (searchParameters: string, page:number) => {
    // let url = `https://www.omdbapi.com/?s=${searchParameters}&apikey=50084941`;
    // let url = 'https://www.omdbapi.com/?s=game&apikey=50084941'
    // https://www.omdbapi.com/?s=game&y=2019&page=1&apikey=50084941
    let url = `https://www.omdbapi.com/?${searchParameters}&page=${page}&apikey=50084941`
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log(data)
    if (data.Response === "True") {
      const searchResults = data.Search;
      const totalResults = parseInt(data.totalResults, 10);
      const numberOfPages = Math.ceil(totalResults/10)
  
      // Fetch detailed information for each movie/series
      const detailedResults = await Promise.all(searchResults.map(async (item:any) => {
        const detailUrl = `http://www.omdbapi.com/?i=${item.imdbID}&apikey=50084941`;
        const detailResponse = await fetch(detailUrl, { method: 'GET' });
        const detailData = await detailResponse.json();
  
        // Return the combined result with both basic and detailed data
        return {
          title:item.Title,
          year:item.Year,
          imdbID:item.imdbID,
          type:item.Type,
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
  
      return {detailedResults, numberOfPages };
    } else {
      return { detailedResults: [], numberOfPages: 0 };
    }
  };
  