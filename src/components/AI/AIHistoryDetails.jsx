import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { getSchedules } from '../../services/aiScheduleService';
import './AIPage.css';

function AIHistoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const schedules = await getSchedules();
        const found = schedules.find(s => s._id === id);
        if (found) {
          setSchedule(found);
        } else {
          setError('Schedule not found');
        }
      } catch (err) {
        setError('Failed to load schedule');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  if (loading) return <div className="ai-page">Loading...</div>;
  if (error) return <div className="ai-page">Error: {error}</div>;
  if (!schedule) return <div className="ai-page">Schedule not found</div>;

  return (
    <div className="ai-history-page">
      <div className="ai-history-content">
        <div className="ai-header">
          <button 
            className="history-button"
            onClick={() => navigate('/home')}
            style={{ marginRight: 'auto' }}
          >
            <ArrowLeft size={24} />
            <span style={{ marginLeft: '8px' }}>Back to AI Creator</span>
          </button>
        </div>

        <div className="study-plan">
          <div className="study-plan-header">
            <h2>Study Schedule</h2>
            <p className="history-prompt">{schedule.prompt}</p>
            <span className="history-date">
              Created on: {new Date(schedule.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="timeline">
            {schedule.schedule.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <div className="time-marker">
                    <Calendar size={20} />
                    <span>{item.time}</span>
                  </div>
                  <div className="card">
                    <h3>{item.time}</h3>
                    <p>{item.activity}</p>
                  </div>
                </div>
                {index < schedule.schedule.length - 1 && <div className="timeline-connector" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIHistoryDetails;
