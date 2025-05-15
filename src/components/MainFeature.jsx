import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Icon declarations
const UserPlusIcon = getIcon('UserPlus');
const UserIcon = getIcon('User');
const MailIcon = getIcon('Mail');
const PhoneIcon = getIcon('Phone');
const BriefcaseIcon = getIcon('Briefcase');
const BuildingIcon = getIcon('Building');
const CalendarIcon = getIcon('Calendar');
const ChevronDownIcon = getIcon('ChevronDown');
const CheckIcon = getIcon('Check');
const XIcon = getIcon('X');
const SearchIcon = getIcon('Search');
const SlidersIcon = getIcon('Sliders');
const FilterIcon = getIcon('Filter');
const TrashIcon = getIcon('Trash');
const EditIcon = getIcon('Edit');

export default function MainFeature() {
  // Demo employee data
  const employeeData = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@staffhub.com", phone: "(555) 123-4567", department: "Engineering", position: "Frontend Developer", status: "active", joinDate: "2022-04-15" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@staffhub.com", phone: "(555) 987-6543", department: "Design", position: "UI/UX Designer", status: "active", joinDate: "2021-11-08" },
    { id: 3, firstName: "Michael", lastName: "Johnson", email: "michael.j@staffhub.com", phone: "(555) 456-7890", department: "Marketing", position: "Content Strategist", status: "on leave", joinDate: "2023-01-22" },
    { id: 4, firstName: "Emily", lastName: "Williams", email: "emily.w@staffhub.com", phone: "(555) 234-5678", department: "Human Resources", position: "HR Specialist", status: "active", joinDate: "2022-08-10" },
    { id: 5, firstName: "Robert", lastName: "Brown", email: "robert.b@staffhub.com", phone: "(555) 345-6789", department: "Engineering", position: "Backend Developer", status: "active", joinDate: "2022-05-18" },
    { id: 6, firstName: "Sarah", lastName: "Miller", email: "sarah.m@staffhub.com", phone: "(555) 567-8901", department: "Finance", position: "Financial Analyst", status: "terminated", joinDate: "2021-03-14" },
  ];

  const departments = ["All Departments", "Engineering", "Design", "Marketing", "Human Resources", "Finance"];
  
  const [employees, setEmployees] = useState(employeeData);
  const [filteredEmployees, setFilteredEmployees] = useState(employeeData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");  
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [showFilters, setShowFilters] = useState(false);
  
  // Form state
  const [newEmployee, setNewEmployee] = useState({
    id: Math.max(...employees.map(e => e.id), 0) + 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    status: "active",
    joinDate: new Date().toISOString().slice(0, 10)
  });
  
  // Form validation
  const [errors, setErrors] = useState({});

  // Apply filters when search or department selection changes
  useEffect(() => {
    let filtered = [...employees];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(emp => 
        emp.firstName.toLowerCase().includes(query) || 
        emp.lastName.toLowerCase().includes(query) || 
        emp.email.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query)
      );
    }
    
    // Apply department filter
    if (selectedDepartment !== "All Departments") {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }
    
    setFilteredEmployees(filtered);
  }, [searchQuery, selectedDepartment, employees]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!newEmployee.firstName.trim()) newErrors.firstName = "First name is required";
    if (!newEmployee.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!newEmployee.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(newEmployee.email)) newErrors.email = "Email is invalid";
    if (!newEmployee.department.trim()) newErrors.department = "Department is required";
    if (!newEmployee.position.trim()) newErrors.position = "Position is required";
    if (!newEmployee.joinDate) newErrors.joinDate = "Join date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (editingEmployee) {
      handleUpdateEmployee();
    
    // Add new employee
    setEmployees(prev => [...prev, { ...newEmployee }]);
    
    // Reset form and hide it
    setNewEmployee({
      id: Math.max(...employees.map(e => e.id), 0) + 2,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      status: "active",
      joinDate: new Date().toISOString().slice(0, 10)
    });
    setShowAddForm(false);
    
    // Show success toast
    toast.success("Employee added successfully!");
  };
    } else {
      handleAddEmployee();
    }
  };

  const handleAddEmployee = () => {
    // Add new employee
    setEmployees(prev => [...prev, { ...newEmployee }]);
    
    // Reset form and hide it
    setNewEmployee({
      id: Math.max(...employees.map(e => e.id), 0) + 2,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      status: "active",
      joinDate: new Date().toISOString().slice(0, 10)
    });
    setShowAddForm(false);
    
    // Show success toast
    toast.success("Employee added successfully!");
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({ ...employee });
    setShowAddForm(true);
    setErrors({});
  };
  
  const handleDeleteEmployee = (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast.success("Employee deleted successfully!");
    }
  };

  const handleUpdateEmployee = () => {
    // Update existing employee
    setEmployees(prev => 
      prev.map(emp => emp.id === editingEmployee.id ? { ...newEmployee } : emp)
    );
    
    // Reset form and hide it
    setNewEmployee({
      id: Math.max(...employees.map(e => e.id), 0) + 2,
      firstName: "", lastName: "", email: "", phone: "", department: "",
      position: "", status: "active", joinDate: new Date().toISOString().slice(0, 10)
    });
    setShowAddForm(false);
    setEditingEmployee(null);
    toast.success("Employee updated successfully!");
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'on leave': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'terminated': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-200';
    }
  };
  
  return (
    <div className="card mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold">Employee Directory</h3>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search employees..."
              className="input-field pl-9 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex-shrink-0"
            >
              <FilterIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <button 
              onClick={() => setShowAddForm(true)}
              disabled={editingEmployee !== null}
              className="btn btn-primary flex-shrink-0"
              onClickCapture={() => {
                setEditingEmployee(null);
              }}
            >
              <UserPlusIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Add Employee</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-800">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-auto">
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <select 
                    className="input-field" 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select className="input-field">
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>On Leave</option>
                    <option>Terminated</option>
                  </select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <label className="block text-sm font-medium mb-1">Join Date</label>
                  <select className="input-field">
                    <option>Any Date</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add Employee Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-5 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-800">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg">
                  {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h4>
                <button 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingEmployee(null);
                  }}
                  className="p-1 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-full"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name *</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
                      <input
                        type="text"
                        name="firstName"
                        className={`input-field pl-9 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="First name"
                        value={newEmployee.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name *</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
                      <input
                        type="text"
                        name="lastName"
                        className={`input-field pl-9 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Last name"
                        value={newEmployee.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
                      <input
                        type="email"
                        name="email"
                        className={`input-field pl-9 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="email@example.com"
                        value={newEmployee.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
                      <input
                        type="tel"
                        name="phone"
                        className="input-field pl-9"
                        placeholder="(555) 123-4567"
                        value={newEmployee.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Department *</label>
                    <div className="relative">
                      <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
                      <select
                        name="department"
                        className={`input-field pl-9 ${errors.department ? 'border-red-500 focus:ring-red-500' : ''}`}
                        value={newEmployee.department}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Department</option>
                        {departments.filter(d => d !== "All Departments").map((dept, index) => (
                          <option key={index} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Position *</label>
                    <div className="relative">
                      <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
                      <input
                        type="text"
                        name="position"
                        className={`input-field pl-9 ${errors.position ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Job Title"
                        value={newEmployee.position}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Join Date *</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
                      <input
                        type="date"
                        name="joinDate"
                        className={`input-field pl-9 ${errors.joinDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                        value={newEmployee.joinDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.joinDate && <p className="text-red-500 text-xs mt-1">{errors.joinDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      name="status"
                      className="input-field"
                      value={newEmployee.status}
                      onChange={handleInputChange}
                    >
                      <option value="active">Active</option>
                      <option value="on leave">On Leave</option>
                      <option value="terminated">Terminated</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingEmployee(null);
                    }}
                    className="btn border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <CheckIcon className="h-4 w-4" />
                    <span>
                      {editingEmployee ? 'Update Employee' : 'Save Employee'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Employee Table */}
      <div className="overflow-x-auto -mx-5">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-surface-200 dark:border-surface-700 rounded-lg">
            <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
              <thead className="bg-surface-50 dark:bg-surface-800">
                <tr>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-surface-700 dark:text-surface-300 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-surface-700 dark:text-surface-300 uppercase tracking-wider hidden md:table-cell">
                    Contact
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-surface-700 dark:text-surface-300 uppercase tracking-wider hidden sm:table-cell">
                    Department
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-surface-700 dark:text-surface-300 uppercase tracking-wider hidden lg:table-cell">
                    Join Date
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-surface-700 dark:text-surface-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right text-xs font-semibold text-surface-700 dark:text-surface-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors duration-150">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                            <span className="font-semibold">{employee.firstName[0]}{employee.lastName[0]}</span>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                            <div className="text-sm text-surface-500">{employee.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm">{employee.email}</div>
                        <div className="text-sm text-surface-500">{employee.phone}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm">{employee.department}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                        {new Date(employee.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditEmployee(employee)}
                            className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-600 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light"
                          >
                            <EditIcon className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-600 text-surface-600 dark:text-surface-300 hover:text-red-500 dark:hover:text-red-400"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-sm text-surface-500">
                      <div className="flex flex-col items-center">
                        <SearchIcon className="h-8 w-8 text-surface-400 mb-2" />
                        <p>No employees found matching your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {filteredEmployees.length > 0 && (
        <div className="flex justify-between items-center mt-4 text-sm text-surface-600 dark:text-surface-400">
          <div>
            Showing <span className="font-medium">{filteredEmployees.length}</span> of <span className="font-medium">{employees.length}</span> employees
          </div>
          <div className="flex items-center gap-2">
            <span>Page 1 of 1</span>
          </div>
        </div>
      )}
    </div>
  );
}