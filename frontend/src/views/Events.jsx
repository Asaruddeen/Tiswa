import React, { useState, useEffect } from 'react';

const API_URL = 'https://tiswa.onrender.com/api';
// const API_URL = 'http://localhost:5000/api';


export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/events`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      upcoming: 'fa-clock',
      ongoing: 'fa-play-circle',
      completed: 'fa-check-circle',
      cancelled: 'fa-times-circle'
    };
    return icons[status] || 'fa-calendar';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredEvents = filterStatus === 'all'
    ? events
    : events.filter(event => event.status === filterStatus);

  return (
    <div className="animate-float pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i className="fas fa-calendar-alt text-green-700"></i>
          Events
        </h2>
        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow">
          {events.length} Events
        </span>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-hide">
        {['all', 'upcoming', 'ongoing', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filterStatus === status
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Events List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white/50 rounded-3xl">
          <i className="fas fa-calendar-plus text-5xl text-gray-300 mb-3"></i>
          <p className="text-gray-500">No events found</p>
          <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all active:scale-[0.98]"
              onClick={() => setSelectedEvent(event)}
            >
              {event.image && (
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)} shadow-lg`}>
                    <i className={`fas ${getStatusIcon(event.status)} mr-1`}></i>
                    {event.status}
                  </span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <i className="fas fa-calendar-day"></i>
                  <span>{formatDate(event.date)}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <i className="fas fa-map-marker-alt"></i>
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>
                <div className="mt-3 pt-3 border-t flex justify-end">
                  <button 
                    className="text-green-700 text-sm font-semibold flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                  >
                    View Details <i className="fas fa-arrow-right text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedEvent.image && (
              <div className="relative h-56 bg-gray-200">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                >
                  <i className="fas fa-times"></i>
                </button>
                <span className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedEvent.status)} shadow-lg`}>
                  <i className={`fas ${getStatusIcon(selectedEvent.status)} mr-1`}></i>
                  {selectedEvent.status}
                </span>
              </div>
            )}
            <div className="p-5">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedEvent.title}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-xl">
                  <i className="fas fa-calendar-day text-green-700 w-5"></i>
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-xl">
                    <i className="fas fa-map-marker-alt text-green-700 w-5"></i>
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedEvent.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}