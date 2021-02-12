// MENU ATIVO
const currentPage = location.pathname
const menuItem = document.querySelectorAll('header .links a')

for(item of menuItem) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

// CONFIRMAÇÂO DO BOTÂO EXCLUIR
const formDelete = document.querySelector('#form-delete');

formDelete.addEventListener('submit', function(event) {
  const confirmation = confirm('Deseja Realmente Excluir?');

  if(!confirmation) {
    event.preventDefault();
  };
});