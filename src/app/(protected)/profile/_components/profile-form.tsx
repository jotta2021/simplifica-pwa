"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Camera } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import upsertProfileActions from "@/actions/upsertProfileActions";
import { NumericFormat, PatternFormat } from 'react-number-format';
interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
}

interface ProfileFormProps {
  user: User;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: unformatPhoneFromWhatsApp(user.phone)  || "",
    image: user.image || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const upsertProfile = useAction(upsertProfileActions, {
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Erro ao atualizar perfil");
      setIsLoading(false);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await upsertProfile.execute({
      name: formData.name,
      email: formData.email,
      phone: formatPhoneToWhatsApp(formData.phone) ,
      image: formData.image,
    });
  };

  const getUserInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  function formatPhoneToWhatsApp(phone: string): string {
    // Remove all non-digit characters
    let digits = phone.replace(/\D/g, '');

    // Check if it starts with country code (55), if not, add it
    if (digits.length === 11) {
      // e.g. 82998427310 (without country code)
      digits = '55' + digits;
    }

    // Now digits should be 13 or 12 chars (with or without extra 9)
    // Remove the first '9' after the area code (after country code and DDD)
    // Ex: 5582998427310 (already correct), 55829998427310 (has extra 9)
    if (digits.length === 13 && digits.startsWith('55')) {
      // 55 + 2 DDD + 9 + 8 digits
      // Remove the 9 after DDD
      digits = digits.slice(0, 4) + digits.slice(5);
    }

    return digits;
  }

  function unformatPhoneFromWhatsApp(whatsappPhone: string | null ) {
    
    if(whatsappPhone){
       // Remove all non-digit characters
    let digits = whatsappPhone.replace(/\D/g, '');

    // Check if it starts with country code (55)
    if (digits.startsWith('55') && digits.length === 12) {
      // Remove country code (55) and add 9 after DDD
      // Ex: 5582998427310 -> 82998427310 -> 829998427310
      const ddd = digits.slice(2, 4); // Get DDD (82)
      const rest = digits.slice(4); // Get the rest (98427310)
      digits = ddd + '9' + rest; // Add 9 after DDD (82998427310)
    }

    return digits;
    }else{
      return ''
    }
   
  }

  
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
          <CardDescription>
            Atualize suas informações pessoais e de contato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  {formData.image ? (
                    <AvatarImage src={formData.image} alt="Foto do perfil" />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {getUserInitials(formData.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
              
              </div>
             
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nome completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Número de telefone
                </Label>
                <PatternFormat
                format="(##) #####-####"
                customInput={Input}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(11) 99999-9999"
             
                />
               
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm; 