import {
  int,
  bigint,
  text,
  singlestoreTableCreator,
  index,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const files = createTable(
  "files_tables",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name"),
    size: int("size"),
    url: text("url"),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export const folders = createTable(
  "folders_tables",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);
