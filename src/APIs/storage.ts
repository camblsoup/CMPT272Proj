import {md5Hash, md5Verify} from "./customMD5hash.ts";

export function initStorage(pwd: string): void{

    if(localStorage.getItem("idCounter")){
        //storage already initiated
        return;
    }

    localStorage.setItem("password", md5Hash(pwd));
    localStorage.setItem("idCounter", String(0));
}

export function storeEmergency(person: string, info: string, location: string,
                               comment?: string, picture?: string): void {
    let id = parseInt(<string>localStorage.getItem("idCounter"), 10);
    let emergency = {
        "id": id,
        "Type": info,
        "Location": location,
        "Reported By": person,
        "Time": Date.now(),
        "Status": "OPEN",
        "Comment": comment,
        "Picture": picture,
    }
    localStorage.setItem(String(id), JSON.stringify(emergency));
    localStorage.setItem("idCounter", String(id+1));
}

export function getEmergency(id: number): JSON | null{
    let emergency = localStorage.getItem(String(id));
    if(!emergency){
        //invalid id
        return null;
    }
    return JSON.parse(emergency);
}

export function updateEmergency(id: number, pwd: string): boolean{
    let emergency = localStorage.getItem(String(id));
    if(!emergency){
        //invalid id
        return false;
    }
    if(!md5Verify(pwd, <string>localStorage.getItem("password"))){
        //invalid password
        return false;
    }
    emergency = JSON.parse(emergency);
    // @ts-ignore
    emergency.Status = "RESOLVED";
    localStorage.setItem(String(id), JSON.stringify(emergency));
    return true;
}

export function deleteEmergency(id: number, pwd: string): boolean{
    let emergency = localStorage.getItem(String(id));
    if(!emergency){
        //invalid id
        return false;
    }
    if(!md5Verify(pwd, <string>localStorage.getItem("password"))){
        //invalid password
        return false;
    }
    localStorage.removeItem(String(id));
    return true;
}

//storage must be reinitialized after calling
export function clearStorage(pwd: string): boolean{
    if(!md5Verify(pwd, <string>localStorage.getItem("password"))){
        return false;
    }
    localStorage.clear();
    return true;
}


initStorage("hello");
storeEmergency("me", "hit", "here", "", "");
storeEmergency("you", "shoot", "there", "comment", "jpeg");
console.log(getEmergency(0));
console.log(getEmergency(1));
console.log(getEmergency(2));
console.log(updateEmergency(0, "hello"));
console.log(updateEmergency(1, "you"));
console.log(getEmergency(0));
console.log(getEmergency(1));
console.log(deleteEmergency(0, "hello"));
console.log(deleteEmergency(1, "you"));
console.log(getEmergency(0));
