import "./index.less";
import "./index.css";
import "./index.scss";
import { getUrlParams } from "utils/url";
import { SchemaModel, StringType, NumberType } from "schema-typed";
import Logo from "./image/logo.png";

console.log(Logo, getUrlParams());

// fetch("/mock/55422/test/gettest")
//   .then(function(response) {
//     console.log("response", response);
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });

// postData("/mock/55422/test/post", {
//   name: "shali",
//   id: "0"
// })
//   .then(data => console.log(data)) // JSON from `response.json()` call
//   .catch(error => console.error(error));

// function postData(url, data) {
//   // Default options are marked with *
//   return fetch(url, {
//     body: JSON.stringify(data), // must match 'Content-Type' header
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, same-origin, *omit
//     headers: {
//       "user-agent": "Mozilla/4.0 MDN Example",
//       "content-type": "application/json"
//     },
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, cors, *same-origin
//     redirect: "follow", // manual, *follow, error
//     referrer: "no-referrer" // *client, no-referrer
//   }).then(response => response.json()); // parses response to JSON
// }

const model = SchemaModel({
  username: StringType().isRequired("用户名不能为空"),
  email: StringType().isEmail("请输入正确的邮箱"),
  age: NumberType("年龄应该是一个数字").range(
    18,
    30,
    "年龄应该在 18 到 30 岁之间"
  )
});

const checkResult = model.check({
  username: "foobar",
  email: "foo@bar.com",
  age: 40
});

console.log(checkResult);
