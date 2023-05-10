const searchBtn = document.getElementById('search-btn')
const searchBox = document.getElementById('search-box')
let movies = []
let id=0
let watchlistmovies = []
const movieContainer = document.querySelector('.movie-container')

async function search(){
    movieContainer.innerHTML=''
    let res1 = await fetch(`http://www.omdbapi.com/?s=${searchBox.value}&apikey=8e3d7e6`)
    let data1 = await res1.json()
    .then(async data1 => {
        data1.Search.forEach(async function(moviearr,index){
            let res2 = await fetch(`http://www.omdbapi.com/?i=${moviearr.imdbID}&apikey=8e3d7e6`)
            let data2 = await res2.json()
            collectmoviesobj(data2,index)
        })
    })
    }

function collectmoviesobj(movie,index){
    const {Poster,Title, Runtime, Genre, Plot , Ratings} = movie
    class movieobj {
        constructor(){
            this.title = Title
            this.runtime = Runtime
            this.genre = Genre
            this.plot = Plot
            this.poster = Poster
            this.ratings = Ratings
            this.id = index
        }
    }
    createHtml(movie)
    movies.push(new movieobj)
    id++
}

function addmovietowatchlist(){
    document.querySelectorAll('.fa-circle-plus').forEach(function(btn){       
        btn.addEventListener('click',function(e){
            let uni = e.target.parentNode.id
            console.log(uni)
            movies.forEach(function(movie){0
                if(uni*1 === movie.id*1){
                    console.log(movie)
                    watchlistmovies.push(movie)
                    localStorage.setItem('watchlistmovies',JSON.stringify(watchlistmovies))
                }
            })
        })
    })}

function createHtml(movie){
    const {Poster,Title, Runtime, Genre, Plot , Ratings} = movie
    let html=''
    html=`
    <div class="movie-list">
        <img src=${Poster} alt="" class="movie-img">
        <div class="movie-info">
            <div class="movie-name">
                <p class="name">${Title}</p>
                <div class="movie-rating">
                    <i class="fa-solid fa-star" id="star"></i>
                    <p class="star">${Ratings[0].Value}</p>
                </div>
            </div>
            <div class="movie-type">
                <p class="length">${Runtime}</p>
                <p class="type">${Genre}</p>
                <div class="add-remove-watchlist" id="${id}">
                    <i class="fa-solid fa-circle-plus" id="add"></i>
                    <p class="text">Watchlist</p>
                </div>
            </div>
            <p class="movie-descrpt">${Plot}</p>
        </div>
    </div>
    `
    
movieContainer.innerHTML += html 
addmovietowatchlist()
}

async function rendermovies(){
    if(searchBox.value){
        id = 0
        movies = []
        search()
    } else{
        movieContainer.innerHTML = `<p class="before-text">Unable to find what you're looking for . Please try another search</p>`
    }
}

function render(){
    searchBtn.addEventListener('click',rendermovies)
    document.addEventListener('keydown',(e) => {
        switch(e.key){
            case'Enter':
                rendermovies()
                break
        }
    })
}

render()
