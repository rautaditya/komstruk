const Blog = require("../models/Blog");

exports.createBlog = async (req,res)=>{

    try{

        const blog = new Blog({

            title:req.body.title,
            description:req.body.description,
            image:req.file.filename

        });

        await blog.save();

        res.json({
            message:"Blog Added",
            blog
        });

    }catch(err){
        res.status(500).json(err);
    }

}