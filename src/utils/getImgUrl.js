function getImgUrl(name) {
  return new URL(`../assets/photos/soaps/${name}`, import.meta.url);
}

export { getImgUrl };
