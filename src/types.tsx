export interface IUser {
  _id: string
  name: string
  email: string
}

export interface ISignup {
  name: string
  email: string
  password: string
  repassword?: string
}

export interface ILogin {
  email: string
  password: string
}

export interface ITask {
  _id?: string
  title: string
  description?: string
  status: number
  user?: IUser
  mts?: string
}
