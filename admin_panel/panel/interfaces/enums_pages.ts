export enum Pages{
    event_log_page = "event_log_page",
    settings_page = "settings_page",
    accoung_page = "account_page",
    home_page = "home_page"
}
export enum Pages_settings{
    main="main",
    domainSetting="domainSetting",
    smtp_system_mail="smtp_system_mail",
    smtp_client_smtp="smtp_client_smtp"
}
export interface Pages_Object {
    [key: string]: boolean;
  }