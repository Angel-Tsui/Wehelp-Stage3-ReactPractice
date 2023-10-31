// import Image from 'next/image';
import styles from '../styles/page.module.css';
import UserLog from '../components/userLog'

export const metadata = {
  title : "首頁"
}

function Header(){
  return(
    <div className={styles.title}>React 練習專案</div>
  )
}

function User(){
  return(
    <UserLog />
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <User />
    </>
  )
}
