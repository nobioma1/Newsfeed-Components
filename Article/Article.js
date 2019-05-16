// Because classes are not hoisted you will need to start your code at the bottom of the page.  Look for the comment "START HERE"

class Article {
  constructor(domElement) {
    // assign this.domElement to the passed in domElement
    this.domElement = domElement;
    // create a reference to the ".expandButton" class.
    this.expandButton = this.domElement.querySelector('.expandButton');
    // Using your expandButton reference, update the text on your expandButton to say "expand"
    this.expandButton.textContent = 'Expand';
    // Set a click handler on the expandButton reference, calling the expandArticle method.
    this.expandButton.addEventListener('click', this.expandArticle.bind(this));
    // create readButton
    this.readButton();
  }

  expandArticle() {
    // Using our reference to the domElement, toggle a class to expand or hide the article.
    let toggleStatus = this.domElement.classList.toggle('article-open');
    this.toggleButtonText(toggleStatus);
  }

  toggleButtonText(isOpen) {
    if (isOpen) {
      this.expandButton.textContent = 'Close';
    } else {
      this.expandButton.textContent = 'Expand';
    }
  }

  readButton() {
    // Create READ Button
    const heading = this.domElement.querySelector('h2');
    const readBtn = document.createElement('button');
    readBtn.textContent = 'read';
    readBtn.setAttribute('class', 'readButton');
    readBtn.addEventListener('click', () => this.read());
    heading.insertAdjacentElement('beforebegin', readBtn);
  }

  read() {
    this.domElement.classList.add('remove');
    TweenMax.to('.remove', 1.5, {
      left: -1000,
      display: 'none',
      ease: Bounce.easeOut
    });
  }
}

/* START HERE: 

- Select all classes named ".article" and assign that value to the articles variable.  

- With your selection in place, now chain .forEach() on to the articles variable to iterate over the articles NodeList and create a new instance of Article by passing in each article as a parameter to the Article class.

*/

let articles = document.querySelectorAll('.articles .article');
articles.forEach(article => new Article(article));

class UserInput {
  constructor() {
    this.section = document.querySelector('.articles');
    this.inputSection = document.querySelector('.text-input');
    this.titleSection = this.inputSection.querySelector('#article-title');
    this.articleSection = this.inputSection.querySelector('#article');
    this.createArticle();
  }

  createArticle() {
    let newTitle = this.titleSection.value;
    let newArticleBody = this.articleSection.value;
    const article = document.createElement('article');
    article.setAttribute('class', 'article');
    const h2 = document.createElement('h2');
    const date = document.createElement('p');
    date.setAttribute('class', 'date');
    const pTag = document.createElement('p');
    const span = document.createElement('span');
    span.setAttribute('class', 'expandButton');

    if (newTitle.length > 0 && newArticleBody.length > 0) {
      let newDate = Date().split(' ');
      h2.textContent = newTitle;
      pTag.textContent = newArticleBody;
      date.textContent = `${newDate[1]} ${newDate[2]}, ${newDate[3]}`;
      article.appendChild(h2);
      article.appendChild(date);
      article.appendChild(pTag);
      article.appendChild(span);

      this.addArticle(article);
    } else {
      this.titleSection.placeholder = '...title cannot be empty';
      this.articleSection.placeholder = '...article body cannot be empty';
    }
  }

  addArticle(article) {
    this.section.insertAdjacentElement('afterbegin', article);
    new Article(article);
    this.titleSection.value = '';
    this.articleSection.value = '';
  }
}

const addArticleButton = document
  .querySelector('#add-articleBtn')
  .addEventListener('click', () => new UserInput());


const viewInputSectionBtn = document.querySelector('#open-inputBtn')
const updateButton = () => {
  if (viewInputSectionBtn.textContent === 'Add New Article') {
    viewInputSectionBtn.textContent = 'Close'
  } else {
    TweenMax.to('.text-input', 0, { display: 'none' });
    viewInputSectionBtn.textContent = 'Add New Article'
  }
}

viewInputSectionBtn.addEventListener('click', () => {
    TweenMax.to('.text-input', 0, { display: 'flex', onComplete: () => updateButton() })
  });
