const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "標題必填！！"]
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    versionKey: false
  }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post