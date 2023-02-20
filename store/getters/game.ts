import store from "../store";

export const getCamo = () => {
    let camo = store.getState().game.camos.find(c => c.selected);
    if (!camo) {
        camo = store.getState().game.camos[0];
    }
    return camo;
};