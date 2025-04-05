
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Import the KVKK content component
import { KVKKContent } from "@/pages/KVKK";

interface KVKKSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onClose: () => void;
}

const KVKKSheet: React.FC<KVKKSheetProps> = ({
  open,
  onOpenChange,
  isChecked,
  onCheckedChange,
  onClose
}) => {
  const handleConfirm = () => {
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto" side="right">
        <SheetHeader className="mb-4">
          <SheetTitle>Kişisel Verilerin Korunması Aydınlatma Metni</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 pr-2">
          <KVKKContent />
        </div>
        
        <div className="mt-8 border-t pt-4 border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <Checkbox 
              id="kvkk-consent-popup" 
              checked={isChecked}
              onCheckedChange={onCheckedChange}
            />
            <Label htmlFor="kvkk-consent-popup" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Kişisel verilerimin işlenmesine ilişkin aydınlatma metnini okudum ve anladım.
            </Label>
          </div>
        </div>
        
        <SheetFooter>
          <Button 
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-primary text-white"
          >
            Tamam
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default KVKKSheet;
