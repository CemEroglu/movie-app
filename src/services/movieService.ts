const generateEndpoint = (searchParameters: string)=>{
    //Usually the api keys shouldn't be located in files, but since it's a dummy api key it is okay for now.
    return 'https://www.omdbapi.com/?' + searchParameters + '&apikey=50084941';
}

export const getMovies = async (searchParameters: string) => {
    // let url = `https://www.omdbapi.com/?s=${searchParameters}&apikey=50084941`;
    let url = 'https://www.omdbapi.com/?s=game&apikey=50084941'
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    
    if (data.Response === "True") {
      const searchResults = data.Search;
  
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
  
      return detailedResults;
    } else {
      return [];
    }
  };
  