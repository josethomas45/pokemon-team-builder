import { useState, useEffect } from 'react';

/**
 * Custom hook for implementing drag and drop functionality
 * @param {Array} initialItems - Initial array of items
 * @param {Function} onDragEnd - Callback function to execute when drag ends
 * @returns {Object} - Drag and drop handlers and state
 */
const useDragDrop = (initialItems = [], onDragEnd = null) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  // Update items when initialItems change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  /**
   * Handle start of drag operation
   * @param {Event} e - Drag event
   * @param {number} index - Index of dragged item
   */
  const handleDragStart = (e, index) => {
    // Set data for drag operation
    e.dataTransfer.effectAllowed = "move";
    
    try {
      // Store the index in the drag event
      e.dataTransfer.setData('text/plain', index);
    } catch (err) {
      // Some browsers may throw errors with setData
      console.warn('Error in setData:', err);
    }
    
    // Store item reference
    setDraggedItem(items[index]);
    
    // Create ghost image with animation
    if (e.target) {
      const ghostElement = e.target.cloneNode(true);
      ghostElement.style.position = 'absolute';
      ghostElement.style.top = '-1000px';
      ghostElement.style.transform = 'scale(0.85)';
      ghostElement.style.opacity = '0.8';
      document.body.appendChild(ghostElement);
      
      // Set ghost image and offset
      e.dataTransfer.setDragImage(ghostElement, 50, 50);
      
      // Remove the ghost element after the drag starts
      setTimeout(() => {
        document.body.removeChild(ghostElement);
      }, 0);
    }
    
    // Add custom styling for the dragged element
    if (e.target) {
      e.target.classList.add('dragging');
    }
  };

  /**
   * Handle drag over event
   * @param {Event} e - Drag event
   * @param {number} index - Index of item being dragged over
   */
  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    
    // Only update if dragging over a different item
    if (draggedItem !== items[index]) {
      setDraggedOverIndex(index);
    }
  };

  /**
   * Handle drop event
   * @param {Event} e - Drop event
   * @param {number} index - Index of drop target
   */
  const handleDrop = (e, index) => {
    e.preventDefault();
    
    // Get the source index
    let sourceIndex;
    try {
      sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    } catch (err) {
      sourceIndex = items.findIndex(item => item === draggedItem);
    }
    
    if (isNaN(sourceIndex) || sourceIndex === index) {
      return; // Invalid or same position
    }
    
    // Create new array with reordered items
    const newItems = [...items];
    newItems.splice(sourceIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    // Update state
    setItems(newItems);
    setDraggedItem(null);
    setDraggedOverIndex(null);
    
    // Call the callback if provided
    if (onDragEnd) {
      onDragEnd(newItems);
    }
  };

  /**
   * Handle drag end event
   * @param {Event} e - Drag event
   */
  const handleDragEnd = (e) => {
    // Clean up
    setDraggedItem(null);
    setDraggedOverIndex(null);
    
    // Remove dragging class
    if (e.target) {
      e.target.classList.remove('dragging');
    }
  };

  /**
   * Handle drag enter event
   * @param {Event} e - Drag event
   * @param {number} index - Index of entered item
   */
  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDraggedOverIndex(index);
  };

  /**
   * Handle drag leave event
   * @param {Event} e - Drag event
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggedOverIndex(null);
  };

  return {
    items,
    draggedItem,
    draggedOverIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handleDragEnter,
    handleDragLeave
  };
};

// ✅ Added displayName for devtools debugging (the only update requested)
useDragDrop.displayName = 'useDragDrop';

export default useDragDrop;
