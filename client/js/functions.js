function login(form) {
  axios
    .post(`${BASE_URL}/login`, form)
    .then(result => {
      const data = result.data
      localStorage.setItem('token', data.access_token)
      $('email-login').val('')
      $('password-login').val('')
      changePage()
      fetchComics()
    })
    .catch(err => {
      const errors = err.response.data
      console.log(err.response)
      errors.forEach(el => {
        $('#alert').append(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    ${el}
                </div>
                `)
      })
    })
}

function register(form) {
  axios
    .post(`${BASE_URL}/register`, form)
    .then(result => {
      const data = result.data
      localStorage.setItem('token', data.access_token)
      $('name').val('')
      $('email').val('')
      $('password').val('')
      changePage()
      fetchComics()
    })
    .catch(err => {
      const errors = err.response.data
      console.log(err.response)
      errors.forEach(el => {
        $('#alert').append(`
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  ${el.message}
              </div>
              `)
      })
    })
}

function fetchComics() {
  $('#comic-collections').empty()
  axios
    .get(`${BASE_URL}/comics`)
    .then(results => {
      results.data.forEach(el => {
        $('#comic-collections').append(`
        <div class="col-4 mb-4">
            <div class="card text-center">
            <img
                src='${el.imageUrl}'
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <p class="card-text">Author: ${el.author}</p>
                <button class="btn btn-primary edit-data" data-id="${el.id}" data-title="${el.title}" data-author="${el.author}" data-image="${el.imageUrl}">Edit</button>
            </div>
            </div>
        </div>
        `)
      })
    })
    .catch(err => {
      const errors = err.response.data
      console.log(err)
      errors.forEach(el => {
        $('#alert').append(`
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  ${el.message}
              </div>
              `)
      })
    })
}

function editComic(data, id) {
  axios
    .put(`${BASE_URL}/comics/${id}`, data, {
      headers: { access_token: localStorage.getItem('token') }
    })
    .then(result => {
      $('#title').val('')
      $('#author').val('')
      $('#imageUrl').val('')
      $('#editComic').hide()
      fetchComics()
    })
    .catch(err => {
      const errors = err.response.data
      errors.forEach(el => {
        $('#alert').append(`
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  ${el.message}
              </div>
              `)
      })
    })
}
