export class User {
    public id!: number;
    public userId!: string;
	public username: string;
	public password: string;
	public firstname: string;
	public lastname: string;
	public othername: string;
	public gender: string;
    public userType: string;
	public email: string;
	public phone: string;
    public accountEnabled!: boolean;
	public accountNonLocked!: boolean;
    public dateJoined!: Date;
    public lastLoginDate!: Date;
    public lastLoginDateDisplay!: Date;
	public role: string;
    public authorities: [];

    
    constructor() {
        
        this.username = "";
        this.password = "";
        this.firstname = "";
        this.lastname = "";
        this.othername = "";
        this.gender = "";
        this.userType = "";
        this.email = "";
        this.phone = "";
        this.role = "";
        this.authorities = [];
       

        
    }
}
