
const getQueryParams = (body) => {

    let params = '';
    let selector = '';

    for (const key in body) {

      switch (key) {

        case 'title':
          selector = 'intitle:';
          break;

        case 'authors':
          selector = 'inauthor:';
          break;

        case 'isbn_10' || 'isbn_13':
          selector = 'isbn:';
          break;

        case 'categories':
          selector = 'subject:';
          break;

        case 'publisher':
          selector = 'inpublisher:';
          break;

        default:
          selector = '';
          break;
      }

      if(!selector) continue;

      params = params + '+' + selector + body[key];

    }
    return params = params + `&startIndex=${body.offset}&langRestrict=${body.lang}`;
  }

module.exports = {
    getQueryParams
};