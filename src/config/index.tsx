const config = {
  API_URL: process.env.REACT_APP_API_URL,
  API_VERSION: process.env.REACT_APP_API_VERSION,
  USER: {
    BASE: '/user',
  },
  LOGIN: {
    BASE: '/login',
  },
  SYNC: {
    BASE: '/synchronize',
  },
  TASK: {
    BASE: '/task',
  },
  FILTER: {
    BASE: '/filter?',
  },
}

export default config
