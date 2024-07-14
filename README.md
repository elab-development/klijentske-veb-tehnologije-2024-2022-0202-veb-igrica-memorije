### VEB IGRICA- MEMORIJE

## NAČIN POVLAČENJA I POKRETANJA
1. Napravite novi folder gde planirate da sačuvate aplikaciju.
2. Otvorite Powershell/Bash ili bilo koji drugi shell.
3. Namestite da putanja bude putanja ka novom folderu.
4. Izvršite sledeće komande:
   git init
   git clone https://github.com/elab-development/klijentske-veb-tehnologije-2024-2022-0202-veb-igrica-memorije.git
   cd klijentske-veb-tehnologije-2024-2022-0202-veb-igrica-memorije/veb-igrica-memorije
   npm i
   npm run dev
5. Copy-pastujte link (koji je dat u formatu Local:link) u vaš preferirani browser.
6. Napravite dva nova naloga, jedan za vas, drugi za vaseg protivnika.
7. Prijavite se   
8. Ako naidjete na problem kontaktirajte me na ilankovicaleksandar@gmail.com

## OPIS
Osnovna ideja aplikacije:
Igra memorije za dva igrača. Prva stranica sadrži formu za prijavu ili registrovanje. Za naloge su vezani i broj odigranih mečeva i istorija pobeda koja se može videti na stranici korisnika (drugoj stranici) i implementirana je pomoću ChartJS biblioteke. Treća stranica sadrži implementiranu igru memorije i broji pogođene pojmove za svakog igrača, a na kraju igre rezultat se prikazuje na istoj stranici. Četvrta stranica sadrži prikaz svih kartica. Peta stranica sadrži rang listu sa filterima.




## FUNKCIONALNOSTI

Detaljan opis funkcionalnosti koje aplikacija nudi:

-Sistem za registrovanje/prijavljivanje korisnika i efikasno praćenje njihovih mečeva:
Kroz celu aplikaciju se koristi LocalStorage i SessionStorage kao i UserContext (u okviru koga su definisani useUser react custom hook i UserProvider provider) za efikasno pamćenje naloga i njihovih mečeva. Registrovani korisnici se pamte u LocalStorage-u u formi JSON fajla, a po potrebi se koriste kroz celu aplikaciju. Obzirom da su stranica za logovanje i stranica za igru na istom nivou hijerarhije prvobitno se preko UserProvidera prenosi informacija o trenutno ulogovanim korisnicima, a kako se ta informacija ne bi izgubila ona se prilikom učitavanja stranice čuva u SessionStorage. User klasa je osmišljena na način koji omogućava lak prikaz informacija na stranici korisnika.

-Navigacija pomoću react-router-dom biblioteke i Navbara:
Navbar omogućava intuitivnu navigaciju kroz aplikaciju. Sve stranice su implementirane koristeći react-router-dom biblioteku i aplikacija ima minimalno nenamernih refreshova.

-Beskonačno nasumičnih raspodela kartica:
Implementiran je algoritam za nasumičnu raspodelu kartica što omogućava da korisnici imaju drugačije iskustvo u okviru svakog meča. Kako bi se sajt učitao najbrže moguće uvedena je timeout funkcionalnost koja prostijim algoritmom dopuni raspodelu u slučaju da algoritam predje odredjenu kompleksnost.

-Igra memorije:
Implementirana sva logika igre memorije. Detaljnije opisano u 3 Implementacija i  4 Korisničko uputstvo. Korisnički podaci se ažuriraju na kraju meča.

-2 API poziva:
1. U okviru /cards : za svaku karticu se prikazuje prosečna temperatura nebeskog tela na kartici (The Solar System OpenData API)
2.U okviru /users : profilna slika korisnika je nasumična slika mačke

-Informativni chart:
Chart implementiran pomoću ChartJS-a prikazuje bar chart pobeda po danu korisnika za prošlih 7 dana.

-Filteri:
Implementirani su filteri za rang listu (rastuće/opadajuće po broju pobeda i pretraga po imenu).

-Paginacija:
Korisnik ima opciju da izabere koliko rangova po stranici želi da mu se prikaže. Nakon izbora stranica se bez refresha ažurira. 

-Responzivnost na mobilnim uredjajima:
Korisnik može pristupiti aplikaciji preko mobilnog uredjaja bez problema i koristiti sve njene funkcionalnosti.
