export interface User {
  _id: string;
  username: string;
  lastName: string;
  firstName: string;
  email: string;
  phoneNum: string;
}

export interface DocumentKey {
  _id: string;
  name: string;
}

export interface Record {
  _id?: string;
  user: DocumentKey;
  clockInTime: Date;
  clockOutTime?: Date;
}
