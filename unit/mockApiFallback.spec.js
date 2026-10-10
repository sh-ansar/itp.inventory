import {
  CREATE_INVENTORY_CHECK,
  GET_INVENTORIZATIONS,
  GET_INVENTORY_CHECK_ITEMS,
  GET_ITEMS,
  LOAD_USER_PREFERENCES,
  LOGIN,
  SAVE_USER_PREFERENCES,
  CLEAR_USER_PREFERENCES,
  SET_UTILIZATION_STATUS,
} from '../src/consts/urls'
import { getMockApiData } from '../src/data/mockApiFallback'

describe('mock API fallback', () => {
  it('returns a usable demo token', () => {
    const token = getMockApiData({
      url: LOGIN,
      method: 'post',
      data: {
        username: 'demo',
        password: 'demo',
      },
    })

    expect(token).toBe('demo-token')
  })

  it('moves an asset into and out of utilized state', () => {
    const activeBefore = getMockApiData({
      url: GET_ITEMS,
      method: 'get',
      params: { is_utilized: 0 },
    })
    const item = activeBefore[0]

    getMockApiData({
      url: SET_UTILIZATION_STATUS,
      method: 'post',
      data: {
        id: item.id,
        is_utilized: '1',
      },
    })

    const utilized = getMockApiData({
      url: GET_ITEMS,
      method: 'get',
      params: { is_utilized: 1 },
    })

    expect(utilized.some(row => row.id === item.id)).toBe(true)

    getMockApiData({
      url: SET_UTILIZATION_STATUS,
      method: 'post',
      data: {
        id: item.id,
        is_utilized: '0',
      },
    })

    const activeAfter = getMockApiData({
      url: GET_ITEMS,
      method: 'get',
      params: { is_utilized: 0 },
    })

    expect(activeAfter.some(row => row.id === item.id)).toBe(true)
  })

  it('persists and clears table preferences', () => {
    const tableId = 'unit-test-table'
    const state = JSON.stringify({
      pageIndex: 2,
      searchText: 'Dell',
    })

    getMockApiData({
      url: SAVE_USER_PREFERENCES,
      method: 'post',
      data: {
        table_id: tableId,
        json_string: state,
      },
    })

    expect(getMockApiData({
      url: LOAD_USER_PREFERENCES,
      method: 'get',
      params: { table_id: tableId },
    })).toBe(state)

    getMockApiData({
      url: CLEAR_USER_PREFERENCES,
      method: 'post',
      data: { table_id: tableId },
    })

    expect(getMockApiData({
      url: LOAD_USER_PREFERENCES,
      method: 'get',
      params: { table_id: tableId },
    })).toBe('{}')
  })

  it('creates an inventory with the selected assets', () => {
    const activeItems = getMockApiData({
      url: GET_ITEMS,
      method: 'get',
      params: { is_utilized: 0 },
    }).slice(0, 2)
    const before = getMockApiData({
      url: GET_INVENTORIZATIONS,
      method: 'get',
    })

    const created = getMockApiData({
      url: CREATE_INVENTORY_CHECK,
      method: 'post',
      data: {
        items: activeItems.map(item => item.id),
        companies: [activeItems[0].company_id],
      },
    })

    const after = getMockApiData({
      url: GET_INVENTORIZATIONS,
      method: 'get',
    })
    const selected = getMockApiData({
      url: GET_INVENTORY_CHECK_ITEMS,
      method: 'get',
      params: { inv_check_id: created.id },
    })

    expect(after).toHaveLength(before.length + 1)
    expect(after[0].id).toBe(created.id)
    expect(selected.map(item => item.id)).toEqual(activeItems.map(item => item.id))
  })
})
