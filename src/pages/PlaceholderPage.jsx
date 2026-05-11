import React from 'react';
import PublicLayout from '../components/layout/PublicLayout';

const PlaceholderPage = ({ title }) => {
  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-8 py-32 text-center">
        <h1 className="font-display font-black text-6xl text-brand-text mb-6">{title}</h1>
        <p className="text-xl text-brand-muted font-medium max-w-2xl mx-auto">
          We are currently crafting a premium experience for this page. 
          Check back soon for deep insights into our {title.toLowerCase()}.
        </p>
      </div>
    </PublicLayout>
  );
};

export default PlaceholderPage;
