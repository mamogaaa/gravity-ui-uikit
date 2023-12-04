export const initialState = { filter: '' };
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER': {
            const { filter } = action.payload;
            return Object.assign(Object.assign({}, state), { filter });
        }
        default: {
            return state;
        }
    }
};
