import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookSession = () => {
  const [sessionType, setSessionType] = useState('hourly');
  const [subject, setSubject] = useState('');
  const [instructor, setInstructor] = useState('Sarah Jenkins');
  const [date, setDate] = useState('');
  const [material, setMaterial] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMaterial(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  return (
    <div className="book-session-page container animate-fade-in" style={{ paddingTop: '3rem', paddingBottom: '6rem', maxWidth: '800px' }}>
      <div className="section-title-wrap text-center" style={{ marginBottom: '3rem' }}>
        <h1>Book 1-on-1 Session</h1>
        <p className="section-subtitle">Select your topic, upload your slides or assignment PDF, and choose a time.</p>
      </div>

      {!isConfirmed ? (
        <div className="dark-card" style={{ padding: '3rem' }}>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Session Type</label>
              <select value={sessionType} onChange={(e) => setSessionType(e.target.value)}>
                <option value="hourly">Hourly Live Explanation Session ($35.00/hr)</option>
                <option value="package">Full Package Course Trial ($120.00)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Course / Subject Name</label>
              <input 
                type="text" 
                placeholder="e.g. Calculus II / Organic Chemistry / React JS" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Select Preferred Instructor</label>
              <select value={instructor} onChange={(e) => setInstructor(e.target.value)}>
                <option value="Sarah Jenkins">Sarah Jenkins (React & Computer Science)</option>
                <option value="Alex Rivera">Alex Rivera (UI/UX & Design)</option>
                <option value="Michael Chen">Michael Chen (Backend & Engineering)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Preferred Date & Time</label>
              <input 
                type="datetime-local" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Slides / Homework PDF</label>
              <div 
                style={{ 
                  border: '2px dashed rgba(255,255,255,0.2)', 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  textAlign: 'center', 
                  background: 'var(--dark-surface-card)',
                  cursor: 'pointer'
                }}
              >
                <input 
                  type="file" 
                  id="file-upload" 
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', margin: 0, color: 'var(--primary-color)' }}>
                  📁 {material ? `File Selected: ${material}` : "Click to Upload PDF or Lecture Slides"}
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit" style={{ marginTop: '1.5rem', padding: '16px' }}>
              Confirm Order & Pay
            </button>
          </form>
        </div>
      ) : (
        /* Payment Confirmed Success Screen from Figma Image 3 */
        <div className="dark-card text-center animate-fade-in" style={{ padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '1rem' }}>Payment Successful!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Your session for <strong>{subject}</strong> with <strong>{instructor}</strong> has been confirmed.
          </p>

          <div style={{ background: 'var(--dark-surface-card)', padding: '1.5rem', borderRadius: '12px', maxWidth: '400px', margin: '0 auto 2.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Session Type:</span>
              <strong style={{ color: 'white' }}>{sessionType === 'hourly' ? 'Hourly Session' : 'Package Trial'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Total Paid:</span>
              <strong style={{ color: 'var(--primary-color)' }}>${sessionType === 'hourly' ? '35.00' : '120.00'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => navigate('/my-orders')}>View My Orders</button>
            <button className="btn-secondary" onClick={() => setIsConfirmed(false)}>Book Another Session</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSession;
