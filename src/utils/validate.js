export const checkValidateData = (email,password,name)=>{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    // const isUsernameValid = /^[0-9A-Za-z]{6,16}$/.test(name)

    // if(!isUsernameValid) return "username is not valid"
    if(!isEmailValid) return "email id is not valid"
    if(!isPasswordValid) return "password is not valid"
    

    return null;
}