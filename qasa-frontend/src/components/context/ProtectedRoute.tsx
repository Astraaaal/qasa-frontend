import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TopNavigation from '../layout/TopNavigation'; // Adjust the import path as necessary

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes with TopNavigation
  return (
    <>
      {/*<TopNavigation />*/}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedRoute;