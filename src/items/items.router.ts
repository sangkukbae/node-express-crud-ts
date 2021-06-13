import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

export const itemRouter = express.Router();

itemRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

itemRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

  } catch (err) {
    res.status(500).send(err.message);
  }
});

itemRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    const newItem = await ItemService.create(item);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

itemRouter.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const itemUpdate: Item = req.body;
    const existingItem: Item = await ItemService.find(id);

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

itemRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    return await ItemService.remove(id);
  } catch (err) {
    res.status(500).send(err.message);
  }
});