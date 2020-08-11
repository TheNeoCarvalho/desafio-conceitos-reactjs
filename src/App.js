import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa';

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      url: "https://github.com/TheNeoCarvalho",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <Button variant="default" onClick={handleAddRepository}><FaPlus /> Add</Button>
      <ul data-testid="repository-list">
        {
          repositories == 0 ? "ops! :)"  : repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}

              <Button variant="danger" type="button" onClick={() => handleRemoveRepository(repository.id)}>
                <FaTrash/>
              </Button>
            </li>
          )
        }
      </ul>

    </div>
  );
}

export default App;