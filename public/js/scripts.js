// MENU ATIVO
const currentPage = location.pathname
const menuItem = document.querySelectorAll('header .links a')

for(item of menuItem) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

// CONFIRMAÇÂO DO BOTÂO EXCLUIR
var formDelete = document.querySelector('#form-delete');

if(formDelete) {
  formDelete.addEventListener('submit', function(event) {
    const confirmation = confirm('Deseja Realmente Excluir?');
  
    if(!confirmation) {
      event.preventDefault();
    };
  });
}

// PAGINAÇÃO
function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage;

  for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pageAfterSelectedPage = currentPage <= selectedPage + 2;
    const pageBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (firstAndLastPage || (pageBeforeSelectedPage && pageAfterSelectedPage)) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);

      oldPage = currentPage;
    }
  }
  return pages;
}

function createPagination(pagination) {
  var page = +pagination.dataset.page;
  var total = +pagination.dataset.total;
  var filter = pagination.dataset.filter;
  var pages = paginate(page, total);

  let elements = "";

  for (let page of pages) {
    if (String(page).includes("...")) {
      elements += `<span>${page}</span>`;
    } else {
      if (filter) {
        elements += `<a href='?page=${page}&filter=${filter}'>${page}</a>`;
      } else {
        elements += `<a href='?page=${page}'>${page}</a>`;
      }
    }
  }

  pagination.innerHTML = elements;
}

const pagination = document.querySelector(".pagination");

if (pagination) {
  createPagination(pagination)
}