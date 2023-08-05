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

// selectors
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

// titles
function generateTitleLinks(customSelector = ''){
  console.log('custom!!!!! = ' + customSelector);
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
  addClickListenerToLinks();
}
generateTitleLinks();

function addClickListenerToLinks(){
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

// tags
console.log('generateTags function!!!!!!!!!');
function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let articleTag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + articleTag + '">' + articleTag + ' </a> </li>';
      /* add generated code to html variable */
      html = html + linkHTML;
    /* END LOOP: for each tag */
    }
    tagsWrapper.innerHTML = html;
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  console.log('href: ' + href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('!!!!!' + tagLinks);
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('.list-horizontal a');
  for(let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

// authors
function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    const linkHTML = '<a href="' + articleAuthor + '">' + articleAuthor + ' </a>';
    html = html + linkHTML;
    authorWrapper.innerHTML = html;
  }
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const href = this.getAttribute('href');
  console.log('href: ' + href);
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('!!!!!' + authorLinks);
  for(let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');
  for(let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
