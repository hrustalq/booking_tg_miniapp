import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Check } from 'lucide-react';
import { Branch } from '@/api';

interface ClubCardProps {
  branch: Branch;
  isSelected: boolean;
  onClick: () => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ branch, isSelected, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
          isSelected ? 'shadow-md border-blue-500' : ''
        }`}
        onClick={onClick}
      >
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0)',
          }}
          transition={{ duration: 0.2 }}
          className='h-full'
        >
          <CardHeader className='relative pb-2'>
            <h3 className='text-xl font-semibold'>{branch.name}</h3>
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-2 right-3.5'
                >
                  <Badge className='bg-blue-500 p-1 flex items-center justify-center text-primary-foreground'>
                    <Check className='w-4 h-4 text-white' />
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <MapPin className='w-5 h-5 text-primary mt-1 flex-shrink-0' />
              <span className='text-sm'>{branch.address}</span>
            </div>
            <div className='flex items-start space-x-2'>
              <Clock className='w-5 h-5 text-primary mt-1 flex-shrink-0' />
              <div className='text-sm'>
                {branch.workingHours.map((hours, index) => (
                  <div key={index}>{hours}</div>
                ))}
              </div>
            </div>
            {branch.phoneNumber && (
              <div className='flex items-center space-x-2'>
                <Phone className='w-5 h-5 text-primary flex-shrink-0' />
                <span className='text-sm'>{branch.phoneNumber}</span>
              </div>
            )}
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
};