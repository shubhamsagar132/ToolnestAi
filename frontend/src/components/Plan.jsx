import React from 'react';
import { PricingTable } from '@clerk/clerk-react';

const Plan = () => (
  <div className="flex justify-center z-20 py-12 px-4">
    <div className="max-w-2xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto mt-4">
          Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>
      <PricingTable />
    </div>
  </div>
);

export default Plan;
