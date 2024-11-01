import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
  deleteDoc,
  doc
} from "firebase/firestore";

export async function createArticle({ title, body }) {
  const data = { title, body, date: Timestamp.now().toDate() };
  const docRef = await addDoc(collection(db, "articles"), data);
  return { id: docRef.id, ...data };
}

export async function deleteArticle(articleId) {
  const articleRef = doc(db, "articles", articleId);
  await deleteDoc(articleRef);
}

export async function fetchArticles() {
  const snapshot = await getDocs(
    query(collection(db, "articles"), orderBy("date", "desc"), limit(20))
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
