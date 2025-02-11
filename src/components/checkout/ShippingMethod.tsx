
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Truck, PackageCheck } from 'lucide-react';

interface ShippingMethodProps {
  shippingMethod: 'standard' | 'express' | null;
  onShippingMethodChange: (method: 'standard' | 'express') => void;
}

const ShippingMethod: React.FC<ShippingMethodProps> = ({ 
  shippingMethod, 
  onShippingMethodChange 
}) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Mode de livraison</CardTitle>
        <CardDescription>Choisissez votre mode de livraison préféré</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={shippingMethod || ''}
          onValueChange={(value: 'standard' | 'express') => onShippingMethodChange(value)}
          className="grid gap-4"
        >
          <div>
            <RadioGroupItem
              value="standard"
              id="standard"
              className="peer sr-only"
            />
            <Label
              htmlFor="standard"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary"
            >
              <Truck className="mb-3 h-6 w-6" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Livraison Standard
                </p>
                <p className="text-sm text-muted-foreground">
                  4.99 € - 3-5 jours ouvrés
                </p>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="express"
              id="express"
              className="peer sr-only"
            />
            <Label
              htmlFor="express"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary"
            >
              <PackageCheck className="mb-3 h-6 w-6" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Livraison Express
                </p>
                <p className="text-sm text-muted-foreground">
                  9.99 € - 1-2 jours ouvrés
                </p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ShippingMethod;
