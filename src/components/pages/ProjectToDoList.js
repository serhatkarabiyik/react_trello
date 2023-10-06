import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { projectCollection } from "../../firebase";
import { Button, TextField } from "@mui/material";

const TodoListPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectDoc = doc(projectCollection, id);
        const projectSnapshot = await getDoc(projectDoc);
        if (projectSnapshot.exists()) {
          const projectData = projectSnapshot.data();
          setProjectName(projectData.projectName || `Projet ${id}`);
          setTasks(projectData.tasks || []);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du projet :",
          error
        );
      }
    };

    fetchProjectData();
  }, [id]);

  const addTask = async () => {
    if (newTask) {
      try {
        const updatedTasks = [...tasks, { text: newTask, finished: false }];
        await updateDoc(doc(projectCollection, id), {
          tasks: updatedTasks,
        });
        setTasks(updatedTasks);
        setNewTask("");
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche :", error);
      }
    }
  };

  const deleteTask = async (index) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      await updateDoc(doc(projectCollection, id), {
        tasks: updatedTasks,
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  const editTask = (index) => {
    const updatedTasks = [...tasks];
    const newTaskText = prompt("Modifier la tâche :", updatedTasks[index].text);
    if (newTaskText !== null) {
      updatedTasks[index] = { text: newTaskText, finished: false };
      setTasks(updatedTasks);
      updateTaskData(updatedTasks);
    }
  };

  const markTaskAsFinished = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], finished: true };
    setTasks(updatedTasks);
    updateTaskData(updatedTasks);
  };

  const updateTaskData = async (updatedTasks) => {
    try {
      await updateDoc(doc(projectCollection, id), {
        tasks: updatedTasks,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des tâches :", error);
    }
  };

  return (
    <div>
      <h2>Projet {projectName}</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.finished ? <s>{task.text}</s> : task.text}
            <Button className="secondary-btn" onClick={() => editTask(index)}>
              Modifier
            </Button>
            <Button className="secondary-btn" onClick={() => deleteTask(index)}>
              Supprimer
            </Button>

            {!task.finished ? (
              <Button
                className="secondary-btn"
                onClick={() => markTaskAsFinished(index)}
              >
                Valider
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
      <div>
        <TextField
          id="standard-basic"
          label="Nouvelle tâche"
          variant="standard"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      <Button className="primary-btn" onClick={addTask}>
        Ajouter Tâche
      </Button>
    </div>
  );
};

export default TodoListPage;
