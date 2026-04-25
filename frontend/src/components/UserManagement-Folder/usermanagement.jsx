import styles from "./usermanagement.module.css";
import AddUserPopup from "./adduserpopup";
import RemoveUserPopup from "./removeuserpopup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UserManagement() {
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Load users from localStorage on component mount
    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            // Default demo users with time included
            const defaultUsers = [
                { id: 1, username: "admin", role: "admin", createdAt: "2026-04-25T09:30:00" },
                { id: 2, username: "john_doe", role: "user", createdAt: "2026-04-25T14:45:00" },
                { id: 3, username: "jane_smith", role: "user", createdAt: "2026-04-24T11:20:00" },
                { id: 4, username: "mike_wilson", role: "admin", createdAt: "2026-04-23T16:10:00" },
                { id: 5, username: "sarah_brown", role: "user", createdAt: "2026-04-22T10:05:00" },
            ];
            setUsers(defaultUsers);
            localStorage.setItem("users", JSON.stringify(defaultUsers));
        }
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleUserAdded = (newUser) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    const handleUserRemoved = (username) => {
        const updatedUsers = users.filter(user => user.username !== username);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.usermantitle1}>User Management</h1>
                <button className={styles.backbutton} onClick={() => navigate("/welcomeadmin")}>Back</button>
            </div>
            <hr className={styles.line1} />
            <button className={styles.adduserbutton} onClick={() => setShowAdd(true)}>Add User</button>
            <button className={styles.removeuserbutton} onClick={() => setShowRemove(true)}>Remove User</button>
            <h1 className={styles.recent}>Most Recent</h1>
            <input 
                type="search" 
                placeholder="Search..." 
                className={styles.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* Table Header */}
            <div className={styles.tableHeader}>
                <div className={styles.headerCell}>Users</div>
                <div className={styles.headerCell}>Role</div>
                <div className={styles.headerCell}>Created On</div>
            </div>
            <hr className={styles.line2} />
            
            {/* Table Body - User List */}
            <div className={styles.tableBody}>
                {filteredUsers.length === 0 ? (
                    <div className={styles.emptyRow}>
                        <p>No users found</p>
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                        <div key={user.id} className={styles.tableRow}>
                            <div className={styles.cell}>{user.username}</div>
                            <div className={styles.cell}>
                                <span className={user.role === "admin" ? styles.adminBadge : styles.userBadge}>
                                    {user.role || "user"}
                                </span>
                            </div>
                            <div className={styles.cell}>{formatDateTime(user.createdAt)}</div>
                        </div>
                    ))
                )}
            </div>

            {showAdd && <AddUserPopup 
                onClose={() => setShowAdd(false)} 
                onUserAdded={handleUserAdded}
                existingUsers={users}
            />}
            {showRemove && <RemoveUserPopup 
                onClose={() => setShowRemove(false)} 
                onUserRemoved={handleUserRemoved}
                users={users}
            />}
        </div>
    );
}

export default UserManagement;