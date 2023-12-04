import React from 'react';
const rootMenuPath = [];
export const DropdownMenuNavigationContext = React.createContext({
    activeMenuPath: rootMenuPath,
    setActiveMenuPath: () => { },
    anchorRef: { current: null },
});
export const DropdownMenuNavigationContextProvider = ({ anchorRef, children, disabled, }) => {
    const [activeMenuPath, setActiveMenuPath] = React.useState(rootMenuPath);
    React.useEffect(() => {
        if (disabled) {
            setActiveMenuPath(rootMenuPath);
        }
    }, [disabled]);
    const contextValue = React.useMemo(() => ({
        activeMenuPath,
        setActiveMenuPath,
        anchorRef,
    }), [activeMenuPath, anchorRef]);
    return (React.createElement(DropdownMenuNavigationContext.Provider, { value: contextValue }, children));
};
