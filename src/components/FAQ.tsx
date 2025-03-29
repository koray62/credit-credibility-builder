
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Bu hizmet nasıl çalışır?",
      answer: "Hizmetimiz, hiç kredi kullanmamış veya son 5 yıldır aktif kredisi olmayan kişilerin, anlaşmalı bankalar üzerinden sıfır faizli kredi kullanarak kredibilite puanlarını oluşturmalarını sağlar. Kullanılan kredi tutarı bankada bloke edilir ve taksitler ödendikçe kredi puanı yükselir. Vade sonunda, ödenen taksitlerin toplamı bloke hesabın çözülmesiyle geri alınır."
    },
    {
      question: "Neden bu hizmete ihtiyacım var?",
      answer: "Eğer hiç kredi kullanmadıysanız veya uzun süredir kredi kullanmıyorsanız, bankalarda kredi skorunuz düşük veya hiç olmayabilir. Bu durum gelecekte ihtiyaç duyabileceğiniz kredilere erişiminizi zorlaştırabilir. Programımız, finansal kimliğinizi oluşturmanıza ve Findeks puanınızı yükseltmenize yardımcı olur."
    },
    {
      question: "Gerçekten faiz ödemeyecek miyim?",
      answer: "Evet, bu programda kullanılan krediler için faiz ödemezsiniz. Sadece 1000 TL'lik bir işlem komisyonu alınır. Kredi tutarı bankada bloke edilir ve taksitler ödendikçe Findeks puanınız yükselir. Vade sonunda, ödediğiniz tüm taksitlerin toplamını geri alırsınız."
    },
    {
      question: "Başvuru için nelere ihtiyacım var?",
      answer: "Başvuru için TC kimlik numaranız, iletişim bilgileriniz ve temel demografik bilgileriniz gerekecektir. Başvurunuz onaylandıktan sonra, anlaşmalı bankanın mobil uygulamasını indirerek uzaktan müşteri olabilir ve kredi işlemlerini tamamlayabilirsiniz."
    },
    {
      question: "Taksitleri ödemezsem ne olur?",
      answer: "Taksitleri zamanında ödememeniz durumunda, Findeks puanınız hedeflenen seviyeye ulaşamayabilir veya düşebilir. Banka, yasal takibe geçene kadar size uyarılarda bulunacak ancak bloke tutardan tahsilat yapmayacaktır. Düzenli ödeme yapmanız, programın başarısı için kritik önem taşır."
    },
    {
      question: "Krediyi erken kapatabilir miyim?",
      answer: "Evet, krediyi istediğiniz zaman erken kapatabilirsiniz. Bu durumda bloke çözülerek kredi kapatılır ve hesapta kalan fazla bakiye size iade edilir. Ancak, erken kapatma durumunda Findeks puanınız hedeflenen seviyeye ulaşmayabilir."
    },
    {
      question: "Bu program yasal mı?",
      answer: "Evet, program tamamen yasal ve şeffaftır. Tüm işlemler BDDK denetimindeki anlaşmalı bankalar üzerinden gerçekleştirilir. Kişisel verileriniz KVKK kapsamında korunur ve işlemleriniz güvenli bir şekilde yürütülür."
    },
    {
      question: "Ne kadar sürede kredi puanım yükselir?",
      answer: "Kredi puanınızın yükselmesi, düzenli ödeme yapmanıza bağlıdır. Genellikle, ilk birkaç taksit ödemesinden sonra puanınızda artış görmeye başlarsınız. Programın tamamlanması (12-24 ay) sonunda, hedeflenen Findeks puanına ulaşmış olursunuz."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Programımız hakkında en çok merak edilen soruları ve cevaplarını aşağıda bulabilirsiniz.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Başka sorularınız mı var?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Bize ulaşın
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
