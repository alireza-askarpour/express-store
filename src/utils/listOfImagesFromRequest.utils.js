export const listOfImagesFromRequest = (files = []) => {
   return files.filter(file => Boolean(file && file.path)).map(file => file.path.replace(/\\/g, '/'))
}
