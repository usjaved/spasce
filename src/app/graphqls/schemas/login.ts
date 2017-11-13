export interface LoginUserInterface {
  login: Array<{
    _id:string
  }> | null;
}

export interface LoginUserDetailInterface {
  loginSession : {
    _id:string,
    user: {
      _id: string,
      firstName: string,
      lastName: string,
      profilePic: string
    }
  } | null;
}
