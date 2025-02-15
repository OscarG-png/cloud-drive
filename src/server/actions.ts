"use server";

import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import { files_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utapi = new UTApi();

export async function deleteFile(fileId: number, fileKey: string) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const file = await db
    .delete(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );
  if (!file) {
    return { error: "File not found" };
  }
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  await utapi.deleteFiles(fileKey);
}
