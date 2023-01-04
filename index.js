const { fifaData } = require('./fifa.js')

console.log(fifaData)

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
fifaData.filter(item=> item.Year===2014 && item.Stage === "Final")[0]["Home Team Name"]
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
fifaData.filter(item=> item.Year===2014 && item.Stage === "Final")[0]["Away Team Name"]
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
fifaData.filter(item=> item.Year===2014 && item.Stage === "Final")[0]["Home Team Goals"]
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
fifaData.filter(item=> item.Year===2014 && item.Stage === "Final")[0]["Away Team Goals"]
//(e) 2014 Dünya kupası finali kazananı*/
fifaData.filter(item=> item.Year===2014 && item.Stage === "Final")[0]["Win conditions"].split(" ")[0] //.split ile sadece kazanan takım yazdırılbilir

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaData) {
   return fifaData.filter(item=> item.Stage === "Final")
}


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData,Finaller) {
	return Finaller(fifaData).map(item=> item.Year)
   
}


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(fifaData,Finaller) {
	let kazananlar=[];
    let HomeTeamGoal=Finaller(fifaData).map(items=> items["Home Team Goals"]);
	let awayTeamGoal=Finaller(fifaData).map(items=> items["Away Team Goals"]);

	for(let i= 0 ; i< HomeTeamGoal.length ;i++){
		if(HomeTeamGoal[i] > awayTeamGoal[i]){
			kazananlar.push(Finaller(fifaData).map(items=> items["Home Team Name"])[i])
		}else{
			kazananlar.push(Finaller(fifaData).map(items=> items["Away Team Name"])[i])
		}
	}
	return kazananlar;
	
}



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar) {
	let yıl=Yillar(fifaData,Finaller);
	let ülke=Kazananlar(fifaData,Finaller);
	let sonuc=[];

	yıl.forEach((item,i)=> {
		sonuc.push(`${item} yılında, ${ülke[i]} dünya kupasını kazandı!`)
	})

	// for(let i=0 ; i<ülke.length ; i++){
	// 	sonuc.push(`${yıl[i]} yılında, ${ülke[i]} dünya kupasını kazandı!`)
	// }
	
	return sonuc;
}


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
	
	// let homeTeamGoal=Finaller.map(items=> items["Home Team Goals"])
	// let evSahibiToplamGol=homeTeamGoal.reduce((a,b) => a+b ,0)
	// let awayTeamGoal=Finaller.map(items=> items["Away Team Goals"])
	// let konukTakımToplamGol=awayTeamGoal.reduce((a,b) => a+b ,0)
	// let sonuc=((konukTakımToplamGol+evSahibiToplamGol)/(homeTeamGoal.length)).toFixed(2);
	
	let finalToplamGol=Finaller.reduce((total,item)=> (total+item["Home Team Goals"] +item["Away Team Goals"]),0 )
	let sonuc=(finalToplamGol/(Finaller.length)).toFixed(2)

	return sonuc;
}



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

// let takımKısaltmaları=fifaData.map(item=> item["Home Team Initials"])
// let kazananTakımlar=Kazananlar(fifaData,Finaller)
// function UlkelerinKazanmaSayilari(fifaData,takimKisaltma) {
// 	let kazanma={};
// 	for(var i=0 ; i<takimKisaltma;i++){
// 		let takimData=fifaData.filter(item=> item.kisaltma=== takimKisaltma[i])
// 		if(takimData)
// 	}

// 	return 
// }



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(fifaData) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(fifaData) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
