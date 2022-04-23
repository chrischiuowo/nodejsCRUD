const http = require('http')
const { successHandle, errorHandle } = require('./utils/res')
const error = require('./utils/error')
const { getDB, postDB, patchOneDB, deleteOneDB, deleteAllDB } = require('./controllers/controller')
const mongoose = require('mongoose')
const Post = require('./models/Post')
const dotenv = require('dotenv')

dotenv.config({path: "./config.env"})

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB)
  .then(() => {
    console.log('資料庫連線成功')
  }).catch(() => {
    console.log('資料庫連線失敗')
  })

const serverEvent = async (req, res) => {
  const { url, method } = req

  let body = ''
  req.on('data', (chunk) => (body += chunk))
  await new Promise(resolve => {
    req.on('end', resolve())
  })

  if(url == '/posts' && method == 'GET') 
    await getDB(Post, res)
  else if(url == '/posts' && method == 'POST')
    postDB(Post, res, body)
  else if(url.startsWith('/posts/') && method == 'PATCH') 
    patchOneDB(Post, res, body, url.split('/').pop())
  else if(url.startsWith('/posts/') && method == 'DELETE') 
    deleteOneDB(Post, res, url.split('/').pop())
  else if(url == '/posts' && method == 'DELETE')
    deleteAllDB(Post, res)
  else if(method == 'OPTION') 
    successHandle(res)
  else
    errorHandle(res, error.NOT_FOUND, 404)
}

const server = http.createServer(serverEvent)
server.listen(process.env.PORT)