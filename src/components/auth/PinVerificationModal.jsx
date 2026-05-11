import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';

const PinVerificationModal = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const CORRECT_PIN = '1234';

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setPin('');
      setError('');
      onSuccess();
    } else {
      setError('Incorrect PIN code');
      setPin('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue-400 to-brand-blue-600" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-brand-muted hover:text-brand-text transition-colors p-2 rounded-full hover:bg-brand-slate-100"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-8 mt-2">
            <div className="mx-auto w-16 h-16 bg-brand-blue-50 text-brand-blue-500 rounded-full flex items-center justify-center mb-4 border border-brand-blue-100 shadow-inner">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-black text-brand-text mb-2">Access Assistant</h2>
            <p className="text-xs font-bold text-brand-muted uppercase tracking-widest">Enter Security Code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={handlePinChange}
                className="w-full text-center text-4xl font-black tracking-[1em] py-4 bg-white border-2 border-brand-border rounded-2xl focus:border-brand-blue-500 focus:ring-4 focus:ring-brand-blue-500/20 outline-none transition-all"
                placeholder="••••"
                autoFocus
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs font-bold text-center mt-3"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={pin.length !== 4}
              className="w-full py-4 bg-brand-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-brand-blue-600 focus:ring-4 focus:ring-brand-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-blue-500/20"
            >
              Verify & Enter
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PinVerificationModal;
