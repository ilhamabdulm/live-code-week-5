const { Comic } = require('../models')

class ComicController {
  static getAll(req, res, next) {
    Comic.findAll()
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static editData(req, res, next) {
    const id = req.params.id
    const data = {
      title: req.body.title,
      author: req.body.author,
      imageUrl: req.body.imageUrl
    }
    console.log(data, id)
    let comic = null
    Comic.findOne({ where: { id: id } })
      .then(result => {
        comic = result
        return Comic.update(data, { where: { id: id } })
      })
      .then(response => {
        res.status(200).json({
          comic: comic,
          msg: 'success update comic'
        })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = ComicController
