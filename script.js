document.addEventListener('DOMContentLoaded', function() {
    const sorularContainer = document.getElementById('sorular-container');
    const finansalAnketForm = document.getElementById('finansalAnket');
    const sonucMesajiDiv = document.getElementById('sonuc-mesaji');

    const sorular = [
        {
            soru: "Aylık gelirinizin ne kadarını tasarruf ediyorsunuz?",
            cevaplar: ["%0-20", "%21-40", "%41-60", "%61 ve üzeri"]
        },
        {
            soru: "Borç yönetimi konusunda kendinizi nasıl değerlendiriyorsunuz?",
            cevaplar: ["Çok kötü", "Kötü", "İyi", "Çok iyi"]
        },
        {
            soru: "Yatırım yapmayı düşünüyor musunuz veya yapıyor musunuz?",
            cevaplar: ["Hayır, düşünmüyorum", "Evet, düşünüyorum", "Evet, yapıyorum (düşük risk)", "Evet, yapıyorum (yüksek risk)"]
        },
        {
            soru: "Acil durum fonunuz var mı (en az 3 aylık gideri karşılayacak kadar)?",
            cevaplar: ["Hayır", "Kısmen var", "Evet, tam olarak var", "Evet, fazlasıyla var"]
        },
        {
            soru: "Finansal hedeflerinize ne kadar yakınsınız?",
            cevaplar: ["Çok uzağım", "Biraz uzağım", "Yakınım", "Ulaştım veya aşıyorum"]
        },
        {
            soru: "Bütçe oluşturuyor musunuz ve düzenli olarak takip ediyor musunuz?",
            cevaplar: ["Hayır", "Bazen oluşturuyorum", "Evet, düzenli takip ediyorum", "Evet, detaylı takip ediyorum"]
        },
        {
            soru: "Finansal konularda ne kadar bilgi sahibisiniz?",
            cevaplar: ["Çok az", "Orta düzeyde", "İyi", "Çok iyi"]
        },
        {
            soru: "Kredi kartı kullanımınızı nasıl değerlendiriyorsunuz?",
            cevaplar: ["Kontrolsüz", "Bazen kontrolü kaybediyorum", "Genellikle kontrollü", "Tamamen kontrollü"]
        },
        {
            soru: "Gelecekteki finansal güvenliğiniz hakkında ne düşünüyorsunuz?",
            cevaplar: ["Çok endişeliyim", "Endişeliyim", "Umutluyum", "Çok güvendeyim"]
        },
        {
            soru: "Finansal danışmanlık hizmeti almayı düşündünüz mü?",
            cevaplar: ["Hayır", "Düşündüm ama almadım", "Evet, alıyorum", "Geçmişte aldım"]
        }
    ];

    function soruOlustur(soruObj, index) {
        const soruDiv = document.createElement('div');
        soruDiv.classList.add('soru-alan');
        soruDiv.innerHTML = `<h3>${index + 1}. ${soruObj.soru}</h3>`;

        const cevaplarDiv = document.createElement('div');
        cevaplarDiv.classList.add('cevaplar');

        soruObj.cevaplar.forEach((cevap, i) => {
            const cevapLabel = document.createElement('label');
            const cevapInput = document.createElement('input');
            cevapInput.type = 'radio';
            cevapInput.name = `soru-${index}`;
            cevapInput.value = cevap;
            cevapInput.required = true;

            cevapLabel.appendChild(cevapInput);
            cevapLabel.appendChild(document.createTextNode(cevap));
            cevaplarDiv.appendChild(cevapLabel);
        });

        soruDiv.appendChild(cevaplarDiv);
        return soruDiv;
    }

    sorular.forEach((soru, index) => {
        sorularContainer.appendChild(soruOlustur(soru, index));
    });

    finansalAnketForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const adSoyad = document.getElementById('ad').value.trim();
        const sehir = document.getElementById('sehir').value.trim();

        if (!adSoyad || !sehir) {
            sonucMesajiDiv.className = 'sonuc-mesaji hata-mesaji';
            sonucMesajiDiv.textContent = "Lütfen adınızı soyadınızı ve yaşadığınız şehri girin.";
            return;
        }

        const cevaplar = {};
        sorular.forEach((_, index) => {
            const seciliCevap = document.querySelector(`input[name="soru-${index}"]:checked`);
            if (seciliCevap) {
                cevaplar[`soru-${index + 1}`] = seciliCevap.value;
            } else {
                sonucMesajiDiv.className = 'sonuc-mesaji hata-mesaji';
                sonucMesajiDiv.textContent = `${index + 1}. soruyu cevaplamadınız. Lütfen tüm soruları cevaplayın.`;
                return;
            }
        });

        if (Object.keys(cevaplar).length === sorular.length) {
            sonucMesajiDiv.className = 'sonuc-mesaji';
            sonucMesajiDiv.textContent = "Anket başarıyla gönderildi. Katılımınız için teşekkür ederiz!";
            console.log("Anket Cevapları:", { ad: adSoyad, sehir: sehir, cevaplar: cevaplar });
            // Burada anket verilerini sunucuya gönderme işlemleri yapılabilir.
            finansalAnketForm.reset();
        }
    });
});