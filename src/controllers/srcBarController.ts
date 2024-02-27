import srcBarService from "../services/srcBarService.js";

export async function getSrcBooks(req, res) {
  try {
    const { src } = req.query;
    const srcBooks = await srcBarService.getSrcBooks(src);
    res.status(200).send(srcBooks);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
