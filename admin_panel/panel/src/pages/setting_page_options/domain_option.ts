import { LitElement,  html ,unsafeCSS} from 'lit'
import { customElement, property, query} from 'lit/decorators.js'
import style from '../../index.css'
import animate from '../../animate.css'
import { Pages_settings } from '../../../interfaces/enums_pages'
import {get_error_true_module} from '../../../modules/error_true_module'
import {create_skeleton_module} from '../../../modules/create_skeleton_module'
import {create_alert,Alert_types} from '../../../modules/create_alert'
import {createModal_update_changes,remove_modal_update_changes} from '../../../modules/create_modal_saving_change'
import {create_modal_are_your_sure,remove_modal_are_your_sure} from '../../../modules/show_modal_are_you_sure'
enum panelStatuses{
  pending="pending",
  sucess='sucess',
  error='error'
}
interface Settings_data{
  blockIp:boolean,
  domain:string,
  requiredHttps:boolean
}
interface Response_get_settings{
  message:string,
  error:boolean,
  data:null|Settings_data
}
interface Response_server{
  message:string,
  error:boolean
}
@customElement('settingdomain-page')
export class DomainOption extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]
  //obecna strona
  @property()
  settings_page_status: panelStatuses =  panelStatuses.pending
  @property()
  standard_error_text:string = 'Wystąpił błąd podczas pobierania danych. Może być to wewnętrzny błąd serwera lub twoje połączenie z internetem.'
  @property()
  error_text:string = this.standard_error_text

  @property()
  settings_data:Settings_data|null = null
  get_domain_settings(){
    this. settings_page_status=  panelStatuses.pending
    fetch('/api/v1/get/domain/settings',{
      method: 'GET',
    }).then((res) => res.json())
    .then((res:Response_get_settings)=>{
      remove_modal_update_changes(this.shadowRoot as ShadowRoot)
      if(res.error){
        setTimeout(() => {
          this.error_text = res.message
          this.settings_page_status = panelStatuses.error
        }, 300);
      }else{
        if(res.data == null){
          setTimeout(() => {
            this.error_text = res.message
            this.settings_page_status = panelStatuses.error
          }, 300);
        }else{
          setTimeout(() => {
            this.settings_page_status = panelStatuses.sucess
            this.settings_data = res.data  
          }, 200);
          
        }
      }
      
    })
    .catch(()=>{
      create_alert(Alert_types.error,5,"Wystąpił błąd",this.shadowRoot as ShadowRoot)
      setTimeout(() => {
        remove_modal_update_changes(this.shadowRoot as ShadowRoot)
        this.settings_page_status = panelStatuses.error
        this.error_text = this.standard_error_text
      }, 1000);
    })
  }
  connectedCallback(): void {
    super.connectedCallback()
   //Pobieranie danych
   this.get_domain_settings()
  }

  set_new_domain(){
    create_modal_are_your_sure(this.shadowRoot as ShadowRoot,()=>{
      remove_modal_are_your_sure(this.shadowRoot as ShadowRoot)
      createModal_update_changes(this.shadowRoot as ShadowRoot,'Trwa zapisywanie zmian')
      const new_host_name:string =window.location.host 
      fetch('/api/v1/sethost/domain/settings',{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         domain:new_host_name
        })
      }).then((res) => res.json())
        .then((res:Response_server)=>{
            if(res.error){
              remove_modal_update_changes(this.shadowRoot as ShadowRoot)
              create_alert(Alert_types.error,3,res.message,this.shadowRoot as ShadowRoot)
            }else{
              this.get_domain_settings()

              create_alert(Alert_types.sucess,3,res.message,this.shadowRoot as ShadowRoot)
       
            }
        })
        .catch((er)=>{
         remove_modal_update_changes(this.shadowRoot as ShadowRoot)
         create_alert(Alert_types.error,3,"Wystąpił błąd ",this.shadowRoot as ShadowRoot)
        })
    })
  }
  change_http_ip_settings(e:any){
    const type:string = e.target.getAttribute('data-type')
    if(!type)
      return
      create_modal_are_your_sure(this.shadowRoot as ShadowRoot,()=>{
        remove_modal_are_your_sure(this.shadowRoot as ShadowRoot)
        createModal_update_changes(this.shadowRoot as ShadowRoot,'Trwa zapisywanie zmian')
        fetch('/api/v1/change/domain/settings',{
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           type:type
          })
        }).then((res) => res.json())
        .then((res:Response_server)=>{
          if(res.error){
            remove_modal_update_changes(this.shadowRoot as ShadowRoot)
            create_alert(Alert_types.error,3,res.message,this.shadowRoot as ShadowRoot)
          }else{
            this.get_domain_settings()
            create_alert(Alert_types.sucess,3,res.message,this.shadowRoot as ShadowRoot)
        
          }
        })
        .catch((er)=>{
        remove_modal_update_changes(this.shadowRoot as ShadowRoot)
        create_alert(Alert_types.error,3,"Wystąpił błąd ",this.shadowRoot as ShadowRoot)
        })
      })

  }
  changePage(e:any){
    const route:Pages_settings = Pages_settings.main
    const options = {
      detail: route,
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('set-Page', options))
}
  render() {
    return html`
    <div class="flex justify-center h-full animated fadeInDown">
    <div class="flex rounded-lg shadow-lg bg-white  w-[80%] h-[98%] flex-col">
      <div class="py-3 px-6 border-b border-gray-300 ">
      <h5 class="text-gray-900 text-xl font-medium mb-2 text-center">Ustawienia domeny</h5>
      <nav class="rounded-md w-full">
      <ol class="list-reset flex">
        <li><button @click="${this.changePage}" class="text-blue-600 hover:text-blue-700">Ustawienia systemowe</button></li>
        <li><span class="text-gray-500 mx-2">/</span></li>
        <li class="text-gray-500">Ustawienia domeny</li>
      </ol>
    </nav>
      </div>
      <div class="p-6 h-[80%] max-h-[100%] overflow-y-auto">
 




      ${this.settings_page_status ==  panelStatuses.pending? html`${create_skeleton_module()}`:html`
        ${this.settings_page_status ==  panelStatuses.error?html`
        ${get_error_true_module(this.error_text,()=>{
          this.get_domain_settings()
            })}
        `:html`
        <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
    <div class="flex flex-col pb-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Domena</dt>
        <dd class="text-lg font-semibold">${this.settings_data != null?html`${this.settings_data.domain}`
        
        
        :html`<div class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"><strong>Brak danych</strong></div>`}</dd>
        <dd class="text-lg font-semibold mt-2">${this.settings_data != null?
          html`<button @click="${this.set_new_domain}" type="button" class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Przypisz nową domenę</button>`
        
        :html`<div class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"><strong>Brak danych</strong></div>`}</dd>
    </div>
    <div class="flex flex-col py-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Wymuś https</dt>
        <dd class="text-lg font-semibold">${this.settings_data != null?html`${this.settings_data.requiredHttps == true?html`<button type="button" class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-default">Tak</button>`:html`<button type="button" class="inline-block px-6 py-2 border-2 border-yellow-500 text-yellow-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-default"><strong>Nie</strong></button>`}`
        :html`<div class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"><strong>Brak danych</strong></div>`}</dd>
        <dd class="text-lg font-semibold mt-2">${this.settings_data != null?
          html`<button @click="${this.change_http_ip_settings}" data-type="https" type="button" class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Zmień</button>`
        
        :html`<div class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"><strong>Brak danych</strong></div>`}</dd>
    </div>
    <div class="flex flex-col pt-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Blokada IP</dt>
        <dd class="text-lg font-semibold">${this.settings_data != null?html`${this.settings_data.blockIp == true?html`<button type="button" class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-default">Tak</button>`:html`<button type="button" class="inline-block px-6 py-2 border-2 border-yellow-500 text-yellow-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-default"><strong>Nie</strong></button>`}`
        :html`<div class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"><strong>Brak danych</strong></div>`}</dd>
        <dd class="text-lg font-semibold mt-2">${this.settings_data != null?
          html`<button @click="${this.change_http_ip_settings}" data-type="ip" type="button" class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Zmień</button>`
        
        :html`<div class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"><strong>Brak danych</strong></div>`}</dd>
    </div>
</dl>
        
        `}
      `}

   


      </div>
      <div class="py-3 px-6 border-t border-gray-300 text-gray-600 text-center ">
        Pamiętaj, że wprowadzone zmiany mają wpływ na działanie serwisu
      </div>
    </div>
  </div>
    `
  }

}

