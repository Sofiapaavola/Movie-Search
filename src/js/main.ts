
let movieName = "war"; 
let url = `https://www.omdbapi.com/?s=${movieName}&apikey=b8f7779`; 

// const initialPage = () => { 

// }

const imageSource = (movieUrl) => { 
    return `<img src="${movieUrl}"></img>`
}  

const movieText = (title, year) => { 
    return `<li><p>${title}</p> <p>${year}</p></li> `
}

const dropdownContent = (movies, year) => { 
    let li = document.createElement("li"); 
    li.innerHTML = year;
    li.addEventListener("click", (event) => { 
        filterMovies(movies, year)
    })
    return li;
}

interface IMovies {
    Title: string,
    Year: number,
    Poster: string,
   }
   interface IMoviesResponse {
    Search: IMovies[],
}

const searchEvent = document.getElementById("search-bar");
searchEvent.addEventListener("keyup", (event) => {
   if (event.keyCode === 13) {
       const filmToSearch =  (<HTMLInputElement>document.getElementById("search-bar")).value;
       const filmUrl = `https://www.omdbapi.com/?s=${filmToSearch}&apikey=94d4e1cf`;
       movieInfo(filmUrl);
   }
})


const buildList = (movies: IMovies[]) => { 
    const ul = document.getElementsByClassName("content")[0];
    ul.innerHTML = "";
    movies.forEach((movie) => { 
        let li = document.createElement("li"); 
        li.innerHTML = imageSource(movie.Poster) + movieText(movie.Title, movie.Year);
        ul.append(li);
    })
    buildDropdownList(movies);
}

const filterMovies = (movies: IMovies[], year: number) => {
    let filteredMovies = movies.filter(movie => Number(movie.Year) === Number(year));
    buildList(filteredMovies);
}

const giveMeTheYears = (movies: IMovies[]) => {
    let listOfYears = [];
    movies.forEach((movie) => {
        let movieYears = movie.Year;
        listOfYears.push(movieYears); 
    })
    return listOfYears; 

}

const buildDropdownList = (movies) => { 
    const dropDown = document.getElementById("myDropdown"); 
    dropDown.innerHTML = "";
    let yearList = giveMeTheYears(movies);
    yearList.forEach((year) => { 
        const li = dropdownContent(movies, year);
        dropDown.append(li);
    })
}



$("#filterTag").click(function(){
    $("#myDropdown").toggle();
});

const movieInfo = (url: string) => {  
    fetch(url)
    .then((response) => response.json())
    .then((data: IMoviesResponse) => buildList(data.Search))
    .catch((error) => {
        throw new Error(error);
    }); 
}

