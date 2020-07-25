class User {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.username = obj?.username || '';
    this.emailAddress = obj?.emailAddress || '';
  }

  id: string;
  username: string;
  emailAddress: string;
}

export default User;
