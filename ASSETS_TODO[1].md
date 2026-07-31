# Chybějící / dočasné assety

Tento build je čistě statický (HTML/CSS/JS, žádný build krok). Obrázky a video
níže jsou zatím nahrazené viditelnými placeholdery přímo v HTML/CSS – jakmile
přidáte skutečný soubor na uvedenou cestu, placeholder textový box automaticky
zmizí a zobrazí se reálná fotka (funguje přes `onerror` na `<img>`).

**Důležité:** fotky `logo.jpg`, `cargo_fleet.jpg` a `cargo_pair.jpg`, které jste
poslali v zadání, nešlo z konverzace automaticky uložit jako binární soubory
(nemám nástroj, který by obrázek vložený do chatu exportoval na disk) – proto
je potřeba je nahrát ručně do repozitáře na cesty níže.

## K nahrazení reálnou fotkou / videem (jen nahrajte soubor na danou cestu)

| Cesta | Popis | Použito na |
|---|---|---|
| `assets/images/cargo-fleet.jpg` | 4 kamiony IVECO seřazené, slunečno, hory v pozadí | `sluzby.html` |
| `assets/images/cargo-pair.jpg` | 2 kamiony IVECO zblízka, zatažená obloha | `sluzby.html` |
| `assets/images/logo.svg` | Aktuálně nahrazeno kódovanou rekonstrukcí loga (viz komentář v souboru) – ideálně nahradit skutečným vektorem/rastrem loga pro přesnou shodu barev a písma | header, footer, favicon všech stránek |
| `assets/images/og-image.jpg` (1200×630 px) | Sdílecí obrázek pro LinkedIn/Facebook – zatím odkazuje na cargo-fleet/cargo-pair | `<meta property="og:image">` na všech stránkách |
| hero video na `index.html` | Smyčkové video jedoucího kamionu – po dodání souboru odkomentujte `<video>` blok v `index.html` (návod je v HTML komentáři přímo nad placeholderem) | `index.html` – hero sekce |

## Čistě ilustrační placeholdery (zatím žádná reálná fotka k dispozici)

Tyto боxy jsou přímo v HTML jako `<div class="placeholder-box">` s popiskem –
nahraďte je `<img>` tagem, až budou fotky k dispozici:

- `o-nas.html` – fotka dispečerů u monitorů, fotka řidičů u kamionu
- `kariera.html` – detailní fotka kabiny IVECO
- `spoluprace.html` – fotka podání ruky / nakládky zboží
- `kontakt.html` – malé fotky u adresy / telefonu (areál, dispečink)

## Obsah k doplnění (označeno `[X]` / `[DOPLNIT]` v textech)

- `o-nas.html`: tuny zboží ročně, počet vozidel, počet zaměstnanců
- `kariera.html`: benefity navíc, požadovaná praxe/jazyky

## Poznámka k SEO

Web je vícestránkový statický HTML (ne single-page app), takže každá stránka
má vlastní `<title>`, `meta description` a Open Graph tagy – jazykový přepínač
CZ/EN funguje bez reloadu přes `assets/js/i18n.js`, ale jde o čistě klientské
řešení: vyhledávače indexují jazykovou verzi, která je vykreslená v HTML při
prvním načtení (výchozí čeština). Pokud budete chtít, aby Google indexoval i
anglickou verzi (`/en/...`), bude to vyžadovat buď samostatné EN stránky, nebo
přechod na generátor typu Astro s `hreflang` alternativami.
