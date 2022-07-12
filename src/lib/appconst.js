import config from "../config/config"
const AppConsts = {
  authorization: {
    encrptedAuthTokenName: "enc_auth_token",
  },
  remoteServiceBaseUrl: config.backendUrl
};
export default AppConsts;
