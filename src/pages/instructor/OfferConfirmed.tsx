import "./OfferConfirmed.css";

const OfferConfirmed = () => {
  return (
   <div className="offer-confirmed-page">

    <div className="offer-toast">

        <div className="offer-toast-icon">
            ✓
        </div>

        <div className="offer-toast-text">
            The offer confirmed. The offer has been moved to offers successfully.
        </div>

    </div>

    <div className="offer-success-section">

        <div className="offer-success-icon">
            ✓
        </div>

        <h1 className="offer-success-title">
            Confirmed
            <br />
            Successfully
        </h1>

        <p className="offer-success-description">
            The offer has been added to offers.
        </p>

        <p className="offer-success-subtitle">
            When student confirms, you can now start working on the files and manage everything from My Projects.
        </p>

        <button className="offer-primary-btn">
            Go to offers →
        </button>

    </div>
    <div className="offer-features">

  <div className="offer-feature-card">
    <div className="offer-feature-icon">📄</div>
    <h3>Project Files</h3>
    <p>
      All reference documents have been indexed and are ready.
    </p>
  </div>

  <div className="offer-feature-card">
    <div className="offer-feature-icon">🕒</div>
    <h3>Deadline Tracking</h3>
    <p>
      Automated reminders set for your upcoming milestones.
    </p>
  </div>

  <div className="offer-feature-card">
    <div className="offer-feature-icon">💬</div>
    <h3>Collaboration</h3>
    <p>
      Direct channel opened for project-specific queries.
    </p>
  </div>

</div>

</div>
  );
};

export default OfferConfirmed;