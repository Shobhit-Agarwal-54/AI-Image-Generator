import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data";

dotenv.config();

const router=express.Router();

router.route("/").get((req,res)=>{
    res.send("Hello from AI-Image Generator!");
});


router.route("/").post(async(req,res)=>
  {
    try 
    {
    const payload = {
      prompt: req.body.prompt,
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
      res.status(500).json(error);
    }
})
  

export default router;
