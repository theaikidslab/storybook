import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age_group: "",
    gender: "",
    topic: "",
    tone: "",
    other_info: "",
  });

  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStory(null);

    try {
      // const response = await fetch("http://127.0.0.1:8000/generate_story", {
      const response = await fetch("https://orange-disco-4jvjr7j6gxrg2j9x9-5000.app.github.dev/generate_story", {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setStory(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Storybook Generator</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Child's Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Age Group:
            <select
              name="age_group"
              value={formData.age_group}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="4-8">4-8</option>
              <option value="9-12">9-12</option>
            </select>
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Topic:
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tone:
            <input
              type="text"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Other Info:
            <textarea
              name="other_info"
              value={formData.other_info}
              onChange={handleChange}
            ></textarea>
          </label>

          <button type="submit">Generate Story</button>
        </form>

        {story && (
          <div className="story">
            <h2>Your Story:</h2>
            <p>{story}</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;