export const CHANGE_ACTIVE_RESUME_MENU = 'CHANGE_ACTIVE_RESUME_MENU';
export const CHANGE_ACTIVE_FILES_MENU = 'CHANGE_ACTIVE_FILES_MENU';

const initialState = {
  menu: {
    resume: [
      { id: 0, name: '합격한 자소서', children: [], active: true },
      { id: 1, name: '불합격한 자소서', children: [], active: false },
      { id: 2, name: '회사별 자소서', children: [], active: false },
    ],
    files: [
      {
        id: 0,
        name: '증명서 전체보기',
        children: [
          { id: 0, name: '인적사항 증빙서', active: true },
          { id: 1, name: '어학 증빙서', active: false },
          { id: 2, name: '자격증 증빙서', active: false },
          { id: 3, name: '수상 증빙서', active: false },
        ],
        active: true,
      },
    ],
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_ACTIVE_RESUME_MENU:
    case CHANGE_ACTIVE_FILES_MENU:
      const { menuType, selectedId } = action.payload;
      const lowerMenuType = menuType.toLowerCase();
      let menus;
      if (lowerMenuType === 'resume') {
        menus = state.menu[lowerMenuType].map(item => {
          return item.id === selectedId
            ? (item = { ...item, active: true })
            : (item = { ...item, active: false });
        });
      } else {
        menus = [
          {
            ...state.menu[lowerMenuType][0],
            children: state.menu[lowerMenuType][0]['children'].map(item => {
              return item.id === selectedId
                ? (item = { ...item, active: true })
                : (item = { ...item, active: false });
            }),
          },
        ];
      }
      return {
        ...state,
        menu: {
          ...state.menu,
          [lowerMenuType]: menus,
        },
      };
    default:
      return state;
  }
}

export const changeActiveMenu = (selectedId, menuType) => ({
  type: `CHANGE_ACTIVE_${menuType}_MENU`,
  payload: {
    selectedId,
    menuType,
  },
});
