import axios from 'axios'
import config from '../config'
import { ISignup, ILogin } from '../types'

const axiosInstance = axios.create({
  baseURL: `${config.API_URL}/${config.API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
})

const axiosAuthInstance = function (token: string) {
  return axios.create({
    baseURL: `${config.API_URL}/${config.API_VERSION}`,
    headers: {
      token,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    },
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signupUser(data: ISignup) {
    return new Promise((reject, resolve) => {
      axiosInstance
        .post(config.USER.BASE, data)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  loginUser(data: ILogin) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(config.USER.BASE.concat(config.LOGIN.BASE), data)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  synchronizeUser(token: string) {
    return new Promise((resolve, reject) => {
      axiosAuthInstance(token)
        .get(config.USER.BASE.concat(config.SYNC.BASE))
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  createTask(token: string, data: any) {
    return new Promise((resolve, reject) => {
      axiosAuthInstance(token)
        .post(config.USER.BASE.concat(config.TASK.BASE), data)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  updateTask(token: string, data: any) {
    return new Promise((resolve, reject) => {
      axiosAuthInstance(token)
        .put(config.USER.BASE.concat(config.TASK.BASE), data)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  deleteTask(token: string, _id: string) {
    return new Promise((resolve, reject) => {
      axiosAuthInstance(token)
        .delete(
          config.USER.BASE.concat(config.TASK.BASE).concat('/').concat(_id)
        )
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  filterTasks(token: string, status: any) {
    return new Promise((resolve, reject) => {
      axiosAuthInstance(token)
        .get(
          config.USER.BASE.concat(config.TASK.BASE)
            .concat(config.FILTER.BASE)
            .concat('status=')
            .concat(status)
        )
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
}
