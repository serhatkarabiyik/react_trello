import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectPage() {
  const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  const [projects, setProjects] = useState(storedProjects);
  const [newProjectName, setNewProjectName] = useState("");

  const addProject = () => {
    if (newProjectName) {
      const newProjectId = projects.length + 1;
      const newProjects = [...projects, { id: newProjectId, name: newProjectName, finished: false }];
      setProjects(newProjects);
      localStorage.setItem("projects", JSON.stringify(newProjects));
      setNewProjectName("");
    }
  };

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    localStorage.removeItem(`project-name-${projectId}`);
    localStorage.removeItem(`project-${projectId}`);
  };

  const updateProjectName = (projectId) => {
    const newName = prompt("Entrez le nouveau nom du projet:");
    if (newName) {
      const updatedProjects = projects.map((project) =>
        project.id === projectId ? { ...project, name: newName } : project
      );
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    }
  };

  const markAsFinished = (projectId) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, finished: true } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
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
