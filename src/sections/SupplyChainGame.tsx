import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Package, CheckCircle, AlertCircle } from 'lucide-react';

// Mock data for the supply chain game
const initialGameState = {
  currentLevel: 1,
  score: 0,
  challenges: [
    { id: 1, title: 'Manage Initial Stock', completed: false },
    { id: 2, title: 'Create Supply Chain Transaction', completed: false },
    { id: 3, title: 'Register QR Code', completed: false },
    { id: 4, title: 'Track Shipment Location', completed: false },
    { id: 5, title: 'Validate Wholesaler Delivery', completed: false },
    { id: 6, title: 'Forward to Retailer', completed: false },
  ],
  inventory: {
    total: 1000,
    used: 0
  },
  shipments: [
    {
      id: 'SC-001',
      status: 'Pending',
      origin: 'Manufacturer Warehouse',
      destination: 'Wholesaler Hub',
      estimatedDelivery: '2024-01-15',
    }
  ]
};

const SupplyChainGame = () => {
  const [gameState, setGameState] = useState(initialGameState);
  const [showTutorial, setShowTutorial] = useState(true);

  const completeChallenge = (challengeId) => {
    const updatedChallenges = gameState.challenges.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, completed: true } 
        : challenge
    );

    setGameState(prevState => ({
      ...prevState,
      challenges: updatedChallenges,
      score: prevState.score + 100,
      currentLevel: Math.min(prevState.currentLevel + 1, 6)
    }));
  };

  const renderLevelContent = () => {
    switch(gameState.currentLevel) {
      case 1:
        return (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Level 1: Stock Management</h2>
            <div className="flex items-center space-x-4">
              <Package className="text-blue-600" />
              <div>
                <p>Total Inventory: {gameState.inventory.total} units</p>
                <p>Used Inventory: {gameState.inventory.used} units</p>
              </div>
              <button 
                onClick={() => completeChallenge(1)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Manage Stock
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Level 2: Create Supply Chain Transaction</h2>
            <div className="flex items-center space-x-4">
              <Truck className="text-green-600" />
              <button 
                onClick={() => completeChallenge(2)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Generate Transaction
              </button>
            </div>
          </div>
        );
      // Add more levels similarly
      default:
        return <p>Congratulations! You've completed all levels.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h1 className="text-2xl font-bold mb-4">Supply Chain Manager Simulation</h1>
            <p>Welcome, Supply Chain Hero! Your mission is to manage a complex supply chain efficiently.</p>
            <button 
              onClick={() => setShowTutorial(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Supply Chain Manager</h1>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">Score: {gameState.score}</span>
              <span className="text-lg font-semibold">Level: {gameState.currentLevel}/6</span>
            </div>
          </div>

          {renderLevelContent()}

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Challenges</h3>
            <div className="grid grid-cols-2 gap-4">
              {gameState.challenges.map(challenge => (
                <div 
                  key={challenge.id} 
                  className={`p-4 rounded-lg flex items-center space-x-4 ${
                    challenge.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {challenge.completed ? <CheckCircle /> : <AlertCircle />}
                  <span>{challenge.title}</span>
                </div>
              ))}
            </div>
          </div>

          {gameState.shipments.map(shipment => (
            <div 
              key={shipment.id} 
              className="mt-6 bg-blue-50 p-4 rounded-lg"
            >
              <h4 className="font-semibold">Shipment {shipment.id}</h4>
              <div className="flex items-center space-x-4">
                <MapPin />
                <div>
                  <p>From: {shipment.origin}</p>
                  <p>To: {shipment.destination}</p>
                  <p>Status: {shipment.status}</p>
                  <p>Est. Delivery: {shipment.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplyChainGame;