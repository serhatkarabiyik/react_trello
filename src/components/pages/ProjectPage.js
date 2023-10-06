import { addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { getAllProjects,  projectCollection} from "../../firebase";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../signUp/Auth";
import { Link } from "react-router-dom";

export default function ProjectPage() {
  const user = useContext(AuthContext);
  const userId = user.uid;
  const [projects, setProjects] = useState([]);
  const [userProjects, setUserProjects] = useState();
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        // Filtrer les projets de l'utilisateur actuel
        const userProjects = allProjects.filter((project) => project.userId === userId);
        setProjects(userProjects);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets : ", error);
      }
    };

    fetchProjects();
  }, [userId]);

  const addProject = async () => {
    if (newProjectName) {
      try {
        // Ajouter le nouveau projet à la collection "projets" dans Firestore
        const projectRef = await addDoc(projectCollection, {
          userId: userId,
          projectName: newProjectName,
          tasks: [],
        });
  
        // Mettre à jour l'état local avec le nouveau projet
        const newProject = {
          id: projectRef.id,
          userId: userId,
          projectName: newProjectName,
          tasks: [],
        };
  
        setUserProjects([...userProjects, newProject]);
        setNewProjectName("");
      } catch (error) {
        console.error("Erreur lors de l'ajout du projet : ", error);
      }
    }
  };


  const deleteProject = async (projectId) => {
    try {
      // Supprimer le projet de la collection "projects" dans Firestore
      await deleteDoc(doc(projectCollection, projectId));

      // Mettre à jour l'état local en supprimant le projet
      const updatedProjects = userProjects.filter((project) => project.id !== projectId);
      setUserProjects(updatedProjects);
    } catch (error) {
      console.error("Erreur lors de la suppression du projet : ", error);
    }
  };

  const updateProjectName = async (projectId) => {
    const newName = prompt("Entrez le nouveau nom du projet:");
    if (newName) {
      try {
        // Mettre à jour le nom du projet dans la collection "projects" dans Firestore
        await updateDoc(doc(projectCollection, projectId), {
          projectName: newName,
        });

        // Mettre à jour l'état local avec le nom du projet modifié
        const updatedProjects = userProjects.map((project) =>
          project.id === projectId ? { ...project, projectName: newName } : project
        );
        setUserProjects(updatedProjects);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du nom du projet : ", error);
      }
    }
  };

  const markAsFinished = async (projectId) => {
    try {
      // Mettre à jour l'état de terminé du projet dans la collection "projects" dans Firestore
      await updateDoc(doc(projectCollection, projectId), {
        finished: true,
      });

      // Mettre à jour l'état local avec le projet marqué comme terminé
      const updatedProjects = userProjects.map((project) =>
        project.id === projectId ? { ...project, finished: true } : project
      );
      setUserProjects(updatedProjects);
    } catch (error) {
      console.error("Erreur lors du marquage du projet comme terminé : ", error);
    }
  };

  return (
    <div>
      <h1>Liste des Projets</h1>
      <input
        type="text"
        placeholder="Nom du Nouveau Projet"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <button onClick={addProject}>Nouveau Projet</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name || `Projet ${project.id}`}</Link>
            {project.finished ? <span style={{ marginLeft: "10px", color: "green" }}>Terminé</span> : null}
            <button onClick={() => deleteProject(project.id)}>Supprimer</button>
            <button onClick={() => updateProjectName(project.id)}>Modifier</button>
            {!project.finished ? <button onClick={() => markAsFinished(project.id)}>Valider</button> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
