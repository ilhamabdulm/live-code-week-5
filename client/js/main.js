$(document).ready(function() {
  if (localStorage.getItem('token')) {
    $('#btn-logout').show()
    $('#login-form').hide()
    $('#register-form').hide()
    $('#mainPage').show()
    $('#editComic').hide()
    fetchComics()
  } else {
    $('#login-form').show()
    $('#register-form').hide()
    $('#btn-logout').hide()
    $('#mainPage').hide()
    $('#editComic').hide()
  }

  $(document).on('click', '#register-page', function(e) {
    e.preventDefault()
    $('#login-form').hide()
    $('#register-form').show()
  })

  $(document).on('click', '#btn-logout', function(e) {
    e.preventDefault()
    logout()
  })

  $(document).on('click', '#login-page', function(e) {
    e.preventDefault()
    $('#login-form').show()
    $('#register-form').hide()
  })

  $(document).on('click', '#btn-register', function(e) {
    e.preventDefault()
    const form = {
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val()
    }
    register(form)
  })

  $(document).on('click', '#random-user', function(e) {
    axios.get('https://randomuser.me/api').then(result => {
      let results = result.data.results[0]
      console.log(results)
      let name = results.name.first + ' ' + results.name.last
      let email = results.email
      $('#name').val(name)
      $('#email').val(email)
    })
  })

  $(document).on('click', '#btn-login', function(e) {
    e.preventDefault()
    const form = {
      email: $('#email-login').val(),
      password: $('#password-login').val()
    }
    login(form)
  })

  $(document).on('click', '.edit-data', function(e) {
    e.preventDefault()
    comicId = $(this).data('id')
    const form = {
      title: $(this).data('title'),
      author: $(this).data('author'),
      imageUrl: $(this).data('image')
    }
    $('#title').val(form.title)
    $('#author').val(form.author)
    $('#imageUrl').val(form.imageUrl)
    $('#editComic').show()
  })

  $(document).on('click', '#btn-update', function(e) {
    console.log('masuk tombol edit')
    e.preventDefault()
    const form = {
      title: $('#title').val(),
      author: $('#author').val(),
      imageUrl: $('#imageUrl').val()
    }
    editComic(form, comicId)
  })
})
