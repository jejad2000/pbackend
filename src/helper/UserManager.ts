interface User {
    username: string;
    password: string;
}

export class UserManager {
    private users: User[] = [];

    // Method to add a new user
    public addUser(user: User): void {
        this.users.push(user);
    }

    // Method to find a user by username
    public findUser(username: string): User | undefined {
        return this.users.find((user) => user.username === username);
    }

    // Getter for all users
    public get allUsers(): User[] {
        return this.users;
    }
}