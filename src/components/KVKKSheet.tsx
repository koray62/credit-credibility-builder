
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
          <p className="text-sm text-gray-600">
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, kredi başvuru sürecinde tarafımıza ilettiğiniz kişisel verilerinizin işlenmesine ilişkin olarak aşağıdaki bilgilendirme yapılmaktadır.
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">1. Veri Sorumlusu</h3>
            <p className="text-sm text-gray-600">
              Kişisel verileriniz, veri sorumlusu sıfatıyla <strong>Nora Finansal Yazılımlar Anonim Şirketi (NORA A.Ş.)</strong> tarafından işlenmektedir.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">2. İşlenen Veriler</h3>
            <p className="text-sm text-gray-600">
              Ad, soyad, T.C. kimlik numarası, iletişim bilgileri, demografik bilgiler, kredi başvuru detayları, Findeks raporu (rızanızla), IP adresi ve işlem logları.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">3. İşleme Amaçları</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Kredi başvurularının alınması ve değerlendirilmesi</li>
              <li>Başvuruların anlaşmalı bankalara yönlendirilmesi</li>
              <li>Kredi geçmişi oluşturulması ve finansal davranış takibi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Finansal okuryazarlık kapsamında bilgilendirme yapılması</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">4. Hukuki Sebepler</h3>
            <p className="text-sm text-gray-600">
              KVKK m.5/2 (c) ve (f) hükümleri gereğince ve açık rıza alınması hâlinde işlenmektedir.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">5. Veri Aktarımı</h3>
            <p className="text-sm text-gray-600">
              Kişisel verileriniz;
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>5411 sayılı Bankacılık Kanunu kapsamındaki bankalar ve finansal kuruluşlara,</li>
              <li>Teknoloji hizmet sağlayıcılarına,</li>
              <li>Yasal yükümlülük kapsamında ilgili kurumlara</li>
            </ul>
            <p className="text-sm text-gray-600">
              yalnızca ilgili amaçlar doğrultusunda ve KVKK'ya uygun şekilde aktarılabilir.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">6. Haklarınız</h3>
            <p className="text-sm text-gray-600">
              KVKK m.11 kapsamında;
              verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini, silinmesini talep etme, yapılan işlemlerin 3. kişilere bildirilmesini isteme, itiraz ve zarar halinde tazmin talep etme haklarına sahipsiniz.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">7. Başvuru</h3>
            <p className="text-sm text-gray-600">
              Tüm taleplerinizi <a href="mailto:kvkk@norafinans.com" className="text-primary hover:underline">kvkk@norafinans.com</a> adresine e-posta ile veya şirket merkezimize yazılı olarak iletebilirsiniz.
            </p>
          </div>
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
