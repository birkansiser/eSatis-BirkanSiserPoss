const chatbotData = {
  // Genel sorular ve cevaplar
  general: {
    'nasıl sipariş verebilirim': `
      PCB siparişi vermek için aşağıdaki adımları izleyebilirsiniz:
      1. "Tasarım Yükle" sayfasına gidin
      2. PCB özelliklerini belirleyin (katman sayısı, boyut, adet)
      3. Tasarım dosyanızı yükleyin
      4. Fiyat teklifini onaylayın
      5. Ödeme işlemini tamamlayın
    `,
    'hangi dosya formatlarını kabul ediyorsunuz': `
      Aşağıdaki dosya formatlarını kabul ediyoruz:
      - Gerber (.gbr)
      - Eagle (.brd)
      - Altium Designer (.pcbdoc)
      - KiCad (.kicad_pcb)
      - OrCAD (.brd)
      - PDF (sadece prototip siparişleri için)
    `,
    'ödeme seçenekleri nelerdir': `
      Şu ödeme yöntemlerini kullanabilirsiniz:
      - Kredi/Banka Kartı
      - Havale/EFT
      - Kapıda Ödeme (belirli tutara kadar)
    `
  },

  pcb: {
    'katman sayısı ne demek': `
      PCB'deki katman sayısı, devre kartının kaç katmanlı olacağını belirtir:
      - 1 katman: Tek yüzlü, basit devreler için
      - 2 katman: Çift yüzlü, orta karmaşıklıktaki devreler için
      - 4+ katman: Çok katmanlı, karmaşık devreler için
    `,
    'pcb boyutları nasıl belirlenir': `
      PCB boyutları mm cinsinden belirlenir:
      - Minimum boyut: 10mm x 10mm
      - Maksimum boyut: 400mm x 500mm
      Tasarımınızın tam ölçülerini girebilirsiniz.
    `,
    'pcb kalitesi nasıl': `
      PCB üretimimizde en yüksek kalite standartlarını uyguluyoruz:
      - FR4 malzeme kullanımı
      - Kurşunsuz HASL veya ENIG kaplama
      - Otomatik optik kontrol
      - Elektriksel test
    `
  },

  shipping: {
    'kargo süreleri ne kadar': `
      Kargo süreleri şu şekildedir:
      - Standart teslimat: 2-4 iş günü
      - Hızlı teslimat: 1-2 iş günü
      - Aynı gün teslimat: Sadece İstanbul içi
    `,
    'kargo ücreti ne kadar': `
      Kargo ücretlendirmemiz şöyledir:
      - 300 TL üzeri siparişlerde ücretsiz
      - Standart kargo: 30 TL
      - Hızlı kargo: 50 TL
      - Aynı gün teslimat: 80 TL
    `
  },

  custom: {
    'özel sipariş verebilir miyim': `
      Evet, özel PCB siparişi verebilirsiniz:
      1. "Tasarım Yükle" sayfasından "Özel Sipariş" seçeneğini işaretleyin
      2. Özel gereksinimlerinizi belirtin
      3. Tasarım dosyanızı yükleyin
      4. Size özel fiyat teklifi oluşturulacaktır
    `,
    'prototip üretimi yapıyor musunuz': `
      Evet, prototip PCB üretimi yapıyoruz:
      - Minimum adet sınırı yok
      - Hızlı üretim seçeneği mevcut
      - Özel malzeme seçenekleri
      - Teknik destek hizmeti
    `
  },


  support: {
    'teknik destek alabilir miyim': `
      Evet, teknik destek hizmetimiz mevcuttur:
      - E-posta desteği
      - Telefon desteği (09:00-18:00)
      - Canlı chat desteği
      - Uzman PCB tasarım danışmanlığı
    `,
    'tasarım konusunda yardım alabilir miyim': `
      Evet, PCB tasarımı konusunda yardımcı olabiliriz:
      - Tasarım doğrulama
      - DFM (Üretilebilirlik) analizi
      - Komponent yerleşimi önerileri
      - Katman optimizasyonu
    `
  },


  about: {
    'firma hakkında': `
      PCB Tasarım olarak 10 yılı aşkın süredir elektronik devre kartı üretimi konusunda hizmet vermekteyiz.
      
      Öne Çıkan Özelliklerimiz:
      - Yüksek kalite standartları
      - Hızlı üretim ve teslimat
      - Rekabetçi fiyatlar
      - Profesyonel teknik destek
      - %100 müşteri memnuniyeti garantisi
    `,
    'neler yapıyorsunuz': `
      Sunduğumuz başlıca hizmetler:
      1. PCB Tasarım ve Üretim
      2. Prototip PCB Üretimi
      3. Çok Katmanlı PCB Üretimi
      4. Özel PCB Tasarımları
      5. PCB Montaj Hizmetleri
      6. Teknik Danışmanlık
    `,
    'neden sizi seçmeliyim': `
      Bizi tercih etmeniz için nedenler:
      - 10+ yıllık sektör deneyimi
      - Modern üretim tesisleri
      - ISO 9001:2015 kalite sertifikası
      - Ücretsiz teknik destek
      - Hızlı prototipleme
      - Rekabetçi fiyatlar
      - Zamanında teslimat garantisi
    `,
    'kalite standartlarınız neler': `
      Kalite standartlarımız:
      - ISO 9001:2015 sertifikasyonu
      - IPC standartlarına uygunluk
      - RoHS uyumlu üretim
      - Otomatik optik kontrol (AOI)
      - Elektriksel test süreçleri
      - Düzenli kalite kontrol
    `,
    'kimsiniz': `
      PCB Tasarım olarak elektronik devre kartı üretimi konusunda Türkiye'nin önde gelen firmalarından biriyiz.
      10 yılı aşkın deneyimimiz ve uzman kadromuzla müşterilerimize en kaliteli hizmeti sunuyoruz.
    `,
    'ne iş yapıyorsunuz': `
      Ana faaliyet alanlarımız:
      - PCB tasarım ve üretimi
      - Prototip PCB geliştirme
      - Çok katmanlı PCB üretimi
      - PCB montaj hizmetleri
      - PCB test ve analiz
      - Teknik danışmanlık
    `,
    'çalışma saatleriniz': `
      Çalışma Saatlerimiz:
      - Hafta içi: 09:00 - 18:00
      - Cumartesi: 09:00 - 13:00
      - Pazar: Kapalı
      
      Acil durumlarda 7/24 teknik destek hattımız mevcuttur.
    `,
    'ne zamandır varsınız': `
      2013 yılından beri PCB sektöründe hizmet vermekteyiz.
      10+ yıllık deneyimimizle binlerce başarılı projeye imza attık.
    `
  },

  contact: {
    'iletişim bilgileri': `
      Bize şu kanallardan ulaşabilirsiniz:
      
      📞 Telefon: 0850 123 45 67
      📧 E-posta: info@pcbtasarim.com
      🏢 Adres: Teknoloji Vadisi, No:123
              34000 İstanbul/Türkiye
      
      Çalışma Saatleri:
      Hafta içi: 09:00 - 18:00
      Cumartesi: 09:00 - 13:00
    `,
    'şikayet ve öneriler': `
      Şikayet ve önerileriniz için:
      1. İletişim sayfamızdaki formu doldurabilir
      2. support@pcbtasarim.com adresine e-posta gönderebilir
      3. 0850 123 45 67 numaralı telefondan müşteri hizmetlerimize ulaşabilirsiniz
      
      Tüm geri bildirimleriniz 24 saat içinde değerlendirilmektedir.
    `
  },


  references: {
    'referanslarınız': `
      Başlıca referanslarımız:
      - Teknoloji şirketleri
      - Ar-Ge merkezleri
      - Üniversiteler
      - Elektronik üreticileri
      - Savunma sanayi firmaları
      
      10 yıllık deneyimimizle 1000+ müşteriye hizmet verdik.
    `,
    'sertifikalarınız': `
      Sahip olduğumuz sertifikalar:
      - ISO 9001:2015 Kalite Yönetim Sistemi
      - ISO 14001 Çevre Yönetim Sistemi
      - OHSAS 18001 İş Sağlığı ve Güvenliği
      - RoHS Uygunluk Sertifikası
      - UL Sertifikası
    `
  },

  production: {
    'üretim kapasiteniz': `
      Üretim kapasitemiz:
      - Günlük 1000+ PCB üretimi
      - 1-16 katmanlı PCB üretimi
      - Minimum boyut: 10mm x 10mm
      - Maksimum boyut: 400mm x 500mm
      - FR4, Alüminyum PCB üretimi
      - Özel malzeme seçenekleri
    `,
    'üretim süreleri': `
      Standart üretim süreleri:
      - Prototip: 2-3 iş günü
      - Normal üretim: 5-7 iş günü
      - Acil üretim: 24-48 saat
      - Özel projeler: Proje bazlı değerlendirme
    `
  },

  
  services: {
    'hizmetleriniz neler': `
      Sunduğumuz başlıca hizmetler:
      1. PCB Tasarım Hizmetleri
      2. PCB Üretim Hizmetleri
      3. Prototip PCB Üretimi
      4. PCB Montaj Hizmetleri
      5. PCB Test ve Analiz
      6. Teknik Danışmanlık
      7. Acil Üretim Hizmetleri
    `,
    'pcb tasarımı yapıyor musunuz': `
      Evet, profesyonel PCB tasarım hizmetleri sunuyoruz:
      - Şematik tasarım
      - PCB layout tasarımı
      - Komponent yerleşimi
      - Sinyal bütünlüğü analizi
      - Termal analiz
      - EMC/EMI analizi
    `,
    'montaj yapıyor musunuz': `
      Evet, PCB montaj hizmetlerimiz:
      - SMT montaj
      - THT montaj
      - BGA montaj
      - Seçmeli lehimleme
      - Komponent tedariki
      - Kalite kontrol
    `
  },


  pricing: {
    'fiyatlar nasıl': `
      PCB fiyatlarımız şu faktörlere göre belirlenir:
      - PCB boyutu
      - Katman sayısı
      - Üretim adedi
      - Malzeme tipi
      - Yüzey kaplama
      - Teslimat süresi
      
      Detaylı fiyat teklifi için web sitemizdeki hesaplama aracını kullanabilirsiniz.
    `,
    'fiyat hesaplama': `
      Fiyat hesaplamak için:
      1. "Fiyat Hesapla" sayfasına gidin
      2. PCB özelliklerini seçin
      3. Adet bilgisini girin
      4. Teslimat süresini belirleyin
      
      Hemen online fiyat teklifi alabilirsiniz.
    `,
    'minimum sipariş': `
      Minimum sipariş detayları:
      - Prototip: 1 adet
      - Normal üretim: 5 adet
      - Özel projeler: Görüşmeye bağlı
      
      Yüksek adetli siparişlerde özel fiyatlandırma yapılmaktadır.
    `
  },


  technical: {
    'teknik özellikler': `
      PCB üretim özelliklerimiz:
      - Katman sayısı: 1-16 arası
      - Min. hat kalınlığı: 0.1mm
      - Min. delik çapı: 0.2mm
      - Bakır kalınlığı: 1/2/3 oz
      - PCB kalınlığı: 0.4-3.2mm
      - Yüzey kaplama: HASL, ENIG, OSP
    `,
    'malzeme seçenekleri': `
      Kullandığımız PCB malzemeleri:
      - FR4 (standart)
      - Rogers
      - Alüminyum PCB
      - Flexible PCB
      - High-Tg FR4
      - Polyimide
    `,
    'test süreçleri': `
      Kalite kontrol ve test süreçlerimiz:
      1. Optik kontrol (AOI)
      2. Elektriksel test
      3. Empedans testi
      4. X-Ray kontrolü
      5. Kesit analizi
      6. Solderability testi
    `
  }
}


const keywordMap = {
  'sipariş': 'general',
  'ödeme': 'general',
  'dosya': 'general',
  'format': 'general',
  'katman': 'pcb',
  'boyut': 'pcb',
  'kalite': 'pcb',
  'kargo': 'shipping',
  'teslimat': 'shipping',
  'özel': 'custom',
  'prototip': 'custom',
  'destek': 'support',
  'yardım': 'support',
  'firma': 'about',
  'hakkında': 'about',
  'şirket': 'about',
  'iletişim': 'contact',
  'ulaşım': 'contact',
  'telefon': 'contact',
  'adres': 'contact',
  'şikayet': 'contact',
  'öneri': 'contact',
  'referans': 'references',
  'sertifika': 'references',
  'deneyim': 'references',
  'üretim': 'production',
  'kapasite': 'production',
  'kimsiniz': 'about',
  'saatler': 'about',
  'hizmet': 'services',
  'tasarım': 'services',
  'montaj': 'services',
  'fiyat': 'pricing',
  'ücret': 'pricing',
  'hesaplama': 'pricing',
  'minimum': 'pricing',
  'teknik': 'technical',
  'malzeme': 'technical',
  'test': 'technical',
  'özellik': 'technical'
}

export const findAnswer = (question) => {
  try {

    const cleanQuestion = question.toLowerCase().trim()


    for (const category of Object.values(chatbotData)) {
      if (category && category[cleanQuestion]) {
        return category[cleanQuestion]
      }
    }

    for (const [keyword, category] of Object.entries(keywordMap)) {
      if (cleanQuestion.includes(keyword) && chatbotData[category]) {
 
        for (const [q, a] of Object.entries(chatbotData[category])) {
          if (q && cleanQuestion.includes(q.split(' ')[0])) {
            return a
          }
        }
      }
    }

 
    return `
      Üzgünüm, sorunuzu tam olarak anlayamadım. Size yardımcı olabilecek bazı konular:
      - Sipariş verme süreci
      - PCB özellikleri ve seçenekleri
      - Ödeme ve teslimat bilgileri
      - Teknik destek hizmetleri

      Lütfen bu konularla ilgili daha spesifik bir soru sorun.
    `
  } catch (error) {
    console.error('FindAnswer error:', error)
    return 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.'
  }
}

export default chatbotData 