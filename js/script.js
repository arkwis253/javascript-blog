'use strict';

//displaying the relevant article
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  // remove class 'active' from all article links 
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  // add class 'active' to the clicked link 
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  // remove class 'active' from all articles
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  // get 'href' attribute from the clicked link 
  const articleSelector = clickedElement.getAttribute('href');
  // find the correct article using the selector (value of 'href' attribute)
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  // add class 'active' to the correct article
  targetArticle.classList.add('active'); 
}

//generate sidebar links
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
  //remove links from sidebar
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(let article of articles){
    const articleId = article.getAttribute('id');
    console.log(articleId);
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
    console.log(HTMLDListElement);
  }
  titleList.innerHTML = html;
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}