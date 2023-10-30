import Image from 'next/image';
import Link from 'next/link'
import styles from '../styles/page.module.css';
import layoutStyle from './layout.module.css'

export const metadata = {
  title : "首頁"
}

function Header(){
  return(
    <div className={styles.title}>React 練習專案</div>
  )
}

function WelcomeMessage(){
  return(
    <div className={styles.welcomeContainer}>
      <div className={styles.welcome}>歡迎光臨我的網頁，請點擊以下按鈕進入功能頁面</div>
      <Image 
        src="/images/profile.jpg"
        height={60}
        width={60}
        alt="profile pig"
      />
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

export default function Home() {
  return (
    <>
      <Header />
      <WelcomeMessage />
      <ToAccountingPage />
    </>
  )
}
