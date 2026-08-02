import { Link } from 'react-router-dom';
import './CourseCard.css';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  price: number;
  rating: number;
  students: number;
  image: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="course-card glass-panel">
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        <span className="course-category">{course.category}</span>
      </div>
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">by {course.instructor}</p>
        
        <div className="course-stats">
          <div className="rating">
            <span className="star">★</span> {course.rating}
          </div>
          <div className="students">
            {course.students.toLocaleString()} students
          </div>
        </div>
        
        <div className="course-footer">
          <div className="price">${course.price}</div>
          <Link to={`/courses/${course.id}`} className="btn-secondary enroll-btn">View Course</Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
