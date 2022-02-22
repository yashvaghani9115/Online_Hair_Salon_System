 class Auth {
    constructor(){
        this.isAuthenticated = false;
    }
    isAuthenticated(){
        return this.isAuthenticated;
    }
    setAuth(val){
        this.isAuthenticated = val;
    }
}
export default new Auth();
