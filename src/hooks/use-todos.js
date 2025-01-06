import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'sonner';

export const useTodos = (userId) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = () => {
    setLoading(true);
    const todosCollection = collection(db, `users/${userId}/todos`);
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      const todosList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosList);
      setLoading(false);
    });

    return unsubscribe;
  };

  const addTodo = async (todo) => {
    const todosCollection = collection(db, `users/${userId}/todos`);
    await addDoc(todosCollection, todo);
    toast('Todo added successfully.');
    fetchTodos();
  };

  const updateTodo = async (id, updatedData) => {
    const todoDoc = doc(db, `users/${userId}/todos`, id);
    await updateDoc(todoDoc, updatedData);
    fetchTodos(); // Refresh todos
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, `users/${userId}/todos`, id);
    await deleteDoc(todoDoc);
    toast('Todo deleted successfully.');
    fetchTodos(); // Refresh todos
  };

  useEffect(() => {
    if (userId) {
      const unsubscribe = fetchTodos();
      return () => unsubscribe();
    }
  }, [userId]);

  return { todos, loading, addTodo, updateTodo, deleteTodo };
};
