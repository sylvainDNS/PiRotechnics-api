export const recover = (prms, onSuccess = res => res, onCatch = res => res) => {
  return new Promise(resolve => {
    prms
      .then(successValue => resolve(onSuccess(successValue)))
      .catch(catchValue => resolve(onCatch(catchValue)))
  })
}
