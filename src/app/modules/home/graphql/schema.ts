export interface UpdateUserInterface {
  updateUser: {
    _id:string,
    firstName:string | null
    lasttName:string | null
  }
}

export interface DeleteUserInterface {
  removeUser: {
    _id:string
  }
}

export interface UsersInterface {
  users: Array<{
    _id:string,
    firstName:string | null
    lasttName:string | null
  }> | null;
}

export interface UserByIdInterface {
    user:{
      _id: string,
      firstName:string | null
      lasttName:string | null
  }
}