const watchList = document.querySelector('.watchlist-movie')
let obj = JSON.parse(localStorage.getItem('watchlistmovies'))

console.log(obj)

function renderwathclistmovie(){
    if(obj.length){
        watchList.innerHTML=''
        obj.forEach(function(movie,index){
            movie.id = index
            const {poster,title, runtime, genre, plot , ratings} = movie
            let html=''
            html=`
            <div class="movie-list">
                <img src=${poster} alt="" class="movie-img">
                <div class="movie-info">
                    <div class="movie-name">
                        <p class="name">${title}</p>
                        <div class="movie-rating">
                            <i class="fa-solid fa-star" id="star"></i>
                            <p class="star">${ratings[0].Value}</p>
                        </div>
                    </div>
                    <div class="movie-type">
                        <p class="length">${runtime}</p>
                        <p class="type">${genre}</p>
                        <div class="add-remove-watchlist" id="${index}">
                            <i class="fa-solid fa-circle-minus" id="add"></i>
                            <p class="text">Watchlist</p>
                        </div>
                    </div>
                    <p class="movie-descrpt">${plot}</p>
                </div>
            </div>
            `
            
        watchList.innerHTML += html 
        removefrommultiplewatchlist()
    }
        )}
        else{
            watchList.innerHTML = `
            <a href="./index.html" class="before-text empty-add-movies-btn"><i class="fa-solid fa-circle-plus" id="add-movies"></i>Let's add some Movies</a>
            <p class="before-text adjust">Your Watchlist is Looking Empty</p>
            `
        }
}

function removefrommultiplewatchlist(){
    document.querySelectorAll('.fa-circle-minus').forEach(function(btn){
        btn.addEventListener('click',(e)=>{
            obj=obj.filter((item) => item.id*1 !== e.target.parentNode.id*1)
            localStorage.setItem('watchlistmovies',JSON.stringify(obj))
            renderwathclistmovie()
        })
    })
}

function filterwatchlist(moviearr){
    return moviearr.filter((item)=> item.watchList.atwatchlist ? item : '')
}


renderwathclistmovie()
// removefrommultiplewatchlist()

