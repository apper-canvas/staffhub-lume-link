import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icon declarations
const HomeIcon = getIcon('Home');
const XCircleIcon = getIcon('XCircle');

export default function NotFound() {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-surface-50 dark:bg-surface-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-xl text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <XCircleIcon className="w-24 h-24 text-accent" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-2xl md:text-3xl font-semibold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          className="text-surface-600 dark:text-surface-400 mb-8 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link 
            to="/" 
            className="btn btn-primary inline-flex items-center"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}