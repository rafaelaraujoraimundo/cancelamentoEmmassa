abstract class AppSettings {
    public static APP_PAGE_CODE = (window as any)['pageCode'];
    public static APP_ROOT = (window as any)['tenantURI'];  
   
    /**
     * base url + application prefix
     */
  
    public static APP_BASE =
      AppSettings.APP_ROOT && AppSettings.APP_PAGE_CODE
      ? AppSettings.APP_ROOT + '/' + AppSettings.APP_PAGE_CODE
      : '';
  }
  
  export { AppSettings as APP_CONFIG };