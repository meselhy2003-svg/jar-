import React, { useState } from 'react';
import './FinancialsPricing.css';

interface CountryPricing {
  id: string;
  name: string;
  currency: string;
  studentRecorded: number;
  studentLive: number;
  instructorRecorded: number;
  instructorLive: number;
}

const FinancialsPricing = () => {
  const [view, setView] = useState<'list' | 'add_country'>('list');

  // Country Pricing List
  const [countriesList, setCountriesList] = useState<CountryPricing[]>([
    {
      id: 'egypt',
      name: 'Egypt',
      currency: 'EGP (Egyptian Pound)',
      studentRecorded: 150,
      studentLive: 450,
      instructorRecorded: 90,
      instructorLive: 320
    },
    {
      id: 'saudi',
      name: 'Saudi Arabia',
      currency: 'SAR (Saudi Riyal)',
      studentRecorded: 75,
      studentLive: 200,
      instructorRecorded: 45,
      instructorLive: 140
    },
    {
      id: 'uae',
      name: 'UAE',
      currency: 'AED (Emirati Dirham)',
      studentRecorded: 90,
      studentLive: 250,
      instructorRecorded: 55,
      instructorLive: 180
    }
  ]);

  // Form State for Add/Edit Country
  const [editingId, setEditingId] = useState<string | null>(null);
  const [countryName, setCountryName] = useState('');
  const [phoneCode, setPhoneCode] = useState('20');
  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyName, setCurrencyName] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [studentRecPrice, setStudentRecPrice] = useState('0.00');
  const [studentLivePrice, setStudentLivePrice] = useState('0.00');
  const [instructorRecPrice, setInstructorRecPrice] = useState('0.00');
  const [instructorLivePrice, setInstructorLivePrice] = useState('0.00');

  const handleOpenAdd = () => {
    setEditingId(null);
    setCountryName('');
    setCurrencyCode('');
    setCurrencyName('');
    setCurrencySymbol('');
    setStudentRecPrice('0.00');
    setStudentLivePrice('0.00');
    setInstructorRecPrice('0.00');
    setInstructorLivePrice('0.00');
    setView('add_country');
  };

  const handleEdit = (country: CountryPricing) => {
    setEditingId(country.id);
    setCountryName(country.name);
    setCurrencyCode(country.currency.split(' ')[0]);
    setStudentRecPrice(country.studentRecorded.toString());
    setStudentLivePrice(country.studentLive.toString());
    setInstructorRecPrice(country.instructorRecorded.toString());
    setInstructorLivePrice(country.instructorLive.toString());
    setView('add_country');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this pricing region?')) {
      setCountriesList(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSaveCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryName) return;

    if (editingId) {
      setCountriesList(prev => prev.map(c => c.id === editingId ? {
        ...c,
        name: countryName,
        currency: `${currencyCode} (${currencyName || currencyCode})`,
        studentRecorded: parseFloat(studentRecPrice) || c.studentRecorded,
        studentLive: parseFloat(studentLivePrice) || c.studentLive,
        instructorRecorded: parseFloat(instructorRecPrice) || c.instructorRecorded,
        instructorLive: parseFloat(instructorLivePrice) || c.instructorLive
      } : c));
    } else {
      const newCountry: CountryPricing = {
        id: countryName.toLowerCase().replace(/\s+/g, '-'),
        name: countryName,
        currency: `${currencyCode} (${currencyName || currencyCode})`,
        studentRecorded: parseFloat(studentRecPrice) || 100,
        studentLive: parseFloat(studentLivePrice) || 300,
        instructorRecorded: parseFloat(instructorRecPrice) || 60,
        instructorLive: parseFloat(instructorLivePrice) || 200
      };

      setCountriesList(prev => [...prev, newCountry]);
    }
    setView('list');
  };

  return (
    <div className="financials-pricing-page animate-fade-in">
      <div className="page-header-wrap">
        <h1 className="page-title">Countries Pricing</h1>
        <p className="page-subtitle">
          Manage session prices per country and currency.
        </p>
      </div>

      {/* VIEW 1: Countries Cards Grid (Screenshot 4) */}
      {view === 'list' && (
        <div className="countries-grid-container">
          <div className="countries-cards-three-grid">
            {countriesList.map((c) => (
              <div key={c.id} className="country-pricing-card card">
                <div className="country-head-row">
                  <div className="flag-icon-box">🎴</div>
                  <div>
                    <h3 className="c-name">{c.name}</h3>
                    <span className="c-curr">{c.currency}</span>
                  </div>
                </div>

                {/* For Student Box */}
                <div className="pricing-sub-box student-bg">
                  <span className="box-role-lbl">👤 FOR STUDENT</span>
                  <div className="rates-two-cols">
                    <div>
                      <span className="rate-lbl">Recorded Hour</span>
                      <strong className="rate-val">{c.studentRecorded} $</strong>
                    </div>
                    <div>
                      <span className="rate-lbl">Live Session</span>
                      <strong className="rate-val">{c.studentLive} $</strong>
                    </div>
                  </div>
                </div>

                {/* For Instructor Box */}
                <div className="pricing-sub-box instructor-bg">
                  <span className="box-role-lbl">📑 FOR INSTRUCTOR</span>
                  <div className="rates-two-cols">
                    <div>
                      <span className="rate-lbl">Recorded Hour</span>
                      <strong className="rate-val gold-txt">{c.instructorRecorded} $</strong>
                    </div>
                    <div>
                      <span className="rate-lbl">Live Session</span>
                      <strong className="rate-val gold-txt">{c.instructorLive} $</strong>
                    </div>
                  </div>
                </div>

                {/* Actions Bottom Bar */}
                <div className="c-card-actions-row">
                  <div className="c-icon-btns">
                    <button onClick={() => handleEdit(c)} className="c-icon-btn" title="Edit">✏️</button>
                    <button onClick={() => handleDelete(c.id)} className="c-icon-btn" title="Delete">🗑️</button>
                  </div>
                  <span onClick={() => alert(`Showing pricing breakdown details for ${c.name}`)} className="c-details-link">Details</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dashed Add New Region Tile */}
          <div className="add-region-dashed-card card" onClick={handleOpenAdd}>
            <div className="plus-round-ico">+</div>
            <strong>Add New Region</strong>
            <p>Define pricing strategy for a new market or currency.</p>
          </div>
        </div>
      )}

      {/* VIEW 2: Add Country Pricing Form (Screenshot 5) */}
      {view === 'add_country' && (
        <form onSubmit={handleSaveCountry} className="add-country-form-container animate-fade-in">
          {/* Card 1: Country Information */}
          <div className="pricing-form-card card">
            <div className="form-card-title-row">
              <span className="section-ico">🌐</span>
              <h3>Country Information</h3>
            </div>

            <div className="form-fields-two-grid">
              <div className="form-group">
                <label>Country Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Egypt"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Phone Code</label>
                <div className="prefix-input-wrap">
                  <span>+</span>
                  <input 
                    type="text" 
                    placeholder="20"
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Currency Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. EGP"
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Currency Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Egyptian Pound"
                  value={currencyName}
                  onChange={(e) => setCurrencyName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Currency Symbol</label>
                <input 
                  type="text" 
                  placeholder="e.g. £"
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Pricing Setup */}
          <div className="pricing-form-card card" style={{ marginTop: '1.75rem' }}>
            <div className="form-card-title-row justify-between">
              <div className="title-with-icon">
                <span className="section-ico">📻</span>
                <h3>Pricing Setup</h3>
              </div>
              <span className="info-banner-pill">
                ℹ️ All prices are per hour (HH:MM tracking system supported).
              </span>
            </div>

            <div className="pricing-boxes-two-grid" style={{ marginTop: '1.5rem' }}>
              {/* Left: Student Pricing */}
              <div className="pricing-input-box student-box">
                <div className="box-title">👤 Student Pricing</div>

                <div className="form-group">
                  <label>RECORDED HOUR PRICE</label>
                  <div className="suffix-input-wrap">
                    <input 
                      type="text" 
                      value={studentRecPrice}
                      onChange={(e) => setStudentRecPrice(e.target.value)}
                    />
                    <span>/hr</span>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>LIVE SESSION HOUR PRICE</label>
                  <div className="suffix-input-wrap">
                    <input 
                      type="text" 
                      value={studentLivePrice}
                      onChange={(e) => setStudentLivePrice(e.target.value)}
                    />
                    <span>/hr</span>
                  </div>
                </div>
              </div>

              {/* Right: Instructor Pricing */}
              <div className="pricing-input-box instructor-box">
                <div className="box-title">📑 Instructor Pricing</div>

                <div className="form-group">
                  <label>RECORDED HOUR PRICE</label>
                  <div className="suffix-input-wrap">
                    <input 
                      type="text" 
                      value={instructorRecPrice}
                      onChange={(e) => setInstructorRecPrice(e.target.value)}
                    />
                    <span>/hr</span>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>LIVE SESSION HOUR PRICE</label>
                  <div className="suffix-input-wrap">
                    <input 
                      type="text" 
                      value={instructorLivePrice}
                      onChange={(e) => setInstructorLivePrice(e.target.value)}
                    />
                    <span>/hr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="edit-actions-row" style={{ marginTop: '2rem' }}>
            <button 
              type="button" 
              onClick={() => setView('list')}
              className="btn-link cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary save-changes-btn">
              Save Country
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FinancialsPricing;
