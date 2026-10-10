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
  SAVE_USER_PREFERENCES,
  CLEAR_USER_PREFERENCES,
  GET_ITEM_CHANGES,
  ADD_ITEM,
  UPDATE_ITEM,
  SET_UTILIZATION_STATUS,
  SET_INV_COMPLETE_STATUS,
  CREATE_INVENTORY_CHECK,
  UPLOAD_REPORT_FILE,
  UPLOAD_UTIL_ORDER_FILE,
  ADD_RESPONSIBLE_PERSON,
  UPDATE_RESPONSIBLE_PERSON,
  ADD_LOCATIONS_FACT,
  SAVE_LOCATIONS_FACT,
  DELETE_LOCATION,
  UPDATE_ROLE,
  UPDATE_GUEST_ROLE,
  SAVE_SYNC_SETTINGS,
  ADD_COMPANY,
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

const extraItems = Array.from({ length: 1411 }, (_, index) => {
  const id = index + 8
  const companyId = (index % 4) + 1
  const profile = companyProfiles[companyId]
  const location = profile.locations[index % profile.locations.length]
  const person = profile.people[index % profile.people.length]
  const template = assetTemplates[index % assetTemplates.length]
  const statusId = index < 1279 ? '1' : (index < 1371 ? '2' : '3')
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

const items = baseItems.concat(extraItems).map(item => ({
  ...item,
  is_utilized: String(item.status_id) === '3' ? '1' : '0',
}))

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
].concat(Array.from({ length: 12 }, (_, index) => {
  const id = index + 7
  const company = companies[index % companies.length]
  const person = persons[(index + 2) % persons.length]
  const completed = index % 4 !== 0
  const day = String(16 - index).padStart(2, '0')
  return {
    id,
    date: day + '.09.2026 ' + String(9 + (index % 8)).padStart(2, '0') + ':' + (index % 2 ? '30' : '00'),
    author: person.name,
    status: completed ? 'Завершено' : 'В процессе',
    companies: company.name,
    persons: person.name,
    locations: locations[(index + 3) % locations.length].name,
    completed,
    date_completed: completed ? day + '.09.2026 18:10' : null,
    file_name: completed ? 'inventory-' + day + '-09-2026.xlsx' : '',
    file_hashname: completed ? 'inventory-' + day + '-09-2026.xlsx' : '',
  }
}))

const inventoryItems = items.slice(0, 12).map((item, index) => ({
  ...item,
  checked: index < 9,
  datetime_checked: index < 9 ? '05.10.2026 10:' + String(10 + index * 4).padStart(2, '0') : '',
  commentary: index === 3
    ? 'Перемещено в соседний кабинет'
    : (index === 7 ? 'Проверено ответственным лицом' : ''),
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
].concat(items.slice(8, 20).map((item, index) => ({
  id: index + 3,
  name: item.name,
  company: item.company,
  code: item.code,
  inventory_number: item.inventory_number,
  change_type: String((index % 3) + 1),
  change_column: index % 2 ? 'location' : 'responsible_person',
  old_value: index % 2 ? 'Предыдущее расположение' : 'Предыдущий МОЛ',
  new_value: index % 2 ? item.location : item.responsible_person,
  date_change: '0' + (4 - (index % 4)) + '.10.2026 1' + (index % 8) + ':20',
  event: index % 2 ? 'Изменение расположения' : 'Смена ответственного лица',
  location: item.location,
})))

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
  { id: 4, fio: 'Айдана Сарсенова', is_manager: true },
  { id: 5, fio: 'Ерлан Касымов', is_manager: false },
  { id: 6, fio: 'Мариам Капанадзе', is_manager: false },
  { id: 7, fio: 'Тимур Омаров', is_manager: true },
  { id: 8, fio: 'Данияр Ахметов', is_manager: true },
  { id: 9, fio: 'Анна Волкова', is_manager: false },
  { id: 10, fio: 'Бекзат Нургалиев', is_manager: false },
]

const guests = [
  { id: 11, fio: 'Мария Орлова', is_guest: true },
  { id: 12, fio: 'Леван Джапаридзе', is_guest: false },
  { id: 13, fio: 'София Ким', is_guest: true },
  { id: 14, fio: 'Алексей Романов', is_guest: false },
  { id: 15, fio: 'Гурам Мачавариани', is_guest: true },
  { id: 16, fio: 'Алия Жумабаева', is_guest: false },
  { id: 17, fio: 'Николай Петров', is_guest: true },
  { id: 18, fio: 'Тамара Кобахидзе', is_guest: false },
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

function itemCounts (config) {
  const params = (config && config.params) || {}
  let source = items

  if (params.company_id !== undefined && params.company_id !== null && params.company_id !== '') {
    source = source.filter(item => Number(item.company_id) === Number(params.company_id))
  }

  return {
    on_balance: source.filter(item => String(item.status_id) === '1').length,
    written_off: source.filter(item => String(item.status_id) === '2').length,
    removed: source.filter(item => String(item.status_id) === '3').length,
  }
}

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

const tablePreferences = {}

const currentSyncStatus = {
  status: 'Система готова к синхронизации',
  color: 'success',
}

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
  [GET_CURRENT_SYNC_STATUS]: currentSyncStatus,
  [FORM_REPORT]: 'inventory-report-test.xlsx',
  [GET_SYNCS]: syncs,
  [GET_SYNC_CHANGES]: syncChanges,
  [GET_SYNC_SETTINGS]: companies,
  [GET_USERS_WITH_ROLES]: roles,
  [GET_GUEST_USERS]: guests,
  [GET_LINE_CHARTS]: lineChart,
  [GET_WHITE_PILLOWS_DATA]: activity,
  [GET_INVS_STATUS]: inventoryProgress,
  [GET_ITEM_CHANGES]: [
    { id: 1, date_change: '05.10.2026', event: 'Изменено местоположение' },
    { id: 2, date_change: '03.10.2026', event: 'Обновлена текущая стоимость' },
  ],
}

export const mockCompanies = companies

const inventorySelections = {}

function clone (value) {
  if (value === undefined) {
    return undefined
  }
  return JSON.parse(JSON.stringify(value))
}

function requestData (config) {
  const data = config && config.data

  if (!data) {
    return {}
  }

  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    const result = {}

    data.forEach((value, rawKey) => {
      const isArrayKey = /\[\]$/.test(rawKey)
      const key = rawKey.replace(/\[\]$/, '')

      if (isArrayKey) {
        if (!Array.isArray(result[key])) {
          result[key] = []
        }
        result[key].push(value)
      } else {
        result[key] = value
      }
    })

    return result
  }

  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (e) {
      return {}
    }
  }

  if (typeof data === 'object') {
    return data
  }

  return {}
}

function asBoolean (value) {
  return value === true || value === 1 || value === '1' || value === 'true'
}

function nextId (list) {
  return list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1
}

function formatDateTime (date = new Date()) {
  const pad = value => String(value).padStart(2, '0')
  return [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    date.getFullYear(),
  ].join('.') + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes())
}

function findTreeNode (nodes, id) {
  const targetId = Number(id)

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index]

    if (Number(node.id) === targetId) {
      return node
    }

    const children = node.items || node.children

    if (Array.isArray(children)) {
      const found = findTreeNode(children, targetId)
      if (found) {
        return found
      }
    }
  }

  return null
}

function removeTreeNode (nodes, id) {
  const targetId = Number(id)

  for (let index = 0; index < nodes.length; index++) {
    if (Number(nodes[index].id) === targetId) {
      nodes.splice(index, 1)
      return true
    }

    const children = nodes[index].items || nodes[index].children

    if (Array.isArray(children) && removeTreeNode(children, targetId)) {
      return true
    }
  }

  return false
}

function updateRelatedItemLabels (item) {
  const company = companies.find(company => Number(company.id) === Number(item.company_id))
  const location = locations.find(location => Number(location.id) === Number(item.location_id))
  const person = persons.find(person => String(person.iin) === String(item.responsible_person_iin || item.responsible_person_inn))

  if (company) {
    item.company = company.name
  }

  if (location) {
    item.location = location.name
  }

  if (person) {
    item.responsible_person = person.name
    item.responsible_person_inn = person.iin
  }

  return item
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

  if (Array.isArray(params.companies) && params.companies.length) {
    const selectedCompanies = params.companies.map(Number)
    data = data.filter(item => selectedCompanies.includes(Number(item.company_id)))
  }

  if (Array.isArray(params.persons) && params.persons.length) {
    const selectedPersons = params.persons.map(String)
    data = data.filter(item => selectedPersons.includes(String(item.responsible_person_iin)))
  }

  if (Array.isArray(params.locations) && params.locations.length) {
    const selectedLocations = params.locations.map(Number)
    data = data.filter(item => selectedLocations.includes(Number(item.location_id)))
  }

  return data
}

function addDemoItem (data) {
  const id = nextId(items)
  const statusId = String(data.status_id || '1')
  const item = updateRelatedItemLabels({
    id,
    ...data,
    status_id: statusId,
    status: statusId === '3' ? 'Утилизирован' : (statusId === '2' ? 'За балансом' : 'На балансе'),
    is_utilized: statusId === '3' ? '1' : '0',
    source: true,
    code: data.code || 'OS-' + String(300 + id).padStart(6, '0'),
    inventory_number: data.inventory_number || 'INV-2026-' + String(300 + id).padStart(5, '0'),
  })

  items.unshift(item)
  return item
}

function updateDemoItem (data) {
  const itemId = Number(data.item_id || data.id)
  const item = items.find(item => Number(item.id) === itemId)

  if (!item) {
    return null
  }

  const values = { ...data }
  delete values.item_id
  Object.assign(item, values)
  updateRelatedItemLabels(item)
  return item
}

function setDemoUtilization (data) {
  const item = items.find(item => Number(item.id) === Number(data.id))

  if (!item) {
    return null
  }

  const utilized = asBoolean(data.is_utilized)
  item.is_utilized = utilized ? '1' : '0'
  item.status_id = utilized ? '3' : '1'
  item.status = utilized ? 'Утилизирован' : 'На балансе'
  item.date_utilized = utilized ? formatDateTime().split(' ')[0] : undefined

  return item
}

function setDemoInventoryCompletion (data) {
  const inventory = inventories.find(item => Number(item.id) === Number(data.id))

  if (!inventory) {
    return null
  }

  const completed = asBoolean(data.is_completed)
  inventory.completed = completed
  inventory.status = completed ? 'Завершено' : 'В процессе'
  inventory.date_completed = completed ? formatDateTime() : null

  return inventory
}

function createDemoInventory (data) {
  const id = nextId(inventories)
  const selectedCompanyIds = Array.isArray(data.companies) ? data.companies.map(Number) : []
  const selectedItems = Array.isArray(data.items) ? data.items.map(Number) : []
  const selectedCompanies = companies
    .filter(company => selectedCompanyIds.includes(Number(company.id)))
    .map(company => company.name)

  const inventory = {
    id,
    date: formatDateTime(),
    author: userInfo.fio,
    status: 'В процессе',
    companies: selectedCompanies.join(', ') || 'Все компании',
    persons: '',
    locations: '',
    completed: false,
    date_completed: null,
    file_name: '',
    file_hashname: '',
  }

  inventories.unshift(inventory)
  inventorySelections[id] = selectedItems
  return inventory
}

function addDemoPerson (data) {
  const person = {
    id: nextId(persons),
    name: data.name || 'Новый ответственный',
    iin: data.iin || String(900000000000 + nextId(persons)),
    company_id: Number(data.company_id) || 1,
    is_self_added: true,
  }

  persons.push(person)
  return person
}

function updateDemoPerson (data) {
  const person = persons.find(item => Number(item.id) === Number(data.id)) ||
    persons.find(item => String(item.iin) === String(data.iin))

  if (!person) {
    return null
  }

  Object.assign(person, data)
  return person
}

function addDemoLocation (data) {
  const id = Math.max(
    locations.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0),
    5000,
  ) + 1

  const parent = data.parent_id ? findTreeNode(locationTree, data.parent_id) : null
  const companyId = Number(data.company_id) || (parent && Number(parent.company_id)) || 1
  const location = {
    id,
    name: data.name || 'Новое расположение',
    company_id: companyId,
    is_1c: asBoolean(data.is_1c),
  }

  if (data.parent_id || (!data.company_id && !data.is_1c)) {
    const node = { ...location, is_1c: false }

    if (parent) {
      if (!Array.isArray(parent.items)) {
        parent.items = []
      }
      parent.items.push(node)
    } else {
      locationTree.push(node)
    }
  } else {
    locations.push(location)
  }

  return location
}

function updateDemoLocation (data) {
  const location = locations.find(item => Number(item.id) === Number(data.id))
  const treeNode = findTreeNode(locationTree, data.id)

  if (location) {
    Object.assign(location, data)
  }

  if (treeNode) {
    Object.assign(treeNode, data)
  }

  return location || treeNode || null
}

function startDemoSync (config) {
  const companyId = Number(config && config.params && config.params.companyId)
  const company = companies.find(item => Number(item.id) === companyId)
  const id = nextId(syncs)
  const now = formatDateTime()

  syncs.unshift({
    id,
    date_time: now,
    initiator: userInfo.fio,
    company: company ? company.name : 'ITP Mining',
    status: 'Завершенно',
    changes: 12,
  })

  if (company) {
    const dashboardRow = companySyncs.find(item => item.name === company.name)
    if (dashboardRow) {
      dashboardRow.date_time = now
      dashboardRow.status = 'Завершено'
      dashboardRow.changed += 12
    }
  }

  currentSyncStatus.status = 'Система готова к синхронизации'
  currentSyncStatus.color = 'success'

  return { success: true, sync_id: id }
}

function handleDemoWrite (url, config) {
  const data = requestData(config)

  if (url === ADD_ITEM) {
    const item = addDemoItem(data)
    return { success: true, id: item.id }
  }

  if (url === UPDATE_ITEM) {
    const item = updateDemoItem(data)
    return { success: !!item }
  }

  if (url === SET_UTILIZATION_STATUS) {
    const item = setDemoUtilization(data)
    return { success: !!item }
  }

  if (url === SET_INV_COMPLETE_STATUS) {
    const inventory = setDemoInventoryCompletion(data)
    return { success: !!inventory }
  }

  if (url === CREATE_INVENTORY_CHECK) {
    const inventory = createDemoInventory(data)
    return { success: true, id: inventory.id }
  }

  if (url === UPLOAD_REPORT_FILE) {
    const inventory = inventories.find(item => Number(item.id) === Number(data.inv_check_id))
    if (inventory && data.report_file) {
      inventory.file_name = data.report_file.name || 'inventory-report-demo.xlsx'
      inventory.file_hashname = inventory.file_name
    }
    return { success: !!inventory }
  }

  if (url === UPLOAD_UTIL_ORDER_FILE) {
    const item = items.find(item => Number(item.id) === Number(data.item_id))
    if (item && data.order_file) {
      item.util_order_file_name = data.order_file.name || 'utilization-act-demo.pdf'
    }
    return { success: !!item }
  }

  if (url === ADD_RESPONSIBLE_PERSON) {
    const person = addDemoPerson(data)
    return { success: true, id: person.id }
  }

  if (url === UPDATE_RESPONSIBLE_PERSON) {
    return { success: !!updateDemoPerson(data) }
  }

  if (url === ADD_LOCATIONS_FACT) {
    const location = addDemoLocation(data)
    return { success: true, id: location.id }
  }

  if (url === SAVE_LOCATIONS_FACT) {
    return { success: !!updateDemoLocation(data) }
  }

  if (url === DELETE_LOCATION) {
    const id = Number(data.id)
    const locationIndex = locations.findIndex(item => Number(item.id) === id)
    if (locationIndex >= 0) {
      locations.splice(locationIndex, 1)
    }
    const removedFromTree = removeTreeNode(locationTree, id)
    return { success: locationIndex >= 0 || removedFromTree }
  }

  if (url === UPDATE_ROLE) {
    const role = roles.find(item => Number(item.id) === Number(data.id))
    if (role) {
      role.is_manager = asBoolean(data.is_manager)
    }
    return { success: !!role }
  }

  if (url === UPDATE_GUEST_ROLE) {
    const guest = guests.find(item => Number(item.id) === Number(data.id))
    if (guest) {
      guest.is_guest = asBoolean(data.is_guest)
    }
    return { success: !!guest }
  }

  if (url === SAVE_SYNC_SETTINGS) {
    const company = companies.find(item => Number(item.id) === Number(data.id))
    if (company) {
      Object.assign(company, data)
      if (data.days !== undefined) {
        company.days = Number(data.days)
      }
    }
    return { success: !!company }
  }

  if (url === ADD_COMPANY) {
    const company = {
      id: nextId(companies),
      name: data.name || 'Новая компания',
      days: Number(data.days) || 1,
      url: data.url || '',
      is_deleted: 0,
      is_self_added: 1,
    }
    companies.push(company)
    return { success: true, id: company.id }
  }

  if (url === SAVE_USER_PREFERENCES) {
    const tableId = String(data.table_id || '')
    if (tableId) {
      tablePreferences[tableId] = data.json_string || '{}'
    }
    return { success: true }
  }

  if (url === CLEAR_USER_PREFERENCES) {
    const tableId = String(data.table_id || '')
    if (tableId) {
      delete tablePreferences[tableId]
    }
    return { success: true }
  }

  return { success: true }
}

export function getMockApiData (config) {
  if (!config || !config.url) {
    return undefined
  }

  const url = String(config.url).replace(/^\//, '')
  const method = String(config.method || 'get').toLowerCase()

  if (url === GET_ITEMS) {
    return clone(filteredItems(config))
  }

  if (url === GET_ITEMS_COUNT) {
    return clone(itemCounts(config))
  }

  if (url === GET_INVENTORY_CHECK_ITEMS) {
    const inventoryId = Number(config.params && config.params.inv_check_id)
    const selectedIds = inventorySelections[inventoryId]

    if (Array.isArray(selectedIds) && selectedIds.length) {
      return clone(items.filter(item => selectedIds.includes(Number(item.id))))
    }

    return clone(inventoryItems)
  }

  if (url === LOAD_USER_PREFERENCES) {
    const tableId = String((config.params && config.params.table_id) || '')
    return tablePreferences[tableId] || '{}'
  }

  if (url === GET_START_MANUAL_SYNC) {
    return clone(startDemoSync(config))
  }

  if (method !== 'get') {
    return clone(handleDemoWrite(url, config))
  }

  if (Object.prototype.hasOwnProperty.call(responseMap, url)) {
    return clone(responseMap[url])
  }

  return undefined
}
