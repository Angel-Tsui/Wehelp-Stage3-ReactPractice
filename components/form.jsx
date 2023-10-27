"use client"
import styles from '../styles/form.module.css';
import {useState} from 'react';

export default function InputDisplay(){

    const [allData, setAllData] = useState([])
    // console.log("allData", allData);

    const getColor = (value) =>{
        if (value > 0){
            return styles.positive
        }
        else if (value == 0){
            return styles.neutral
        }
        else{
            return styles.negative
        }
    }

    function InputForm(){
    
        let [debCred, setDebCred] = useState("收入")
        let [price, setPrice] = useState("")
        let [desc, setDesc] = useState("")
        
        function handleSubmit(e){
            e.preventDefault();
            // console.log(debCred, price, typeof(price), desc)
            if(price == "" || desc == ""){
                alert("請輸入資料")
                return
            }
            if(debCred == "收入"){
                price = parseInt(price)
            }
            else{
                price = -price
            }
            // console.log("Submitted")
            setAllData(
                [...allData,
                    {debCred, price, desc}
                ]
            );
            setDebCred("收入");
            setPrice("");
            setDesc("");
            // console.log(price, typeof(price))
        }

        return(
                <div className={styles.inputFormContainer}>
                    <div className={styles.inputForm}>
                        <div className={styles.inputFormTitle}>請輸入最新款項</div>
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

    function Display(allData){
        allData = allData.allData

        function handleDelete(index){
            // console.log("Delete", index, allData[index])
            allData.splice(index, 1)
            // console.log(allData)
            setAllData([...allData])
        }

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
                                    <tr key={index} id={"data" + index}>
                                        <td id={"price" + index} className={getColor(each.price)}>{each.price}</td>
                                        <td>{each.desc}</td>
                                        <td><button onClick={() => handleDelete(index)}>刪除</button></td>
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
            // console.log(total)
        })
        return(
            <div className={styles.total}>小計： 
                <span className={getColor(total)}>${total}</span>
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
