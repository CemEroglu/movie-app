const generateEndpoint = (searchParameters: string)=>{
    //Usually the api keys shouldn't be located in files, but since it's a dummy api key it is okay for now.
    return 'https://www.omdbapi.com/?' + searchParameters + '&apikey=50084941';
}

export const getMovies = async(searchParameters: string)=>{
    let url = 'https://www.omdbapi.com/?s=game&apikey=50084941'
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    const searchResults = data.Search;
    return (searchResults);
}