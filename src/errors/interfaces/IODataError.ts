// Example of an odata.error instance as a JSON string with line breaks:
// {
//   "odata.error": {
//     "code": "-1, System.ArgumentException",
//     "message": { 
//       "lang": "en-US",
//       "value": "List 'Lorem' does not exist at site with URL 'https://contoso.sharepoint.com/sites/lab-1-modern'."
//     }
//   }
// }
export interface IODataError {
  "odata.error": {
    code: string;
    message: {
      lang: string;
      value: string;
    }
  };
}
