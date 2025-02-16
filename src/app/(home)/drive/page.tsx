import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/login");
  }
  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <form
        action={async () => {
          "use server";
          const session = await auth();
          if (!session.userId) {
            return redirect("/login");
          }
          const rootFolderId = await MUTATIONS.onBoardUser(session.userId);
          return redirect(`/f/${rootFolderId}`);
        }}
      ></form>
    );
  }
  return redirect(`/f/${rootFolder.id}`);
}
