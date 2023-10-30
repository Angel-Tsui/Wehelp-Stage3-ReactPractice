import {firestore} from './firebase'

const getData = async () => {
    const snapshot = await firestore.collection("data").orderBy("timestamp").get()
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data
}

const createData = async (debCred, price, desc, timestamp) => {
    const ref = await firestore.collection("data").add({debCred, price, desc, timestamp});

    const newData = {
        id : ref.id,
        ...{debCred, price, desc},
    };
    
    return newData;
}

const deleteDataById = async (id) => {
    const deleteData = await firestore.collection("data").doc(id).delete()
    return deleteData
}

export {getData, createData, deleteDataById}