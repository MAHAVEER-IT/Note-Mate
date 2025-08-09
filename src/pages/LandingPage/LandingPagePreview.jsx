import React from 'react';

const LandingPagePreview = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
      <h2 style={{ color: '#4a6fa5' }}>Note-Mate Landing Page Preview</h2>
      <p>Below is a visualization of how your landing page will appear:</p>
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        margin: '20px auto',
        maxWidth: '800px',
        backgroundColor: 'white'
      }}>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              color: '#343a40',
              marginBottom: '1rem'
            }}>Organize Your Thoughts with <span style={{ color: '#4a6fa5' }}>Note-Mate</span></h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#6c757d',
              marginBottom: '2rem'
            }}>A smart note-taking app with AI-powered study planning and productivity tools</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ 
                backgroundColor: '#4a6fa5', 
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 'bold'
              }}>Get Started</button>
              <button style={{ 
                backgroundColor: 'transparent', 
                color: '#4a6fa5',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '2px solid #4a6fa5',
                fontWeight: 'bold'
              }}>Sign In</button>
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <div style={{ 
              width: '500px', 
              height: '300px', 
              backgroundColor: '#e9ecef',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              <p style={{ color: '#6c757d' }}>App Screenshot Preview</p>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '40px 20px' }}>
          <h2 style={{ 
            fontSize: '2rem',
            color: '#343a40',
            marginBottom: '2rem'
          }}>Features that <span style={{ color: '#4a6fa5' }}>Simplify</span> Your Life</h2>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            {[
              'Note Management',
              'Sticky Notes',
              'AI Study Planner',
              'Theme Support',
              'Notifications'
            ].map((feature, i) => (
              <div key={i} style={{ 
                width: '220px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(74, 111, 165, 0.1)',
                  margin: '0 auto 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4a6fa5'
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#343a40' }}>{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p>This is a simplified representation. The actual page will include additional sections for How It Works, Testimonials, and a Call to Action.</p>
    </div>
  );
};

export default LandingPagePreview;
