
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon, ChevronRightIcon } from 'lucide-react';

const Apply: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tcKimlik: '',
    ad: '',
    soyad: '',
    dogumTarihi: '',
    telefon: '',
    email: '',
    adres: '',
    sehir: '',
    egitimDurumu: '',
    meslek: '',
    gelir: '',
    kvkkOnay: false,
    pazarlamaIzni: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderimi simülasyonu
    console.log('Form gönderildi:', formData);
    navigate('/surec');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Kredibilite Oluşturma Programı Başvurusu
                </h1>
                <p className="text-gray-600">
                  Lütfen aşağıdaki formu doldurarak başvurunuzu tamamlayın. Tüm bilgiler güvenli bir şekilde işlenir.
                </p>
              </div>
              
              {/* İlerleme Çubuğu */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-2">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep === step
                          ? 'bg-primary text-white'
                          : currentStep > step
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step ? <CheckIcon size={18} /> : step}
                    </div>
                  ))}
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div 
                    className="absolute h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">Kişisel Bilgiler</span>
                  <span className="text-sm text-gray-600">Ek Bilgiler</span>
                  <span className="text-sm text-gray-600">Onay</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Adım 1: Kişisel Bilgiler */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tcKimlik">T.C. Kimlik Numarası *</Label>
                        <Input
                          id="tcKimlik"
                          name="tcKimlik"
                          placeholder="11 haneli TC Kimlik Numaranız"
                          value={formData.tcKimlik}
                          onChange={handleChange}
                          required
                          minLength={11}
                          maxLength={11}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dogumTarihi">Doğum Tarihi *</Label>
                        <Input
                          id="dogumTarihi"
                          name="dogumTarihi"
                          type="date"
                          value={formData.dogumTarihi}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ad">Adınız *</Label>
                        <Input
                          id="ad"
                          name="ad"
                          placeholder="Adınız"
                          value={formData.ad}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="soyad">Soyadınız *</Label>
                        <Input
                          id="soyad"
                          name="soyad"
                          placeholder="Soyadınız"
                          value={formData.soyad}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="telefon">Telefon Numarası *</Label>
                        <Input
                          id="telefon"
                          name="telefon"
                          placeholder="05XX XXX XX XX"
                          value={formData.telefon}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta Adresi *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ornek@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary-dark text-white"
                      >
                        Devam Et <ChevronRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Adım 2: Ek Bilgiler */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="adres">Adres *</Label>
                        <Input
                          id="adres"
                          name="adres"
                          placeholder="Adresiniz"
                          value={formData.adres}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sehir">Şehir *</Label>
                        <Input
                          id="sehir"
                          name="sehir"
                          placeholder="Şehir"
                          value={formData.sehir}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 col-span-2">
                        <Label>Eğitim Durumu *</Label>
                        <RadioGroup value={formData.egitimDurumu} onValueChange={(value) => handleRadioChange('egitimDurumu', value)} className="grid grid-cols-2 gap-4 pt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ilkogretim" id="egitim-ilkogretim" />
                            <Label htmlFor="egitim-ilkogretim" className="font-normal cursor-pointer">İlköğretim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lise" id="egitim-lise" />
                            <Label htmlFor="egitim-lise" className="font-normal cursor-pointer">Lise</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="universite" id="egitim-universite" />
                            <Label htmlFor="egitim-universite" className="font-normal cursor-pointer">Üniversite</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lisansustu" id="egitim-lisansustu" />
                            <Label htmlFor="egitim-lisansustu" className="font-normal cursor-pointer">Lisansüstü</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="meslek">Meslek *</Label>
                        <Input
                          id="meslek"
                          name="meslek"
                          placeholder="Mesleğiniz"
                          value={formData.meslek}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gelir">Aylık Gelir (TL) *</Label>
                        <Input
                          id="gelir"
                          name="gelir"
                          type="number"
                          placeholder="Aylık geliriniz"
                          value={formData.gelir}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevious}
                      >
                        Geri Dön
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary-dark text-white"
                      >
                        Devam Et <ChevronRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Adım 3: Onay */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">Başvuru Özeti</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Ad Soyad</p>
                          <p className="font-medium">{formData.ad} {formData.soyad}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">TC Kimlik No</p>
                          <p className="font-medium">{formData.tcKimlik}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Telefon</p>
                          <p className="font-medium">{formData.telefon}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">E-posta</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="kvkkOnay"
                          checked={formData.kvkkOnay}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('kvkkOnay', checked as boolean)
                          }
                          required
                        />
                        <div>
                          <Label
                            htmlFor="kvkkOnay"
                            className="text-sm font-normal leading-relaxed cursor-pointer"
                          >
                            Kişisel verilerimin, 6698 sayılı KVKK kapsamında, başvurumun değerlendirilmesi amacıyla işlenmesine ve anlaşmalı bankalara aktarılmasına izin veriyorum. *
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">
                            <a href="/kvkk" className="text-primary hover:underline">
                              KVKK Aydınlatma Metni
                            </a>
                            'ni okudum ve anladım.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="pazarlamaIzni"
                          checked={formData.pazarlamaIzni}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('pazarlamaIzni', checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="pazarlamaIzni"
                          className="text-sm font-normal leading-relaxed cursor-pointer"
                        >
                          Kampanya, indirim ve fırsatlardan haberdar olmak için elektronik iletişim kanalları üzerinden ticari elektronik ileti almayı kabul ediyorum.
                        </Label>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm">
                      <p>
                        <strong>Önemli Not:</strong> Başvurunuz gönderildikten sonra, anlaşmalı bankanın değerlendirme sürecine alınacaktır. Onay durumunuz ve sonraki adımlar hakkında size bilgilendirme yapılacaktır.
                      </p>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevious}
                      >
                        Geri Dön
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-primary hover:bg-primary-dark text-white"
                        disabled={!formData.kvkkOnay}
                      >
                        Başvuruyu Tamamla
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Anlaşmalı Bankalar</h2>
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3, 4].map((bank) => (
                  <div key={bank} className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src="/placeholder.svg" alt={`Banka ${bank}`} className="max-w-full max-h-full p-2" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Başvurunuz, yukarıdaki anlaşmalı bankalarımızdan birine yönlendirilecektir. Tüm işlemler güvenli ve yasal çerçevede gerçekleştirilmektedir.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Apply;
