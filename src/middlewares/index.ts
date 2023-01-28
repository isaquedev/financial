import { authService } from "@services/index"

import makeIsAuthenticated from "./makeIsAuthenticated"

const isAuthenticated = makeIsAuthenticated({
  authService: authService
})

export {
  isAuthenticated
}