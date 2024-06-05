import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const studentsPerPage = 9;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://64f6fee49d7754084952eda8.mockapi.io/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStudents(data); // Reverse the data here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Pagination calculation
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        <div className="w-40 bg-blue-700 flex flex-col items-center py-4">
          <div className="w-12 h-12 flex items-center justify-center mb-auto">
            <img src='/logo.jpg' alt="Logo" className="w-12 h-12 mt-12" />
          </div>
          <div className="flex-grow flex flex-col items-center space-y-8 justify-center">
            <div className="relative group flex items-center space-x-4 cursor-pointer" onClick={() => setSelectedIcon('user')}>
              {selectedIcon === 'user' && <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white"></div>}
              <img
                src='/user1.png'
                alt="Icon"
                className={`w-6 h-6 ${selectedIcon === 'user' ? 'bg-purple-800 rounded-full' : ''}`}
              />
              <h1 className='text-white'>Add user</h1>
            </div>
            <div className="relative group flex items-center space-x-4 cursor-pointer" onClick={() => setSelectedIcon('file')}>
              {selectedIcon === 'file' && <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white"></div>}
              <img
                src='/file1.png'
                alt="Icon"
                className={`w-6 h-6 ${selectedIcon === 'file' ? 'bg-purple-800 rounded-full' : ''}`}
              />
              <h1 className='text-white'>Admin list</h1>
            </div>
            <div className="relative group flex items-center space-x-4 cursor-pointer" onClick={() => setSelectedIcon('setting')}>
              {selectedIcon === 'setting' && <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white"></div>}
              <img
                src='/setting1.png'
                alt="Icon"
                className={`w-6 h-6 ${selectedIcon === 'setting' ? 'bg-purple-800 rounded-full' : ''}`}
              />
              <h1 className='text-white'>Settings</h1>
            </div>
            <div className="relative group flex items-center space-x-4 cursor-pointer" onClick={() => setSelectedIcon('hat')}>
              {selectedIcon === 'hat' && <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white"></div>}
              <img
                src='/hat1.png'
                alt="Icon"
                className={`w-6 h-6 ${selectedIcon === 'hat' ? 'bg-purple-800 rounded-full' : ''}`}
              />
              <h1 className='text-white'>Organiz</h1>
            </div>
          </div>
          <div className="mt-auto">
            <img src='/logout.png' alt="Logout Icon" className="w-10 h-10 mb-12 cursor-pointer" onClick={handleLogout} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg ml-12 mt-12 mr-8 mb-6 shadow-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-0">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold">List of Admin</h1>
              <span className="bg-gray-200 text-cyan-700 rounded-full px-3 py-1 text-sm">{students.length}</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="border border-zinc-300 rounded-full px-12 py-2 mr-6"
              />
              <img
                src='/file2.png'
                alt="Icon"
                className="w-8 h-8"
              />
              <img
                src='/bell.png'
                alt="Icon"
                className="w-8 h-8"
              />
            </div>
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex justify-between items-center mb-4">
            <select className="border border-zinc-300 bg-cyan-600 rounded-full px-4 py-2">
              <option>Select Company</option>
              <option>cognisite</option>
            </select>
            <button className="bg-cyan-600 text-black rounded-full px-4 py-2 flex items-center space-x-2">
              <img src='/user1.png' className='w-8 h-8' alt="Add Icon" />
              <span>Add a student</span>
            </button>
          </div>

          <div className="flex-grow overflow-x-auto">
            <table className="min-w-full border bg-white">
              <thead>
                <tr className="w-full bg-cyan-600 text-left">
                  <th className="py-3 px-4">S.No</th>
                  <th className="py-3 px-4">Photo</th>
                  <th className="py-3 px-4">Admin name</th>
                  <th className="py-3 px-4">Organization</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Address</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <tr key={student.id} className="border-b">
                      <td className="py-3 px-4">{indexOfFirstStudent + index + 1}</td>
                      <td className="py-3 px-4">
                        <img src={`https://randomuser.me/api/portraits/med/men/${index % 100}.jpg`} alt="Admin Photo" className="w-8 h-8 rounded-full" />
                      </td>
                      <td className="py-3 px-4">{student.Adminname}</td>
                      <td className="py-3 px-4">{student.organization}</td>
                      <td className="py-3 px-4">{student.email}</td>
                      <td className="py-3 px-4">{student.mobile}</td>
                      <td className="py-3 px-4">{student.address}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-zinc-200 text-zinc-700 rounded-full px-4 py-2"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-zinc-500">{currentPage} of {totalPages}</span>
            <button
              className="bg-zinc-200 text-zinc-700 rounded-full px-4 py-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
