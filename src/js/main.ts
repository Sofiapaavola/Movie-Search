

const url = `http://www.omdbapi.com/?s=${movieName}&apikey=b8f7779`; 
let movieName = "war"; 

const imageSource = (movieUrl) => { 
    return `<img src="${movieUrl}"></img>`
}  

const movieText = (title, year) => { 
    return `<li><p>"${title}"</p> <p>"${year}"</p></li> `
}

export interface IMovies {
    Title: string,
    Year: number,
    Poster: string,
   }
   export interface IMoviesResponse {
    Search: IMovies[],
}


const searchMovies = () => { 
    const userInput = document.getElementById("search-bar") as HTMLInputElement;
    movieName = userInput.value; 
    buildList(); 
     
}

const buildList = (data: IMoviesResponse) => { 
    const ul = document.getElementsByClassName("content")[0];
    data["Search"].forEach((movie) => { 
        let li = document.createElement("li"); 
        li.innerHTML = imageSource(movie.Poster) + movieText(movie.Title, movie.Year);
        ul.append(li);
    })
}

const movieInfo = (url: string) => {  
    fetch(url)
    .then((response) => response.json())
    .then((data) => buildList(data))
    .catch((error) => {
        throw new Error(error);
    }); 
}

