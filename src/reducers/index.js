import _ from 'lodash'

const initialState = {
  list : [
    { id: 1, text: "Hack network" },
    { id: 2, text: "Print spaceship" },
    { id: 3, text: "Design some cool stuff" }
  ],
  mode: false,
  text: ''
}


export default function page(state = initialState, action) {

  switch (action.type) {

    case 'new_item':
      let temp = Object.assign([], state.list);
      temp.unshift({
        id: action.data.id,
        text: action.data.text
      })
      return { ...state, list: temp, mode: false}
    case 'update_cards':
      return {
         ...state, list: action.data
      }
    case 'remove_card':

      let newlist = Object.assign([], state.list);
      _.remove(newlist, (item)=>{
        return item.id == action.data.id
      })
      return {
        ...state, list: newlist
      }
    case 'toggle_mode':
      return {
        ...state, mode: !state.mode
      }
    case 'text_edit':
      return {
        ...state, text: action.data
      }
    default:
      return state;
  }

}
