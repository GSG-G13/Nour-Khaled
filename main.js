const apiKey = "b9da8a8928ade30c5680978edd9a4330";
const api = "https://api.themoviedb.org/3/movie/";

const getData = (url, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const dataObj = JSON.parse(xhr.responseText);
      const results = dataObj.results;
      cb(results);
    }
  };

  xhr.open("GET", url, true);
  xhr.send();
};



const renderCards = (arr)=>{
    list.innerHTML = '';
    arr.forEach((element)=>{
        const card = document.createElement("div");
      card.classList.add("card-full");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;

      const rating = document.createElement("div");
      rating.classList.add("card-rating", "fa-solid", "fa-star");
      rating.textContent = element.vote_average;

      const imgDesc = document.createElement("div");
      imgDesc.classList.add("img-discription");
      imgDesc.innerHTML = `<div class="group-icons">
        <i class="fa-solid fa-angle-down"></i>
        <div class="lpt">
          <i class="fa-regular fa-thumbs-up"></i>
          <i class="fa-solid fa-plus"></i>
          <i class="fa-solid fa-circle-play"></i>
        </div>
      </div>`;

      const desc = document.createElement("div");
      desc.classList.add("main-discription");

      const title = document.createElement("h4");
      title.classList.add("title");
      title.textContent = element.title;

      const year = document.createElement("div");
      year.classList.add("year");
      year.textContent = new Date(element.release_date).getFullYear();

      const discription = document.createElement("div");
      discription.classList.add("discription");
      discription.textContent = element.overview;

      desc.appendChild(title);
      desc.appendChild(year);
      imgDesc.appendChild(desc);
      imgDesc.appendChild(discription);

      card.appendChild(img);
      card.appendChild(rating);
      card.appendChild(imgDesc);

      list.appendChild(card);
    })
}

window.onload = getData(api + `now_playing?api_key=${apiKey}`, (result) => {
    renderCards(result)
})

const filterList = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

const list = document.querySelector("main");

let filter = document.querySelector('.filter')

const createFilter = (str)=> {
    return document.createElement('div');
}

filterList.forEach((element)=> {
    let filterElement = createFilter(element);
    filterElement.id = element.toLowerCase().replace(' ','_');
    filterElement.textContent = element
    filter.appendChild(filterElement);

    filterElement.addEventListener('click', (e)=>{
        getData(api + `${e.target.id}?api_key=${apiKey}`, (result)=>{
            renderCards(result)
        })
    })
});

let search = document.querySelector('.search')

search.addEventListener('keyup', (e)=>{
    if(!e.target.value){
        getData(api + `now_playing?api_key=${apiKey}`, (result) => {
            renderCards(result)
        })
    }
    else {
        getData(api.replace('movie/', 'search') + `/movie?api_key=${apiKey}&query=${e.target.value}`,(result)=>{
            console.log(result)
            renderCards(result)
            
        })
    }
})


