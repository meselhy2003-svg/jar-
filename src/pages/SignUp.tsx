import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentSignup } from '../api/auth';
import { getCountries, getMajors, type Country, type Major } from '../api/lookup';
import './Login.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const YEAR_OPTIONS = [
  { value: 'first', label: 'Year 1 (Freshman)' },
  { value: 'second', label: 'Year 2 (Sophomore)' },
  { value: 'third', label: 'Year 3 (Junior)' },
  { value: 'fourth', label: 'Year 4 (Senior)' },
];

// ─── Initial Form State ───────────────────────────────────────────────────────

const INITIAL_FORM = {
  fullName: '',
  university: '',
  faculty: '',
  major: '',
  year: 'first',
  email: '',
  password: '',
  phoneNumber: '',
  country: '',
};

// ─── Component ────────────────────────────────────────────────────────────────

const SignUp = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [studentIdImage, setStudentIdImage] = useState<File | null>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [lookupLoading, setLookupLoading] = useState(true);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  // ─── Fetch dropdowns on mount ───────────────────────────────────────────────

  useEffect(() => {
    const fetchLookupData = async () => {
      try {
        const [countriesData, majorsData] = await Promise.all([
          getCountries(),
          getMajors(),
        ]);
        setCountries(countriesData);
        setMajors(majorsData);
      } catch {
        setLookupError('Failed to load form options. Please refresh the page.');
      } finally {
        setLookupLoading(false);
      }
    };

    fetchLookupData();
  }, []);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentIdImage(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await studentSignup({
        ...formData,
        StudentIdImage: studentIdImage,
      });

      setAuthUser(response.data);
      navigate('/student/dashboard', { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="auth-page animate-fade-in container">
      <div className="auth-split-wrapper">
        {/* Left Illustration */}
        <div className="auth-illustration-side mint-box">
          <div className="illustration-content text-center">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
              alt="Register Illustration"
              className="auth-img"
            />
            <h3>Elevate Your Academic Journey.</h3>
            <p>
              Create your student account to access personalized tutoring,
              assignment reviews, and exam preparation.
            </p>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="auth-form-side dark-card">
          <div className="auth-header">
            <h2>Create Your Account</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Fill in your academic details to get started.
            </p>
          </div>

          {/* Error alerts */}
          {lookupError && (
            <div className="auth-error" role="alert">
              {lookupError}
            </div>
          )}
          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Row: Full Name + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Ahmed Hassan"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  placeholder="+201012345678"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Row: University + Faculty */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="university">University</label>
                <input
                  id="university"
                  type="text"
                  name="university"
                  placeholder="Cairo University"
                  value={formData.university}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="faculty">Faculty</label>
                <input
                  id="faculty"
                  type="text"
                  name="faculty"
                  placeholder="Faculty of Engineering"
                  value={formData.faculty}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Row: Major + Academic Year */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="major">Major</label>
                <select
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  disabled={isLoading || lookupLoading}
                  required
                >
                  <option value="">
                    {lookupLoading ? 'Loading majors…' : 'Select a major'}
                  </option>
                  {majors.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Academic Year</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  {YEAR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country */}
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={isLoading || lookupLoading}
                required
              >
                <option value="">
                  {lookupLoading ? 'Loading countries…' : 'Select your country'}
                </option>
                {countries.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Student ID Image */}
            <div className="form-group">
              <label htmlFor="studentIdImage">Student ID Image</label>
              <input
                id="studentIdImage"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
                style={{ paddingTop: '0.4rem' }}
              />
              {studentIdImage && (
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.25rem',
                    display: 'block',
                  }}
                >
                  Selected: {studentIdImage.name}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary auth-submit"
              disabled={isLoading || lookupLoading}
            >
              {isLoading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
