import { LitElement,  html ,unsafeCSS} from 'lit'
import { customElement, property, query} from 'lit/decorators.js'
import style from '../../index.css'
import animate from '../../animate.css'
import { Pages_settings } from '../../../interfaces/enums_pages'
import {create_alert,Alert_types} from '../../../modules/create_alert'
import {get_error_true_module} from '../../../modules/error_true_module'
import {create_skeleton_module} from '../../../modules/create_skeleton_module'
interface Smtp_object  {
  host:string,
  password:string,
  role:string,
  user:string
}
enum Smtp_panel_status{
  pending="pending",
  sucess='sucess',
  error='error'
}
interface Response_smtp{
  message:string,
  error:boolean,
  data?:null|Smtp_object
}
enum RoleSmtp{
  system="system",
  newsletter="newsletter"
}
@customElement('settingsmtp-page')
export class DomainOption extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]
  //Inputy
  @query('#smtp_password')
  inputSmtpPassword?:HTMLInputElement
  @query(`#smtp_user`)
  inputSmtpUser?:HTMLInputElement
  @query(`#smtp_host`)
  inputSmtpHost?:HTMLInputElement
  //obecna strona
  @property()
  smtp_type:string = ``
  @property()
  smtp_data:null|Smtp_object = null
  @property()
  smtp_status:Smtp_panel_status = Smtp_panel_status.pending
  @property()
  standard_error_text:string = 'Wystąpił błąd podczas pobierania danych. Może być to wewnętrzny błąd serwera lub twoje połączenie z internetem.'
  @property()
  error_text:string = this.standard_error_text
  changePage(e:any){
    const route:Pages_settings = Pages_settings.main
    const options = {
        detail: route,
        bubbles: true,
        composed: true
      };
    this.dispatchEvent(new CustomEvent('set-Page', options))
}

  get_smtp_data(){
    this.smtp_status= Smtp_panel_status.pending
    fetch(`/api/v1/get/smtp`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type:this.smtp_type == Pages_settings.smtp_newsletter?RoleSmtp.newsletter:RoleSmtp.system
      })
    }).then((res) => res.json())
    .then((res:Response_smtp)=>{
      console.log(res)
      if(res.error){
        //mamy błąd
        create_alert(Alert_types.error,5,res.message,this.shadowRoot as ShadowRoot)
        setTimeout(() => {
          this.error_text = res.message
          this.smtp_status = Smtp_panel_status.error

        }, 1000);
        
      }else{
        //nie mamy błędu
 
        setTimeout(() => {
          create_alert(Alert_types.sucess,3,res.message,this.shadowRoot as ShadowRoot)
          this.smtp_status = Smtp_panel_status.sucess
          if('data' in res){
            this.smtp_data = res.data as Smtp_object | null

          } 
        }, 500);
        
      }

    })
    .catch((er)=>{
      create_alert(Alert_types.error,5,"Wystąpił błąd",this.shadowRoot as ShadowRoot)
      setTimeout(() => {
        this.smtp_status = Smtp_panel_status.error
        this.error_text = this.standard_error_text
      }, 1000);
   
    })
  }

  protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
    if(_changedProperties.has("smtp_data")){
      if(this.smtp_data == null){
        this.disable_all = false
      }else{
        this.disable_all = true
      }
    }
  
  }

  @property()
  show_password:boolean = false
  @property()
  disable_all:boolean = true;
  showHidePassword(){
    if(!this.inputSmtpPassword)
      return
    console.log(this.inputSmtpPassword?.type)
    if(this.inputSmtpPassword?.type == 'password'){
      this.inputSmtpPassword.type = 'text';
      this.show_password = true
    }else if(this.inputSmtpPassword?.type == 'text'){
      this.inputSmtpPassword.type = 'password';
      this.show_password = false
    }
  }
  @property()
  edit_smtp_buttons:boolean = false
  editSmtp(){
    this.disable_all = false
    this.edit_smtp_buttons = true
  }


  connectedCallback(): void {
    super.connectedCallback()
    this.get_smtp_data()
  }

  render() {
    return html`


    <div class="flex justify-center h-full animated fadeInDown">
    <div class="flex rounded-lg shadow-lg bg-white  w-[80%] h-[98%] flex-col">
      <div class="py-3 px-6 border-b border-gray-300 ">
      <h5 class="text-gray-900 text-xl font-medium mb-2 text-center">Ustawienia smtp dla ${this.smtp_type == Pages_settings.smtp_system_mail?`maili systemowych`:'maili newsletter'}</h5>
      <nav class="rounded-md w-full">
  <ol class="list-reset flex">
    <li><button @click="${this.changePage}" class="text-blue-600 hover:text-blue-700">Ustawienia systemowe</button></li>
    <li><span class="text-gray-500 mx-2">/</span></li>
    <li class="text-gray-500">Smtp</li>
  </ol>
</nav>
      </div>
      <div class="p-6 h-[80%] max-h-[100%] overflow-y-auto">
 
      ${this.smtp_status == Smtp_panel_status.pending?html`${create_skeleton_module()}`:html`
    ${this.smtp_status == Smtp_panel_status.error?html`
    ${get_error_true_module(this.error_text,this.get_smtp_data)}
    `:html`
    <div class="flex m-3">
    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
      Host
    </span>
    ${this.disable_all == true?html` <input disabled value="${this.smtp_data!= null?`${this.smtp_data?.host as string}`:``}" type="text" id="smtp_host" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Podaj nazwę hosta">`:html` <input value="${this.smtp_data!= null?`${this.smtp_data?.host as string}`:``}" type="text" id="smtp_host" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Podaj nazwę hosta">`}
   
  </div>

  <div class="flex m-3">
  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
    Login
  </span>
  ${this.disable_all == true?html` <input disabled value="${this.smtp_data!= null?`${this.smtp_data?.user as string}`:``}" type="text" id="smtp_user" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Podaj nazwę użytkownika">`:html`<input  value="${this.smtp_data!= null?`${this.smtp_data?.user as string}`:``}" type="text" id="smtp_user" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Podaj nazwę użytkownika">`}
 
</div>

<div class="flex m-3">
<span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
  Hasło
</span>
<span @click="${this.showHidePassword}"  class="cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200  border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
${this.show_password == false?html`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`:html`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>`}
</span>
${this.disable_all == true?html`<input disabled value="${this.smtp_data!= null?`${this.smtp_data?.password as string}`:``}" type="password" id="smtp_password" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Podaj hasło użytkownika">`:html`<input value="${this.smtp_data!= null?`${this.smtp_data?.password as string}`:``}" type="password" id="smtp_password" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Podaj hasło użytkownika">`}
</div>
<div class="flex m-3">
${this.edit_smtp_buttons == true?html``:html`<button @click="${this.editSmtp}" type="button" class=" text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
<svg class="mr-2 -ml-1 w-4 h-4"" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
  Edytuj
</button>

<button type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
<svg class="w-4 h-4 mr-2 -ml-1 text-[#626890]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
  Wyślij testowego maila
</button>`}

</div>
    `}
  `}

 



      </div>
      <div class="py-3 px-6 border-t border-gray-300 text-gray-600 text-center">
        Pamiętaj, że wprowadzone zmiany mają wpływ na działanie serwisu
      </div>
    </div>
  </div>
    `
  }

}

