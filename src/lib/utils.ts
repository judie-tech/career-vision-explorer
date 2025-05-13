
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createRoot } from "react-dom/client";
import { createElement } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface DeleteDialogOptions {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function deleteJobDialog(options: DeleteDialogOptions) {
  const { title, description, onConfirm, confirmText = "Delete", cancelText = "Cancel" } = options;
  
  // Create a div to mount the dialog
  const dialogContainer = document.createElement("div");
  document.body.appendChild(dialogContainer);
  
  const root = createRoot(dialogContainer);
  
  // Create and render the dialog
  const AlertDialogComponent = () => {
    const handleConfirm = () => {
      onConfirm();
      unmount();
    };
    
    const handleCancel = () => {
      unmount();
    };
    
    const unmount = () => {
      root.unmount();
      dialogContainer.remove();
    };
    
    return createElement(
      AlertDialog,
      { open: true },
      createElement(
        AlertDialogContent,
        {},
        createElement(
          AlertDialogHeader,
          {},
          createElement(AlertDialogTitle, {}, title),
          createElement(AlertDialogDescription, {}, description)
        ),
        createElement(
          AlertDialogFooter,
          {},
          createElement(AlertDialogCancel, { onClick: handleCancel }, cancelText),
          createElement(
            AlertDialogAction, 
            { onClick: handleConfirm, className: "bg-red-600 hover:bg-red-700" }, 
            confirmText
          )
        )
      )
    );
  };
  
  root.render(createElement(AlertDialogComponent, {}));
}
