import React, { useState } from "react";
import { CustomDialog } from "@/components/ui/dialog";

export default function RemoveItem({ itemName, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);  // Dialog state

  // Handle the delete action
  const handleRemove = () => {
    onRemove();
    setIsOpen(false); // Close dialog after action
  };

  return (
    <div>
      {/* Button to open the dialog */}
      <button 
        onClick={() => setIsOpen(true)}  // Open dialog when clicked
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Remove {itemName}
      </button>

      {/* Render dialog only when it's open */}
      {isOpen && (
        <CustomDialog open={isOpen} onOpenChange={setIsOpen} title="Confirm Deletion">
          <p>Are you sure you want to remove {itemName}?</p>

          {/* One and only delete button inside dialog */}
          <button 
            onClick={handleRemove}  // Trigger onRemove and close the dialog
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Yes, Remove
          </button>
        </CustomDialog>
      )}
    </div>
  );
}
