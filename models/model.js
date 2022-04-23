const findAll = async function(Model) {
  return await Model.find()
}

const insertOne = async function(Model, data) {
  await Model.create(data)
  .then(() => {
    console.log("資料寫入成功")
  })
  return await Model.find()
}

const editOne = async function(Model, id, data) {
  await Model.findByIdAndUpdate(id, data)
  .then(() => {
    console.log("編輯單筆成功")
  })
  return await Model.find()
}

const deleteOne = async function(Model, id) {
  await Model.findByIdAndDelete(id)
  .then(() => {
    console.log("刪除單筆成功")
  })
  return await Model.find()
}

const deleteAll = async function(Model) {
  await Model.deleteMany({})
  .then(() => {
    console.log("刪除全部成功")
  })
  return await Model.find()
}

module.exports = { findAll, insertOne, editOne, deleteOne, deleteAll }