
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Percent, XCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface PromoCodeSectionProps {
  form: UseFormReturn<any>;
  promoCode: string | null;
  onPromoCodeSubmit: (e: React.FormEvent) => void;
  onRemovePromoCode: () => void;
}

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  form,
  promoCode,
  onPromoCodeSubmit,
  onRemovePromoCode
}) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Code promo</CardTitle>
        <CardDescription>Entrez votre code promo si vous en avez un</CardDescription>
      </CardHeader>
      <CardContent>
        {promoCode ? (
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-primary" />
              <span className="font-medium">{promoCode}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemovePromoCode}
              className="text-gray-500 hover:text-red-500"
            >
              <XCircle className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <form onSubmit={onPromoCodeSubmit} className="flex gap-2">
            <FormField
              control={form.control}
              name="promoCode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Entrez votre code" {...field} className="bg-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Appliquer</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default PromoCodeSection;
