export default function reducer(state={
    // ez a defaut state
    user: {
        name: "default ertek",
    }
}, action) {

    switch (action.type) {
        case "SHOW_TEST": {
            var newState = {...state};
            newState.user.name = action.payload;
            console.log("reducer fut, payload: " + action.payload);
            return newState
        }
        default: {
            return {
                ...state
            }
        }
    }
}
