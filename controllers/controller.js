const { successHandle, errorHandle } = require('../utils/res')
const { findAll, insertOne, editOne, deleteOne, deleteAll } = require('../models/model')
const error = require('../utils/error')

const getDB = async function(Model, res) {
  const data = await findAll(Model)
  successHandle(res, data)
}

const postDB = async function(Model, res, bodyChunk) {
  try {
    const chunk = JSON.parse(bodyChunk)
    const data = await insertOne(Model, chunk)
    successHandle(res, data)
  } catch(error) {
    console.log(error, 'error-message!!')
    errorHandle(res, error.POST)
  }
}

const patchOneDB = async function(Model, res, bodyChunk ,id) {
  try {
    const chunk = JSON.parse(bodyChunk)
    const isExists = await Model.findOne({_id: id})
    if(isExists) {
      const data = await editOne(Model, id, chunk)
      successHandle(res, data)
    } else {
      errorHandle(res, error.PATCH)
    }
  } catch(error) {
    console.log(error, 'error-message!!')
    errorHandle(res, error.PATCH)
  }
}

const deleteOneDB = async function(Model, res, id) {
  try {
    const isExists = await Model.findOne({_id: id})
    if(isExists) {
      const data = await deleteOne(Model, id)
      successHandle(res, data)
    } else {
      errorHandle(res, error.DELETE)
    }
  } catch(error) {
    console.log(error, 'error-message!!')
    errorHandle(res, error.DELETE)
  }
}

const deleteAllDB = async function(Model, res) {
  const data = await deleteAll(Model)
  successHandle(res, data)
}

module.exports = { getDB, postDB, patchOneDB, deleteOneDB, deleteAllDB }

