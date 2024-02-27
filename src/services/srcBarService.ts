import srcBarRepository from "../repositories/srcBarRepository.js";

async function getSrcBooks(src: string) {
  return await srcBarRepository.getBooks(src);
}

const srcBarService = {
  getSrcBooks,
};
export default srcBarService;
