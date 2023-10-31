import Link from 'next/link';
import layoutStyle from '../layout.module.css';
// import InputDisplay from '../../components/form.jsx'
import dynamic from "next/dynamic"
const InputDisplay = dynamic(() => import("../../components/form.jsx"), {ssr : false})

export const metadata = {
    title : "記賬"
}

function ToHome(){
    return(
        <div className={layoutStyle.btnContainer}>
            <Link href="/" className={layoutStyle.btn}>回到首頁</Link>
        </div>
    )
}

export default function AccountingPage(){
    return(
        <>
            <InputDisplay />
            <ToHome />
        </>
    )
}