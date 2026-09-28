/* MIKADO – Speisekarte
   Quelle: MIKADO_Menu.pdf (28 Seiten), Speisen aktualisiert nach MIKADO_Flyer.pdf (09/2026). Preise als String "11,90"; der Renderer haengt " €" an.
   allerg: Buchstaben-/Zahlencodes laut Legende auf Seite 27 der Karte.
   tags:  veg = vegetarisch (oder vegetarische Variante), spicy = scharf, raw = roher Fisch.
   opts:  [Bezeichnung DE, Bezeichnung EN, Preis, tag?] */
(function () {
  'use strict';

  /* Der 10er-Auswahlsatz, der bei Wok-, Curry- und Nudelgerichten identisch wiederkehrt. */
  var WOK = [
    ['A. Vegetarisch (Tofu)', 'Tofu', '11,90', 'veg'],
    ['B. Gegrillte Hähnchenbrust', 'Grilled chicken', '13,90'],
    ['C. Knusprige Hähnchenbrust', 'Crispy chicken', '13,90'],
    ['D. Black Tiger Garnele', 'Black tiger shrimp', '15,50'],
    ['E. Gegrillter Lachs', 'Grilled salmon', '17,90'],
    ['F. Gegrillter Thunfisch', 'Grilled tuna', '18,90'],
    ['G. Barbarie-Ente', 'Barbary duck', '17,90'],
    ['H. Knusprige Ente', 'Crispy duck', '14,50'],
    ['I. Huhn kross gebacken', 'Crispy fried chicken', '13,90'],
    ['K. Rindfleisch', 'Beef', '14,90']
  ];

  var IMG = 'public/images/web/';

  window.MIKADO_MENU = {

    allergens: [
      ['A', 'Eier', 'Eggs'], ['B', 'Krebstiere', 'Crustaceans'], ['C', 'Fisch', 'Fish'],
      ['D', 'Glutenhaltiges Getreide (Weizen)', 'Cereal containing gluten'],
      ['E', 'Erdnüsse', 'Peanuts'], ['F', 'Sojabohnen', 'Soybeans'], ['G', 'Milch', 'Milk'],
      ['H', 'Schalenfrüchte', 'Tree nuts'], ['J', 'Sellerie', 'Celery'], ['K', 'Senf', 'Mustard'],
      ['L', 'Sesamsamen', 'Sesame seeds'], ['M', 'Lupinen', 'Lupins'], ['N', 'Weichtiere', 'Molluscs']
    ],

    additives: [
      ['1', 'mit Farbstoff'], ['2', 'koffeinhaltig'], ['3', 'mit Antioxidationsmittel'],
      ['4', 'mit Süßungsmittel'], ['5', 'enthält eine Phenylalaninquelle'], ['6', 'chininhaltig'],
      ['7', 'Stabilisatoren'], ['8', 'Konservierungsstoffe'],
      ['9', 'mit Geschmacksverstärker mit Phosphat'], ['10', 'Schwefeldioxid und Sulphite'],
      ['11', 'Kohlensäure'], ['12', 'mit Alkohol'], ['13', 'mit Säuerungsmittel']
    ],

    allergenNote: 'Allergen D (glutenhaltiges Getreide) enthält Weizen – z. B. Paniermehl und Teriyaki-Soße. Getränke-Zusatzstoffe: 1. Cola, Cola Zero, Mezzo Mix – mit Farbstoff, Säuerungsmittel, koffeinhaltig · 2. Fanta, Sprite, Wild Berry – mit Farbstoff, Säuerungsmittel · 3. Ginger Ale – mit Farbstoff, Säuerungsmittel, chininhaltig.',

    groups: [

      /* ---------------------------------------------------------------- VORSPEISEN */
      {
        id: 'vorspeisen', kind: 'food', name: 'Vorspeisen', en: 'Starters',
        note: 'Suppen, Salate, Tempura und Teigtaschen – zum Teilen oder als leichter Auftakt.',
        items: [
          {
            n: '1', name: 'Tom Yam Suppe', allerg: 'F,9', tags: 'spicy',
            de: 'Pikante Suppe mit Zitronengras, frischem Gemüse, Tom-Yam-Paste, Zitronenblättern, Limettensaft, Koriander und Frühlingszwiebeln.',
            en: 'Spicy soup with lemongrass, fresh vegetables, Tom Yam paste, lime leaves, lime juice, coriander and spring onions.',
            img: IMG + 'd01-tom-yam.png',
            opts: [['A. Tofu', 'Tofu', '4,70', 'veg'], ['B. Hühnerfleisch', 'Chicken', '4,90'],
                   ['C. Garnelen', 'Shrimp', '5,50'], ['D. Lachs', 'Salmon', '5,50']]
          },
          {
            n: '2', name: 'Wantan Suppe', allerg: '9', price: '4,90',
            de: 'Teigtaschen, gefüllt mit Hühnerfleisch, in einer köstlichen Brühe mit Gemüse, Koriander und Frühlingszwiebeln.',
            en: 'Dumplings filled with chicken, served in a delicious broth with vegetables, cilantro and green onions.'
          },
          {
            n: '3', name: 'Tom Kha Gai', allerg: 'G,C', tags: 'spicy',
            de: 'Würzige thailändische Tom-Kha-Suppe mit frischem Gemüse, Cherrytomaten, Lauchzwiebeln, Kokosmilch, Zitronengras, Chili, Limette und Koriander.',
            en: 'Spicy Thai Tom Kha soup with fresh vegetables, cherry tomatoes, spring onions, coconut milk, lemongrass, chili, lime and coriander.',
            opts: [['A. Tofu', 'Tofu', '4,70', 'veg'], ['B. Hühnerfleisch', 'Chicken', '4,90'],
                   ['C. Garnelen', 'Shrimp', '5,50']]
          },
          {
            n: '4', name: 'Gemischte Vorspeisenplatte', allerg: 'D,E,F,B', price: '14,90',
            de: '4 Frühlingsrollen, 2 gebackene Garnelen, 2 gebackene Chicken-Wantan, 2 Sommerrollen, 2 gegrillte Chicken-Sticks, gemischter Salat, Unagi-Soße und Süß-Sauer-Soße.',
            en: '4 spring rolls, 2 fried prawns, 2 fried chicken wontons, 2 summer rolls, 2 grilled chicken skewers, mixed salad with unagi sauce and sweet & sour sauce.'
          },
          {
            n: '5', name: 'Frühlingsrollen', allerg: 'D,14 / A,C,1',
            de: 'Knusprig gebratene Rollen, serviert mit süß-saurer Sauce.',
            en: 'Crispy fried rolls, served with a sweet and sour sauce.',
            img: IMG + 'd05b-fruehlingsrollen.png',
            opts: [['A. Vegetarische Frühlingsrolle (8 Stk.)', 'Vegetables', '4,50', 'veg'],
                   ['B. Hausgemachte Frühlingsrolle (2 Stk.) – Hühnerfleisch, Shiitake, Gemüse, Glasnudeln', 'Chicken, shiitake, vegetables, glass noodles', '5,50']]
          },
          {
            n: '6', name: 'Gebackene Chicken Wantan (5 Stk.)', allerg: 'D', price: '4,70',
            de: 'Hausgemachte gebackene Teigtaschen, gefüllt mit Hühnerfleisch.',
            en: 'Homemade fried dumplings filled with chicken.'
          },
          {
            n: '7', name: 'Mikado Ebi Tempura (2 Stk.)', allerg: 'D,F,11,B', price: '4,90',
            de: 'Gebackene Garnelen mit Unagi-Soße.', en: 'Fried prawns with unagi sauce.'
          },
          {
            n: '8', name: 'Mikado Tofu Tempura (2 Stk.)', allerg: 'D,F', price: '4,50', tags: 'veg',
            de: 'Gebackener Tofu mit Salat.', en: 'Fried tofu with salad.'
          },
          {
            n: '9', name: 'Mikado Crispy Chicken (4 Stk.)', allerg: 'D,F,11', price: '5,50',
            de: 'Gebackenes Hühnerfleisch mit Unagi-Soße.', en: 'Fried chicken with unagi sauce.'
          },
          {
            n: '10', name: 'Yakitori – Chicken Sticks (2 Stk.)', allerg: 'A,F', price: '4,50',
            de: 'Würzig marinierte Hähnchenspieße mit Salat und Unagi-Soße.',
            en: 'Spicy marinated chicken skewers with salad and unagi sauce.',
            img: IMG + 'd10-yakitori.png'
          },
          {
            n: '11', name: 'Mikado Mango Mix', allerg: 'E,C', tags: 'spicy',
            de: 'Frische Mangostreifen mit Koriander, Minze, Karotten, Chili, Erdnüssen und Fisch-Limetten-Dressing.',
            en: 'Fresh mango strips with cilantro, mint, carrots, chili, peanuts and fish-lime dressing.',
            img: IMG + 'd11-mango-mix.png',
            opts: [['A. Tofu', 'Tofu', '7,00'], ['B. Hühnerfleisch mit Garnelen', 'Chicken with shrimp', '8,90']]
          },
          {
            n: '12', name: 'Mikado Rindfleisch Salat', allerg: 'D,E,F,1', price: '8,90',
            de: 'Gemischter Salat mit Rindfleisch, Tomaten und traditioneller Soße.',
            en: 'Mixed salad with beef, tomatoes and traditional sauce.'
          },
          {
            n: '13', name: 'Hacao (5 Stk.)', allerg: '1',
            de: 'Gedämpfte asiatische Teigtaschen, serviert mit dunkler Teriyaki-Sauce.',
            en: 'Steamed Asian dumplings served with dark teriyaki sauce.',
            opts: [['A. Gemüse', 'Vegetables', '5,00', 'veg'], ['C. Garnelen', 'Shrimp', '6,00']]
          },
          {
            n: '14', name: 'Edamame', allerg: 'F', price: '5,50', tags: 'veg',
            de: 'Grüne japanische Bohnen, mit Meersalz gedämpft.',
            en: 'Green Japanese beans, steamed with sea salt.',
            img: IMG + 'd14-edamame.png'
          },
          {
            n: '15', name: 'Sommerrolle mit Erdnusssauce (2 Stk.)', allerg: 'F,E,L',
            de: 'Reispapier mit Reisnudeln, Wildkräutersalat, Gurke, gerösteten Erdnüssen, Sesam und Erdnusssauce.',
            en: 'Rice paper rolls with rice noodles, wild herb salad, cucumber, roasted peanuts, sesame and peanut sauce.',
            img: IMG + 'd15-sommerrolle.png',
            opts: [['A. Gebackene Tofu-Stücke', 'Tofu', '5,00', 'veg'],
                   ['B. Gegrilltes Hühnerfilet', 'Grilled chicken', '5,90'],
                   ['C. Blanchierte Großgarnelen', 'Shrimp', '6,50'],
                   ['D. Gegrillter Lachs', 'Grilled salmon', '6,50']]
          },
          {
            n: '16', name: 'Gyoza (5 Stk.)', allerg: 'D,1',
            de: 'Japanische gebratene Teigtaschen mit Teriyaki-Sauce.',
            en: 'Japanese pan-fried dumplings with teriyaki sauce.',
            img: IMG + 'd16-gyoza.png',
            opts: [['A. Gemüse', 'Vegetables', '5,00', 'veg'], ['B. Hühnerfleisch', 'Chicken', '5,90']]
          },
          {
            n: '17', name: 'Wakame', allerg: 'L', price: '5,00', tags: 'veg',
            de: 'Eingelegter Seetangsalat mit Sesam-Dressing.',
            en: 'Pickled seaweed salad with sesame dressing.'
          },
          {
            n: '18', name: 'Wakame mit Lachswürfel', allerg: 'L', price: '9,50', tags: 'raw',
            de: 'Eingelegter Seetangsalat mit feinem Sesam-Dressing, dazu zarte Lachswürfel.',
            en: 'Pickled seaweed salad with a delicate sesame dressing, served with tender salmon cubes.'
          },
          {
            n: '19', name: 'Tatar', allerg: 'C,L,F,G', tags: 'raw',
            de: 'Frisch geschnittener Fisch mit hausgemachter Guacamole, Schnittlauch, Koriander, Sesamöl, Kresse und Kaviarcreme.',
            en: 'Freshly sliced fish with homemade guacamole, chives, cilantro, sesame oil, cress and caviar cream.',
            img: IMG + 'd19a-lachs-tatar.png',
            opts: [['A. Lachs-Tatar', 'Salmon tartare', '10,50'], ['B. Tuna-Tatar', 'Tuna tartare', '11,50']]
          }
        ]
      },

      /* --------------------------------------------------------------- HAUPTSPEISEN */
      {
        id: 'hauptspeisen', kind: 'food', name: 'Hauptspeisen', en: 'Main courses',
        note: 'Yōshoku – vom Grill und aus dem Wok, serviert mit frischem Gemüse und Reis mit Sesam.',
        items: [
          {
            n: '20', name: 'Shabby Chick', allerg: 'L,F,1', price: '13,90',
            de: 'BBQ-Hähnchenbrustfilet in BBQ-Sauce, serviert mit frischem Gemüse und Reis mit Sesam.',
            en: 'BBQ chicken breast fillet in BBQ sauce, served with fresh vegetables and sesame rice.',
            img: IMG + 'd20-shabby-chick.png'
          },
          {
            n: '21', name: 'Salmon Yaki', allerg: 'C,L,F,1', price: '17,90',
            de: 'Gegrillter Lachs in BBQ-Sauce, serviert auf frischem Gemüse mit Reis und Sesam.',
            en: 'Grilled salmon in BBQ sauce, served over fresh vegetables with sesame rice.'
          },
          {
            n: '22', name: 'Tuna Osaka', allerg: 'C,L,F,1', price: '18,90',
            de: 'Gegrillter Thunfisch in BBQ-Sauce, serviert auf frischem Gemüse mit Reis und Sesam.',
            en: 'Grilled tuna in BBQ sauce, served over fresh vegetables with sesame rice.'
          },
          {
            n: '23', name: 'Smoky Duck', allerg: 'L,F,D,1',
            de: 'Serviert mit BBQ-Sauce, frischem Gemüse und Reis mit Sesam.',
            en: 'Served with BBQ sauce, fresh vegetables and sesame rice.',
            opts: [['A. Zart geräucherte und gegrillte Barbarie-Entenbrust', 'Smoked and grilled Barbary duck breast', '17,90'],
                   ['B. Knusprig gebratene Ente', 'Crispy fried duck', '14,50']]
          },
          {
            n: '24', name: 'Huhn kross gebacken', allerg: 'L,F,D,1,B', price: '13,90',
            de: 'Serviert mit BBQ-Sauce, frischem Gemüse und Reis mit Sesam.',
            en: 'Served with BBQ sauce, fresh vegetables and sesame rice.',
            img: IMG + 'd24-huhn-kross.png'
          },
          {
            n: '25', name: 'Vitamin Sea', allerg: 'B,C,N,A,L', price: '22,90',
            de: 'Gegrilltes Seafood – Garnelen, Lachs, Thunfisch, Jakobsmuschel – mit Teriyaki, Surimi und Aioli-Sauce, dazu frisches Gemüse und Reis mit Sesam.',
            en: 'Grilled seafood (shrimp, salmon, tuna, scallops) with teriyaki, surimi and aioli sauce, served with fresh vegetables and sesame rice.'
          },
          {
            n: '26', name: 'Rindfleisch', allerg: 'B,C,A,L / D,E,F,N,1,8,14',
            de: 'Zwei Klassiker vom Rind aus dem Wok.', en: 'Two beef classics from the wok.',
            opts: [['A. Bo Luc Lac – Rindfleischwürfel mit Paprika und Zwiebeln in Chef-Sauce', 'Square-cut beef with bell peppers and onions in a premium chef sauce', '15,50'],
                   ['B. Bo Xao Hanh – Rindfleisch mit Zwiebeln, Knoblauch, Lauch und Koriander', 'Stir-fried beef with onions, garlic, leeks and cilantro', '14,90']]
          },
          {
            n: '27', name: 'Yoga Bowl', allerg: 'F,L', price: '12,90', tags: 'veg',
            de: 'Gebratener Tofu mit einer Vielfalt an Gemüse – Gurke, Brokkoli, Möhren, Mais, Edamame und Mango – auf einem bunten Salatbett. Serviert mit Mango-Kokos-Sauce und Reis mit Sesam.',
            en: 'Fried tofu with a variety of vegetables – cucumber, broccoli, carrots, corn, edamame and mango – on a bed of mixed greens, with mango-coconut sauce and sesame rice.'
          },
          {
            n: '28', name: 'Lucky Bowl', allerg: 'F,L,A,E,G', price: '13,90', tags: 'veg',
            de: 'Vielfalt an Gemüse – Avocado, Brokkoli, Edamame, Möhren und Mais – auf einem Salatbett. Serviert mit gekochtem Ei, Erdnuss-Kokos-Sauce und schwarzem Reis.',
            en: 'A variety of vegetables – avocado, broccoli, edamame, carrots and corn – on a bed of lettuce. Served with a boiled egg, peanut-coconut sauce and black rice.'
          },
          {
            n: '29', name: 'Mikado Bowl', allerg: 'F,L,G',
            de: 'Gedämpftes buntes Gemüse – Edamame, Möhren, Brokkoli, Süßkartoffel und Mais – auf einem bunten Salatbett. Serviert mit Kokos-Curry-Sauce und Reis mit Sesam.',
            en: 'Steamed colorful vegetables – edamame, carrots, broccoli, sweet potato and corn – on a bed of mixed greens, with coconut curry sauce and sesame rice.',
            img: IMG + 'd29-mikado-bowl.png',
            opts: [['A. Gebratener Tofu', 'Tofu', '11,90', 'veg'],
                   ['B. Gegrillte Hähnchenbrust', 'Grilled chicken', '13,90'],
                   ['C. Gebackene Black Tiger Garnele', 'Black tiger shrimp', '15,90'],
                   ['D. Gegrillter Lachs', 'Grilled salmon', '17,90']]
          }
        ]
      },

      /* ------------------------------------------------------------ NUDELN & WOK */
      {
        id: 'nudeln', kind: 'food', name: 'Nudeln & Wok', en: 'Noodles & wok',
        note: 'Jedes Gericht mit der Zutat Ihrer Wahl – von Tofu bis Rindfleisch.',
        items: [
          {
            n: '30', name: 'Gebratene Udon-Nudeln', allerg: 'D,F,L,G',
            de: 'Mit Ingwer, Teriyaki-Reduktion, Gemüse, Edamame, Lauch, Sesam, Erdnüssen und Möhren.',
            en: 'With ginger, teriyaki reduction, vegetables, edamame, leeks, sesame, peanuts and carrots.',
            img: IMG + 'd30-udon.png', opts: WOK
          },
          {
            n: '31', name: 'Gebratene Reisbandnudeln – Pho Xao', allerg: 'A1,C,D,K',
            de: 'Gebratene vietnamesische Reisbandnudeln mit frischem Gemüse, Sesam und Erdnüssen.',
            en: 'Stir-fried Vietnamese flat rice noodles with fresh vegetables, sesame and peanuts.',
            img: IMG + 'd31-pho-xao.png', opts: WOK
          },
          {
            n: '32', name: 'Pad Thai', allerg: 'E,A,L,F',
            de: 'Gebratene thailändische Reisbandnudeln mit Lauch, süß-saurer Soße, Tamarindensoße, Erdnüssen, Limette, Koriander und Ei.',
            en: 'Stir-fried Thai flat rice noodles with leeks, sweet and sour sauce, tamarind sauce, peanuts, lime, cilantro and egg.',
            img: IMG + 'd32-pad-thai.png', opts: WOK
          },
          {
            n: '33', name: 'Mikado Skyline Nudeln', allerg: 'E,A,L,F,G',
            de: '„Fliegende Nudeln“ mit Gemüse, frischem Salat, Sesam und hausgemachter Curry-Kokos-Soße.',
            en: '“Flying noodles” with vegetables, fresh salad, sesame and homemade coconut curry sauce.',
            img: IMG + 'd33-skyline.png', opts: WOK
          },
          {
            n: '41', name: 'Bun Tron – vietnamesische Spezialität', allerg: 'E,F',
            de: 'Reisnudeln mit frischen Kräutern, gemischtem Salat, Koriander, Erdnüssen und Röstzwiebeln – mit einer Zutat Ihrer Wahl.',
            en: 'Rice noodles with fresh herbs, mixed salad, coriander, peanuts and crispy fried onions – with a topping of your choice.',
            opts: [['A. Tofu', 'Tofu', '11,90', 'veg'], ['B. Hühnerfleisch', 'Chicken', '13,90'],
                   ['C. Rindfleisch', 'Beef', '14,90'],
                   ['D. Vietnamesische Frühlingsrollen', 'Vietnamese spring rolls', '13,90'],
                   ['E. Hackfleischröllchen in Lolot-Blättern (Rind und Hähnchen)', 'Minced beef & chicken rolls in lolot leaves', '15,90']]
          },
          {
            n: '42', name: 'Bratnudeln oder Bratreis mit Ei', allerg: 'D,A,E,F,1,8,14',
            de: 'Gebratene Nudeln oder Reis mit Ei und verschiedenem gebratenem Gemüse in Sweet-Chili-Soße.',
            en: 'Fried noodles or rice with egg and mixed stir-fried vegetables in sweet chili sauce.',
            img: IMG + 'd42-bratnudeln.png',
            opts: [['A. Tofu', 'Tofu', '11,50', 'veg'], ['B. Hühnerfleisch', 'Chicken breast', '12,50'],
                   ['C. Gebackenes Hühnerfleisch', 'Baked chicken', '12,90'],
                   ['D. Knusprige Ente', 'Crispy duck', '13,00'],
                   ['E. Huhn kross gebacken', 'Crispy fried chicken', '12,50'],
                   ['F. Garnelen', 'Shrimp', '13,90'], ['G. Rindfleisch', 'Beef', '13,50']]
          }
        ]
      },

      /* ----------------------------------------------- VIETNAMESISCHE NUDELSUPPEN */
      {
        id: 'suppen', kind: 'food', name: 'Vietnamesische Nudelsuppen', en: 'Vietnamese noodle soups',
        note: 'Unsere Pho-Brühe wird täglich frisch angesetzt und 24 Stunden lang gekocht.',
        items: [
          {
            n: '34', name: 'Pho Soup', allerg: 'F,C',
            de: 'Traditionelle vietnamesische Suppe mit Reisbandnudeln in kräftiger Rinderbrühe, verfeinert mit frischen Frühlingszwiebeln, Koriander, Minze und weißem Pfeffer.',
            en: 'Traditional Vietnamese soup with flat rice noodles in a rich beef broth, refined with fresh spring onions, cilantro, mint and white pepper.',
            img: IMG + 'd34-pho.png',
            opts: [['A. Tofu', 'Tofu', '11,90', 'veg'], ['B. Hähnchenbrustfilet', 'Chicken breast', '13,90'],
                   ['G. Rindfleisch', 'Beef', '14,90']]
          },
          {
            n: '35', name: 'Pho Curry',
            de: 'Reisbandnudeln in Kokosmilch-Curry-Soße mit Gemüse, Koriander und Frühlingszwiebeln.',
            en: 'Flat rice noodles in coconut curry sauce with vegetables, cilantro and green onions.',
            opts: [['A. Tofu', 'Tofu', '11,90', 'veg'], ['B. Hühnerfleisch', 'Chicken breast', '13,90'],
                   ['C. Rindfleisch', 'Beef', '14,90'], ['D. Garnelen', 'Shrimp', '15,50']]
          },
          {
            n: '40', name: 'Bangkok Suppe – scharfer Chili', allerg: 'B,C,F,N,9', price: '16,90', tags: 'spicy',
            de: 'Reisnudeln in einer pikanten Brühe mit Zitronengras, frischem Gemüse, Koriander, Frühlingszwiebeln, Tom-Yam-Paste, Limettensaft und Meeresfrüchten (Lachs, Jakobsmuscheln, Thunfisch, Garnelen, Krebsfleischimitat).',
            en: 'Rice noodles in a spicy broth with lemongrass, fresh vegetables, cilantro, green onions, tom yum paste, lime juice and seafood (salmon, scallops, tuna, shrimp, imitation crab meat).'
          }
        ]
      },

      /* -------------------------------------------------------------- HAUS-GERICHTE */
      {
        id: 'curry', kind: 'food', name: 'Haus-Gerichte & Curry', en: 'House dishes & curry',
        note: 'Alle Currys werden mit Kräutersalat und Reis mit Sesam serviert – mit der Zutat Ihrer Wahl.',
        items: [
          {
            n: '36', name: 'Bangkok Rotes Curry', allerg: 'G,L', tags: 'spicy',
            de: 'Thai-Curry mit Gemüse und Wildkräutersalat in cremiger Curry-Kokos-Soße. Serviert mit Reis mit Sesam.',
            en: 'Thai curry with vegetables and wild herb salad in a creamy curry coconut sauce. Served with sesame rice.',
            opts: WOK
          },
          {
            n: '37', name: 'Mango Curry',
            de: 'Mango-Curry mit frischer Mango, Kokosmilch, Milch und Gemüse – mild-fruchtig mit einem Hauch Exotik. Serviert mit Kräutersalat und Reis mit Sesam.',
            en: 'Mango curry with fresh mango, coconut milk, milk and vegetables. A mild, fruity curry sauce with a touch of exotic flavour. Served with herb salad and sesame rice.',
            img: IMG + 'd37-mango-curry.png', opts: WOK
          },
          {
            n: '38', name: 'Jakarta Saté', allerg: 'G,E,L', tags: 'spicy',
            de: 'Indonesisches Saté-Curry mit Erdnusscreme, Kokosmilch, Milch und Gemüse. Wählbar von pikant bis sehr scharf. Serviert mit Kräutersalat und Reis mit Sesam.',
            en: 'Indonesian satay curry with peanut cream, coconut milk, milk and vegetables. Available spicy, hot or very hot. Served with herb salad and sesame rice.',
            opts: WOK
          },
          {
            n: '39', name: 'Süß-Sauer-Soße', allerg: 'D',
            de: 'Süß-Sauer-Soße, serviert auf frischem Gemüse mit Reis und Sesam.',
            en: 'Sweet and sour sauce, served on fresh vegetables with sesame rice.',
            opts: [['A. Vegetarisch (Tofu)', 'Tofu', '11,50', 'veg']].concat(WOK.slice(1))
          }
        ]
      },

      /* ----------------------------------------------------------------- SUSHI BOWL */
      {
        id: 'sushi-bowl', kind: 'sushi', name: 'Sushi Bowl', en: 'Sushi bowl',
        items: [
          {
            n: 'A', name: 'Sushi Bowl', allerg: 'A,B,F,D', price: '12,50', tags: 'raw',
            de: 'Lachs mit Reis, Gemüse und Teriyaki-Soße.',
            en: 'Salmon with rice, vegetables and teriyaki sauce.',
            img: IMG + 'sushi-bowl.png'
          }
        ]
      },

      /* --------------------------------------------------------------------- NIGIRI */
      {
        id: 'nigiri', kind: 'sushi', name: 'Nigiri', en: 'Nigiri', unit: '2 Stk.',
        note: 'Handgeformter Sushi-Reis mit einem Belag – je zwei Stück.',
        items: [
          { n: '50', name: 'Sake Nigiri', allerg: 'C', price: '4,50', tags: 'raw', de: 'Label-Rouge-Lachsfilet.', en: 'Label Rouge salmon fillet.', img: IMG + 'nigiri.png' },
          { n: '51', name: 'Maguro Nigiri', allerg: 'C', price: '4,90', tags: 'raw', de: 'Yellowfin-Thunfischfilet.', en: 'Yellowfin tuna fillet.' },
          { n: '52', name: 'Unagi Nigiri', allerg: 'N', price: '5,40', de: 'Gegrillter japanischer Aal, Sesam, Unagi-Soße.', en: 'Grilled Japanese eel, sesame, unagi sauce.' },
          { n: '53', name: 'Ebi Nigiri', allerg: 'B', price: '4,80', de: 'Gedämpfte Black-Tiger-Garnele.', en: 'Steamed black tiger prawn.' },
          { n: '54', name: 'Hotategai Nigiri', allerg: 'N', price: '5,20', tags: 'raw', de: 'Rohe Jakobsmuschel.', en: 'Raw scallop.' },
          { n: '55', name: 'Avocado Nigiri', price: '3,90', tags: 'veg', de: 'Avocado auf Sushi-Reis.', en: 'Avocado on sushi rice.' },
          { n: '56', name: 'Surimi Nigiri', allerg: 'B,D', price: '3,90', de: 'Imitat-Krabbenfleisch.', en: 'Imitation crab.' }
        ]
      },

      /* --------------------------------------------------------------- ABURI NIGIRI */
      {
        id: 'aburi', kind: 'sushi', name: 'Aburi Nigiri', en: 'Aburi nigiri', unit: '2 Stk.',
        note: 'Flambiert, auf schwarzem Klebreis – je zwei Stück.',
        items: [
          { n: '57', name: 'Sake Aburi Nigiri', allerg: 'C,G,A', price: '7,00', de: 'Flambiertes Lachsfilet mit Rucola, Mayonnaise und Kaviarcreme auf schwarzem Klebreis.', en: 'Flamed salmon fillet with arugula, mayonnaise and caviar cream on black sticky rice.' },
          { n: '58', name: 'Maguro Aburi Nigiri', allerg: 'C,A,G', price: '7,00', de: 'Flambiertes Thunfischfilet mit Rucola, Mayonnaise und Kaviarcreme auf schwarzem Klebreis.', en: 'Flamed tuna with arugula, mayonnaise and caviar cream on black sticky rice.' },
          { n: '59', name: 'Dragon Aburi Nigiri', allerg: 'B,A,G', price: '7,00', de: 'Flambierte Black-Tiger-Garnelen mit Rucola, Mayonnaise und Trüffelcreme auf schwarzem Klebreis.', en: 'Flamed black tiger prawns with arugula, mayonnaise and truffle cream on black sticky rice.' },
          { n: '510', name: 'Hotategai Aburi Nigiri', allerg: 'N', price: '7,00', tags: 'spicy', de: 'Flambierte Jakobsmuschel, Mayonnaise und Chilipaste auf schwarzem Klebreis.', en: 'Flambéed scallops, mayonnaise and chili paste on black sticky rice.' }
        ]
      },

      /* ----------------------------------------------------------------------- MAKI */
      {
        id: 'maki', kind: 'sushi', name: 'Maki', en: 'Maki', unit: '6 Stk.',
        note: 'Die „gerollten Sushi“ werden von Hand mit einer Bambusmatte gerollt und mit gesäuertem Reis, Fisch und Gemüse gefüllt.',
        items: [
          { n: '60', name: 'Sake Maki', allerg: 'C', price: '4,50', tags: 'raw', de: 'Label-Rouge-Lachsfilet.', en: 'Label Rouge salmon fillet.', img: IMG + 'maki.png' },
          { n: '61', name: 'Sake Avocado Maki', allerg: 'C', price: '4,90', tags: 'raw', de: 'Lachs und Avocado.', en: 'Salmon and avocado.' },
          { n: '62', name: 'Sake Negi Maki', allerg: 'C', price: '4,50', tags: 'raw,spicy', de: 'Lachs und Chili.', en: 'Salmon and chili.' },
          { n: '63', name: 'Tekka Maki', allerg: 'C', price: '4,90', tags: 'raw', de: 'Yellowfin-Thunfischfilet.', en: 'Yellowfin tuna fillet.' },
          { n: '64', name: 'Tekka Negi Maki', allerg: 'C', price: '4,90', tags: 'raw,spicy', de: 'Thunfisch und Chili.', en: 'Tuna and chili.' },
          { n: '65', name: 'Ebi Tempura Maki', allerg: 'B,D', price: '4,90', de: 'Knusprige Garnelen.', en: 'Crispy shrimp.' },
          { n: '66', name: 'California Maki', allerg: 'B,D', price: '4,50', de: 'Surimi und Avocado.', en: 'Surimi and avocado.' },
          { n: '67', name: 'Unagi Maki', allerg: 'N,L', price: '5,50', de: 'Aal, Sesam und Gurke.', en: 'Eel, sesame and cucumber.' },
          { n: '68', name: 'Kappa Maki', allerg: 'L', price: '3,90', tags: 'veg', de: 'Gurke und Sesam.', en: 'Cucumber and sesame.' },
          { n: '69', name: 'Avocado Maki', allerg: 'L', price: '3,90', tags: 'veg', de: 'Avocado und Sesam.', en: 'Avocado and sesame.' },
          { n: '610', name: 'Nekiro Maki', allerg: 'L', price: '3,90', tags: 'veg', de: 'Mango und Sesam.', en: 'Mango and sesame.' },
          { n: '611', name: 'Paprika Maki', price: '3,90', tags: 'veg', de: 'Paprika.', en: 'Bell pepper.' },
          { n: '612', name: 'Oshinko Maki', price: '3,90', tags: 'veg', de: 'Eingelegter Rettich.', en: 'Pickled radish.' }
        ]
      },

      /* ------------------------------------------------------------------ FUTOMAKI */
      {
        id: 'futomaki', kind: 'sushi', name: 'Futomaki', en: 'Futomaki', unit: '6 Stk.',
        note: 'Dicke Rollen mit mehreren Füllungen, serviert mit Aioli- und Unagi-Soße. Allergene der Gruppe: G, F, A, L.',
        items: [
          { n: '70', name: 'Futo Veggie', allerg: 'G', price: '6,50', tags: 'veg', de: 'Avocado, Gurke, Paprika, Frischkäse, Sesam, Aioli-Soße und Teriyaki-Soße.', en: 'Avocado, cucumber, bell pepper, cream cheese, sesame, aioli sauce and unagi sauce.' },
          { n: '71', name: 'Futo Osaka', allerg: 'G', price: '7,00', tags: 'veg', de: 'Rettich, Avocado, Gurke, Frischkäse, Sesam, Aioli-Soße und Unagi-Soße.', en: 'Radish, avocado, cucumber, cream cheese, sesame, aioli sauce and unagi sauce.' },
          { n: '72', name: 'Mikado Futo', allerg: 'G,C,D', price: '8,00', tags: 'raw', de: 'Lachs, Avocado, Gurke, Frischkäse, Sesam, Aioli-Soße und Unagi-Soße.', en: 'Salmon, avocado, cucumber, cream cheese, sesame, aioli sauce and unagi sauce.' },
          { n: '73', name: 'Ebi Tempura Futo', allerg: 'G,B,D', price: '8,00', tags: 'spicy', de: 'Ebi-Tempura, Mango, Avocado, Chili, Wasabi, Sesam, Aioli-Soße und Unagi-Soße.', en: 'Ebi tempura, mango, avocado, chili, wasabi, sesame, aioli sauce and unagi sauce.' },
          { n: '74', name: 'Sake Tempura Futo', allerg: 'G,C,D', price: '8,00', de: 'Gegrillter Lachsbauch, Avocado, Frischkäse, Gurke, gelber Rettich, Sesam, Wasabi, Aioli-Soße und Unagi-Soße.', en: 'Grilled salmon belly, avocado, cream cheese, cucumber, yellow radish, sesame, wasabi, aioli sauce and unagi sauce.' }
        ]
      },

      /* ------------------------------------------------------------------- SASHIMI */
      {
        id: 'sashimi', kind: 'sushi', name: 'Sashimi', en: 'Sashimi',
        note: 'Rohe Fisch- und Meeresfrüchtefilets, traditionell mit Sojasoße, Wasabi und kleinen Beilagen serviert.',
        items: [
          { n: '80', name: 'Lachs Sashimi (8 Stk.)', allerg: 'C', price: '16,00', tags: 'raw', de: 'Label-Rouge-Lachsfilet.', en: 'Label Rouge salmon fillet.', img: IMG + 'sashimi.png' },
          { n: '81', name: 'Thunfisch Sashimi (8 Stk.)', allerg: 'C', price: '17,00', tags: 'raw', de: 'Yellowfin-Thunfischfilet.', en: 'Yellowfin tuna fillet.' },
          { n: '82', name: 'Sama (8 Stk.)', allerg: 'C', price: '18,00', tags: 'raw', de: 'Kombination aus Label-Rouge-Lachs und Yellowfin-Thunfischfilet.', en: 'Label Rouge salmon and yellowfin tuna fillet.' },
          { n: '83', name: 'Sashimi Experience (12 Stk.)', allerg: 'C,B,N,D', price: '20,00', tags: 'raw', de: 'Label-Rouge-Lachsfilet, Yellowfin-Thunfischfilet, Großgarnelen, Hotategai und Surimi.', en: 'Label Rouge salmon fillet, yellowfin tuna fillet, king prawns, hotategai and surimi.' }
        ]
      },

      /* ---------------------------------------------------------------- INSIDE OUT */
      {
        id: 'inside-out', kind: 'sushi', name: 'Inside Out', en: 'Inside out', unit: '8 Stk.',
        note: 'Rollen mit Reis außen und Nori innen – acht Stück je Portion.',
        items: [
          { n: '90', name: 'Veggie I.O.', allerg: 'G,L', price: '6,90', tags: 'veg', de: 'Avocado, Gurke, Frischkäse und Sesam.', en: 'Avocado, cucumber, cream cheese and sesame.', img: IMG + 'd90-veggie-io.png' },
          { n: '91', name: 'Pagoda I.O.', allerg: 'F,G,L', price: '6,90', tags: 'veg', de: 'Tofu, Avocado, Lauch, Sesam, Frischkäse, Aioli-Soße und Teriyaki-Soße.', en: 'Tofu, avocado, leek, sesame, cream cheese, aioli sauce and teriyaki sauce.' },
          { n: '92', name: 'Alaska I.O.', allerg: 'C,L,G', price: '8,50', tags: 'raw', de: 'Lachs, Avocado, Sesam, Fischrogen und Frischkäse.', en: 'Salmon, avocado, sesame, fish roe and cream cheese.' },
          { n: '93', name: 'Maguro I.O.', allerg: 'C,L,G,F', price: '8,90', tags: 'raw', de: 'Yellowfin-Thunfischfilet, Gurke, Frischkäse, Sesam, Unagi-Soße und Aioli-Soße.', en: 'Yellowfin tuna fillet, cucumber, cream cheese, sesame, unagi sauce and aioli sauce.' },
          { n: '94', name: 'Ebi I.O.', allerg: 'B,D,G,L', price: '8,50', de: 'Gedämpfte Riesengarnelen, Avocado, Lauch, Frischkäse, Sesam, Unagi-Soße und Aioli-Soße.', en: 'Steamed king prawns, avocado, leek, cream cheese, sesame, unagi sauce and aioli sauce.' },
          { n: '95', name: 'Ebi Tempura I.O.', allerg: 'B,G,L', price: '8,90', de: 'Panierte Garnelen, Avocado, Frischkäse, Sesam, Unagi-Soße und Aioli-Soße.', en: 'Crispy breaded shrimp with avocado, cream cheese, sesame, unagi sauce and aioli sauce.' },
          { n: '96', name: 'California I.O.', allerg: 'B,D,L,G', price: '7,50', de: 'Surimi, Avocado, Fischrogen, Frischkäse und Sesam.', en: 'Surimi, avocado, fish roe, cream cheese and sesame.' },
          { n: '97', name: 'Tori I.O.', allerg: 'G,F,L,D', price: '8,50', de: 'Gegrilltes Hähnchen, Gurke, Frischkäse, Sesam, Unagi-Soße und Aioli-Soße.', en: 'Grilled chicken, cucumber, cream cheese, sesame, unagi sauce and aioli sauce.' },
          { n: '98', name: 'Unagi I.O.', allerg: 'N,L,G,F,D', price: '9,50', de: 'Aal, Gurke, Frischkäse, Unagi-Soße und Sesam.', en: 'Eel with cucumber, cream cheese, unagi sauce and sesame.' },
          { n: '99', name: 'Mikado I.O.', allerg: 'B,G,L,N', price: '9,90', de: 'Aal, gedämpfte Garnelen und japanischer Gelbrettich.', en: 'Eel, steamed shrimp and Japanese yellow radish.' }
        ]
      },

      /* -------------------------------------------------------------- SPECIAL ROLL */
      {
        id: 'special-roll', kind: 'sushi', name: 'Mikado Special Roll', en: 'Signature rolls', unit: '8 Stk.',
        note: 'Mit schwarzem Reis oder weißem Sushi-Reis. Serviert mit Unagi-Soße, Aioli und Seetangsalat.',
        items: [
          { n: '100', name: 'Summer Love', allerg: 'F,A,G', price: '14,90', tags: 'veg', de: 'Tofutasche, Paprika, Aioli-Soße, Frischkäse und Sesam, umwickelt mit Avocado.', en: 'Tofu pocket, bell peppers, aioli sauce, cream cheese and sesame, wrapped with avocado.', img: IMG + 'special-rolls.png' },
          { n: '101', name: 'Rainbow', allerg: 'B,D,G,L,C', price: '16,50', tags: 'raw', de: 'Surimi, Gurke, Frischkäse, Avocado und Sesam, umwickelt mit einem Regenbogen aus Lachs, Thunfisch und Avocado.', en: 'Surimi, cucumber, cream cheese, avocado and sesame, wrapped with a rainbow of salmon, tuna and avocado.' },
          { n: '102', name: 'Hawai', allerg: 'B,D,G,C,A,L', price: '16,50', de: 'Surimi, Garnelen, Mango, Gurke, Frischkäse und Sesam, umhüllt mit flambiertem Lachs und Aioli-Soße.', en: 'Surimi, shrimp, mango, cucumber, cream cheese and sesame, wrapped with flambéed salmon and aioli sauce.' },
          { n: '103', name: 'Salmon on Fire', allerg: 'B,D,G,A,L', price: '15,90', de: 'Tempura-Garnele, Mango, Gurke, Frischkäse und Sesam, umhüllt mit flambiertem Lachs und Aioli-Soße.', en: 'Ebi tempura shrimp, mango, cucumber, cream cheese and sesame, wrapped in flamed salmon and aioli sauce.' },
          { n: '104', name: 'Dragon', allerg: 'B,D,G,N,F,L', price: '16,50', tags: 'spicy', de: 'Tempura-Garnele, Avocado, Frischkäse, Chili-Paste und Sesam, umhüllt mit gegrilltem Unagi-Filet und Unagi-Soße.', en: 'Tempura shrimp, avocado, chili paste, cream cheese and sesame, wrapped in grilled unagi fillet with unagi sauce.' },
          { n: '105', name: 'Surf und Turf', allerg: 'B,G,N,F,L', price: '16,50', de: 'Tempura-Garnele, Avocado oder Gurke und Sesam, ummantelt mit Roastbeef, Trüffelcreme und Unagi-Soße.', en: 'Tempura shrimp, avocado or cucumber and sesame, coated with roast beef, truffle cream and unagi sauce.' },
          { n: '106', name: 'Special Mikado', allerg: 'C,G,N,A,1,L', price: '16,50', tags: 'spicy', de: 'Gegrillter Lachsbauch, Rucola, Gurke, Mango, Frischkäse und Sesam, umhüllt mit flambierten Jakobsmuscheln, Mayonnaise und Chili-Paste.', en: 'Grilled salmon belly with cream cheese, arugula, cucumber, sesame and mango, wrapped with flambéed scallops, mayonnaise and chili paste.' },
          { n: '107', name: 'Thunamon', allerg: 'C,G,L', price: '16,90', de: 'Thunfisch, Gurke, Avocado, Sesam und Kaviarcreme, umhüllt mit flambiertem Thunfisch.', en: 'Tuna, cucumber, avocado, sesame and caviar cream, wrapped with flambéed tuna.' },
          { n: '108', name: 'Salmon Belly', allerg: 'C,G,L', price: '15,90', de: 'Gegrillter Lachsbauch, Rucola, gelber Rettich, Sesam und Frischkäse, umhüllt mit flambiertem Lachs.', en: 'Grilled salmon belly, arugula, yellow radish, sesame and cream cheese, wrapped in flambéed salmon.' },
          { n: '109', name: 'Sakura', allerg: 'C,D,F,G,A,L', price: '16,50', de: 'Lachs, Gurke, Oshinko, Frischkäse und Sesam, umhüllt mit flambiertem Lachs, Unagi- und Aioli-Soße.', en: 'Salmon, cucumber, oshinko, cream cheese and sesame, coated with flambéed salmon, unagi and aioli sauce.' },
          { n: '110', name: 'Mikado Lover', allerg: 'B,C,G,L,F,N', price: '16,90', de: 'Aal, gedämpfte Garnelen und japanischer Gelbrettich, umhüllt von flambiertem Lachs, serviert mit Unagi-Sauce, Aioli-Sauce und Lachskaviar.', en: 'Eel, steamed shrimp and Japanese yellow radish, wrapped in flambéed salmon, served with unagi sauce, aioli sauce and salmon roe.' }
        ]
      },

      /* ------------------------------------------------------------- CRUNCHY ROLLS */
      {
        id: 'crunchy', kind: 'sushi', name: 'Mikado Crunchy Rolls', en: 'Crunchy rolls', unit: '6 Stk.',
        note: 'Knusprige und warme Sushi-Rollen. Serviert mit Unagi-Soße (vegan) bzw. Teriyaki-Soße und Cocktailsauce. Allergen der Gruppe: D.',
        items: [
          { n: '200', name: 'Buddha Roll', allerg: 'F,G,L', price: '7,00', tags: 'veg', de: 'Tofu, Gurke, Avocado, Paprika, Frischkäse und Sesam.', en: 'Tofu, cucumber, avocado, peppers, cream cheese and sesame.', img: IMG + 'crunchy-rolls.png' },
          { n: '201', name: 'Veggie Roll', allerg: 'G,L', price: '7,00', tags: 'veg', de: 'Avocado, Gurke, Frischkäse und Sesam.', en: 'Avocado, cucumber, cream cheese and sesame.' },
          { n: '202', name: 'Hokkaido Roll', allerg: 'G,L', price: '7,50', tags: 'veg', de: 'Avocado, Rucola, Rettich, Gurke, Frischkäse und Sesam.', en: 'Avocado, arugula, radish, cucumber, cream cheese and sesame.' },
          { n: '203', name: 'Toronto Roll', allerg: 'C,G,L', price: '8,00', de: 'Lachs, Avocado, Gurke, Frischkäse und Sesam.', en: 'Salmon, avocado, cucumber, cream cheese and sesame.' },
          { n: '204', name: 'Fuji Roll', allerg: 'B,D,L', price: '8,00', tags: 'spicy', de: 'Ebi-Tempura, Avocado, Mango, Sesam und Chili.', en: 'Ebi tempura, avocado, mango, sesame and chili.' },
          { n: '205', name: 'Chicago Roll', allerg: 'B,D,N,G,L', price: '9,00', de: 'Surimi, Lachs, Gurke, Unagi-Filet, Frischkäse und Sesam.', en: 'Surimi, salmon, cucumber, unagi fillet, cream cheese and sesame.' },
          { n: '206', name: 'Nina Roll', allerg: 'C,G,L', price: '8,50', tags: 'spicy', de: 'Thunfisch, Gurke, Frischkäse, Sesam und Chili.', en: 'Tuna, cucumber, cream cheese, sesame and chili.' },
          { n: '207', name: 'Tori Roll', allerg: 'G,L', price: '8,50', de: 'Hühnerfleisch, Gurke, Avocado, Frischkäse und Sesam.', en: 'Chicken, cucumber, avocado, cream cheese and sesame.' }
        ]
      },

      /* ------------------------------------------------------------------ COMBO SETS */
      {
        id: 'menue', kind: 'sushi', name: 'Menü · Combo Sets', en: 'Combo sets',
        note: 'Fertig zusammengestellte Platten – von der Einzelportion bis zum Party-Menü für vier.',
        items: [
          { n: 'M1', name: 'Vegetarisch', allerg: 'L,G,F', price: '16,90', tags: 'veg', de: '6× Maki Gurke, 6× Maki Avocado, 2× Nigiri Avocado, 8× I.O. Pagoda.', en: '6× cucumber maki, 6× avocado maki, 2× avocado nigiri, 8× I.O. Pagoda.' },
          { n: 'M2', name: 'Sake', allerg: 'L,G,F,C', price: '21,90', tags: 'raw', de: '2× Lachs-Nigiri, 6× Lachs-Maki, 8× I.O. Alaska, 3× Lachs-Sashimi.', en: '2× salmon nigiri, 6× salmon maki, 8× I.O. Alaska, 3× salmon sashimi.', img: IMG + 'm2-sake.png' },
          { n: 'M3', name: 'Maguro', allerg: 'L,G,F,C', price: '22,90', tags: 'raw', de: '2× Nigiri Thunfisch, 6× Maguro Maki, 8× I.O. Maguro, 3× Sashimi Maguro.', en: '2× tuna nigiri, 6× maguro maki, 8× I.O. Maguro, 3× maguro sashimi.', img: IMG + 'm3-maguro.png' },
          { n: 'M4', name: 'Sumo', allerg: 'L,G,F,C', price: '22,90', tags: 'raw', de: '2× Nigiri Lachs, 2× Nigiri Maguro, 6× Maki Thunfisch, 8× I.O. Alaska.', en: '2× salmon nigiri, 2× maguro nigiri, 6× tuna maki, 8× I.O. Alaska.' },
          { n: 'M5', name: 'Lachs Vegas', allerg: 'L,G,F,C,D', price: '28,90', tags: 'raw', de: '6× Crunchy Toronto, 6× Maki Lachs, 2× Nigiri Lachs, 4× Special Roll „Salmon on Fire“.', en: '6× crunchy Toronto, 6× salmon maki, 2× salmon nigiri, 4× special roll “Salmon on Fire”.' },
          { n: 'M6', name: 'Menü für 2 Personen', allerg: 'L,G,F,C,D,B', price: '57,90', tags: 'raw', de: 'Vorspeise: 1× Edamame. 3× Sashimi Lachs, 3× Sashimi Thunfisch, 2× Nigiri Lachs, 2× Nigiri Thunfisch, 2× große Ebi-Tempura, 18× Maki (Lachs, Thunfisch, Gurke), 8× Special Roll 108 Salmon Belly, 6× Crunchy Toronto.', en: 'Starter: 1× edamame. 3× salmon sashimi, 3× tuna sashimi, 2× salmon nigiri, 2× tuna nigiri, 2× large ebi tempura, 18× maki (salmon, tuna, cucumber), 8× special roll 108 Salmon Belly, 6× crunchy Toronto.', img: IMG + 'm6-zwei-personen.png' },
          { n: 'M7', name: 'Menü für 3 Personen', allerg: 'L,G,F,C,D,B,N', price: '85,90', tags: 'raw', de: 'Vorspeise: Edamame, 5× Gyoza, 3× Ebi-Tempura. 24× Maki (Lachs, Thunfisch, Avocado, Gurke), 3× Sashimi Lachs, 3× Sashimi Thunfisch, 2× Nigiri Thunfisch, 2× Nigiri Lachs, 2× Nigiri Ebi, 16 Stk. Special Roll (103 Salmon on Fire, 109 Sakura), 6× Crunchy Toronto.', en: 'Starter: edamame, 5× gyoza, 3× ebi tempura. 24× maki (salmon, tuna, avocado, cucumber), 3× salmon sashimi, 3× tuna sashimi, 2× tuna nigiri, 2× salmon nigiri, 2× ebi nigiri, 16× special rolls (103 Salmon on Fire, 109 Sakura), 6× crunchy Toronto.' },
          { n: 'M8', name: 'Party Menü für 4 Personen', allerg: 'L,G,F,C,D,B,N', price: '109,90', tags: 'raw', de: 'Vorspeise: Edamame, 5× Gyoza, 4× Ebi-Tempura, 1× Lachstatar. 4× Sashimi Lachs, 4× Sashimi Thunfisch, 24× Maki (Lachs, Thunfisch, Avocado, Gurke), 8× Nigiri (Lachs, Thunfisch, Garnelen, Avocado), 8× I.O. Alaska, 12× Crunchy Roll (201 Veggie, 203 Toronto), 16× Special Rolls (100 Summer Love, 109 Sakura).', en: 'Starter: edamame, 5× gyoza, 4× ebi tempura, 1× salmon tartare. 4× salmon sashimi, 4× tuna sashimi, 24× maki (salmon, tuna, avocado, cucumber), 8× nigiri (salmon, tuna, shrimp, avocado), 8× I.O. Alaska, 12× crunchy rolls (201 Veggie, 203 Toronto), 16× special rolls (100 Summer Love, 109 Sakura).' }
        ]
      },

      /* ------------------------------------------------------------------- KIDS */
      {
        id: 'kids', kind: 'food', name: 'Kids Menü', en: 'Kids menu',
        items: [
          { n: 'K1', name: 'Kids Menü 1', allerg: 'D,F,1', price: '8,50', de: '6 japanische Chicken Nuggets mit Teriyaki-Soße, serviert mit Pommes frites oder Jasminreis.', en: '6 Japanese chicken nuggets with teriyaki sauce, served with French fries or jasmine rice.' },
          { n: 'K2', name: 'Kids Menü 2', allerg: 'B,D,F,1,L', price: '9,50', de: '3 Tempura-Garnelen mit Teriyaki-Soße, serviert mit Pommes frites oder Jasminreis.', en: '3 tempura prawns with teriyaki sauce, served with French fries or jasmine rice.' }
        ]
      }
    ]
  };
})();
