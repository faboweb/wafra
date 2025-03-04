export enum Onramps {
  Onramp,
  None,
}

export default [
  {
    label: "Afghanistan",
    value: "AF",
    phoneCode: "+93",
    currency: "AFN",
    currencySymbol: "AFN؋", // Prefixed Afghani symbol
    onramp: Onramps.None,
  },
  {
    label: "Albania",
    value: "AL",
    phoneCode: "+355",
    currency: "ALL",
    currencySymbol: "ALL L", // Prefixed Lek symbol
    onramp: Onramps.None,
  },
  {
    label: "Algeria",
    value: "DZ",
    phoneCode: "+213",
    currency: "DZD",
    currencySymbol: "DZD د.ج", // Prefixed Algerian Dinar (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Andorra",
    value: "AD",
    phoneCode: "+376",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed, universally unique)
    onramp: Onramps.Onramp,
  },
  {
    label: "Angola",
    value: "AO",
    phoneCode: "+244",
    currency: "AOA",
    currencySymbol: "AOA Kz", // Prefixed Kwanza symbol
    onramp: Onramps.None,
  },
  {
    label: "Antigua and Barbuda",
    value: "AG",
    phoneCode: "+1-268",
    currency: "XCD",
    currencySymbol: "XCD$", // Prefixed Eastern Caribbean Dollar
    onramp: Onramps.None,
  },
  {
    label: "Argentina",
    value: "AR",
    phoneCode: "+54",
    currency: "ARS",
    currencySymbol: "AR$", // Prefixed Argentine Peso
    onramp: Onramps.None,
  },
  {
    label: "Armenia",
    value: "AM",
    phoneCode: "+374",
    currency: "AMD",
    currencySymbol: "AMD֏", // Prefixed Armenian Dram symbol
    onramp: Onramps.None,
  },
  {
    label: "Australia",
    value: "AU",
    phoneCode: "+61",
    currency: "AUD",
    currencySymbol: "A$", // Prefixed Australian Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Austria",
    value: "AT",
    phoneCode: "+43",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Azerbaijan",
    value: "AZ",
    phoneCode: "+994",
    currency: "AZN",
    currencySymbol: "AZN₼", // Prefixed Azerbaijani Manat symbol
    onramp: Onramps.None,
  },
  {
    label: "Bahamas",
    value: "BS",
    phoneCode: "+1-242",
    currency: "BSD",
    currencySymbol: "B$", // Prefixed Bahamian Dollar
    onramp: Onramps.None,
  },
  {
    label: "Bahrain",
    value: "BH",
    phoneCode: "+973",
    currency: "BHD",
    currencySymbol: "BHD .د.ب", // Prefixed Bahraini Dinar (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Bangladesh",
    value: "BD",
    phoneCode: "+880",
    currency: "BDT",
    currencySymbol: "BDT৳", // Prefixed Bangladeshi Taka symbol
    onramp: Onramps.None,
  },
  {
    label: "Barbados",
    value: "BB",
    phoneCode: "+1-246",
    currency: "BBD",
    currencySymbol: "BBD$", // Prefixed Barbadian Dollar
    onramp: Onramps.None,
  },
  {
    label: "Belarus",
    value: "BY",
    phoneCode: "+375",
    currency: "BYN",
    currencySymbol: "BYN Br", // Prefixed Belarusian Rubles symbol
    onramp: Onramps.None,
  },
  {
    label: "Belgium",
    value: "BE",
    phoneCode: "+32",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Belize",
    value: "BZ",
    phoneCode: "+501",
    currency: "BZD",
    currencySymbol: "BZ$", // Prefixed Belize Dollar
    onramp: Onramps.None,
  },
  {
    label: "Benin",
    value: "BJ",
    phoneCode: "+229",
    currency: "XOF",
    currencySymbol: "XOF CFA", // Prefixed West African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Bhutan",
    value: "BT",
    phoneCode: "+975",
    currency: "BTN",
    currencySymbol: "BTN Nu.", // Prefixed Bhutanese Ngultrum symbol
    onramp: Onramps.None,
  },
  {
    label: "Bolivia",
    value: "BO",
    phoneCode: "+591",
    currency: "BOB",
    currencySymbol: "BOB Bs.", // Prefixed Bolivian Boliviano symbol
    onramp: Onramps.None,
  },
  {
    label: "Bosnia and Herzegovina",
    value: "BA",
    phoneCode: "+387",
    currency: "BAM",
    currencySymbol: "BAM KM", // Prefixed Bosnia-Herzegovina Convertible Mark symbol
    onramp: Onramps.None,
  },
  {
    label: "Botswana",
    value: "BW",
    phoneCode: "+267",
    currency: "BWP",
    currencySymbol: "BWP P", // Prefixed Botswana Pula symbol
    onramp: Onramps.None,
  },
  {
    label: "Brazil",
    value: "BR",
    phoneCode: "+55",
    currency: "BRL",
    currencySymbol: "R$", // Prefixed Brazilian Real (commonly used as R$)
    onramp: Onramps.Onramp,
  },
  {
    label: "Brunei",
    value: "BN",
    phoneCode: "+673",
    currency: "BND",
    currencySymbol: "B$", // Prefixed Brunei Dollar
    onramp: Onramps.None,
  },
  {
    label: "Bulgaria",
    value: "BG",
    phoneCode: "+359",
    currency: "BGN",
    currencySymbol: "BGN лв", // Prefixed Bulgarian Lev symbol
    onramp: Onramps.None,
  },
  {
    label: "Burkina Faso",
    value: "BF",
    phoneCode: "+226",
    currency: "XOF",
    currencySymbol: "XOF CFA", // Prefixed West African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Burundi",
    value: "BI",
    phoneCode: "+257",
    currency: "BIF",
    currencySymbol: "BIF FBu", // Prefixed Burundian Franc symbol
    onramp: Onramps.None,
  },
  {
    label: "Cabo Verde",
    value: "CV",
    phoneCode: "+238",
    currency: "CVE",
    currencySymbol: "CVE$", // Prefixed Cape Verdean Escudo
    onramp: Onramps.None,
  },
  {
    label: "Cambodia",
    value: "KH",
    phoneCode: "+855",
    currency: "KHR",
    currencySymbol: "KHR៛", // Prefixed Cambodian Riel symbol
    onramp: Onramps.None,
  },
  {
    label: "Cameroon",
    value: "CM",
    phoneCode: "+237",
    currency: "XAF",
    currencySymbol: "XAF CFA", // Prefixed Central African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Canada",
    value: "CA",
    phoneCode: "+1",
    currency: "CAD",
    currencySymbol: "C$", // Prefixed Canadian Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Central African Republic",
    value: "CF",
    phoneCode: "+236",
    currency: "XAF",
    currencySymbol: "XAF CFA", // Prefixed Central African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Chad",
    value: "TD",
    phoneCode: "+235",
    currency: "XAF",
    currencySymbol: "XAF CFA", // Prefixed Central African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Chile",
    value: "CL",
    phoneCode: "+56",
    currency: "CLP",
    currencySymbol: "CL$", // Prefixed Chilean Peso
    onramp: Onramps.None,
  },
  {
    label: "China",
    value: "CN",
    phoneCode: "+86",
    currency: "CNY",
    currencySymbol: "CN¥", // Prefixed Chinese Yuan (¥ with CN prefix)
    onramp: Onramps.None,
  },
  {
    label: "Colombia",
    value: "CO",
    phoneCode: "+57",
    currency: "COP",
    currencySymbol: "CO$", // Prefixed Colombian Peso
    onramp: Onramps.None,
  },
  {
    label: "Comoros",
    value: "KM",
    phoneCode: "+269",
    currency: "KMF",
    currencySymbol: "KMF CF", // Prefixed Comorian Franc symbol
    onramp: Onramps.None,
  },
  {
    label: "Congo (Congo-Brazzaville)",
    value: "CG",
    phoneCode: "+242",
    currency: "XAF",
    currencySymbol: "XAF CFA", // Prefixed Central African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Congo (DRC)",
    value: "CD",
    phoneCode: "+243",
    currency: "CDF",
    currencySymbol: "CDF FC", // Prefixed Congolese Franc symbol
    onramp: Onramps.None,
  },
  {
    label: "Costa Rica",
    value: "CR",
    phoneCode: "+506",
    currency: "CRC",
    currencySymbol: "CRC₡", // Prefixed Costa Rican Colón symbol
    onramp: Onramps.None,
  },
  {
    label: "Croatia",
    value: "HR",
    phoneCode: "+385",
    currency: "EUR", // Updated from HRK to EUR (adopted Jan 1, 2023)
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.None,
  },
  {
    label: "Cuba",
    value: "CU",
    phoneCode: "+53",
    currency: "CUP",
    currencySymbol: "CU$", // Prefixed Cuban Peso
    onramp: Onramps.None,
  },
  {
    label: "Cyprus",
    value: "CY",
    phoneCode: "+357",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Czechia",
    value: "CZ",
    phoneCode: "+420",
    currency: "CZK",
    currencySymbol: "CZK Kč", // Prefixed Czech Koruna symbol
    onramp: Onramps.None,
  },
  {
    label: "Denmark",
    value: "DK",
    phoneCode: "+45",
    currency: "DKK",
    currencySymbol: "DKK kr", // Prefixed Danish Krone symbol
    onramp: Onramps.Onramp,
  },
  {
    label: "Djibouti",
    value: "DJ",
    phoneCode: "+253",
    currency: "DJF",
    currencySymbol: "DJF Fdj", // Prefixed Djiboutian Franc symbol
    onramp: Onramps.None,
  },
  {
    label: "Dominica",
    value: "DM",
    phoneCode: "+1-767",
    currency: "XCD",
    currencySymbol: "XCD$", // Prefixed Eastern Caribbean Dollar
    onramp: Onramps.None,
  },
  {
    label: "Dominican Republic",
    value: "DO",
    phoneCode: "+1-809",
    currency: "DOP",
    currencySymbol: "RD$", // Prefixed Dominican Peso
    onramp: Onramps.None,
  },
  {
    label: "Ecuador",
    value: "EC",
    phoneCode: "+593",
    currency: "USD",
    currencySymbol: "US$", // Prefixed US Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Egypt",
    value: "EG",
    phoneCode: "+20",
    currency: "EGP",
    currencySymbol: "EGP £", // Prefixed Egyptian Pound (sometimes E£)
    onramp: Onramps.None,
  },
  {
    label: "El Salvador",
    value: "SV",
    phoneCode: "+503",
    currency: "USD",
    currencySymbol: "US$", // Prefixed US Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Equatorial Guinea",
    value: "GQ",
    phoneCode: "+240",
    currency: "XAF",
    currencySymbol: "XAF CFA", // Prefixed Central African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Eritrea",
    value: "ER",
    phoneCode: "+291",
    currency: "ERN",
    currencySymbol: "ERN Nfk", // Prefixed Eritrean Nakfa symbol
    onramp: Onramps.None,
  },
  {
    label: "Estonia",
    value: "EE",
    phoneCode: "+372",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Eswatini",
    value: "SZ",
    phoneCode: "+268",
    currency: "SZL",
    currencySymbol: "SZL L", // Prefixed Swazi Lilangeni symbol
    onramp: Onramps.None,
  },
  {
    label: "Ethiopia",
    value: "ET",
    phoneCode: "+251",
    currency: "ETB",
    currencySymbol: "ETB Br", // Prefixed Ethiopian Birr symbol
    onramp: Onramps.None,
  },
  {
    label: "Fiji",
    value: "FJ",
    phoneCode: "+679",
    currency: "FJD",
    currencySymbol: "FJ$", // Prefixed Fijian Dollar
    onramp: Onramps.None,
  },
  {
    label: "Finland",
    value: "FI",
    phoneCode: "+358",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "France",
    value: "FR",
    phoneCode: "+33",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Gabon",
    value: "GA",
    phoneCode: "+241",
    currency: "XAF",
    currencySymbol: "XAF CFA", // Prefixed Central African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Gambia",
    value: "GM",
    phoneCode: "+220",
    currency: "GMD",
    currencySymbol: "GMD D", // Prefixed Gambian Dalasi symbol
    onramp: Onramps.None,
  },
  {
    label: "Georgia",
    value: "GE",
    phoneCode: "+995",
    currency: "GEL",
    currencySymbol: "GEL ₾", // Prefixed Georgian Lari symbol
    onramp: Onramps.None,
  },
  {
    label: "Germany",
    value: "DE",
    phoneCode: "+49",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Ghana",
    value: "GH",
    phoneCode: "+233",
    currency: "GHS",
    currencySymbol: "GHS ₵", // Prefixed Ghanaian Cedi symbol
    onramp: Onramps.None,
  },
  {
    label: "Greece",
    value: "GR",
    phoneCode: "+30",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Grenada",
    value: "GD",
    phoneCode: "+1-473",
    currency: "XCD",
    currencySymbol: "XCD$", // Prefixed Eastern Caribbean Dollar
    onramp: Onramps.None,
  },
  {
    label: "Guatemala",
    value: "GT",
    phoneCode: "+502",
    currency: "GTQ",
    currencySymbol: "GTQ Q", // Prefixed Guatemalan Quetzal symbol
    onramp: Onramps.None,
  },
  {
    label: "Guinea",
    value: "GN",
    phoneCode: "+224",
    currency: "GNF",
    currencySymbol: "GNF FG", // Prefixed Guinean Franc symbol
    onramp: Onramps.None,
  },
  {
    label: "Guinea-Bissau",
    value: "GW",
    phoneCode: "+245",
    currency: "XOF",
    currencySymbol: "XOF CFA", // Prefixed West African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Guyana",
    value: "GY",
    phoneCode: "+592",
    currency: "GYD",
    currencySymbol: "GY$", // Prefixed Guyanese Dollar
    onramp: Onramps.None,
  },
  {
    label: "Haiti",
    value: "HT",
    phoneCode: "+509",
    currency: "HTG",
    currencySymbol: "HTG G", // Prefixed Haitian Gourde symbol
    onramp: Onramps.None,
  },
  {
    label: "Honduras",
    value: "HN",
    phoneCode: "+504",
    currency: "HNL",
    currencySymbol: "HNL L", // Prefixed Honduran Lempira symbol
    onramp: Onramps.None,
  },
  {
    label: "Hungary",
    value: "HU",
    phoneCode: "+36",
    currency: "HUF",
    currencySymbol: "HUF Ft", // Prefixed Hungarian Forint symbol
    onramp: Onramps.None,
  },
  {
    label: "Iceland",
    value: "IS",
    phoneCode: "+354",
    currency: "ISK",
    currencySymbol: "ISK kr", // Prefixed Icelandic Króna symbol
    onramp: Onramps.None,
  },
  {
    label: "India",
    value: "IN",
    phoneCode: "+91",
    currency: "INR",
    currencySymbol: "₹", // Indian Rupee symbol (no prefix needed, unique)
    onramp: Onramps.Onramp,
  },
  {
    label: "Indonesia",
    value: "ID",
    phoneCode: "+62",
    currency: "IDR",
    currencySymbol: "IDR Rp", // Prefixed Indonesian Rupiah symbol
    onramp: Onramps.None,
  },
  {
    label: "Iran",
    value: "IR",
    phoneCode: "+98",
    currency: "IRR",
    currencySymbol: "IRR ﷼", // Prefixed Iranian Rial symbol
    onramp: Onramps.None,
  },
  {
    label: "Iraq",
    value: "IQ",
    phoneCode: "+964",
    currency: "IQD",
    currencySymbol: "IQD د.ع", // Prefixed Iraqi Dinar (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Ireland",
    value: "IE",
    phoneCode: "+353",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Israel",
    value: "IL",
    phoneCode: "+972",
    currency: "ILS",
    currencySymbol: "₪", // Israeli Shekel symbol (no prefix needed, unique)
    onramp: Onramps.None,
  },
  {
    label: "Italy",
    value: "IT",
    phoneCode: "+39",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Jamaica",
    value: "JM",
    phoneCode: "+1-876",
    currency: "JMD",
    currencySymbol: "J$", // Prefixed Jamaican Dollar
    onramp: Onramps.None,
  },
  {
    label: "Japan",
    value: "JP",
    phoneCode: "+81",
    currency: "JPY",
    currencySymbol: "¥", // Japanese Yen symbol (no prefix needed, unique)
    onramp: Onramps.Onramp,
  },
  {
    label: "Jordan",
    value: "JO",
    phoneCode: "+962",
    currency: "JOD",
    currencySymbol: "JOD د.أ", // Prefixed Jordanian Dinar (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Kazakhstan",
    value: "KZ",
    phoneCode: "+7",
    currency: "KZT",
    currencySymbol: "KZT ₸", // Prefixed Kazakhstani Tenge symbol
    onramp: Onramps.None,
  },
  {
    label: "Kenya",
    value: "KE",
    phoneCode: "+254",
    currency: "KES",
    currencySymbol: "KES KSh", // Prefixed Kenyan Shilling symbol
    onramp: Onramps.None,
  },
  {
    label: "Kiribati",
    value: "KI",
    phoneCode: "+686",
    currency: "AUD",
    currencySymbol: "A$", // Prefixed Australian Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Kuwait",
    value: "KW",
    phoneCode: "+965",
    currency: "KWD",
    currencySymbol: "KWD د.ك", // Prefixed Kuwaiti Dinar (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Kyrgyzstan",
    value: "KG",
    phoneCode: "+996",
    currency: "KGS",
    currencySymbol: "KGS с", // Prefixed Kyrgyzstani Som symbol
    onramp: Onramps.None,
  },
  {
    label: "Laos",
    value: "LA",
    phoneCode: "+856",
    currency: "LAK",
    currencySymbol: "LAK ₭", // Prefixed Lao Kip symbol
    onramp: Onramps.None,
  },
  {
    label: "Latvia",
    value: "LV",
    phoneCode: "+371",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Lebanon",
    value: "LB",
    phoneCode: "+961",
    currency: "LBP",
    currencySymbol: "LBP ل.ل", // Prefixed Lebanese Pound (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Lesotho",
    value: "LS",
    phoneCode: "+266",
    currency: "LSL",
    currencySymbol: "LSL L", // Prefixed Lesotho Loti symbol
    onramp: Onramps.None,
  },
  {
    label: "Liberia",
    value: "LR",
    phoneCode: "+231",
    currency: "LRD",
    currencySymbol: "LR$", // Prefixed Liberian Dollar
    onramp: Onramps.None,
  },
  {
    label: "Libya",
    value: "LY",
    phoneCode: "+218",
    currency: "LYD",
    currencySymbol: "LYD د.ل", // Prefixed Libyan Dinar (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Liechtenstein",
    value: "LI",
    phoneCode: "+423",
    currency: "CHF",
    currencySymbol: "CHF Fr", // Prefixed Swiss Franc symbol
    onramp: Onramps.None,
  },
  {
    label: "Lithuania",
    value: "LT",
    phoneCode: "+370",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Luxembourg",
    value: "LU",
    phoneCode: "+352",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Madagascar",
    value: "MG",
    phoneCode: "+261",
    currency: "MGA",
    currencySymbol: "MGA Ar", // Prefixed Malagasy Ariary symbol
    onramp: Onramps.None,
  },
  {
    label: "Malawi",
    value: "MW",
    phoneCode: "+265",
    currency: "MWK",
    currencySymbol: "MWK MK", // Prefixed Malawian Kwacha symbol
    onramp: Onramps.None,
  },
  {
    label: "Malaysia",
    value: "MY",
    phoneCode: "+60",
    currency: "MYR",
    currencySymbol: "RM", // Prefixed Malaysian Ringgit (commonly RM)
    onramp: Onramps.None,
  },
  {
    label: "Maldives",
    value: "MV",
    phoneCode: "+960",
    currency: "MVR",
    currencySymbol: "MVR Rf", // Prefixed Maldivian Rufiyaa symbol
    onramp: Onramps.None,
  },
  {
    label: "Mali",
    value: "ML",
    phoneCode: "+223",
    currency: "XOF",
    currencySymbol: "XOF CFA", // Prefixed West African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Malta",
    value: "MT",
    phoneCode: "+356",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Marshall Islands",
    value: "MH",
    phoneCode: "+692",
    currency: "USD",
    currencySymbol: "US$", // Prefixed US Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Mauritania",
    value: "MR",
    phoneCode: "+222",
    currency: "MRU",
    currencySymbol: "MRU UM", // Prefixed Mauritanian Ouguiya symbol
    onramp: Onramps.None,
  },
  {
    label: "Mauritius",
    value: "MU",
    phoneCode: "+230",
    currency: "MUR",
    currencySymbol: "MUR ₨", // Prefixed Mauritian Rupee symbol
    onramp: Onramps.None,
  },
  {
    label: "Mexico",
    value: "MX",
    phoneCode: "+52",
    currency: "MXN",
    currencySymbol: "MX$", // Prefixed Mexican Peso
    onramp: Onramps.Onramp,
  },
  {
    label: "Micronesia",
    value: "FM",
    phoneCode: "+691",
    currency: "USD",
    currencySymbol: "US$", // Prefixed US Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Moldova",
    value: "MD",
    phoneCode: "+373",
    currency: "MDL",
    currencySymbol: "MDL L", // Prefixed Moldovan Leu symbol
    onramp: Onramps.None,
  },
  {
    label: "Monaco",
    value: "MC",
    phoneCode: "+377",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Mongolia",
    value: "MN",
    phoneCode: "+976",
    currency: "MNT",
    currencySymbol: "MNT ₮", // Prefixed Mongolian Tögrög symbol
    onramp: Onramps.None,
  },
  {
    label: "Montenegro",
    value: "ME",
    phoneCode: "+382",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Morocco",
    value: "MA",
    phoneCode: "+212",
    currency: "MAD",
    currencySymbol: "MAD د.م.", // Prefixed Moroccan Dirham (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Mozambique",
    value: "MZ",
    phoneCode: "+258",
    currency: "MZN",
    currencySymbol: "MZN MT", // Prefixed Mozambican Metical symbol
    onramp: Onramps.None,
  },
  {
    label: "Myanmar",
    value: "MM",
    phoneCode: "+95",
    currency: "MMK",
    currencySymbol: "MMK K", // Prefixed Myanmar Kyat symbol
    onramp: Onramps.None,
  },
  {
    label: "Namibia",
    value: "NA",
    phoneCode: "+264",
    currency: "NAD",
    currencySymbol: "N$", // Prefixed Namibian Dollar
    onramp: Onramps.None,
  },
  {
    label: "Nauru",
    value: "NR",
    phoneCode: "+674",
    currency: "AUD",
    currencySymbol: "A$", // Prefixed Australian Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Nepal",
    value: "NP",
    phoneCode: "+977",
    currency: "NPR",
    currencySymbol: "NPR ₨", // Prefixed Nepalese Rupee symbol
    onramp: Onramps.None,
  },
  {
    label: "Netherlands",
    value: "NL",
    phoneCode: "+31",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "New Zealand",
    value: "NZ",
    phoneCode: "+64",
    currency: "NZD",
    currencySymbol: "NZ$", // Prefixed New Zealand Dollar
    onramp: Onramps.Onramp,
  },
  {
    label: "Nicaragua",
    value: "NI",
    phoneCode: "+505",
    currency: "NIO",
    currencySymbol: "C$", // Prefixed Nicaraguan Córdoba (C$ is common)
    onramp: Onramps.None,
  },
  {
    label: "Niger",
    value: "NE",
    phoneCode: "+227",
    currency: "XOF",
    currencySymbol: "XOF CFA", // Prefixed West African CFA Franc
    onramp: Onramps.None,
  },
  {
    label: "Nigeria",
    value: "NG",
    phoneCode: "+234",
    currency: "NGN",
    currencySymbol: "₦", // Nigerian Naira symbol (no prefix needed, unique)
    onramp: Onramps.None,
  },
  {
    label: "North Korea",
    value: "KP",
    phoneCode: "+850",
    currency: "KPW",
    currencySymbol: "KPW ₩", // Prefixed North Korean Won symbol
    onramp: Onramps.None,
  },
  {
    label: "Norway",
    value: "NO",
    phoneCode: "+47",
    currency: "NOK",
    currencySymbol: "NOK kr", // Prefixed Norwegian Krone symbol
    onramp: Onramps.Onramp,
  },
  {
    label: "Oman",
    value: "OM",
    phoneCode: "+968",
    currency: "OMR",
    currencySymbol: "OMR ر.ع.", // Prefixed Omani Rial (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Pakistan",
    value: "PK",
    phoneCode: "+92",
    currency: "PKR",
    currencySymbol: "PKR ₨", // Prefixed Pakistani Rupee symbol
    onramp: Onramps.None,
  },
  {
    label: "Palestine",
    value: "PS",
    phoneCode: "+970",
    currency: "ILS",
    currencySymbol: "₪", // Israeli Shekel symbol (no prefix needed, unique)
    onramp: Onramps.None,
  },
  {
    label: "Panama",
    value: "PA",
    phoneCode: "+507",
    currency: "PAB",
    currencySymbol: "B/.", // Prefixed Panamanian Balboa (commonly B/.)
    onramp: Onramps.None,
  },
  {
    label: "Papua New Guinea",
    value: "PG",
    phoneCode: "+675",
    currency: "PGK",
    currencySymbol: "PGK K", // Prefixed Papua New Guinean Kina symbol
    onramp: Onramps.None,
  },
  {
    label: "Paraguay",
    value: "PY",
    phoneCode: "+595",
    currency: "PYG",
    currencySymbol: "PYG ₲", // Prefixed Paraguayan Guaraní symbol
    onramp: Onramps.None,
  },
  {
    label: "Peru",
    value: "PE",
    phoneCode: "+51",
    currency: "PEN",
    currencySymbol: "PEN S/", // Prefixed Peruvian Sol symbol
    onramp: Onramps.None,
  },
  {
    label: "Philippines",
    value: "PH",
    phoneCode: "+63",
    currency: "PHP",
    currencySymbol: "₱", // Philippine Peso symbol (no prefix needed, unique)
    onramp: Onramps.None,
  },
  {
    label: "Poland",
    value: "PL",
    phoneCode: "+48",
    currency: "PLN",
    currencySymbol: "PLN zł", // Prefixed Polish Złoty symbol
    onramp: Onramps.Onramp,
  },
  {
    label: "Portugal",
    value: "PT",
    phoneCode: "+351",
    currency: "EUR",
    currencySymbol: "€", // Euro symbol (no prefix needed)
    onramp: Onramps.Onramp,
  },
  {
    label: "Qatar",
    value: "QA",
    phoneCode: "+974",
    currency: "QAR",
    currencySymbol: "QAR ر.ق", // Prefixed Qatari Riyal (Arabic script)
    onramp: Onramps.None,
  },
  {
    label: "Romania",
    value: "RO",
    phoneCode: "+40",
    currency: "RON",
    currencySymbol: "RON lei", // Prefixed Romanian Leu symbol
    onramp: Onramps.None,
  },
  {
    label: "Russia",
    value: "RU",
    phoneCode: "+7",
    currency: "RUB",
    currencySymbol: "RUB ₽", // Prefixed Russian Rubles symbol
    onramp: Onramps.None,
  },
  {
    label: "Rwanda",
    value: "RW",
    phoneCode: "+250",
    currency: "RWF",
    currencySymbol: "RWF FRw", // Prefixed Rwandan Franc symbol
    onramp: Onramps.None,
  },
  {
    label: "Samoa",
    value: "WS",
    phoneCode: "+685",
    currency: "WST",
    currencySymbol: "WST T", // Prefixed Samoan Tālā symbol
    onramp: Onramps.None,
  },
  {
    label: "Saudi Arabia",
    value: "SA",
    phoneCode: "+966",
    currency: "SAR",
    currencySymbol: "SAR ر.س", // Prefixed Saudi Riyal (Arabic script)
    onramp: Onramps.None,
  },
];

export const onrampCurrencyCodes = {
  INR: 1,
  TRY: 2,
  AED: 3,
  MXN: 4,
  VND: 5,
  NGN: 6,
  BRL: 7,
  PEN: 8,
  COP: 9,
  CLP: 10,
  PHP: 11,
  EUR: 12,
  IDR: 14,
  GHS: 15,
  RAND: 16,
  USD: 21,
  THB: 27,
  ARS: 29,
  EGP: 31,
  LKR: 32,
};
