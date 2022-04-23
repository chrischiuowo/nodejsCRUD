const error = require('./error')

const resHandle = function(res, status, info) {
  res.writeHead(status, {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
    'Content-Type': 'application/json'
  })
  if(info) res.write(info)
  res.end()
}

const successHandle = function(res, info) {
  resHandle(res, 200, JSON.stringify({
    status: 'success',
    data: info
  }))
}

const errorHandle = function(res, info=error.DEFAULT, status=400) {
  resHandle(res, status, JSON.stringify({
    status: 'false',
    message: info
  }))
}

module.exports = { errorHandle, successHandle }

