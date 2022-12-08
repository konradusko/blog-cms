import { LitElement } from 'lit';
declare enum Pages {
    login = "login",
    forgetPassword = "forgetPassword"
}
export declare class loginElement extends LitElement {
    static styles: import("lit").CSSResult[];
    current_page: Pages;
    forget_password_route?: HTMLButtonElement;
    changeRoute(): void;
    input_login_login?: HTMLInputElement;
    input_password_login?: HTMLInputElement;
    login_button?: HTMLButtonElement;
    back_to_login_route?: HTMLButtonElement;
    create_error(element: HTMLElement | HTMLInputElement, text_error: string): void;
    create_server_response(element: HTMLElement | HTMLButtonElement, text: string, positive: boolean): void;
    delete_error(): void;
    disable_button(button: HTMLButtonElement): void;
    enable_button(button: HTMLButtonElement): void;
    login_fn(): void;
    forget_password_button?: HTMLButtonElement;
    input_email_reset_password?: HTMLInputElement;
    forgetPasswort_fn(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'login-element': loginElement;
    }
}
export {};
