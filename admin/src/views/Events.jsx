import React, { useState } from 'react';

export default function Events({ events, setEvents, openAddEventModal, openEditEventModal, deleteEvent }) {
  const [filterStatus, setFilterStatus] = useState('all');
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredEvents = filterStatus === 'all' 
    ? events 
    : events.filter(event => event.status === filterStatus);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <i className="fas fa-calendar-alt text-green-700"></i>
          Events Management
        </h2>
        <div className="flex flex-wrap gap-3">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button 
            onClick={openAddEventModal} 
            className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition flex items-center gap-2"
          >
            <i className="fas fa-plus"></i> Add Event
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <i className="fas fa-calendar-plus text-5xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No events created yet. Click "Add Event" to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-48 bg-gray-200">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <i className="fas fa-image text-4xl text-gray-400"></i>
                  </div>
                )}
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <i className="fas fa-calendar-day"></i>
                  <span>{formatDate(event.date)}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{event.location}</span>
                  </div>
                )}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {event.description}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditEventModal(event)} 
                    className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition flex items-center justify-center gap-1"
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button 
                    onClick={() => deleteEvent(event._id)} 
                    className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition flex items-center justify-center gap-1"
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}