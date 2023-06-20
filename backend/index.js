const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/", async (req, res) => {
  const { data } = req.body;

  const options = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "889bf3837dmsh57d912de5b21951p16e2aajsn065c692abb41",
      "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
    },
    data: {
      language: data.language,
      version: "latest",
      code: data.code,
      input: data.inputdata,
    },
  };
  try {
    const response = await axios.request(options);
    return res.status(200).json({
      data: { result: response.data },
    });
  } catch (error) {
    return res.status(200).json({
      data: { result: error },
    });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
