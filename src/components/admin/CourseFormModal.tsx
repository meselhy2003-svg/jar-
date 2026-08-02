import { useState, useEffect } from 'react';
import type { Course } from '../../context/CourseContext';
import './CourseFormModal.css';

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: any) => void;
  initialData?: Course | null;
}

const CourseFormModal = ({ isOpen, onClose, onSubmit, initialData }: CourseFormModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    category: 'Development',
    price: 0,
    image: '',
    description: '',
    syllabusText: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        instructor: initialData.instructor,
        category: initialData.category,
        price: initialData.price,
        image: initialData.image,
        description: initialData.description,
        syllabusText: initialData.syllabus.join('\n')
      });
    } else {
      setFormData({
        title: '', instructor: '', category: 'Development', price: 0, image: '', description: '', syllabusText: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      syllabus: formData.syllabusText.split('\n').filter(s => s.trim() !== '')
    };
    onSubmit(payload);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-fade-in">
        <div className="modal-header">
          <h2>{initialData ? 'Edit Course' : 'Add New Course'}</h2>
          <button className="icon-btn close-btn" onClick={onClose}>✕</button>
        </div>
        
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Instructor</label>
              <input required type="text" value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Backend">Backend</option>
                <option value="Data Science">Data Science</option>
                <option value="Security">Security</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input required type="url" placeholder="https://..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div className="form-group">
            <label>Syllabus (One module per line)</label>
            <textarea required rows={4} value={formData.syllabusText} onChange={e => setFormData({...formData, syllabusText: e.target.value})}></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{initialData ? 'Save Changes' : 'Create Course'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;
