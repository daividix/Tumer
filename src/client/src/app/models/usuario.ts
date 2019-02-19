export class Usuario {
    _id: String;
    name: String;
    last_name: String;
    username: String;
    email: String;
    password: String;

    constructor(name: String, last_name: String, email: String) {
        this.name = name;
        this.last_name = last_name;
        this.email = email;
    }


}
