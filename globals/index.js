import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom} from "jotai"

const gameData = atom({get(){}, addPoint:0})// selects the next game after "devam" is clicked
const gameMistakes = atom([])
const gameStatistics = atom(null)

// mazeGame atoms
const mazePlayerSpeed = atom(8)
const virtualMaze = atom(null)

// Storage Keys
const EMOJIS_LS = "emojisGameMistakes"
const MAZE_LS = "mazeGameMistakes"
const PASSWORD_LS = "passwordGameMistakes"
const STATISTICS_LS = "falseAndTotal"

// Navigation Display
const NavOpts = atom({})

// Habbit Notification
const pickedTips = atom(null)

// account info
const pointsAtom = atom(0)

// Helpers
function updateStorage({ isSuccessful, mistakes, statistics, gameKey, gameName, gameToAdd }) {
  if (mistakes.length > 4) { // If the question was asked before
    mistakes.shift()
  }
  if (!isSuccessful) { // If the game was lost add to mistakes
    mistakes.push(gameToAdd)
    statistics[gameName][0]++ // Incrementing the incorrection number in DB
  }
  statistics[gameName][1]++ // Incrementing the playing number in DB

  const storageSets = [
    [gameKey, JSON.stringify(mistakes)],
    [STATISTICS_LS, JSON.stringify(statistics)]
  ]

  AsyncStorage.multiSet(storageSets)
}
function setPointTo({value, updateAtomWith}) {
  AsyncStorage.setItem("point_LS", String(value))
  updateAtomWith(value)
}

// Articles
const PARAGRAPHS = [
  'Hafızayı geliştirmenin birkaç yolu var: düzenli egzersiz yapmak, sağlıklı beslenmek, uyku düzenine dikkat etmek, zihinsel egzersizler yapmak (bulmaca çözmek, yeni şeyler öğrenmek), görsel veya işitsel teknikler kullanmak (not almak, harita çıkarmak) ve tekrar etmek gibi teknikleri deneyebilirsin. Bu yöntemleri birleştirerek hafıza gücünü artırabilirsin.',
  'Düzenli egzersiz yapmak, hafızamızı olumlu yönde etkiler çünkü egzersiz beynimizdeki kan dolaşımını artırır ve yeni nöronların oluşmasını sağlar. Aynı zamanda egzersiz yapmak, stresi azaltır ve öğrenme ile ilgili bilişsel fonksiyonlarımızı geliştirir. Bu da hafıza gücümüzü artırır ve zihinsel netliği destekler.',
  'Sağlıklı beslenmek, hafızamız için oldukça önemlidir çünkü beyin, işlevselliğini sürdürebilmek ve yeni şeyler öğrenebilmek için doğru ve yeterli besinlere ihtiyaç duyar. Özellikle antioksidanlar, omega-3 yağ asitleri, B vitaminleri ve belirli mineraller gibi besinler beyin sağlığımız için önemlidir. Bu besinler, hafıza işlevini destekler, beyin hücrelerini korur ve sinir iletimini iyileştirir. Ayrıca, doğru beslenme düzeni, kan şekerimizin stabil seviyelerde kalmasına ve beyinimiz için gerekli enerjinin sağlanmasına da yardımcı olabilir. Bu da hafızamızın ve bilişsel işlevlerimizin korunmasına yardımcı olur.',
  'Uyku, hafızamız için oldukça önemlidir çünkü beynimiz, uyku esnasında öğrendiğimiz bilgileri işler ve depolar. Yeterli ve kaliteli uyku, öğrenme kapasitemizi artırır ve hafıza performansımızı güçlendirir. REM uykusu özellikle yeni bilgilerin hafızanın uzun süreli yedeklemesi ve hafızanın güçlenmesi açısından önemlidir. Uyku eksikliği ise odaklanmayı, öğrenmeyi ve hafızayı olumsuz etkileyebilir. Bu yüzden düzenli ve yeterli uyku, sağlıklı bir hafıza için önemli bir unsurdur.',
  'Zihinsel egzersizler yapmak, beyin sağlığımızı dolayısıyla hafızamızı olumlu yönde etkileyebilir. Bulmaca çözmek, yeni bir dil öğrenmek, enstrüman çalmak gibi zihinsel egzersizler, beynimizdeki nöron bağlantılarını güçlendirir ve yeni sinir yollarının oluşumunu teşvik eder. Bu egzersizler, zihinsel esnekliği artırır, odaklanmayı güçlendirir ve problem çözme becerilerini geliştirir. Ayrıca, düzenli zihinsel egzersizler hafıza kapasitemizi artırır ve bilişsel gerilemeyi geciktirir.',
  'Görsel teknikler, hafızamızı güçlendirmekte oldukça etkili olur. Örneğin, not almak, harita çıkarmak, semboller veya renkler kullanmak gibi görsel teknikler, bilgiyi daha kolay anlamamıza ve hatırlamamıza yardımcı olur. Görsel olarak bilgiyi işlemek ve düzenlemek, beynimizdeki bağlantıları güçlendirir, bilginin derinlemesine anlaşılmasına ve daha uzun süre hatırlanmasına yardımcı olur. Bu teknikler öğrenme sürecimizi desteklerken, bilgiyi daha organize bir şekilde hatırlamamızı ve geri çağırmamızı kolaylaştırır.',
  'İşitsel teknikler, hafızamızı güçlendirmemizde önemli bir rol oynar. Örneğin, bilgiyi tekrar etmek, sesli olarak okumak veya kaydedilen notları dinlemek gibi işitsel teknikler, bilgiyi işleme ve hatırlama süreçlerini destekler. Bazı insanlarda bilgiyi duymak veya tekrar etmek, öğrenme süreçlerini daha etkili hale getirir. Bu teknikler, bilgiyi işiterek öğrenmeyi ve daha sonra hatırlamayı kolaylaştırır. Bu nedenle işitsel teknikler, öğrenme ve bilginin hafızamızda kalma sürecini artırmada faydalı olabilir.',
  'Tekrar etmek, bilgiyi hafızamızda tutma ve hatırlama sürecimizi güçlendirir. Bu yöntem, bilgiyi daha derinlemesine işlememizi ve uzun süreli belleğe aktarmamızı sağlar. Yineleme, beynimizdeki sinir bağlantılarını güçlendirir ve bilginin daha uzun süreli olarak hatırlamamıza yardımcı olur. Kısacası, düzenli tekrarlar, öğrendiğiniz şeyleri unutmaktan koruyarak hafızamızın güçlenmesine yardımcı olur.',
];
const HEADERS = [
  "Hafızayı Geliştirmenin Yolları",
  "Egzersizin Hafızaya Faydaları",
  "Sağlıklı Beslenmenin Hafızaya Etkisi",
  "Uyku ve Hafıza İlişkisi",
  "Zihinsel Egzersizlerin Hafızaya Katkısı",
  "Görsel Tekniklerin Hafızayı Güçlendirmedeki Rolü",
  "İşitsel Tekniklerin Hafızayı Desteklemedeki Önemi",
  "Tekrar Etmenin Hafızayı Güçlendirmedeki Etkisi"
];

export {
  gameData,
  gameMistakes,
  gameStatistics,
  mazePlayerSpeed,
  virtualMaze,
  EMOJIS_LS,
  MAZE_LS,
  PASSWORD_LS,
  STATISTICS_LS,
  updateStorage,
  NavOpts,
  HEADERS,
  PARAGRAPHS,
  pickedTips,
  pointsAtom,
  setPointTo
}