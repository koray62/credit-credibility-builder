
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, X } from "lucide-react";

interface AraOdeme {
  ay: number;
  tutar: number;
}

interface OdemePlani {
  ay: number;
  anapara: number;
  faiz: number;
  toplam: number;
  kalanBakiye: number;
  araOdeme?: number;
}

const CreditCalculation = () => {
  const [krediTutari, setKrediTutari] = useState<number>(100000);
  const [faizOrani, setFaizOrani] = useState<number>(2.5);
  const [vade, setVade] = useState<number>(12);
  const [araOdemeler, setAraOdemeler] = useState<AraOdeme[]>([]);
  const [yeniAraOdeme, setYeniAraOdeme] = useState<AraOdeme>({ ay: 1, tutar: 0 });
  const [odemePlani, setOdemePlani] = useState<OdemePlani[]>([]);

  const araOdemeEkle = () => {
    if (yeniAraOdeme.tutar > 0 && yeniAraOdeme.ay <= vade) {
      const mevcutAraOdeme = araOdemeler.find(ao => ao.ay === yeniAraOdeme.ay);
      if (mevcutAraOdeme) {
        setAraOdemeler(araOdemeler.map(ao => 
          ao.ay === yeniAraOdeme.ay 
            ? { ...ao, tutar: ao.tutar + yeniAraOdeme.tutar }
            : ao
        ));
      } else {
        setAraOdemeler([...araOdemeler, yeniAraOdeme].sort((a, b) => a.ay - b.ay));
      }
      setYeniAraOdeme({ ay: 1, tutar: 0 });
    }
  };

  const araOdemeSil = (ay: number) => {
    setAraOdemeler(araOdemeler.filter(ao => ao.ay !== ay));
  };

  const odemePlaniOlustur = () => {
    const aylıkFaizOrani = (faizOrani * 1.2) / 100; // KKDF ve BSMV dahil
    const plan: OdemePlani[] = [];
    
    let kalanBakiye = krediTutari;
    let aylıkTaksit = (krediTutari * aylıkFaizOrani * Math.pow(1 + aylıkFaizOrani, vade)) / 
                      (Math.pow(1 + aylıkFaizOrani, vade) - 1);

    for (let ay = 1; ay <= vade; ay++) {
      if (kalanBakiye <= 0.01) {
        break;
      }

      const faizTutari = kalanBakiye * aylıkFaizOrani;
      let anaparaTutari = aylıkTaksit - faizTutari;
      
      if (anaparaTutari > kalanBakiye) {
        anaparaTutari = kalanBakiye;
        aylıkTaksit = anaparaTutari + faizTutari;
      }

      const araOdeme = araOdemeler.find(ao => ao.ay === ay);
      const araOdemeTutari = araOdeme ? araOdeme.tutar : 0;

      kalanBakiye = kalanBakiye - anaparaTutari - araOdemeTutari;
      
      if (kalanBakiye < 0) {
        kalanBakiye = 0;
      }

      plan.push({
        ay,
        anapara: anaparaTutari,
        faiz: faizTutari,
        toplam: aylıkTaksit,
        kalanBakiye: Math.max(0, kalanBakiye),
        araOdeme: araOdemeTutari > 0 ? araOdemeTutari : undefined
      });
    }

    setOdemePlani(plan);
  };

  const toplamFaiz = odemePlani.reduce((toplam, odeme) => toplam + odeme.faiz, 0);
  const toplamAraOdeme = araOdemeler.reduce((toplam, ao) => toplam + ao.tutar, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Kredi Hesaplama ve Ödeme Planı</CardTitle>
              <CardDescription className="text-center">
                Kredi bilgilerinizi girerek detaylı ödeme planınızı görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label htmlFor="krediTutari">Kredi Tutarı (TL)</Label>
                  <Input
                    id="krediTutari"
                    type="number"
                    value={krediTutari}
                    onChange={(e) => setKrediTutari(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="faizOrani">Aylık Net Faiz Oranı (%)</Label>
                  <Input
                    id="faizOrani"
                    type="number"
                    step="0.1"
                    value={faizOrani}
                    onChange={(e) => setFaizOrani(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="vade">Vade (Ay)</Label>
                  <Input
                    id="vade"
                    type="number"
                    value={vade}
                    onChange={(e) => setVade(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-lg font-semibold mb-3 block">Ara Ödemeler</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="araOdemeAy">Ay</Label>
                    <Input
                      id="araOdemeAy"
                      type="number"
                      min="1"
                      max={vade}
                      value={yeniAraOdeme.ay}
                      onChange={(e) => setYeniAraOdeme({...yeniAraOdeme, ay: Number(e.target.value)})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="araOdemeTutar">Tutar (TL)</Label>
                    <Input
                      id="araOdemeTutar"
                      type="number"
                      value={yeniAraOdeme.tutar}
                      onChange={(e) => setYeniAraOdeme({...yeniAraOdeme, tutar: Number(e.target.value)})}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={araOdemeEkle} className="w-full">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Ara Ödeme Ekle
                    </Button>
                  </div>
                </div>

                {araOdemeler.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Eklenen Ara Ödemeler:</h4>
                    {araOdemeler.map((ao, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                        <span>{ao.ay}. ayda {ao.tutar.toLocaleString('tr-TR')} TL</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => araOdemeSil(ao.ay)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button onClick={odemePlaniOlustur} className="w-full" size="lg">
                Ödeme Planını Hesapla
              </Button>
            </CardContent>
          </Card>

          {odemePlani.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Ödeme Planı</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-800">Toplam Faiz</div>
                    <div className="text-lg font-bold text-blue-600">
                      {toplamFaiz.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-semibold text-green-800">Toplam Ara Ödeme</div>
                    <div className="text-lg font-bold text-green-600">
                      {toplamAraOdeme.toLocaleString('tr-TR')} TL
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-800">Toplam Ödeme</div>
                    <div className="text-lg font-bold text-purple-600">
                      {(krediTutari + toplamFaiz).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ay</TableHead>
                        <TableHead className="text-right">Anapara (TL)</TableHead>
                        <TableHead className="text-right">Faiz (TL)</TableHead>
                        <TableHead className="text-right">Taksit (TL)</TableHead>
                        <TableHead className="text-right">Ara Ödeme (TL)</TableHead>
                        <TableHead className="text-right">Kalan Bakiye (TL)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {odemePlani.map((odeme) => (
                        <TableRow key={odeme.ay}>
                          <TableCell className="font-medium">{odeme.ay}</TableCell>
                          <TableCell className="text-right">
                            {odeme.anapara.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-right">
                            {odeme.faiz.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-right">
                            {odeme.toplam.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-right">
                            {odeme.araOdeme ? odeme.araOdeme.toLocaleString('tr-TR') : '-'}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {odeme.kalanBakiye.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCalculation;
