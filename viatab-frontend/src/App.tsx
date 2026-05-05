import { useEffect, useState } from "react";
import { api } from "./api";
import { Story } from "./types";

const DEPARTMENTS = ["All", "IT", "Business", "Health"];

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[1]);
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchStories = async () => {
    try {
      const res = await api.get("/stories");
      setStories(res.data);
    } catch {
      // leave list empty if API is unavailable
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const createStory = async () => {
    if (!title.trim() || !content.trim()) return;
    await api.post("/stories", { title, department, content });
    setTitle("");
    setContent("");
    await fetchStories();
  };

  const startEdit = (story: Story) => {
    setEditingId(story.id);
    setEditTitle(story.title);
    setEditDepartment(story.department);
    setEditContent(story.content);
  };

  const saveEdit = async (id: number) => {
    await api.put(`/stories/${id}`, {
      title: editTitle,
      department: editDepartment,
      content: editContent
    });
    setEditingId(null);
    await fetchStories();
  };

  const deleteStory = async (id: number) => {
    await api.delete(`/stories/${id}`);
    setStories(prev => prev.filter(s => s.id !== id));
  };

  const allDepts = ["All", ...Array.from(new Set(stories.map(s => s.department)))];
  const visible = activeTab === "All" ? stories : stories.filter(s => s.department === activeTab);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ borderBottom: "3px solid black", paddingBottom: 8 }}>VIA TABLOID</h1>

      <h2>Add Story</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ flex: 2, padding: 6 }}
        />
        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          style={{ flex: 1, padding: 6 }}
        >
          {DEPARTMENTS.slice(1).map(d => <option key={d}>{d}</option>)}
        </select>
        <input
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ flex: 3, padding: 6 }}
        />
        <button onClick={createStory} style={{ padding: "6px 14px" }}>Add</button>
      </div>

      <hr />

      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {allDepts.map(d => (
          <button
            key={d}
            onClick={() => setActiveTab(d)}
            style={{
              padding: "6px 14px",
              fontWeight: activeTab === d ? "bold" : "normal",
              background: activeTab === d ? "#333" : "#eee",
              color: activeTab === d ? "#fff" : "#333",
              border: "none",
              cursor: "pointer"
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {visible.map(s => (
        <div key={s.id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10, borderRadius: 4 }}>
          {editingId === s.id ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{ padding: 6 }} />
              <select value={editDepartment} onChange={e => setEditDepartment(e.target.value)} style={{ padding: 6 }}>
                {DEPARTMENTS.slice(1).map(d => <option key={d}>{d}</option>)}
              </select>
              <textarea value={editContent} onChange={e => setEditContent(e.target.value)} rows={3} style={{ padding: 6 }} />
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => saveEdit(s.id)} style={{ padding: "4px 12px" }}>Save</button>
                <button onClick={() => setEditingId(null)} style={{ padding: "4px 12px" }}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h3 style={{ margin: "0 0 4px" }}>{s.title}</h3>
              <p style={{ margin: "0 0 4px", color: "#888", fontSize: 13 }}>{s.department}</p>
              <p style={{ margin: "0 0 8px" }}>{s.content}</p>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => startEdit(s)}>Edit</button>
                <button onClick={() => deleteStory(s.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}

      {visible.length === 0 && (
        <p style={{ color: "#aaa" }}>No stories in this department yet.</p>
      )}
    </div>
  );
}

export default App;
