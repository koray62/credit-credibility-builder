
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Edit3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProfileData {
  full_name?: string;
  birth_date?: string;
  tc_kimlik?: string;
  phone?: string;
  address?: string;
  district?: string;
  city?: string;
  education_level?: string;
  occupation?: string;
  monthly_income?: number;
  findeks_score?: number;
}

const ProfileModal = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [isEditing, setIsEditing] = useState(false);
  
  // Check if user signed in with email (can edit) vs Google (read-only)
  const canEdit = user?.app_metadata?.provider === 'email' || !user?.app_metadata?.provider;

  useEffect(() => {
    if (isOpen && user) {
      fetchProfile();
    }
  }, [isOpen, user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Hata",
          description: "Profil kaydedilirken bir hata oluştu.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Başarılı",
        description: "Profiliniz başarıyla kaydedildi.",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Hata",
        description: "Profil kaydedilirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 transition-colors w-full justify-start">
          <User className="h-4 w-4" />
          <span>Profil</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profil Bilgileri
            {canEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="ml-auto"
              >
                <Edit3 className="h-4 w-4" />
                {isEditing ? 'İptal' : 'Düzenle'}
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Ad Soyad</Label>
            <Input
              id="full_name"
              value={profileData.full_name || ''}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              disabled={!isEditing}
              placeholder="Ad Soyad"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="birth_date">Doğum Tarihi</Label>
            <Input
              id="birth_date"
              type="date"
              value={profileData.birth_date || ''}
              onChange={(e) => handleInputChange('birth_date', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tc_kimlik">TC Kimlik No</Label>
            <Input
              id="tc_kimlik"
              value={profileData.tc_kimlik || ''}
              onChange={(e) => handleInputChange('tc_kimlik', e.target.value)}
              disabled={!isEditing}
              placeholder="TC Kimlik No"
              maxLength={11}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={profileData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              placeholder="Telefon Numarası"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Adres</Label>
            <Input
              id="address"
              value={profileData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              placeholder="Açık Adres"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="district">İlçe</Label>
            <Input
              id="district"
              value={profileData.district || ''}
              onChange={(e) => handleInputChange('district', e.target.value)}
              disabled={!isEditing}
              placeholder="İlçe"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">İl</Label>
            <Input
              id="city"
              value={profileData.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!isEditing}
              placeholder="İl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="education_level">Eğitim Seviyesi</Label>
            <Select
              value={profileData.education_level || ''}
              onValueChange={(value) => handleInputChange('education_level', value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Eğitim seviyesi seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ilkokul">İlkokul</SelectItem>
                <SelectItem value="ortaokul">Ortaokul</SelectItem>
                <SelectItem value="lise">Lise</SelectItem>
                <SelectItem value="universite">Üniversite</SelectItem>
                <SelectItem value="yuksek_lisans">Yüksek Lisans</SelectItem>
                <SelectItem value="doktora">Doktora</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="occupation">Meslek</Label>
            <Input
              id="occupation"
              value={profileData.occupation || ''}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              disabled={!isEditing}
              placeholder="Meslek"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthly_income">Aylık Gelir</Label>
            <Input
              id="monthly_income"
              type="number"
              value={profileData.monthly_income || ''}
              onChange={(e) => handleInputChange('monthly_income', Number(e.target.value))}
              disabled={!isEditing}
              placeholder="Aylık gelir (TL)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="findeks_score">Findeks Skoru</Label>
            <Input
              id="findeks_score"
              value={profileData.findeks_score || 'Henüz yüklenmedi'}
              disabled={true}
              className="bg-gray-100"
            />
          </div>
        </div>
        
        {isEditing && canEdit && (
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
            >
              İptal
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        )}
        
        {!canEdit && (
          <div className="text-sm text-gray-500 mt-4">
            Google hesabı ile giriş yaptığınız için profil bilgileriniz salt okunurdur.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
