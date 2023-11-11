const API_KEY = "486d5756c8b144c9b14fe3c63419e0d8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Tech"));

// for website logo when its click reload the page.
function reload(){
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cardsContainer");
  const newsCardTemplate = document.getElementById("templateNewsCard");

  cardsContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return; // If the news does not contain image then don't show;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#newsImg");
  const newsTitle = cardClone.querySelector("#newsTitle");
  const newsSource = cardClone.querySelector("#newsSource");
  const newsDesc = cardClone.querySelector("#newsDesc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  // writing date also in human readable format

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} ⚡ ${date}`;

  //when news card click go to this function

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
// Onclick for nav links
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active"); // if new nav item is clicked then remove the 'active' from the selected one.
  curSelectedNav = navItem;
  curSelectedNa.classList.add("active");
}
const searchButton = document.getElementById("searchBtn");
const searchText = document.getElementById("searchBox");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return; // if user only click the Button without input any search query then do nothing.
  fetchNews(query);
  // if search is active then remove 'active' from nav link.
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
