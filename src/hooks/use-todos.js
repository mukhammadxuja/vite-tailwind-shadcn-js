import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/firebase';

export const useTodos = (userId) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    const todosCollection = collection(db, `users/${userId}/todos`);
    const snapshot = await getDocs(todosCollection);
    const todosList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(todosList);
    setLoading(false);
  };

  const addTodo = async (todo) => {
    const todosCollection = collection(db, `users/${userId}/todos`);
    await addDoc(todosCollection, todo);
    fetchTodos(); // Refresh todos
  };

  const updateTodo = async (id, updatedData) => {
    const todoDoc = doc(db, `users/${userId}/todos`, id);
    await updateDoc(todoDoc, updatedData);
    fetchTodos(); // Refresh todos
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, `users/${userId}/todos`, id);
    await deleteDoc(todoDoc);
    fetchTodos(); // Refresh todos
  };

  useEffect(() => {
    if (userId) fetchTodos();
  }, [userId]);

  return { todos, loading, addTodo, updateTodo, deleteTodo, fetchTodos };
};
