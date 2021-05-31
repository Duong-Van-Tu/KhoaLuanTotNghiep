import React from 'react';

export default function LoadingBox() {
  return (
    <div className="loading">
    <button className="btn btn-primary " type="button" disabled>
     <span className="spinner-border spinner-border-sm loading-button"  role="status" aria-hidden="true"></span>
      Loading...
      </button>
      {/* <i className="fa spinner-grow spinner-grow-sm" role='state' aria-hidden= 'true'></i> Loading... */}
    </div>
  );
}
