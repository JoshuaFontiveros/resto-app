const initialState = {
  items: [
    {
      id: 1,
      name: "Veg Exotica",
      price: 699.99,
      category: "Veggie",
      image:
        "https://cdn.shopify.com/s/files/1/0046/1615/9347/products/product16_1665ba3b-bd00-49f8-a131-3f4cee5a2cc1_2000x.jpg?v=1532433958",
    },
    {
      id: 2,
      name: "Spicy Veggie Cheese",
      price: 559.99,
      category: "Veggie",
      image:
        "https://cdn.shopify.com/s/files/1/0046/1615/9347/products/product15_ba96ff5f-2031-46b1-bdcd-4cbe730eb0ef_2000x.jpg?v=1532433836",
    },
    {
      id: 3,
      name: "Chicken Italiano",
      price: 329.99,
      category: "Chicken",
      image:
        "https://cdn.shopify.com/s/files/1/0046/1615/9347/products/product13_2000x.jpg?v=1532430203",
    },
    {
      id: 4,
      name: "Veggie Love",
      price: 599.99,
      category: "Veggie",
      image:
        "https://cdn.shopify.com/s/files/1/0046/1615/9347/products/product12_1907ca76-705e-49e2-b5d1-aacfbaed9659_2000x.jpg?v=1532434341",
    },
    {
      id: 5,
      name: "Chicken Sausage Pizza",
      price: 729.99,
      category: "Chicken",
      image:
        "https://cdn.shopify.com/s/files/1/0046/1615/9347/products/product7_67e5a1a3-d122-4d8e-8fbd-7cbe7e31b2c7_2000x.jpg?v=1532430278",
    },
    {
      id: 6,
      name: "Chicken Supreme Pizza",
      price: 329.99,
      category: "Chicken",
      image:
        "https://cdn.shopify.com/s/files/1/0046/1615/9347/products/p2_4b6fdf6b-c874-4aa5-8885-83dc601908bb_2000x.jpg?v=1532430471",
    },
    {
      id: 7,
      name: "Chicken Tikka Pizza",
      price: 329.99,
      category: "Chicken",
      image:
        "https://cdn.shopify.com/s/files/1/0046/1615/9347/products/p4_25376d3a-b8b0-46ef-b213-dfa35ef5519c_2000x.jpg?v=1532430779",
    },
    {
      id: 8,
      name: "Chickeroni (Chicken Pepperoni)",
      price: 329.99,
      category: "Chickeroni",
      image:
        "https://cdn.shopify.com/s/files/1/0046/1615/9347/products/product11_f54a6d51-5428-4553-8f99-3d2208233796_2000x.jpg?v=1532430887",
    },
  ],
  cart: [],
  total: 0,
  toUpdateItem: null,
  item: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_ITEM":
      return { ...state, items: [...action.payload] };
    case "DELETE_ITEM_IN_CART":
      return { ...state, cart: [...action.payload] };
    case "ITEM_EDIT":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATED_ITEMS":
      return { ...state, items: [...action.payload] };
    case "ADD_TO_CART":
      return { ...state, cart: [...action.payload] };
    case "TOTAL":
      return { ...state, total: action.payload };
    default:
      return state;
  }
};

export default reducer;
