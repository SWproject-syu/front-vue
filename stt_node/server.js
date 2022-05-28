const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");

const fs = require("fs");
const openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition";
const accessKey = "078f92d9-3855-4bfc-8485-73098d304b52";
const languageCode = "korean";
const request = require("request");
const { log } = require("console");


const app = express();

// 파일 업로드 허용
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// 미들 웨어 추가
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 포트 설정
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", async (req, res) => {
  try {
    console.log('body',req.files);
    console.log(+new Date());
    if (!req.files) {
      res.send({
        status: false,
        message: "파일 업로드 실패",
      });
    } else {
      let f = req.files.uploadFile;
      await f.mv("./uploads/" + f.name);
      const path = "./uploads/" + f.name;

      const audioFilePath = "./uploads/" + f.name;
      const audioData = fs.readFileSync(audioFilePath);
      console.log(audioData, audioFilePath);
      var requestJson = {
        access_key: accessKey,
        argument: {
          language_code: languageCode,
          audio: audioData.toString("base64"),
        },
      };

      var options = {
        url: openApiURL,
        body: JSON.stringify(requestJson),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      };
      request.post(options, function (error, response, body) {
        res.send({
          status: true,
          message: "파일이 업로드 되었습니다.",
          data: {
            name: f.name,
            minetype: f.minetype,
            size: f.size,
            body: body,
            status: response.statusCode,
          },
        });
        fs.access(path, fs.constants.F_OK, (err) => {
          if (err) return console.log("삭제할 수 없는 파일입니다");
          fs.unlink(path, (err) => (err ? console.log(err) : console.log(`${path} 를 정상적으로 삭제했습니다`)));
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
