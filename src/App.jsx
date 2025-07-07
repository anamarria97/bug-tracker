import React, { useState } from 'react';


const BUG_STATUSES = ["Open", "In Progress", "Resolved"];

function App() {
  const [bugs, setBugs] = useState([
    {
      id: 1,
      title: "Button not clickable",
      description: "The submit button doesn't respond on click",
      status: "Open",
      severity: "High",
    },
    {
      id: 2,
      title: "Page crashes on load",
      description: "Homepage crashes on Firefox",
      status: "In Progress",
      severity: "Critical",
    },
  ]);

  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    severity: "Low",
  });

  const addBug = () => {
    if (!newBug.title.trim()) {
      alert("Title is required");
      return;
    }
    const bug = {
      id: Date.now(),
      ...newBug,
      status: "Open",
    };
    setBugs((prev) => [bug, ...prev]);
    setNewBug({ title: "", description: "", severity: "Low" });
  };

  const changeStatus = (id) => {
    setBugs((prev) =>
      prev.map((bug) => {
        if (bug.id === id) {
          const currentIndex = BUG_STATUSES.indexOf(bug.status);
          const nextStatus = BUG_STATUSES[(currentIndex + 1) % BUG_STATUSES.length];
          return { ...bug, status: nextStatus };
        }
        return bug;
      })
    );
  };

  const deleteBug = (id) => {
    setBugs((prev) => prev.filter((bug) => bug.id !== id));
  }

  return (
   <div className="min-h-screen bg-blue text-white relative overflow-hidden">
<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
  {[...Array(30)].map((_, i) => (
    <div
      key={i}
      className="absolute bg-cyan-700 opacity-40 rounded"
      style={{
        width: '2px',
        height: '100vh',
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        transform: `rotate(45deg)`,
        animation: `rotateTechLine ${10 + i % 5}s linear infinite`,
        animationDelay: `${i * 0.10}s`,
        filter: `drop-shadow(0 0 6px #3b82f6)`,
        transformOrigin: 'center',
      }}
    />
  ))}
</div>

        <div className="relative z-10 max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Bug Tracker Dashboard</h1>

        <div className="bg-neutral-900 p-6 rounded-xl shadow-lg border border-cyan-600 mb-8 transition-shadow duration-300 hover:shadow-cyan-600/50 cursor pointer">
          <h2 className="text-2xl font-semibold mb-4">Add New Bug</h2>
          <input
            type="text"
            placeholder="Title"
            className="bg-neutral-800 border border-cyan-600 p-2 rounded w-full mb-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={newBug.title}
            onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            rows={3}
            className="bg-neutral-800 border border-cyan-600 p-2 rounded w-full mb-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={newBug.description}
            onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
          />
       <select
  className="bg-neutral-800 border border-cyan-600 p-2 rounded w-full mb-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
  value={newBug.severity}
  onChange={(e) => setNewBug({ ...newBug, severity: e.target.value })}
>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
  <option>Critical</option>
   </select>

    <button
     onClick={addBug}
     className="bg-cyan-400 hover:bg-cyan-500 text-white px-4 py-2 rounded transition-transform duration-200 transform hover:scale-105 active:scale-95"
     >
    Add Bug
    </button>

        </div>
        <h2 className="text-2xl font-semibold mb-4">Bugs List</h2>
        <ul className="space-y-4">
          {bugs.map(({ id, title, description, status, severity }) => (
            <li key={id} className="bg-neutral-900 border border-cyan-700 p-4 rounded-lg shadow-md flex justify-between items-start transition-shadow duration-300 hover:shadow-cyan-600/50 cursor pointer"
            onClick={() => changeStatus(id)}
            >
              <div className='flex-1'>
                <h3 className="text-lg font-bold text-cyan-300 truncate">{title}</h3>
                <p className="text-gray-300 text-sm mb-2 hidden sm:block">{description}</p>
                <p className="text-sm">
                  Severity: <span className={
                    severity === 'Critical' ? 'text-cyan-300' :
                    severity === 'High' ? 'text-cyan-300' :
                    severity === 'Medium' ? 'text-cyan-300' : 'text-cyan-300'
                  }>{severity}</span>
                </p>
              </div>
              <button
                onClick={() => changeStatus(id)}
                className={`mt-4 sm:mt-0 ml-0 sm:ml-4 px-3 py-1 text-sm rounded font-medium text-black 
                 ${
                  status === 'Open'
                    ? 'bg-cyan-300 hover:bg-cyan-500'
                    : status === 'In Progress'
                    ? 'bg-cyan-300 hover:bg-cyan-500'
                    : 'bg-cyan-300 hover:bg-cyan-500'
                }`}
              >
                {status} 
              </button>

              {status === "Resolved" && (
              <button
              onClick={() => deleteBug(id)}
              className='mt-4 sm:mt-0 ml-0 sm:ml-4 px-3 py-1 text-sm rounded font-medium text-black bg-cyan-300 hover:bg-cyan-500 transition'>Delete
              </button>
            )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
