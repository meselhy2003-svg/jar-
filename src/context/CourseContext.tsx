import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  description: string;
  syllabus: string[];
}

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'rating' | 'students'>) => void;
  updateCourse: (id: string, updatedCourse: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const DEFAULT_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced React & Next.js Masterclass',
    instructor: 'Sarah Jenkins',
    category: 'Development',
    price: 129.99,
    rating: 4.9,
    students: 12500,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    description: 'Master modern React from the ground up, including hooks, context, state management, and server-side rendering with Next.js.',
    syllabus: ['Introduction to Advanced React Patterns', 'State Management Mastery', 'Next.js 14 App Router', 'Performance Optimization']
  },
  {
    id: '2',
    title: 'UI/UX Design for Web Applications',
    instructor: 'Alex Rivera',
    category: 'Design',
    price: 89.99,
    rating: 4.8,
    students: 8430,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    description: 'Learn how to design beautiful, user-friendly web applications using Figma and modern design principles.',
    syllabus: ['Color Theory & Typography', 'Wireframing', 'High Fidelity Prototyping', 'Design Handoff']
  }
];

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('jar_courses');
    if (saved) {
      return JSON.parse(saved);
    }
    return DEFAULT_COURSES;
  });

  useEffect(() => {
    localStorage.setItem('jar_courses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = (courseData: Omit<Course, 'id' | 'rating' | 'students'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      rating: 5.0, // Default rating for new courses
      students: 0  // Default students for new courses
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (id: string, updatedCourse: Partial<Course>) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updatedCourse } : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
