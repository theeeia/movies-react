import React, { createContext } from 'react'


export interface Iuser {
 email:string,
 access_token: string,
 refresh_token: string,
 expires_in: number
}


const useValue = () => {
  const [user, setUser] = React.useState<Iuser[]>([])

  return {
    user, setUser
  }
}


export const UserContext = createContext<any>({} as any)

export function UserProvider({children}:{children:any}) {

  return <UserContext.Provider value={ useValue() } >{children} </UserContext.Provider>
}

