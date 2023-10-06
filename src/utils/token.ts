export function GET_TOKEN(){
    return getLocalStore('TOKEN')
}
export function SET_TOKEN(token:string){
    setLocalStore('TOKEN',token)
}

export function REMOVE_TOKEN(){
    removeLocalStore('TOKEN')
}

export function getLocalStore(name:string){
    return localStorage.getItem(name)
}
export function setLocalStore(name:string,value:string){
    localStorage.setItem(name, value)
}

export function removeLocalStore(name:string){
    localStorage.removeItem(name)
}
