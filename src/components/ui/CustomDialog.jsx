import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function CustomDialog({ open, onOpenChange, title, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {children} {/* Render only the passed content */}
      </DialogContent>
    </Dialog>
  );
}
