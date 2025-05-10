import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Edit2, Save, X } from 'lucide-react';
import { getSchedules } from '../../services/aiScheduleService';
import { useAI } from '../../context/AIContext';
import './AIPage.css';

function AIHistoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateSchedule } = useAI();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const schedules = await getSchedules();
        const found = schedules.find(s => s._id === id);
        if (found) {
          setSchedule(found);
          setEditedSchedule(found);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedSchedule(schedule);
  };

  const handleSave = async () => {
    try {
      const updated = await updateSchedule(id, {
        prompt: editedSchedule.prompt,
        schedule: editedSchedule.schedule
      });
      setSchedule(updated);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update schedule');
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedSchedule = {
      ...editedSchedule,
      schedule: editedSchedule.schedule.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    };
    setEditedSchedule(updatedSchedule);
  };

  const handlePromptChange = (value) => {
    setEditedSchedule({
      ...editedSchedule,
      prompt: value
    });
  };

  if (loading) return <div className="ai-page">Loading...</div>;
  if (error) return <div className="ai-page">Error: {error}</div>;
  if (!schedule) return <div className="ai-page">Schedule not found</div>;

  const displaySchedule = isEditing ? editedSchedule : schedule;

  return (
    <div className="ai-history-page">
      <div className="ai-history-content">
        <div className="ai-header">
          <button 
            className="history-button"
            onClick={() => navigate('/home')}
            style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft size={20} />
            <span className="back-text" style={{ marginLeft: '8px' }}>Back to AI Creator</span>
          </button>
          {!isEditing ? (
            <button className="edit-button" onClick={handleEdit}>
              <Edit2 size={20} />
              <span>Edit</span>
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-button" onClick={handleSave}>
                <Save size={20} />
                <span>Save</span>
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                <X size={20} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="study-plan">
          <div className="study-plan-header">
            <h2>Study Schedule</h2>
            {isEditing ? (
              <textarea
                className="prompt-edit"
                value={displaySchedule.prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
              />
            ) : (
              <p className="history-prompt">{displaySchedule.prompt}</p>
            )}
            <span className="history-date">
              Created on: {new Date(displaySchedule.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="timeline">
            {displaySchedule.schedule.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <div className="time-marker">
                    <Calendar size={20} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => handleItemChange(index, 'time', e.target.value)}
                        className="time-edit"
                      />
                    ) : (
                      <span>{item.time}</span>
                    )}
                  </div>
                  <div className="card">
                    <h3>{item.time}</h3>
                    {isEditing ? (
                      <textarea
                        value={item.activity}
                        onChange={(e) => handleItemChange(index, 'activity', e.target.value)}
                        className="activity-edit"
                      />
                    ) : (
                      <p>{item.activity}</p>
                    )}
                  </div>
                </div>
                {index < displaySchedule.schedule.length - 1 && <div className="timeline-connector" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIHistoryDetails;
