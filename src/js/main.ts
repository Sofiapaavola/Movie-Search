
let movieName = "war"; 
let url = `http://www.omdbapi.com/?s=${movieName}&apikey=b8f7779`; 

const imageSource = (movieUrl) => { 
    return `<img src="${movieUrl}"></img>`
}  

const movieText = (title, year) => { 
    return `<li><p>"${title}"</p> <p>"${year}"</p></li> `
}

const dropdownContent = (year) => { 
    return `<li>"${year}</li>`
}

export interface IMovies {
    Title: string,
    Year: number,
    Poster: string,
   }
   export interface IMoviesResponse {
    Search: IMovies[],
}

const searchEvent = document.getElementById("search-bar");
searchEvent.addEventListener("keyup", (event) => {
   if (event.keyCode === 13) {
       const filmToSearch =  (<HTMLInputElement>document.getElementById("search-bar")).value;
       const filmUrl = `http://www.omdbapi.com/?s=${filmToSearch}&apikey=94d4e1cf`;
       movieInfo(filmUrl);
   }
})

const buildList = (data: IMoviesResponse) => { 
    const ul = document.getElementsByClassName("content")[0];
    ul.innerHTML = "";
    data["Search"].forEach((movie) => { 
        let li = document.createElement("li"); 
        li.innerHTML = imageSource(movie.Poster) + movieText(movie.Title, movie.Year);
        ul.append(li);
    })
}

export const filterMovies = (movies: IMovies[], year: number): IMovies[] => {
    let filteredMovies = movies.filter(movie  => Number(movie.Year) === Number(year))
    return filteredMovies;
 }

//  const filterDropdown = document.getElementById("filterTag"); 
// filterDropdown.addEventListener("click", (event) => { 
//     const ul = document.getElementsByClassName("filterContent")[1];
   
//         movieInfo(filmUrl);
// })

$("#filterTag").click(function(){
    $("#myDropdown").toggle();
});

const movieInfo = (url: string) => {  
    fetch(url)
    .then((response) => response.json())
    .then((data) => buildList(data))
    .catch((error) => {
        throw new Error(error);
    }); 
}

