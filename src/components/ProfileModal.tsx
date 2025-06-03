
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Calendar, Phone, MapPin, GraduationCap, Briefcase, DollarSign, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  
  // Mock profile data - in a real app this would come from Supabase
  const profileData = {
    fullName: user?.user_metadata?.name || 'Kullanıcı',
    email: user?.email || '',
    phone: '',
    tcKimlik: '',
    birthDate: '',
    address: '',
    district: '',
    city: '',
    educationLevel: '',
    occupation: '',
    monthlyIncome: '',
    findeksScore: 0
  };

  const isGoogleUser = user?.app_metadata?.provider === 'google';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profil Bilgileri
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Temel Bilgiler */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Temel Bilgiler</h3>
            
            <div>
              <Label htmlFor="fullName">Ad Soyad</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                disabled={isGoogleUser}
                className={isGoogleUser ? "bg-gray-100" : ""}
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                disabled
                className="bg-gray-100"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Telefon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={profileData.phone}
                  placeholder="0555 123 45 67"
                  className="pl-10"
                  disabled={isGoogleUser}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="tcKimlik">T.C. Kimlik No</Label>
              <Input
                id="tcKimlik"
                value={profileData.tcKimlik}
                placeholder="12345678901"
                disabled={isGoogleUser}
              />
            </div>
            
            <div>
              <Label htmlFor="birthDate">Doğum Tarihi</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="birthDate"
                  value={profileData.birthDate}
                  placeholder="01/01/1990"
                  className="pl-10"
                  disabled={isGoogleUser}
                />
              </div>
            </div>
          </div>
          
          {/* Diğer Bilgiler */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Adres ve Diğer Bilgiler</h3>
            
            <div>
              <Label htmlFor="address">Adres</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={profileData.address}
                  placeholder="Mahalle, Sokak, No"
                  className="pl-10"
                  disabled={isGoogleUser}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="district">İlçe</Label>
                <Input
                  id="district"
                  value={profileData.district}
                  placeholder="İlçe"
                  disabled={isGoogleUser}
                />
              </div>
              <div>
                <Label htmlFor="city">Şehir</Label>
                <Input
                  id="city"
                  value={profileData.city}
                  placeholder="Şehir"
                  disabled={isGoogleUser}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="education">Eğitim Durumu</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="education"
                  value={profileData.educationLevel}
                  placeholder="Lise, Üniversite, vb."
                  className="pl-10"
                  disabled={isGoogleUser}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="occupation">Meslek</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="occupation"
                  value={profileData.occupation}
                  placeholder="Mesleğiniz"
                  className="pl-10"
                  disabled={isGoogleUser}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="income">Aylık Gelir</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="income"
                  value={profileData.monthlyIncome}
                  placeholder="15000"
                  className="pl-10"
                  disabled={isGoogleUser}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="findeksScore">Findeks Puanı</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="findeksScore"
                  value={profileData.findeksScore || ''}
                  placeholder="Henüz puan yok"
                  className="pl-10 bg-gray-100"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        
        {isGoogleUser && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 text-sm">
              <strong>Bilgi:</strong> Google ile giriş yaptığınız için profil bilgileriniz düzenlenemez. 
              Bilgilerinizi güncellemek için başvuru sayfasını kullanabilirsiniz.
            </p>
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Kapat
          </Button>
          {!isGoogleUser && (
            <Button onClick={onClose}>
              Kaydet
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
