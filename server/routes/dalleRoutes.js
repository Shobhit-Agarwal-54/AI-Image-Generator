import express from "express";
import * as dotenv from "dotenv";
// import { Configuration , OpenAIApi} from "openai";
import OpenAI from "openai";
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

dotenv.config();

const router=express.Router();

// const configuration=new Configuration({
//     apiKey:process.env.OPENAI_API_KEY,
// }

const openai=new OpenAI();

router.route("/").get((req,res)=>{
    res.send("Hello from DALL-E!");
});


router.route("/").post(async(req,res)=>
  {
    try {
      // const response = await openai.images.generate({
      //   model: "dall-e-3",
      //   prompt: "A white cat",
      //   n: 1,
      //   size: "1024x1024",
      //   response_format:"b64_json"
      // });
      // console.log(response); 
      
      // const image=response.data[0].b64_json;

      // res.status(200).json({photo:image});


    const payload = {
      prompt: req.body.prompt,
      // output_format: "webp"
    };

    const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/generate/core`,
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: "json",
        headers: { 
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, 
          Accept: "application/json" 
        },
      },
    );
    console.log(response);
    res.status(200).json({photo:response.data.image});
     // You can use this in an <img src="..." />

    } 
    
    catch (error) 
    {
      console.log(error);
      // res.status(500).send(error.response.data.error.message);
    }
})
  

export default router;
