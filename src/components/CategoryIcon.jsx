import React from 'react';
import { 
  ShoppingCart, 
  Zap, 
  Home, 
  Utensils, 
  User, 
  Car, 
  Film, 
  HeartPulse, 
  Tag, 
  Coffee,
  Smartphone,
  CreditCard,
  Banknote,
  Building2,
  HelpCircle
} from 'lucide-react';

const iconMap = {
  ShoppingCart,
  Zap,
  Home,
  Utensils,
  User,
  Car,
  Film,
  HeartPulse,
  Tag,
  Coffee,
  Smartphone,
  CreditCard,
  Banknote,
  Building2,
};

export const CategoryIcon = ({ name, className = 'w-5 h-5' }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} />;
};
