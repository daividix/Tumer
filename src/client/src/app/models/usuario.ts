export class Usuario {
    name: String;
    last_name: String;
    username: String;
    email: String;
    password: String;

    constructor (name: String, last_name: String, username: String, email: String, password: String) {
        this.name = name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
