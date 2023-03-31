export const setFeatures = (body = {}) => {
  const {
    width = 0,
    height = 0,
    length = 0,
    weight = 0,
    model = '',
    madein = '',
    colors = [],
  } = body
  const features = {
    width: +width,
    height: +height,
    length: +length,
    weight: +weight,
    model,
    madein,
    colors,
  }
  return features
}

export const updateFeatures = (body = {}) => {
  const { width, height, length, weight, model, madein, colors } = body
  const fileds = { width, height, length, weight, model, madein, colors }

  const features = {}
  Object.keys(fileds).forEach(field => {
    if (body[field]) features[field] = body[field]
  })
  return features
}
