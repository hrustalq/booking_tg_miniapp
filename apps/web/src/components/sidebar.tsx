import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    // ... existing sidebar code
    <Link to="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-700">
      <FaUser />
      <span>Профиль</span>
    </Link>
    // ... rest of the sidebar
  );
};

export default Sidebar;