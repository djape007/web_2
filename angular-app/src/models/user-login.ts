export class UserLogin {
    public username: string;
    public password: string;
    public grant_type: string;

    constructor(usrname: string, pass: string){
        this.username = usrname;
        this.password = pass;
        this.grant_type = "password";
    }
}
