import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

class SessionService {
  getLoggedUserData() {
    let token = Cookies.get("access_token");
    let current
    try {
      current = jwt_decode(token);
      return current;
    } catch(error) {
      console.log(error)
      return error
    }
  }
}

export default new SessionService();
