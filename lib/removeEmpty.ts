const removeEmpty = (target: any): any => {
  const obj = { ...target };
  Object.keys(obj).forEach((key) => (obj[key] == null || Number.isNaN(obj[key])) && delete obj[key]);
  if (obj.count) delete obj["count"];
  if (obj.page && obj.page === 1) delete obj["page"];
  return obj;
};
export default removeEmpty;
