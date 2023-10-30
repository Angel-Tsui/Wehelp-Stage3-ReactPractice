// import {firestore} from './firebase'

// const getInfo = async () => {
//     const snapshot = await firestore.collection("data").get();
//     // const dataSet = []
//     const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));

//     // snapshot.docs.map((doc) => {
//     //     dataSet.push({id: doc.id, ...doc.data()})
//     // })

//     // console.log("firebase data", data);
//     return data
// }

// export {getInfo}