import { useState } from 'react';

/**
 * Custom hook to manage modal state for todo operations
 */
export const useModalState = () => {
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  
  /**
   * Opens the new todo modal
   */
  const openNewTodoModal = () => {
    setIsNewTodoModalOpen(true);
  };
  
  /**
   * Closes the new todo modal
   */
  const closeNewTodoModal = () => {
    setIsNewTodoModalOpen(false);
  };
  
  /**
   * Opens the edit todo modal with the specified todo
   */
  const openEditTodoModal = () => {
    setIsEditTodoModalOpen(true);
  };
  
  /**
   * Closes the edit todo modal
   */
  const closeEditTodoModal = () => {
    setIsEditTodoModalOpen(false);
  };
  
  return {
    isNewTodoModalOpen,
    isEditTodoModalOpen,
    openNewTodoModal,
    closeNewTodoModal,
    openEditTodoModal,
    closeEditTodoModal
  };
};