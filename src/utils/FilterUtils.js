export class FilterUtils {
  static getItem(arr, key) {
    const result = arr.filter(item => item.value === key);
    return result[0].key;
  }

  static filterItem(arr, key) {
    const result = arr.filter(item => item.value === key);
    if (result[0]) {
      return result[0].key;
    }
  }
}
