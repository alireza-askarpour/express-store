export const setFeatures = (body = {}) => {
  const { width = 0, height = 0, length = 0, weight = 0, model = '', madein = '' } = body
  const features = {
    width: +width,
    height: +height,
    length: +length,
    weight: +weight,
    model,
    madein
  }
  return features
}
