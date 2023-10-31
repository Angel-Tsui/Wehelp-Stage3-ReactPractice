export const userToken = getToken()

function getToken(){
  let userToken = window.localStorage.getItem("token")
  return userToken
}

function verify(){
    let userToken = getToken()
    if(userToken == null){
      window.location = "/"
    }
    else{
      return userToken
    }
}

function signInOrSignOut(){
  let userToken = getToken()
  if(userToken == null){
    return null
  }
  else{
    return true
  }
}

function getUserInfoFromToken(){
  let userToken = getToken()
  if(userToken != null){
    userToken = JSON.parse(userToken)
    return userToken
  }
}

export {verify, signInOrSignOut, getUserInfoFromToken}