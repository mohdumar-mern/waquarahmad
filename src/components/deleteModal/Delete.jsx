import React from 'react';

const Delete = ({ onDelete, onCancel }) => {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Are you sure you want to delete?</h2>
      <p className="text-gray-600 mb-6">This action cannot be undone.</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Delete;
