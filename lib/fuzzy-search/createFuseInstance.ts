import { SearchRecord } from "@/types";
import Fuse from "fuse.js";

export function createFuseInstance(content: SearchRecord[]) {
  // Create the fuse instance
  const options = {
    keys: ["title", "description", "category"],
    useExtendedSearch: true,
    ignoreLocation: true,
    threshold: 0.3,
    fieldNormWeight: 2,
  };
  return new Fuse(content, options);
}
