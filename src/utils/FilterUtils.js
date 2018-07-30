export class FilterUtils {
  static getItem(arr, key) {
    const result = arr.filter(item => item.value === key);
    return result[0].key;
  }
}
