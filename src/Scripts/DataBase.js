import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; // Import necessário!

const firebaseConfig = {
  apiKey: "AIzaSyA91ALBTH_ppQ-Movx8LlqY907oFKUMJwg",
  authDomain: "certificadora-agil.firebaseapp.com",
  projectId: "certificadora-agil",
  storageBucket: "certificadora-agil.firebasestorage.app",
  messagingSenderId: "198455643450",
  appId: "1:198455643450:web:f2431ca8abaa00cc91d403",
  measurementId: "G-XDXSFJ1MSF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Buscar itens no "Storage"
async function getStorage() {
  try {
    const ref = collection(db, "Produtos");
    const snapshot = await getDocs(ref);
    const storage = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      storage.push({
        id: doc.id,
        nome: data.nome || "Sem nome",
        marca: data.marca || "Sem marca",
        cod: data.cod,
        desc: data.desc || "Sem descrição",
        quant: data.quant == 0 ? "Sem Estoque" : data.quant,
      });
    });
    return storage;
  } catch (error) {
    console.error("Erro ao buscar Storage:", error.message);
    return [];
  }
}

// Buscar pessoas de um tipo específico
async function getPessoa(tipo) {
  try {
    const ref = collection(db, "Pessoas");
    const q = query(ref, where("tipo", "==", tipo));
    const snapshot = await getDocs(q);
    const pessoas = [];
    snapshot.forEach(doc => {
      pessoas.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return pessoas;
  } catch (error) {
    console.error("Erro ao buscar Pessoas:", error.message);
    return [];
  }
}


// Atualizar documento
async function updateData(collectionName, id, newData) {
  try {
    const ref = doc(db, collectionName, id);
    await updateDoc(ref, newData);
    console.log("Documento atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar documento:", error.message);
  }
}

// Deletar documento
async function deleteData(collectionName, id) {
  try {
    const ref = doc(db, collectionName, id);
    await deleteDoc(ref);
    console.log("Documento deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar documento:", error.message);
  }
}

// Criar documento
async function createData(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Documento criado com sucesso! ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao criar documento:", error.message);
  }
}

export { getStorage, getPessoa, updateData, deleteData, createData };
