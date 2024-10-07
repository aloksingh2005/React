export const sidebarReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_PIN":
            return {
                ...state,
                pinnedItems: {
                    ...state.pinnedItems,
                    [action.key]: !state.pinnedItems[action.key],
                },
            };
        case "SET_ACTIVE_DROPDOWN":
            return {
                ...state,
                activeDropdown:
                    state.activeDropdown === action.key ? null : action.key,
            };
        case "SET_INITIAL_DROPDOWN":
            return {
                ...state,
                activeDropdown: action.key,
            };
        default:
            return state;
    }
};
