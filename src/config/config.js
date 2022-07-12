require('dotenv').config()

let env = process.env.REACT_APP_PROJECT_ENVS.split('~')
console.warn('ENV: ' + env[0])

const config = {
  environment: env[0],
  backendUrl: env[1],
  frontendUrl: env[2],

  localStorageVariables: {
    email: 'user-email-var-1',
    password: 'user-password-var-1',
  },
}

export default config
