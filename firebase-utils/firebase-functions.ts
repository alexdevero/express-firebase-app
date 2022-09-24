import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  getDoc as getDocFromDb,
  setDoc,
} from 'firebase/firestore'

export const addDpc = async (
  dbName: Firestore,
  documentName: string,
  collectionName: string,
  data: Record<string, string | number | boolean | null>
) => {
  try {
    const docRef = doc(dbName, documentName, collectionName)
    const docSnap = await getDocFromDb(docRef)

    if (docSnap.exists()) {
      await deleteDoc(docRef)

      return false
    } else {
      await setDoc(doc(dbName, documentName, collectionName), data)

      return true
    }
  }
  catch (error) {
    return Error
  }
}

export const removeDoc = async (
  dbName: Firestore,
  documentName: string,
  collectionName: string
) => {
  try {
    const docRef = doc(dbName, documentName, collectionName)
    const docSnap = await getDocFromDb(docRef)

    if (docSnap.exists()) {
      await deleteDoc(docRef)

      return true
    } else {
      return false
    }
  }
  catch (error) {
    return Error
  }
}

export const getAllDocs = async (
  dbName: Firestore,
  collectionName = 'test-collection'// : string
) => {
  try {
    const collectionRef = collection(dbName, collectionName)
    const querySnapshot = await getDocs(collectionRef)

    let docs: DocumentData[] = []

    if (!querySnapshot.empty) {
      docs = querySnapshot.docs.map((doc) => doc.data())
    }

    return docs
  }
  catch (error) {
    return Error
  }
}

export const getDoc = async (
  dbName: Firestore,
  documentName: string,
  collectionName: string
) => {
  try {
    const docRef = doc(dbName, documentName, collectionName)
    const docSnap = await getDocFromDb(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }

    return docSnap.data()
  }
  catch (error) {
    return Error
  }
}

export const deleteAllDocs = async (
  dbName: Firestore,
  collectionName: string
) => {
  try {
    const collectionRef = collection(dbName, collectionName)
    const querySnapshot = await getDocs(collectionRef)

    console.log('querySnapshot', querySnapshot.empty)
    if (!querySnapshot.empty) {
      querySnapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })
    } else {
      return false
    }
  }
  catch (error) {
    return Error
  }
}

export const updateDoc = async (
  dbName: Firestore,
  documentName: string,
  collectionName: string,
  data: Record<string, string | number | boolean | null>
) => {
  try {
    const dbCollection = await doc(dbName, documentName, collectionName)

    await setDoc(dbCollection, data, { merge: true })

    return true
  }
  catch (error) {
    return Error
  }
}
