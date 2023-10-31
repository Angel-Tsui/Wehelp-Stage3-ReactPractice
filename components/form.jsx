"use client"
import layoutStyles from '../app/layout.module.css'
import styles from '../styles/form.module.css';
import {useState} from 'react';
import {useEffect} from 'react';
import {getData, createData, deleteDataById} from '../firebase/dataCRUD';
import {verify, getUserInfoFromToken} from '../components/verify'

export default function InputDisplay(){

    verify();
    
    const [allData, setAllData] = useState([])

    const priceConverter = (debCred, price) => {
        if(debCred == "收入"){
            price = parseInt(price)
        }
        else{
            price = -price
        }
        return price
    }

    const loadData = async () => {
        const dataSet = []
        const data = await getData()
        data.map((each) => {
            let id = each.id
            let debCred = each.debCred
            let price = priceConverter(each.debCred, each.price)
            let desc = each.desc
            dataSet.push({id, debCred, price, desc})
        })
        setAllData(dataSet);
    }

    useEffect(() => {
        loadData();
    }, [])

    const getColor = (value) =>{
        if (value > 0){
            return layoutStyles.positive
        }
        else if (value == 0){
            return layoutStyles.neutral
        }
        else{
            return layoutStyles.negative
        }
    }

    function InputForm(){

        function getName(){
            let userInfo = getUserInfoFromToken()
            let signedInEmail = userInfo["userEmail"]
            return signedInEmail
        }

        let [debCred, setDebCred] = useState("收入")
        let [price, setPrice] = useState("")
        let [desc, setDesc] = useState("")
        
        async function handleSubmit(e){
            e.preventDefault();
            if(price == "" || desc == ""){
                alert("請輸入資料")
                return
            }
            let timestamp = Date.now();
            await createData(debCred, price, desc, timestamp)
            await loadData();
        }

        return(
                <div className={styles.inputFormContainer}>
                    <div className={styles.inputForm}>
                        <div className={styles.inputFormTitle}>你好，{getName()}，請輸入最新款項</div>
                        <form>
                            <select value={debCred} onChange={(e) => setDebCred(e.target.value)} className={styles.debCred}>
                                <option value="收入">收入</option>
                                <option value="支出">支出</option>
                            </select>
                            <input type="number" value={price} placeholder="0" onChange={(e) => setPrice(e.target.value)} className={styles.price}></input>
                            <input type="text" value={desc} placeholder="描述" onChange={(e) => setDesc(e.target.value)} className={styles.desc}></input>
                            <button onClick={handleSubmit}>新增款項</button>
                        </form>
                    </div>
                </div>
        )
    }

    async function handleDelete(id){
        await deleteDataById(id);
        await loadData();
    }

    function Display(allData){
        allData = allData.allData

        let sortedData = allData.sort((a, b) => {
            (a.index > b.index) ? 1 : (a.index < b.index) ? -1 : 0
        })

        return(
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <td>賬目</td>
                            <td>描述</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                allData.map((each, index) => (
                                    <tr key={index} id={each.id}>
                                        <td className={getColor(each.price)}>{each.price}</td>
                                        <td>{each.desc}</td>
                                        <td><button onClick={() => handleDelete(each.id)}>刪除</button></td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>
        )
    }

    function Total(allData){
        allData = allData.allData
        let total = 0
        
        allData.forEach((data) => {
            total += data.price
        })
        return(
            <div className={styles.total}>小計： 
                {total < 0 ? <span className={layoutStyles.negative}>${total}</span> : <span className={layoutStyles.positive}>${total}</span>}
                {total < 0 && <span className={layoutStyles.negative}><br /><br />WARNING</span>}
            </div>
        )
    }

    return(
        <div className={styles.mainContainer}>
            <InputForm />
            <hr />
            <Display allData={allData} />
            <br />
            <Total allData={allData}/>
        </div>   
    )
}
