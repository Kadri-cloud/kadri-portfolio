// src/app/(main)/layout.tsx
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1"> {/* No more pt needed as navbar is part of flow or handles its own spacing */}
        {children}
      </main>
      <Footer />
      {/* ChatbotTrigger will go here, potentially fixed */}
    </div>
  );
}