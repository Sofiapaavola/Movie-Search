
let movieName = "war"; 
let url = `https://www.omdbapi.com/?s=${movieName}&apikey=b8f7779`; 

const imageSource = (movieUrl) => { 
    return `<img src="${movieUrl}"></img>`
}  

const movieText = (title, year) => { 
    return `<li><p>${title}</p> <p>${year}</p></li> `
}

const dropdownContent = (year) => { 
    // let li = document.createElement("li"); 
    // li.innerHTML = year;
    // console.log(dropdownContent)
     return `<li>${year}</li>`
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

const buildList = (data: IMoviesResponse) => { 
    const ul = document.getElementsByClassName("content")[0];
    ul.innerHTML = "";
    const arrayOfMovies: IMovies[] = data["Search"];
    arrayOfMovies.forEach((movie) => { 
        let li = document.createElement("li"); 
        li.innerHTML = imageSource(movie.Poster) + movieText(movie.Title, movie.Year);
        ul.append(li);
    })
    buildDropdownList(arrayOfMovies);
}

const filterMovies = (movies: IMovies[], year: number): IMovies[] => {
    let filteredMovies = movies.filter(movie => Number(movie.Year) === Number(year))
    return filteredMovies;
}

const giveMeTheYears = (movies: IMovies[]) => {
    let listOfYears = [];
    movies.forEach((movie) => {
        let movieYears = movie.Year;
        listOfYears.push(movieYears); 
    })
    console.log(listOfYears);
    return listOfYears; 

}

const buildDropdownList = (movies) => { 
    const dropDown = document.getElementById("myDropdown"); 
    let yearList = giveMeTheYears(movies);
    yearList.forEach((year) => { 
        dropDown.innerHTML += dropdownContent(year);
    })
}



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

