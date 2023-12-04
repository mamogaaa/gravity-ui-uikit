"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.initialState = void 0;
exports.initialState = { filter: '' };
const reducer = (state = exports.initialState, action) => {
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
exports.reducer = reducer;
