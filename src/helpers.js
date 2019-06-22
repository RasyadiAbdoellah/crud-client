export function clearIf500(error) {
  // return nothing if no response
  if (!error.response) {
    return null;
  }
  if (error.response.status > 500) {
    localStorage.clear();
    sessionStorage.clear();
    return true;
  }
  return false;
}
