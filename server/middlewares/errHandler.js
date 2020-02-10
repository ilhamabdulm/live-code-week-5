module.exports = (err, req, res, next) => {
    let errCode = null
    let errors = []
    
    if (err.code) {
        errCode = err.code
        errors.push(err.msg)
    } else if (err.errors) {
        if(err.errors.name == 'SequelizeValidationError') {
            errCode = 400
            err.errors.forEach(el => {
                errors.push(el.message)
            })
        } else if (err.errors.name == 'JsonWebTokenError') {
            errCode = 401
            errors.push('Token Error')
        }
    } else {
        errCode = 500
        errors.push('Server error')
    }

    res.status(errCode).json(errors)
}