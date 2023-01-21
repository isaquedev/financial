import { userDB } from "@dataAccess/index";
import makeLogin from "./makeLogin";

const postLogin = makeLogin({
  userDB
})

export {
  postLogin
}
