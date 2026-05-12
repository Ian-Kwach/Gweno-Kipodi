export interface Hymn {
  id: string;
  number: number;
  title: string;
  lyrics: {
    english: string;
    kiswahili: string;
    luo: string;
  };
  sourceUrl?: string;
}

export const hymns: Hymn[] = [
  {
    id: '1',
    number: 1,
    title: 'Jesus, My Savior',
    lyrics: {
      english: 'Jesus, my Savior, help me to understand...',
      kiswahili: 'Yesu, Mkombezi wangu, nisaidie kuelewa...',
      luo: 'Yesu, nyasaye wa, nenge ma gin e ma...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '2',
    number: 2,
    title: 'Amazing Grace',
    lyrics: {
      english: 'Amazing grace, how sweet the sound...',
      kiswahili: 'Neema ya kushangaza, sauti ni tamu...',
      luo: 'Neema mar piny, kanyo maber, biro...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '3',
    number: 3,
    title: 'Holy, Holy, Holy',
    lyrics: {
      english: 'Holy, holy, holy is the Lord...',
      kiswahili: 'Mtakatifu, mtakatifu, mtakatifu ni Bwana...',
      luo: 'Maler, Maler, Maler e Nyasaye...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '4',
    number: 4,
    title: 'Higher Ground',
    lyrics: {
      english: 'I’m pressing on the upward way...',
      kiswahili: 'Ninaendelea juu juu...',
      luo: 'Adwogi maduong, adwogi maduong...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '5',
    number: 5,
    title: 'I Surrender All',
    lyrics: {
      english: 'All to Jesus I surrender...',
      kiswahili: 'Nimtoa yote kwa Yesu...',
      luo: 'Nitiyogi kende Yesu...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '6',
    number: 6,
    title: 'Great Is Thy Faithfulness',
    lyrics: {
      english: 'Great is thy faithfulness, O God my Father...',
      kiswahili: 'Wema wako mkuu, Mungu Baba yangu...',
      luo: 'Nying gi ni malo, Nyasaye wabeyo...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '7',
    number: 7,
    title: 'There Is Power In The Blood',
    lyrics: {
      english: 'Would you be free from your burden of sin?',
      kiswahili: 'Je, ungependa kuwa huru kwa dhambi zako?',
      luo: 'In adhi ne koro gi kelo ma pewwore...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '8',
    number: 8,
    title: 'Blessed Assurance',
    lyrics: {
      english: 'Blessed assurance, Jesus is mine...',
      kiswahili: 'Usalama uliobarikiwa, Yesu ni wangu...',
      luo: 'En ka ogendo kare, Yesu duongni...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '9',
    number: 9,
    title: 'Turn Your Eyes Upon Jesus',
    lyrics: {
      english: 'O soul, are you weary and troubled?',
      kiswahili: 'Roho, umechoka na una shida?',
      luo: 'Ruodh, in i kom doang gi madongo?',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
  {
    id: '10',
    number: 10,
    title: 'How Great Thou Art',
    lyrics: {
      english: 'O Lord my God, when I in awesome wonder...',
      kiswahili: 'Ee Bwana Mungu wangu, ninaposhangaa...',
      luo: 'Nyasaye wa, in kik bedo kaka ber...',
    },
    sourceUrl: 'https://sda-hymn-books-collection.updatestar.com/',
  },
];
