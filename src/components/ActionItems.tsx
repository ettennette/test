import React, { useState } from 'react';
import { Check, Clock, User, Edit2, Save, Trash2 } from 'lucide-react';
import { ActionItem } from '../types';

interface ActionItemsProps {
  actionItems: ActionItem[];
  onUpdateActionItem: (updatedItem: ActionItem) => void;
  onDeleteActionItem: (id: string) => void;
}

const ActionItems: React.FC<ActionItemsProps> = ({ 
  actionItems, 
  onUpdateActionItem,
  onDeleteActionItem
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ActionItem | null>(null);

  const handleEdit = (item: ActionItem) => {
    setEditingId(item.id);
    setEditForm({...item});
  };

  const handleSave = () => {
    if (editForm) {
      onUpdateActionItem(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [e.target.name]: e.target.value
      });
    }
  };

  const toggleComplete = (item: ActionItem) => {
    onUpdateActionItem({
      ...item,
      completed: !item.completed
    });
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Action Items</h3>
      
      {actionItems.length === 0 ? (
        <p className="text-gray-500 italic">No action items identified</p>
      ) : (
        <ul className="space-y-3">
          {actionItems.map((item) => (
            <li 
              key={item.id} 
              className={`bg-white rounded-lg border p-4 shadow-sm transition-all duration-200 ${
                item.completed ? 'bg-gray-50 border-gray-200' : 'border-gray-300'
              }`}
            >
              {editingId === item.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="description"
                    value={editForm?.description || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Action item description"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <span className="bg-gray-100 p-2">
                          <User size={16} className="text-gray-500" />
                        </span>
                        <input
                          type="text"
                          name="assignee"
                          value={editForm?.assignee || ''}
                          onChange={handleChange}
                          className="flex-1 p-2 focus:outline-none"
                          placeholder="Assignee"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <span className="bg-gray-100 p-2">
                          <Clock size={16} className="text-gray-500" />
                        </span>
                        <input
                          type="text"
                          name="deadline"
                          value={editForm?.deadline || ''}
                          onChange={handleChange}
                          className="flex-1 p-2 focus:outline-none"
                          placeholder="Deadline (e.g., Nov 5)"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                    >
                      <Save size={14} className="mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start">
                    <button
                      onClick={() => toggleComplete(item)}
                      className={`flex-shrink-0 w-5 h-5 mr-3 mt-1 rounded-full border ${
                        item.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-400'
                      } flex items-center justify-center`}
                    >
                      {item.completed && <Check size={12} />}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`text-gray-800 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {item.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-2">
                        {item.assignee && (
                          <div className="flex items-center text-sm text-gray-600">
                            <User size={14} className="mr-1" />
                            <span>{item.assignee}</span>
                          </div>
                        )}
                        
                        {item.deadline && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={14} className="mr-1" />
                            <span>{item.deadline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteActionItem(item.id)}
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionItems;