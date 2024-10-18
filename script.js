const articlesWrapper = document.getElementsByClassName('articles')[0];
const notificationBox = document.getElementsByClassName('notification-box')[0];

const card = function ({ title, author, summary }) {
  return `<div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text"><span class="badge text-bg-primary">Author: ${author}</span></p>
              <p class="card-text">${summary}</p>
              <a href="#" class="btn btn-primary float-end rounded-5 px-3">See details</a>
            </div>
          </div>`;
};

const notification = function (error) {
  return `<div class="mb-0 notification alert alert-danger rounded text-start">
                <p class="mb-0">${error}</p>
          </div>`;
};

const processArticles = function () {
  const articlesPromise = new Promise(function (resolve, reject) {
    const time = 5000;
    setTimeout(function () {
      if (time < 5000) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './data.json', true);
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          }
        };
        xhr.send();
      } else {
        reject('500: Server internal error');
      }
    }, time);
  });
  return articlesPromise;
};

window.addEventListener('load', function () {
  const articles = processArticles();
  articles
    .then(function (response) {
      return response;
    })
    .then(function (response) {
      let result = '';
      response.forEach(function (article) {
        result += card(article);
      });
      articlesWrapper.innerHTML = result;
    })
    .catch(function (error) {
      notificationBox.innerHTML = notification(error);
    });
});
