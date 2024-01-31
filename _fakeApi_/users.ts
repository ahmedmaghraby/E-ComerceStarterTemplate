import type { User, LoginUser, RegisterUser } from '@/type/user';
import {createUuid} from '@/_fakeApi_/helper'
const UsersData: User[] = [
];
class UserApi {
  getUser(): Promise<User[]> {

    return Promise.resolve(UsersData);
  }

  createUsers(user:RegisterUser ): Promise<User> {
    let userExist = UsersData.find(user => user.email === user.email);
    if (userExist) {
      return Promise.reject('Email already exist');
    }
    let newUser: User = {...user , id: createUuid(), token: createUuid()};
    UsersData.push(newUser);
    return Promise.resolve(newUser);
  }

  loginUser(loginData:LoginUser): Promise<User> {
    const user = UsersData.find(user => user.email === loginData.email && user.password === loginData.password);
    if (!user) {
      return Promise.reject('Invalid email or password');
    }
    user.token = createUuid();
    return Promise.resolve(user);
  }

  forgotPassword(email: string): Promise<User> {
    const user = UsersData.find(user => user.email === email);
    if (!user) {
      return Promise.reject('Invalid email');
    }
    return Promise.resolve(user);
  }
}

export const userApi = new UserApi();