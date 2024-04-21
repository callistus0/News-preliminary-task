const apiKey = "c4ff96feb83248818fd4af460749f7f6";
let apiUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey;
const news = document.querySelector(".news");

function searchNews() {
  const searchQuery = document.getElementById("searchInput").value.trim();
  if (searchQuery) {
    apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;
    fetchNews(apiUrl);
  } else {
    alert("Please enter a search query.");
  }
}

function truncateText(text, maxLength) {
  const words = text.split(" ");
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(" ") + "...";
  }
  return text;
}

function fetchNews(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      return response.json();
    })
    .then((data) => {
      news.innerHTML = "";
      const articles = data.articles;

      articles.forEach((article) => {
        const newsBlock = document.createElement("a");
        newsBlock.setAttribute("class", "news-block");
        newsBlock.setAttribute("href", article.url);

        const newsImageBlock = document.createElement("div");
        newsImageBlock.setAttribute("class", "news-img-block");

        const newsImage = document.createElement("img");
        newsImage.setAttribute("class", "news-image");
        newsImage.src = article.urlToImage
          ? article.urlToImage
          : "https://via.placeholder.com/150";
        newsImage.alt = article.title;

        const headline = document.createElement("h2");
        headline.textContent = truncateText(article.title, 15);

        const newsDesc = document.createElement("p");
        newsDesc.textContent = truncateText(
          article.description ? article.description : "No description available",
          20
        );

        const readMore = document.createElement("a");
        readMore.setAttribute("class", "readmore");
        readMore.textContent = "Read More";
        readMore.setAttribute("href", article.url);

        newsImageBlock.appendChild(newsImage);
        newsBlock.appendChild(newsImageBlock);
        newsBlock.appendChild(headline);
        newsBlock.appendChild(newsDesc);
        newsBlock.appendChild(readMore);

        news.appendChild(newsBlock);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}


fetchNews(apiUrl);

const searchForm = document.getElementById("search-form");
const homeBtn = document.getElementById("homeBtn");
const politicsBtn = document.getElementById("politicsBtn");
const businessBtn = document.getElementById("businessBtn");
const entertainBtn = document.getElementById("entertainBtn");
const sportsBtn = document.getElementById("sportsBtn");


searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); 
  searchNews(); 
});


homeBtn.addEventListener("click", () => {
  fetchNewsByCategory("general");
});

politicsBtn.addEventListener("click", () => {
  fetchNewsByCategory("politics");
});

businessBtn.addEventListener("click", () => {
  fetchNewsByCategory("business");
});

entertainBtn.addEventListener("click", () => {
  fetchNewsByCategory("entertainment");
});

sportsBtn.addEventListener("click", () => {
  fetchNewsByCategory("sports");
});


function fetchNewsByCategory(category) {
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  fetchNews(apiUrl);
}
