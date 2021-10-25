const api_key = `&lang=en&token=a6eb36a186969ed8b33a82f908bdb58e`;

const headUrl = `https://gnews.io/api/v4/search?q=`;

const headlinesUrl = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=a6eb36a186969ed8b33a82f908bdb58e`;

const loader = document.getElementById("loader");

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  mainContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  mainContainer.hidden = false;
  loader.hidden = true;
}

// !!Tab section ////////////////////////////

const tabs = document.querySelectorAll(".tab-btn");
// console.log(tabs);

// !!Search section ////////////////////////////

let searchTerm;
const searchUrl = `https://gnews.io/api/v4/search?q=`;

const mainContainer = document.querySelector(".main-container");
const searchBoxContainer = document.querySelector(".searchbox-container");
const searchNewsContainer = document.querySelector(".search-news-container");
const loaderContainer = document.querySelector(".loader-container");

async function newsApi(url) {
  loading();
  try {
    const response = await fetch(url);
    const data = await response.json();
    const newsList = data.articles;
    insert(newsList);
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

function insert(news) {
  loading();
  news.forEach((element) => {
    console.log(element);
    const newsContainer = document.createElement("div");
    newsContainer.classList.add("newscontainer");

    const datee = element.publishedAt;
    // console.log();

    function slicedDate() {
      const returnDate = datee.slice(0, 10);
      return reformatDate(returnDate);
    }

    function reformatDate(date) {
      dArr = date.split("-");
      const newDate = dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2);
      return newDate;
    }

    newsContainer.innerHTML = `
        <div class="news-box">
          <img class="poster skeleton"  src="${
            element.image
          }" alt="image not found :(">
          <div class='news-info'>
            <a href="${element.url}" class='link' target="_blank">
              <h3 class="news-title" data-tooltip="View Fullstory" >${
                element.title
              }</h3>
            </a>
            <span 
              class="date">${slicedDate()}</span>
            <p class="overview">${element.description}</p>
          </div>
        </div>`;
    mainContainer.appendChild(newsContainer);
    complete();
    loaderContainer.style.display = "none";

    // searchContainer.appendChild(newsContainer);
  });
}

const categoryUrl = "https://gnews.io/api/v4/top-headlines?&topic=";

tabs.forEach((tabbtn) => {
  const tabCategory = tabbtn.dataset.tab;

  tabbtn.addEventListener("click", () => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabbtn.classList.add("active");
    mainContainer.innerHTML = "";

    newsApi(`${categoryUrl}${tabCategory}${api_key}`);
  });
});

newsApi(headlinesUrl);

const searchTab = document.querySelector(".searchInput");

searchTab.addEventListener("keyup", function (event) {
  const string = searchTab.value;

  if (event.keyCode === 13 && searchTab.value !== undefined) {
    console.log(string);
    event.preventDefault();
    // newsApi(searchUrl);
    newsApi(`${searchUrl}${string}${api_key}`);
    mainContainer.innerHTML = "";

    if (searchTab.value == "") {
      window.location.reload();
      console.log("reloaded");
    }
  }
});
