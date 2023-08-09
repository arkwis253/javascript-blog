'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorSidebarLink: Handlebars.compile(document.querySelector('#template-author-sidebar-link').innerHTML),
};

// settings
const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
  titleSelector: '.post-title'
};

const select = {
  all: {
    articles: '.post',
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
    post_title: '.post-title',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.list.authors',
  },
};

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

// titles
function generateTitleLinks(customSelector = ''){
  console.log('custom!!!!! = ' + customSelector);
  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(select.all.articles + customSelector);
  let html = '';
  for(let article of articles){
    const articleId = article.getAttribute('id');
    console.log(articleId);
    const articleTitle = article.querySelector(select.article.post_title).innerHTML;
    console.log(articleTitle);
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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
function calculateTagsParams(tags){
  let tagsParams = {min: 999999, max: 0};
  for(let tag in tags){
    tagsParams.max = Math.max(tags[tag], tagsParams.max);
    tagsParams.min = Math.min(tags[tag], tagsParams.min);
  }
  return tagsParams;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const tagClassNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
  return opts.tagSizes.classPrefix + tagClassNumber;
}

function generateTags(){
  //create a new variable with an empty object
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(select.all.articles);
  console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(select.article.tags);
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
      //const linkHTML = '<li><a href="#tag-' + articleTag + '">' + articleTag + '</a></li>';
      const linkHTMLData = {id: articleTag, title: articleTag};
      const linkHTML = templates.articleTag(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      //check if this link is not already in allTags
      if(!allTags.hasOwnProperty(articleTag)){
        //add generated code to allTags array
        allTags[articleTag] = 1;
      } else {
        allTags[articleTag]++;
      }
    /* END LOOP: for each tag */
    }
    tagsWrapper.innerHTML = html;
  }
  //find list of tags in right column
  const tagList = document.querySelector(select.listOf.tags);
  console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams: ');
  console.log(tagsParams);
  //add html from allTags to tagList
  //let allTagsHTML = '';
  const allTagsData = {tags: []};
  for(let tag in allTags){
    //allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">'+ tag  + '</a></li> ';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    //allTagsHTML += '<li><a href="#tag-' + tag + '">'+ tag + ' (' + allTags[tag]   + ')</a></li> ';
  }
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  addClickListenersToTags();
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
  const tagLinks = document.querySelectorAll(select.article.tags + ' a');
  const tagLinksSidebar = document.querySelectorAll('.sidebar .tags a');
  for(let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
  for(let tagLink of tagLinksSidebar) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

// authors
function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll(select.all.articles);
  console.log(articles);
  for(let article of articles){
    const authorWrapper = article.querySelector(select.article.author);
    console.log(authorWrapper);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    //const linkHTML = '<a href="' + articleAuthor + '">' + articleAuthor + ' </a>';
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.articleAuthor(linkHTMLData);
    html = html + linkHTML;
    authorWrapper.innerHTML = html;

    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    }else {
      allAuthors[articleAuthor]++;
    }
  }
  console.log('allAuthors');
  console.log(allAuthors);
  const authorsList = document.querySelector(select.listOf.authors);
  //let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};
  for(let author in allAuthors) {
    //allAuthorsHTML += '<li><a href="' + author + '"><span class="author-name">' + author  + ' (' + allAuthors[author]  + ')' + '</span></a></li> ';
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }
  authorsList.innerHTML = templates.authorSidebarLink(allAuthorsData);
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const href = this.getAttribute('href');
  console.log('href22222: ' + href);
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('!!!!!' + authorLinks);
  const activeAuthors = document.querySelectorAll('a.active[href]');
  for(let activeAuthorLink of activeAuthors) {
    activeAuthorLink.classList.remove('active');
  }
  for(let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author^="' + href + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll(select.article.author + ' a');
  const authorLinksSidebar = document.querySelectorAll('.sidebar .authors a');
  for(let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
  for(let authorLink of authorLinksSidebar) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
