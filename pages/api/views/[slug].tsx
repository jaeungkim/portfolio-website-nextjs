import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // increment the views
  if (req.method === "POST") {
    const slug = req.query.slug as string;
    const ref = db.ref(`views/${slug}`);
    const { snapshot } = await ref.transaction((currentViews: number) => {
      if (currentViews === null) {
        return 1;
      }
      return currentViews + 1;
    });

    return res.status(200).json({
      total: snapshot.val(),
    });
  }

  // fetch the views
  if (req.method === "GET") {
    const slug = req.query.slug as string;
    const snapshot = await db.ref(`views/${slug}`).once("value");
    const views = snapshot.val();

    return res.status(200).json({ total: views });
  }
}
