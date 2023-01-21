import { userDAO } from "@dataAccess/index";
import makeLogin from "./makeLogin";
import { authService } from "@services/index";

const postLogin = makeLogin({
  userDAO,
  authService,
})

export {
  postLogin
}
