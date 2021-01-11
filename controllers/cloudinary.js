const cloudinary = require('cloudinary')

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
})

exports.upload = async (req, res) => {
	try{
		const result = await cloudinary.uploader.upload(req.body.image, {
			public_id: `${Date.now()}`,
			resource_type: 'auto'//jpg, png
		})
		res.status(200).json({
			public_id: result.public_id,
			url: result.secure_url
		})
	} catch(error){
		res.status(400).json(error)
	}
	
}

exports.remove = (req, res) => {
		const image_id = req.body.public_id
		console.log(image_id)
		cloudinary.uploader.destroy(image_id, (response) => {
			if(response.result === 'ok') return res.send('Image is deleted successfully')
			res.status(400).send(response.result)
		
		})
}