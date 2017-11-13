export interface UpdateRequestInterface {
  updateRequest: {
    requestId: number,
    title: string,
    description: string,
    category: Array<string>,
    location: string,
    capacity: number, 
  }
}

export interface DeleteRequestInterface {
  removeRequest: {
    id:string
  }
}

export interface RequestsInterface {
  requests: Array<{
    requestId: number,
    title: string,
    description: string,
    category: Array<string>,
    location: string,
    capacity: number,
  }> 
}

export interface RequestByIdInterface {
    request:{
      requestId: number,
      title: string,
      description: string,
      category: Array<string>,
      location: string,
      capacity: number,
  }
}