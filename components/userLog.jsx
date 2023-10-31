"use client"
import styles from '../styles/page.module.css';
import layoutStyle from '../app/layout.module.css'
import Image from 'next/image';
import Link from 'next/link'
import {auth} from '../firebase/firebase'
import {useState} from 'react'
import {signInOrSignOut, getUserInfoFromToken} from '../components/verify'

export const userToken = signInOrSignOut();

export default function UserLog(){

    const [userStatus, setUserStatus] = useState({})

    function WelcomeMessage(){
        
        function getName(){
            if(userToken){
                let userInfo = getUserInfoFromToken()
                let signedInEmail = userInfo["userEmail"]
                return signedInEmail
            }
        }

        return(
          <div className={styles.welcomeContainer}>
            {userToken != null ? <div className={styles.welcome}>歡迎 {getName()}，隨時開始使用記賬功能</div> : <div className={styles.welcome}>歡迎光臨我的網頁，請登入使用記賬功能</div>}
            {/* <Image 
              src="/images/profile.jpg"
              height={60}
              width={60}
              alt="profile pig"
            /> */}
          </div>
          
        )
    }

    function SignUp(){

        async function fireSignUp(signUpUserEmail, signUpUserPw){
            // create User in Firebase
            try{
                const userCred = await auth.createUserWithEmailAndPassword(signUpUserEmail, signUpUserPw)
    
                return {
                    "success" : true,
                    "user" : userCred
                }
            }
            catch(err){
                return {
                    "error" : true,
                    "message": err.message
                }
            }
        }
    
        async function handleSignUp(e){
            e.preventDefault();
            const signUpUserEmail = signUpForm["signUpUserEmail"].value
            const signUpUserPw = signUpForm["signUpUserPw"].value
            if(signUpUserEmail == "" | signUpUserPw == ""){
                setUserStatus({"error" : true, "message" : "請輸入資料"})
                return
            }
            const authResult = await fireSignUp(signUpUserEmail, signUpUserPw)
            if(Object.keys(authResult).includes("success")){
                setUserStatus({"success" : true, "message" : "注冊成功，請登入", "user" : authResult["user"]})
            }
            else if(authResult["message"] == "Password should be at least 6 characters"){
                setUserStatus({"error" : true, "message" : "密碼最少包含六個字"})
            }
            else if(authResult["message"] == "The email address is badly formatted."){
                setUserStatus({"error" : true, "message" : "電郵格式錯誤"})
            }
            else if(authResult["message"] == "The email address is already in use by another account."){
                setUserStatus({"error" : true, "message" : "此電郵已被登記，請使用其他"})
            }
            else{
                setUserStatus({"error" : true, "message" : "出現錯誤，請重新嘗試"})
            }
        }
        
        return(
            <div className={styles.signUp}>
                <div className={styles.headers}>成爲會員</div>
                <form id="signUpForm">
                    <input type="text" placeholder="設定：電子郵件" id="signUpUserEmail"/>
                    <input type="password" placeholder="設定：密碼" id="signUpUserPw" />
                    <button className={layoutStyle.btn} onClick={handleSignUp}>注冊</button>
                </form>
            </div>
        )
    }
    
    function SignIn(){
    
        async function fireSignIn(signInUserEmail, signInUserPw){
            try{
                const user = await auth.signInWithEmailAndPassword(signInUserEmail, signInUserPw)
                return {
                    "success" : true,
                    "user" : user.user
                }
            }
            catch(err){
                return {
                    "error" : true,
                    "message" : err.message
                }
            }
        }

        async function handleSignIn(e){
            e.preventDefault();
            const signInUserEmail = signInForm["signInUserEmail"].value
            const signInUserPw = signInForm["signInUserPw"].value
            const signInStatus = await fireSignIn(signInUserEmail, signInUserPw)
            if(Object.keys(signInStatus).includes("error")){
                setUserStatus({"error": true, "message" : "賬號或密碼不正確，請確認"})
            }
            else{
                let userToken = {"userId" : signInStatus["user"].uid, "userEmail" : signInStatus["user"].email}
                setUserStatus({"success" : true, "user" : userToken})
                window.localStorage.setItem("token", JSON.stringify(userToken))
                let confirmUser = signInOrSignOut()
                if (confirmUser){
                    window.location = "/"
                }
            }
        }
    
        function handleSignOut(e){
            window.localStorage.removeItem("token")
        }

        return(
            <div className={styles.signIn}>
                <div className={styles.headers}>會員專區</div>
                <form id="signInForm">
                    {userToken == null && <input type="text" placeholder="電子郵件" id="signInUserEmail" />}
                    {userToken == null && <input type="password" placeholder="密碼" id="signInUserPw" />}
                    {userToken == null ? <button className={layoutStyle.btn} onClick={handleSignIn}>登入</button> : <button className={layoutStyle.btnDark} onClick={handleSignOut}>登出</button>}
                </form>
            </div>
        )
    }

    function ToAccountingPage(){
        return(
          <div className={layoutStyle.btnContainer}>
              <Link href="/accounts" className={layoutStyle.btn}>記賬功能</Link>
          </div>
        )
      }

    return(
        <>
            <WelcomeMessage />
            <div className={styles.userLogContainer}>
                {Object.keys(userStatus).includes("error") && <div className={layoutStyle.negative}>{userStatus["message"]}</div>}
                {Object.keys(userStatus).includes("success") && <div className={layoutStyle.positive}>{userStatus["message"]}</div>}
                <div className={styles.userLog}>
                    <SignUp />
                    <SignIn />
                </div>
                {userToken == true && <ToAccountingPage />}
            </div>
        </>
        
        
    )
}