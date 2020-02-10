const BASE_URL = 'http://localhost:3000'
const comic = []
let comicId = null

function changePage() {
  $('#login-form').hide()
  $('#register-form').hide()
  $('#mainPage').show()
  $('#editComic').hide()
  $('#btn-logout').show()
}

function logout() {
  localStorage.removeItem('token')
  $('#login-form').show()
  $('#register-form').hide()
  $('#btn-logout').hide()
  $('#mainPage').hide()
  $('#editComic').hide()
}
