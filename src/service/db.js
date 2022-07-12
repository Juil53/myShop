import app from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const update = async (collectionName = "", data = null, id = "") => {
  try {
    await updateDoc(doc(db, collectionName, id), data);
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const del = async (collectionName, id) => {
  try {
    const result = await deleteDoc(doc(db, collectionName, id));
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

const set = async (collectionName = "", id = "", data = null) => {
  try {
    await setDoc(doc(db, collectionName, id), data);
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const add = async (collectionName = "", data = null) => {
  try {
    await addDoc(collection(db, collectionName), data);

    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getAll = async (collectionName) => {
  try {
    const result = await getDocs(collection(db, collectionName));
    const data = [];
    result.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    return null;
  }
};

const get = async (collectionName = "", id = "") => {
  try {
    const result = await getDoc(doc(db, collectionName, id));
    if (result.exists()) {
      return result.data();
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export default {
  set,
  add,
  get,
  del,
  update,
  getAll,
};
