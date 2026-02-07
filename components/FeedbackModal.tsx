
import React, { useState } from 'react';

interface FeedbackModalProps {
  driverName: string;
  driverAvatar: string;
  onSubmit: (rating: number, comment: string) => void;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ driverName, driverAvatar, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(rating, comment);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-sm rounded-[40px] p-8 shadow-2xl relative z-10 animate-scale-in">
        {!submitted ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img src={driverAvatar} className="w-20 h-20 rounded-3xl object-cover shadow-lg border-4 border-gray-50" alt={driverName} />
              <div className="absolute -bottom-2 -right-2 bg-[#0d828c] text-white w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">
                <i className="fa-solid fa-check text-xs"></i>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-gray-900">How was your ride?</h3>
            <p className="text-gray-500 text-sm mt-1 mb-6">Rate your experience with {driverName}</p>

            {/* Star Rating */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="text-3xl transition-all active:scale-90"
                >
                  <i className={`fa-star ${star <= (hover || rating) ? 'fa-solid text-yellow-400' : 'fa-regular text-gray-200'}`}></i>
                </button>
              ))}
            </div>

            <textarea
              placeholder="Write a compliment or feedback (optional)"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-[#0d828c]/20 mb-6 min-h-[100px] resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex w-full gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-4 font-bold text-gray-400 text-sm"
              >
                Skip
              </button>
              <button
                disabled={rating === 0}
                onClick={handleSubmit}
                className={`flex-[2] py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                  rating > 0 ? 'bg-[#0d828c] text-white shadow-lg shadow-[#0d828c]/30' : 'bg-gray-100 text-gray-400'
                }`}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 animate-bounce">
              <i className="fa-solid fa-heart"></i>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900">Thank You!</h3>
            <p className="text-gray-500 mt-2">Your feedback helps the community grow.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
