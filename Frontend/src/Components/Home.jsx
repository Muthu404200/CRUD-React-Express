import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
    const [item, setItem] = useState([]);
    const [data, setData] = useState({ name: '', age: '', email: '' });
    const [editingId, setEditingId] = useState(null); // Track which item is being edited

    useEffect(() => {
        axios
            .get('http://localhost:8086/api/')
            .then((res) => setItem(res.data))
            .catch((err) => console.log(err));
    }, []);

    const addItem = () => {
        if (editingId) {
            // If editingId is set, we're in edit mode, so we update the item
            axios
                .put(`http://localhost:8086/api/${editingId}`, data)
                .then((res) => {
                    const updatedItem = res.data;
                    setItem(
                        item.map((i) => (i._id === updatedItem._id ? updatedItem : i))
                    );
                    // Reset fields after update
                    setData({ name: '', age: '', email: '' });
                    setEditingId(null); // Reset edit mode
                })
                .catch((err) => console.log(err));
        } else {
            // If no editingId, it's a new item, so we add it
            axios
                .post('http://localhost:8086/api/', data)
                .then((res) => {
                    setItem([...item, res.data]);
                    setData({ name: '', age: '', email: '' });
                })
                .catch((err) => console.log(err));
        }
    };

    const delItem = (id) => {
        axios
            .delete(`http://localhost:8086/api/${id}`)
            .then(() => setItem(item.filter((list) => list._id !== id)))
            .catch((err) => {
                console.log(err);
            });
    };

    const editItem = (id) => {
        const itemToEdit = item.find((i) => i._id === id);
        setData({
            name: itemToEdit.name,
            age: itemToEdit.age,
            email: itemToEdit.email,
        });
        setEditingId(id); // Set editing mode on
    };

    return (
        <>
            <div className="getdata">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Age"
                    name="age"
                    value={data.age}
                    onChange={(e) => setData({ ...data, age: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <button onClick={addItem}>
                    {editingId ? 'Update' : 'Add'} {/* Change button text based on mode */}
                </button>
            </div>

            <div className="content-box">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map((items) => (
                            <tr key={items._id}>
                                <td>{items.name}</td>
                                <td>{items.age}</td>
                                <td>{items.email}</td>
                                <td>
                                    <button onClick={() => editItem(items._id)}>
                                        Edit
                                    </button>
                                    <button onClick={() => delItem(items._id)}>
                                        Del
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;
