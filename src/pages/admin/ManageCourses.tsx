import { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import type { Course } from '../../context/CourseContext';
import CourseFormModal from '../../components/admin/CourseFormModal';
import './ManageCourses.css';

const ManageCourses = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to drop this course? This action cannot be undone.')) {
      deleteCourse(id);
    }
  };

  const handleSubmit = (courseData: any) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, courseData);
    } else {
      addCourse(courseData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="manage-courses-page">
      <div className="manage-header">
        <div>
          <h1>Manage Courses</h1>
          <p className="subtitle">Add, edit, or drop courses from the platform.</p>
        </div>
        <button className="btn-primary" onClick={handleOpenAdd}>+ Add New Course</button>
      </div>

      <div className="courses-table-container glass-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>No courses found. Add one!</td>
              </tr>
            ) : (
              courses.map(course => (
                <tr key={course.id}>
                  <td>
                    <div className="table-course-title">
                      <img src={course.image} alt={course.title} className="table-course-img" />
                      <span>{course.title}</span>
                    </div>
                  </td>
                  <td><span className="status-badge success">{course.category}</span></td>
                  <td>{course.instructor}</td>
                  <td>${course.price.toFixed(2)}</td>
                  <td>{course.students.toLocaleString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-secondary edit-btn" onClick={() => handleOpenEdit(course)}>Edit</button>
                      <button className="btn-secondary drop-btn" onClick={() => handleDelete(course.id)}>Drop</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CourseFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingCourse}
      />
    </div>
  );
};

export default ManageCourses;
