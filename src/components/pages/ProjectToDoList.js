import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";

const TodoListPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [projectName, setProjectName] = useState(""); // État pour le nom du projet

  useEffect(() => {
    // Récupérer le nom du projet depuis le localStorage
    const storedProjectName = localStorage.getItem(`project-name-${id}`);
    setProjectName(storedProjectName || `Projet ${id}`);

    // Récupérer les tâches pour le projet spécifié depuis le localStorage ou une API
    const storedTasks = JSON.parse(localStorage.getItem(`project-${id}`)) || [];
    setTasks(storedTasks);
  }, [id]);

  const addTask = () => {
    if (newTask) {
      const updatedTasks = [...tasks, { text: newTask, finished: false }];
      setTasks(updatedTasks);
      // Sauvegarder les tâches dans le localStorage
      firestore.collection("projets").doc(id).update({
        tasks: updatedTasks,
      });
      // Réinitialiser le champ de texte de la nouvelle tâche
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    // Sauvegarder les tâches mises à jour dans le localStorage
    localStorage.setItem(`project-${id}`, JSON.stringify(updatedTasks));
  };

  const editTask = (index) => {
    const updatedTasks = [...tasks];
    const newTaskText = prompt(
      "Modifier la tâche : ",
      updatedTasks[index].text
    );
    if (newTaskText !== null) {
      updatedTasks[index] = { text: newTaskText, finished: false };
      setTasks(updatedTasks);
      // Sauvegarder les tâches mises à jour dans le localStorage
      localStorage.setItem(`project-${id}`, JSON.stringify(updatedTasks));
    }
  };

  const markTaskAsFinished = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], finished: true };
    setTasks(updatedTasks);
    // Sauvegarder les tâches mises à jour dans le localStorage
    localStorage.setItem(`project-${id}`, JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <h2>Projet {projectName}</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.finished ? <s>{task.text}</s> : task.text}
            <button onClick={() => editTask(index)}>Modifier</button>
            <button onClick={() => deleteTask(index)}>Supprimer</button>
            {!task.finished ? (
              <button onClick={() => markTaskAsFinished(index)}>Valider</button>
            ) : null}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Ajouter Tâche</button>
    </div>
  );
};

export default TodoListPage;
