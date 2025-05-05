import type { NextApiRequest, NextApiResponse } from "next";

const items: string[] = ["Apple", "Banana", "Orange"];

type Data =
  | { success: true; data: string[] }
  | { success: false; message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    return res.status(200).json({ success: true, data: items });
  }

  if (req.method === "POST") {
    const { item } = req.body;

    if (!item || typeof item !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Item must be a non-empty string" });
    }

    items.push(item);
    return res.status(201).json({ success: true, data: items });
  }

  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
}
