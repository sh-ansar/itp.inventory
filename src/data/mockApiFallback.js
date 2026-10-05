import {
  USER_INFO,
  GET_COMPANIES,
  GET_COMPANIES_WITH_SYNC_INFO,
  GET_ITEMS,
  GET_ITEMS_COUNT,
  GET_LOCATIONS,
  GET_LOCATIONS_FACT,
  GET_LOCATIONS_FOR_FEW_COMPANIES,
  GET_RESPONSIBLE_PERSONS,
  GET_INVENTORIZATIONS,
  GET_INVENTORY_CHECK_ITEMS,
  GET_CURRENT_SYNC_STATUS,
  GET_START_MANUAL_SYNC,
  FORM_REPORT,
  GET_SYNCS,
  GET_SYNC_CHANGES,
  GET_SYNC_SETTINGS,
  GET_USERS_WITH_ROLES,
  GET_GUEST_USERS,
  GET_LINE_CHARTS,
  GET_WHITE_PILLOWS_DATA,
  GET_INVS_STATUS,
  LOAD_USER_PREFERENCES,
  GET_ITEM_CHANGES,
} from '../consts/urls'

const companies = [
  { id: 1, name: 'ITP Mining', days: 1, is_deleted: 0, is_self_added: 0 },
  { id: 2, name: 'ITP Kazakhstan', days: 1, is_deleted: 0, is_self_added: 0 },
  { id: 3, name: 'ITP Service', days: 2, is_deleted: 0, is_self_added: 0 },
  { id: 4, name: 'ITP Logistics', days: 1, is_deleted: 0, is_self_added: 0 },
]

const persons = [
  { id: 1, name: 'Александр Иванов', iin: '900101301111', company_id: 1, is_self_added: false },
  { id: 2, name: 'Нино Беридзе', iin: '920305400222', company_id: 2, is_self_added: false },
  { id: 3, name: 'Георгий Метревели', iin: '880714500333', company_id: 3, is_self_added: false },
  { id: 4, name: 'Данияр Ахметов', iin: '950822301444', company_id: 4, is_self_added: true },
  { id: 5, name: 'Айдана Сарсенова', iin: '930412400155', company_id: 1, is_self_added: false },
  { id: 6, name: 'Ерлан Касымов', iin: '910628300266', company_id: 2, is_self_added: false },
  { id: 7, name: 'Мариам Капанадзе', iin: '940215500377', company_id: 3, is_self_added: false },
  { id: 8, name: 'Тимур Омаров', iin: '890903301488', company_id: 4, is_self_added: false },
]

const locations = [
  { id: 101, name: 'Центральный склад', company_id: 1, is_1c: true },
  { id: 102, name: 'Офис — 2 этаж', company_id: 1, is_1c: true },
  { id: 103, name: 'Производственный участок № 2', company_id: 1, is_1c: true },
  { id: 104, name: 'Серверная', company_id: 1, is_1c: true },
  { id: 201, name: 'Склад Астана', company_id: 2, is_1c: true },
  { id: 202, name: 'Административный корпус', company_id: 2, is_1c: true },
  { id: 203, name: 'Офис продаж', company_id: 2, is_1c: true },
  { id: 301, name: 'Сервисный участок', company_id: 3, is_1c: true },
  { id: 302, name: 'Ремонтная зона', company_id: 3, is_1c: true },
  { id: 401, name: 'Логистический терминал', company_id: 4, is_1c: true },
  { id: 402, name: 'Зона отгрузки', company_id: 4, is_1c: true },
  { id: 403, name: 'Транспортный участок', company_id: 4, is_1c: true },
]

const locationTree = [
  {
    id: 1000,
    name: 'ITP Mining',
    company_id: 1,
    is_1c: false,
    items: [
      {
        id: 1001,
        name: 'Главный офис',
        company_id: 1,
        is_1c: false,
        items: [
          { id: 1002, name: 'Кабинет 201', company_id: 1, is_1c: false },
          { id: 1003, name: 'Кабинет 204', company_id: 1, is_1c: false },
        ],
      },
      { id: 1004, name: 'Центральный склад', company_id: 1, is_1c: true },
    ],
  },
  {
    id: 2000,
    name: 'ITP Kazakhstan',
    company_id: 2,
    is_1c: false,
    items: [
      { id: 2001, name: 'Склад Астана', company_id: 2, is_1c: true },
      { id: 2002, name: 'Офис продаж', company_id: 2, is_1c: false },
      { id: 2003, name: 'Административный корпус', company_id: 2, is_1c: true },
    ],
  },
  {
    id: 3000,
    name: 'ITP Service',
    company_id: 3,
    is_1c: false,
    items: [
      { id: 3001, name: 'Сервисный участок', company_id: 3, is_1c: true },
      { id: 3002, name: 'Ремонтная зона', company_id: 3, is_1c: true },
    ],
  },
  {
    id: 4000,
    name: 'ITP Logistics',
    company_id: 4,
    is_1c: false,
    items: [
      { id: 4001, name: 'Логистический терминал', company_id: 4, is_1c: true },
      { id: 4002, name: 'Зона отгрузки', company_id: 4, is_1c: true },
      { id: 4003, name: 'Транспортный участок', company_id: 4, is_1c: true },
    ],
  },
]

const baseItems = [
  {
    id: 1,
    name: 'Ноутбук Dell Latitude 5540',
    location_id: 102,
    location: 'Офис — 2 этаж',
    responsible_person_iin: '900101301111',
    responsible_person_inn: '900101301111',
    responsible_person: 'Александр Иванов',
    status_id: '1',
    status: 'На балансе',
    company_id: 1,
    company: 'ITP Mining',
    code: 'OS-000124',
    inventory_number: 'INV-2026-00124',
    account: '2410',
    purchase_date: '2025-11-14',
    purchase_cost: 648000,
    current_cost: 519000,
    factory_number: 'DL5540-8X3A',
    passport_number: 'P-5540-124',
    description: 'Рабочая станция инженера',
    source: false,
    fact_location_id: 1002,
    fact_responsible_person_iin: '900101301111',
  },
  {
    id: 2,
    name: 'Монитор Dell P2422H',
    location_id: 102,
    location: 'Офис — 2 этаж',
    responsible_person_iin: '900101301111',
    responsible_person_inn: '900101301111',
    responsible_person: 'Александр Иванов',
    status_id: '1',
    status: 'На балансе',
    company_id: 1,
    company: 'ITP Mining',
    code: 'OS-000125',
    inventory_number: 'INV-2026-00125',
    account: '2410',
    purchase_date: '2025-11-14',
    purchase_cost: 142000,
    current_cost: 118000,
    factory_number: 'P2422-00125',
    passport_number: 'P-2422-125',
    description: 'Монитор 24 дюйма',
    source: false,
    fact_location_id: 1002,
    fact_responsible_person_iin: '900101301111',
  },
  {
    id: 3,
    name: 'Сервер Dell PowerEdge R470',
    location_id: 101,
    location: 'Центральный склад',
    responsible_person_iin: '950822301444',
    responsible_person_inn: '950822301444',
    responsible_person: 'Данияр Ахметов',
    status_id: '1',
    status: 'На балансе',
    company_id: 1,
    company: 'ITP Mining',
    code: 'OS-000131',
    inventory_number: 'INV-2026-00131',
    account: '2410',
    purchase_date: '2026-03-12',
    purchase_cost: 4850000,
    current_cost: 4490000,
    factory_number: 'R470-KZ-131',
    passport_number: 'P-R470-131',
    description: 'Сервер инфраструктуры',
    source: false,
    fact_location_id: 1004,
    fact_responsible_person_iin: '950822301444',
  },
  {
    id: 4,
    name: 'Принтер HP LaserJet Pro',
    location_id: 202,
    location: 'Административный корпус',
    responsible_person_iin: '920305400222',
    responsible_person_inn: '920305400222',
    responsible_person: 'Нино Беридзе',
    status_id: '1',
    status: 'На балансе',
    company_id: 2,
    company: 'ITP Kazakhstan',
    code: 'OS-000218',
    inventory_number: 'INV-2026-00218',
    account: '2410',
    purchase_date: '2024-08-19',
    purchase_cost: 238000,
    current_cost: 164000,
    factory_number: 'HP-LJ-218',
    passport_number: 'P-LJ-218',
    description: 'Сетевой принтер',
    source: false,
    fact_location_id: 2002,
    fact_responsible_person_iin: '920305400222',
  },
  {
    id: 5,
    name: 'Сканер штрих-кодов Zebra DS2208',
    location_id: 201,
    location: 'Склад Астана',
    responsible_person_iin: '920305400222',
    responsible_person_inn: '920305400222',
    responsible_person: 'Нино Беридзе',
    status_id: '1',
    status: 'На балансе',
    company_id: 2,
    company: 'ITP Kazakhstan',
    code: 'OS-000219',
    inventory_number: 'INV-2026-00219',
    account: '2410',
    purchase_date: '2025-04-02',
    purchase_cost: 128000,
    current_cost: 98000,
    factory_number: 'ZBR-DS2208-219',
    passport_number: 'P-ZBR-219',
    description: 'Сканер для инвентаризации',
    source: false,
    fact_location_id: 2001,
    fact_responsible_person_iin: '920305400222',
  },
  {
    id: 6,
    name: 'Проектор Epson EB-FH52',
    location_id: 102,
    location: 'Офис — 2 этаж',
    responsible_person_iin: '900101301111',
    responsible_person_inn: '900101301111',
    responsible_person: 'Александр Иванов',
    status_id: '2',
    status: 'За балансом',
    company_id: 1,
    company: 'ITP Mining',
    code: 'OS-000087',
    inventory_number: 'INV-2024-00087',
    account: '2410',
    purchase_date: '2022-02-11',
    purchase_cost: 412000,
    current_cost: 0,
    factory_number: 'EP-FH52-087',
    passport_number: 'P-EP-087',
    write_off_date: '2026-08-31',
    description: 'Оборудование переговорной',
    source: false,
    fact_location_id: 1003,
    fact_responsible_person_iin: '900101301111',
  },
  {
    id: 7,
    name: 'Ноутбук Lenovo ThinkPad T14',
    location_id: 301,
    location: 'Сервисный участок',
    responsible_person_iin: '880714500333',
    responsible_person_inn: '880714500333',
    responsible_person: 'Георгий Метревели',
    status_id: '3',
    status: 'Утилизирован',
    company_id: 3,
    company: 'ITP Service',
    code: 'OS-000045',
    inventory_number: 'INV-2021-00045',
    account: '2410',
    purchase_date: '2021-09-07',
    purchase_cost: 486000,
    current_cost: 0,
    factory_number: 'T14-00045',
    passport_number: 'P-T14-045',
    date_utilized: '2026-09-18',
    description: 'Списан по акту',
    source: false,
    fact_location_id: 301,
    fact_responsible_person_iin: '880714500333',
    util_order_file_name: 'utilization-act-045.pdf',
  },
]

const companyProfiles = {
  1: {
    company: 'ITP Mining',
    locations: [
      { id: 101, name: 'Центральный склад', factId: 1004 },
      { id: 102, name: 'Офис — 2 этаж', factId: 1002 },
      { id: 103, name: 'Производственный участок № 2', factId: 1004 },
      { id: 104, name: 'Серверная', factId: 1004 },
    ],
    people: [
      { name: 'Александр Иванов', iin: '900101301111' },
      { name: 'Айдана Сарсенова', iin: '930412400155' },
    ],
  },
  2: {
    company: 'ITP Kazakhstan',
    locations: [
      { id: 201, name: 'Склад Астана', factId: 2001 },
      { id: 202, name: 'Административный корпус', factId: 2003 },
      { id: 203, name: 'Офис продаж', factId: 2002 },
    ],
    people: [
      { name: 'Нино Беридзе', iin: '920305400222' },
      { name: 'Ерлан Касымов', iin: '910628300266' },
    ],
  },
  3: {
    company: 'ITP Service',
    locations: [
      { id: 301, name: 'Сервисный участок', factId: 3001 },
      { id: 302, name: 'Ремонтная зона', factId: 3002 },
    ],
    people: [
      { name: 'Георгий Метревели', iin: '880714500333' },
      { name: 'Мариам Капанадзе', iin: '940215500377' },
    ],
  },
  4: {
    company: 'ITP Logistics',
    locations: [
      { id: 401, name: 'Логистический терминал', factId: 4001 },
      { id: 402, name: 'Зона отгрузки', factId: 4002 },
      { id: 403, name: 'Транспортный участок', factId: 4003 },
    ],
    people: [
      { name: 'Данияр Ахметов', iin: '950822301444' },
      { name: 'Тимур Омаров', iin: '890903301488' },
    ],
  },
}

const assetTemplates = [
  { name: 'Коммутатор Cisco CBS350-24T', cost: 742000, account: '2410' },
  { name: 'МФУ HP LaserJet Enterprise', cost: 568000, account: '2410' },
  { name: 'Ноутбук HP EliteBook 860 G11', cost: 812000, account: '2410' },
  { name: 'Монитор Dell UltraSharp U2723QE', cost: 324000, account: '2410' },
  { name: 'ИБП APC Smart-UPS 1500VA', cost: 389000, account: '2410' },
  { name: 'Сканер Zebra DS9308', cost: 176000, account: '2410' },
  { name: 'Принтер этикеток Zebra ZD421', cost: 294000, account: '2410' },
  { name: 'Планшет Samsung Galaxy Tab Active4 Pro', cost: 476000, account: '2410' },
  { name: 'Проектор Epson EB-L260F', cost: 946000, account: '2410' },
  { name: 'Точка доступа Cisco Catalyst 9115', cost: 514000, account: '2410' },
  { name: 'Рабочая станция Dell Precision 3680', cost: 1298000, account: '2410' },
  { name: 'Термопринтер TSC TE310', cost: 244000, account: '2410' },
]

const extraItems = Array.from({ length: 36 }, (_, index) => {
  const id = index + 8
  const companyId = (index % 4) + 1
  const profile = companyProfiles[companyId]
  const location = profile.locations[index % profile.locations.length]
  const person = profile.people[index % profile.people.length]
  const template = assetTemplates[index % assetTemplates.length]
  const statusId = index % 17 === 0 ? '3' : (index % 9 === 0 ? '2' : '1')
  const status = statusId === '3' ? 'Утилизирован' : (statusId === '2' ? 'За балансом' : 'На балансе')
  const year = 2022 + (index % 5)
  const month = String((index % 12) + 1).padStart(2, '0')
  const day = String((index % 24) + 1).padStart(2, '0')
  const purchaseCost = template.cost + ((index % 5) * 17000)
  const currentCost = statusId === '1'
    ? Math.round(purchaseCost * (0.58 + ((index % 4) * 0.08)))
    : 0

  return {
    id,
    name: template.name,
    location_id: location.id,
    location: location.name,
    responsible_person_iin: person.iin,
    responsible_person_inn: person.iin,
    responsible_person: person.name,
    status_id: statusId,
    status,
    company_id: companyId,
    company: profile.company,
    code: 'OS-' + String(300 + id).padStart(6, '0'),
    inventory_number: 'INV-' + year + '-' + String(300 + id).padStart(5, '0'),
    account: template.account,
    purchase_date: year + '-' + month + '-' + day,
    purchase_cost: purchaseCost,
    current_cost: currentCost,
    factory_number: 'SN-' + companyId + '-' + String(10000 + id),
    passport_number: 'PAS-' + String(10000 + id),
    description: statusId === '1'
      ? 'Эксплуатируется, состояние исправное'
      : (statusId === '2' ? 'Учитывается за балансом' : 'Списано и передано на утилизацию'),
    source: false,
    fact_location_id: location.factId,
    fact_responsible_person_iin: person.iin,
    write_off_date: statusId === '2' ? '2026-09-30' : undefined,
    date_utilized: statusId === '3' ? '2026-09-26' : undefined,
    util_order_file_name: statusId === '3' ? 'utilization-act-' + id + '.pdf' : undefined,
  }
})

const items = baseItems.concat(extraItems)

const inventories = [
  {
    id: 1,
    date: '05.10.2026 09:00',
    author: 'Александр Иванов',
    status: 'В процессе',
    companies: 'ITP Mining',
    persons: 'Александр Иванов',
    locations: 'Центральный склад',
    completed: false,
    date_completed: null,
    file_name: '',
    file_hashname: '',
  },
  {
    id: 2,
    date: '02.10.2026 11:30',
    author: 'Нино Беридзе',
    status: 'Завершено',
    companies: 'ITP Kazakhstan',
    persons: 'Нино Беридзе',
    locations: 'Склад Астана',
    completed: true,
    date_completed: '03.10.2026 16:45',
    file_name: 'inventory-2026-10-02.xlsx',
    file_hashname: 'inventory-2026-10-02.xlsx',
  },
  {
    id: 3,
    date: '30.09.2026 08:45',
    author: 'Айдана Сарсенова',
    status: 'Завершено',
    companies: 'ITP Mining',
    persons: 'Айдана Сарсенова',
    locations: 'Офис — 2 этаж',
    completed: true,
    date_completed: '30.09.2026 15:20',
    file_name: 'inventory-office-2026-09-30.xlsx',
    file_hashname: 'inventory-office-2026-09-30.xlsx',
  },
  {
    id: 4,
    date: '26.09.2026 10:15',
    author: 'Георгий Метревели',
    status: 'Завершено',
    companies: 'ITP Service',
    persons: 'Георгий Метревели',
    locations: 'Сервисный участок',
    completed: true,
    date_completed: '26.09.2026 17:05',
    file_name: 'inventory-service-2026-09-26.xlsx',
    file_hashname: 'inventory-service-2026-09-26.xlsx',
  },
  {
    id: 5,
    date: '22.09.2026 09:40',
    author: 'Данияр Ахметов',
    status: 'Завершено',
    companies: 'ITP Logistics',
    persons: 'Данияр Ахметов',
    locations: 'Логистический терминал',
    completed: true,
    date_completed: '22.09.2026 18:10',
    file_name: 'inventory-logistics-2026-09-22.xlsx',
    file_hashname: 'inventory-logistics-2026-09-22.xlsx',
  },
  {
    id: 6,
    date: '18.09.2026 14:00',
    author: 'Ерлан Касымов',
    status: 'Завершено',
    companies: 'ITP Kazakhstan',
    persons: 'Ерлан Касымов',
    locations: 'Административный корпус',
    completed: true,
    date_completed: '18.09.2026 17:35',
    file_name: 'inventory-admin-2026-09-18.xlsx',
    file_hashname: 'inventory-admin-2026-09-18.xlsx',
  },
]

const inventoryItems = items.slice(0, 5).map((item, index) => ({
  ...item,
  checked: index < 4,
  datetime_checked: index < 4 ? '05.10.2026 10:' + String(10 + index * 4).padStart(2, '0') : '',
  commentary: index === 3 ? 'Перемещено в соседний кабинет' : '',
  fact_location: item.location,
}))

const syncs = [
  { id: 1, date_time: '05.10.2026 12:14', initiator: 'Александр Иванов', company: 'ITP Mining', status: 'Завершенно', changes: 42 },
  { id: 2, date_time: '05.10.2026 11:47', initiator: 'Нино Беридзе', company: 'ITP Kazakhstan', status: 'Завершенно', changes: 29 },
  { id: 3, date_time: '05.10.2026 10:26', initiator: 'Система', company: 'ITP Service', status: 'В процессе', changes: 14 },
  { id: 4, date_time: '04.10.2026 18:32', initiator: 'Система', company: 'ITP Logistics', status: 'Завершенно', changes: 33 },
  { id: 5, date_time: '04.10.2026 14:08', initiator: 'Айдана Сарсенова', company: 'ITP Mining', status: 'Завершенно', changes: 21 },
  { id: 6, date_time: '03.10.2026 17:41', initiator: 'Ерлан Касымов', company: 'ITP Kazakhstan', status: 'Завершенно', changes: 18 },
  { id: 7, date_time: '03.10.2026 09:05', initiator: 'Система', company: 'ITP Service', status: 'Завершенно', changes: 11 },
  { id: 8, date_time: '02.10.2026 16:20', initiator: 'Тимур Омаров', company: 'ITP Logistics', status: 'Завершенно', changes: 26 },
  { id: 9, date_time: '01.10.2026 13:35', initiator: 'Александр Иванов', company: 'ITP Mining', status: 'Завершенно', changes: 37 },
  { id: 10, date_time: '30.09.2026 18:12', initiator: 'Система', company: 'ITP Kazakhstan', status: 'Завершенно', changes: 24 },
]

const syncChanges = [
  { id: 1, name: 'Ноутбук Dell Latitude 5540', company: 'ITP Mining', code: 'OS-000124', inventory_number: 'INV-2026-00124', change_type: '1', change_column: 'current_cost', old_value: '532000', new_value: '519000', date_change: '05.10.2026 12:14', event: 'Изменение стоимости', location: 'Офис — 2 этаж' },
  { id: 2, name: 'Сервер Dell PowerEdge R470', company: 'ITP Mining', code: 'OS-000131', inventory_number: 'INV-2026-00131', change_type: '3', change_column: 'location', old_value: 'Склад', new_value: 'Центральный склад', date_change: '05.10.2026 12:14', event: 'Перемещение', location: 'Центральный склад' },
]

const companySyncs = [
  { name: 'ITP Mining', date_time: '05.10.2026 12:14', status: 'Завершено', created: 28, changed: 14, ones: 6, utilized: 1, outbalanced: 3 },
  { name: 'ITP Kazakhstan', date_time: '05.10.2026 11:47', status: 'Завершено', created: 16, changed: 9, ones: 4, utilized: 0, outbalanced: 2 },
  { name: 'ITP Service', date_time: '05.10.2026 10:26', status: 'В процессе', created: 7, changed: 5, ones: 2, utilized: 0, outbalanced: 0 },
  { name: 'ITP Logistics', date_time: '04.10.2026 18:32', status: 'Завершено', created: 21, changed: 11, ones: 5, utilized: 2, outbalanced: 1 },
]

const roles = [
  { id: 1, fio: 'Александр Иванов', is_manager: true },
  { id: 2, fio: 'Нино Беридзе', is_manager: true },
  { id: 3, fio: 'Георгий Метревели', is_manager: false },
]

const guests = [
  { id: 11, fio: 'Мария Орлова', is_guest: true },
  { id: 12, fio: 'Леван Джапаридзе', is_guest: false },
]

const lineChart = {
  labels: ['29.09', '30.09', '01.10', '02.10', '03.10', '04.10', '05.10'],
  datasets: [
    { label: 'Добавлено', data: [18, 26, 21, 34, 29, 31, 27], fill: false },
    { label: 'Изменено', data: [9, 14, 12, 18, 11, 16, 13], fill: false },
    { label: 'События 1С', data: [5, 7, 6, 8, 4, 7, 5], fill: false },
  ],
}

const counts = { on_balance: 1284, written_off: 93, removed: 41 }

const inventoryProgress = [
  { value: 78, maxvalue: 100, color: 'success', textKey: 'app.dashboard.inventoryCentralWarehouse' },
  { value: 46, maxvalue: 62, color: 'info', textKey: 'app.dashboard.inventoryProductionSite' },
  { value: 19, maxvalue: 40, color: 'warning', textKey: 'app.dashboard.inventoryOfficeAssets' },
]

const activity = { syncs: 24, added: 186, changed: 74, ones: 42, utilized: 8, outbalanced: 17 }

const userInfo = {
  id: 1,
  fio: 'Александр Иванов',
  fioinic: 'А. Иванов',
  email: 'a.ivanov@itpmining.kz',
  roles: {
    uosAdmin: true,
    uosManager: true,
  },
}

const preferenceResponse = '{}'

const responseMap = {
  [USER_INFO]: userInfo,
  [GET_COMPANIES]: companies,
  [GET_COMPANIES_WITH_SYNC_INFO]: companySyncs,
  [GET_ITEMS_COUNT]: counts,
  [GET_LOCATIONS]: locations,
  [GET_LOCATIONS_FACT]: locationTree,
  [GET_LOCATIONS_FOR_FEW_COMPANIES]: locations,
  [GET_RESPONSIBLE_PERSONS]: persons,
  [GET_INVENTORIZATIONS]: inventories,
  [GET_INVENTORY_CHECK_ITEMS]: inventoryItems,
  [GET_CURRENT_SYNC_STATUS]: { status: 'Система готова к синхронизации', color: 'success' },
  [GET_START_MANUAL_SYNC]: { success: true },
  [FORM_REPORT]: 'inventory-report-test.xlsx',
  [GET_SYNCS]: syncs,
  [GET_SYNC_CHANGES]: syncChanges,
  [GET_SYNC_SETTINGS]: companies,
  [GET_USERS_WITH_ROLES]: roles,
  [GET_GUEST_USERS]: guests,
  [GET_LINE_CHARTS]: lineChart,
  [GET_WHITE_PILLOWS_DATA]: activity,
  [GET_INVS_STATUS]: inventoryProgress,
  [LOAD_USER_PREFERENCES]: preferenceResponse,
  [GET_ITEM_CHANGES]: [
    { id: 1, date_change: '05.10.2026', event: 'Изменено местоположение' },
    { id: 2, date_change: '03.10.2026', event: 'Обновлена текущая стоимость' },
  ],
}

export const mockCompanies = companies

function clone (value) {
  if (value === undefined) {
    return undefined
  }
  return JSON.parse(JSON.stringify(value))
}

function filteredItems (config) {
  const params = (config && config.params) || {}
  let data = items.slice()

  if (Number(params.is_utilized) === 1) {
    data = data.filter(item => item.status_id === '3')
  } else if (params.is_utilized !== undefined) {
    data = data.filter(item => item.status_id !== '3')
  }

  if (params.status_id !== undefined) {
    data = data.filter(item => String(item.status_id) === String(params.status_id))
  }

  if (params.company_id !== undefined && params.company_id !== null && params.company_id !== '') {
    data = data.filter(item => Number(item.company_id) === Number(params.company_id))
  }

  return data
}

export function getMockApiData (config) {
  if (!config || !config.url) {
    return undefined
  }

  const url = String(config.url).replace(/^\//, '')

  if (url === GET_ITEMS) {
    return clone(filteredItems(config))
  }

  if (Object.prototype.hasOwnProperty.call(responseMap, url)) {
    return clone(responseMap[url])
  }

  const method = String(config.method || 'get').toLowerCase()

  if (method !== 'get') {
    return { success: true }
  }

  return undefined
}
