"use server"

import { revalidateTag } from "next/cache";

export default async function revalidatePage(path : string) {
  revalidateTag(path);
}