export type Credentials = {
  emailAddress: string;
  password: string;
};

export type LoginInfo = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  id: string;
  token: string;
};

export type Registration = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
};

export type ChangePassword = {
  golferId: string;
  newPassword: string;
};
