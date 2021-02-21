export default class User{
    user_name:string;
    user_id:number;
    constructor(id:number,name:string){
        this.user_name = name;
        this.user_id = id;
    }
}