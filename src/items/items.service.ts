import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";

let items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
};

const findAll = async (): Promise<Item[]> => Object.values(items);

const find = async (id: number): Promise<Item> => items[id];

const create = async (newItem: BaseItem): Promise<Item> => {
  const id = new Date().valueOf();
  items[id] = {
    id,
    ...newItem
  };
  return items[id];
};

const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id);
  if (!item) return null;

  items[id] = { ...item, ...itemUpdate };

  return items[id];
};

const remove = async (id: number): Promise<null | boolean> => {
  const item = await find(id);

  if (!item) return null;

  delete items[id];

  return true;
};

export {
  findAll,
  find,
  create,
  update,
  remove
};