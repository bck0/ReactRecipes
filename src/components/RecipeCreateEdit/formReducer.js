import slug from 'slug';

export const INITIAL_STATE = {
  title: '',
  preparationTime: 0,
  servingCount: 1,
  sideDish: '',
  directions: '',
  ingredients: [],
  slug: '',
  lastModifiedDate: '',
  __v: 0,
};

export const TEST_DATA = {
  _id: '5c41bbd5a28cb9001bb85f16',
  title: 'Dhál z červené čočky a pečeného květáku & čapátí',
  preparationTime: 20,
  servingCount: 4,
  sideDish: 'čapátí',
  directions:
    '# Dhál\n1. Troubu předehřejte na 220°C. Růžičky květáku promíchejte s 2 lžícemi oleje, rozložte na plech a dejte péct na 15–20 minut do horní části trouby.\n\n2. Zbylý olej rozehřejte v hrnci na středním plameni. Přidejte cibuli nakrájenou na půlkolečka a opékejte ji 5 minut, pak přidejte česnek  nakrájený na tenké plátky a opékejte ještě 2–3 minuty. Přisypte hořčičná semínka, římský kmín a zázvor a ještě 2 minuty opékejte. Vmíchejte rajčata, čočku a přilijte 500ml vody. Přiveďte k varu a vařte na středním plameni 20–25 minut, aby čočka změkla a začala se rozpadat. Dochuťte, vmíchejte květák a polovinu koriandru. Podávejte se zbylým koriandrem a plackami čapátí.\n\n# Čapátí\n3. Smíchejte mouku, vodu, olej a sůl a uhněťte hladké nelepivé těsto. Zakryjte ho a dejte na 15–20 minut odležet.\n\n4. Potom z těsta ukoulejte 12 kuliček velikosti golfového míčku. Každou rozválejte do kruhu o průměru asi 15cm. Na středním plameni rozehřejte nepřilnavou pánev. Placku co nejvíce oprašte od mouky a dejte péct na pánev. Jakmile se na spodní straně začnou dělat puchýřky, placku otočte. Ve chvíli, kdy se puchýřky na placce udělají znovu, otočte ji a zvyšte plamen na maximum, placka by se měla začít nafukovat, opět otočte a dopečte z druhé strany. Postup zopakujte.',
  ingredients: [
    {
      _id: '5c41bc18a28cb9001bb85f41',
      name: 'Dhál',
      isGroup: true,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f24',
      name: 'květák',
      amount: 1,
      amountUnit: 'ks',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f23',
      name: 'rostlinný olej',
      amount: 3,
      amountUnit: 'lžíce',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f22',
      name: 'cibule',
      amount: 1,
      amountUnit: 'ks',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f21',
      name: 'česnek',
      amount: 3,
      amountUnit: 'ks',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f20',
      name: 'hořčičná semínka (černá nebo bílá)',
      amount: 1,
      amountUnit: 'lžíce',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f1f',
      name: 'římský kmín (celý)',
      amount: 1,
      amountUnit: 'lžíce',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f1e',
      name: 'nastrouhaný zázvor',
      amount: 30,
      amountUnit: 'g',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f1d',
      name: 'krájená rajčata v konzervě',
      amount: 400,
      amountUnit: 'g',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f1c',
      name: 'červená čočka',
      amount: 250,
      amountUnit: 'g',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f1b',
      name: 'koriandr',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f1a',
      name: 'Čapátí',
      isGroup: true,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f19',
      name: 'hladká mouka',
      amount: 2,
      amountUnit: 'hrnky',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f18',
      name: 'rostlinný olej',
      amount: 2,
      amountUnit: 'lžíce',
      isGroup: false,
    },
    {
      _id: '5c41bbd5a28cb9001bb85f17',
      name: 'sůl',
      amount: 0.25,
      amountUnit: 'lžičky',
      isGroup: false,
    },
  ],
  slug: 'dhal-z-cervene-cocky-a-peceneho-kvetaku-and-capati',
  lastModifiedDate: '2019-01-18T11:45:03.981Z',
  __v: 0,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case 'DELETE_INGREDIENT':
      const arr = Array.from(state.ingredients);
      arr.splice(action.payload, 1);
      console.log(action.payload);
      return {
        ...state,
        ingredients: arr,
      };
    case 'SWITCH_INGREDIETS':
      const items = Array.from(state.ingredients);
      const [reorderedItem] = items.splice(action.payload.source, 1);
      items.splice(action.payload.destination, 0, reorderedItem);
      return {
        ...state,
        ingredients: items,
      };
    case 'SET_DATE':
      return {
        ...state,
        lastModifiedDate: new Date(),
      };
    case 'SET_SLUG':
      return {
        ...state,
        slug: slug(state.title, '-'),
      };
    default:
      return state;
  }
};
