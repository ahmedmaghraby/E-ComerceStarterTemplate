import { LoggedInUsers } from '@/type/user'
export const createUuid = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };
  
  let loggedInUsers: LoggedInUsers[] = []

  export const setLoggedInUser = (users: LoggedInUsers) => {
    loggedInUsers.push(users)
  }

  export const checkIfUserIsLoggedIn = (users: LoggedInUsers) =>{
    return loggedInUsers.some(user => user.email === users.email && user.token === users.token)
  }