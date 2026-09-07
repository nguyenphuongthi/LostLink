// uploadController.js — Nhận file từ multer, đẩy lên Cloudinary, trả URL.

const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const uploadService = require('../services/uploadService')

const FOLDER = 'lostlink/posts'

// POST /api/uploads/image — một ảnh (field: image).
const uploadSingle = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest('Chưa có tệp ảnh nào được tải lên.')
  const image = await uploadService.uploadImage(req.file, { folder: FOLDER })
  res.status(201).json({ success: true, data: { image } })
})

// POST /api/uploads/images — nhiều ảnh (field: images, tối đa 9).
const uploadMultiple = asyncHandler(async (req, res) => {
  if (!req.files?.length) throw ApiError.badRequest('Chưa có tệp ảnh nào được tải lên.')
  const images = await uploadService.uploadImages(req.files, { folder: FOLDER })
  res.status(201).json({ success: true, data: { images } })
})

module.exports = { uploadSingle, uploadMultiple }
