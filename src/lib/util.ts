export function stylesString(styles: Record<string, any>){
  let res = "";
  for (let [key, val] of Object.entries(styles)) {
    res += `${key}: ${val}`;
  }
}